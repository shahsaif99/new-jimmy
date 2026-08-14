<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Weld;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class WeldReportController extends Controller
{
    /**
     * A drill-down is a list to scan, not a data export; anything longer than
     * this is reported as a count with the first rows shown.
     */
    private const DETAIL_LIMIT = 250;

    /**
     * Aggregated Weld & NDT figures for the Reports > Weld & NDT tab.
     * Every figure is derived from the weld logs.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'year' => ['nullable', 'integer', 'min:2000', 'max:2100'],
            'project_id' => ['nullable', 'exists:projects,id'],
        ]);

        $year = $validated['year'] ?? (int) now()->format('Y');
        $projectId = $validated['project_id'] ?? null;

        return response()->json([
            'message' => 'Weld report retrieved successfully.',
            'data' => [
                'year' => $year,
                'totals' => $this->totals($year, $projectId),
                'methods' => $this->methodBreakdown($year, $projectId),
                'projects' => $this->projectBreakdown($year, $projectId),
                'trend' => $this->monthlyTrend($year, $projectId),
                'available_years' => $this->availableYears(),
            ],
        ]);
    }

    /**
     * The welds sitting behind a single figure on the report, for the
     * "View details" drill-downs. Every metric is a filter over the same
     * population the headline number was counted from.
     */
    public function details(Request $request)
    {
        $validated = $request->validate([
            'year' => ['nullable', 'integer', 'min:2000', 'max:2100'],
            'project_id' => ['nullable', 'exists:projects,id'],
            'metric' => ['required', Rule::in(array_merge(
                ['all', 'repairs', 'visual_failed'],
                array_map(fn ($m) => "{$m}_failed", Weld::NDT_METHODS),
                array_map(fn ($m) => "{$m}_tested", Weld::NDT_METHODS),
            ))],
        ]);

        $year = $validated['year'] ?? (int) now()->format('Y');
        $metric = $validated['metric'];

        $query = $this->query($year, $validated['project_id'] ?? null)
            ->with(['wps', 'weldLog.project']);

        if ($metric === 'repairs') {
            $query->where('type', Weld::TYPE_REPAIR);
        } elseif ($metric === 'visual_failed') {
            $query->where('visual_inspection', 'not_ok');
        } elseif (str_ends_with($metric, '_failed')) {
            $method = str_replace('_failed', '', $metric);
            $query->where("ndt_{$method}", true)->where("ndt_{$method}_result", 'rejected');
        } elseif (str_ends_with($metric, '_tested')) {
            $method = str_replace('_tested', '', $metric);
            $query->where("ndt_{$method}", true)->whereNotNull("ndt_{$method}_result");
        }

        $total = (clone $query)->count();

        $welds = $query
            ->orderBy('welds.weld_date')
            ->orderBy('welds.weld_no')
            ->orderBy('welds.repair_no')
            ->limit(self::DETAIL_LIMIT)
            ->get();

        return response()->json([
            'message' => 'Weld report details retrieved successfully.',
            'data' => [
                'metric' => $metric,
                'total' => $total,
                'shown' => $welds->count(),
                'truncated' => $total > $welds->count(),
                'rows' => $welds->map(fn (Weld $weld) => [
                    'id' => $weld->id,
                    'weld_label' => $weld->weld_label,
                    'type' => $weld->type,
                    'project_name' => $weld->weldLog?->project?->name,
                    'drawing_no' => $weld->weldLog?->drawing_no,
                    'weld_date' => $weld->weld_date?->format('Y-m-d'),
                    'welder_id' => $weld->welder_id,
                    'wps_name' => $weld->wps?->name,
                    'visual_inspection' => $weld->visual_inspection,
                    'repair_reason_label' => $weld->repair_reason_label,
                    'ndt_accepted' => $weld->ndt_accepted,
                ])->all(),
            ],
        ]);
    }

    /**
     * Base query for welds in scope. Repairs are included in the weld population:
     * a repair is itself a weld that was laid down and inspected.
     */
    private function query(int $year, ?int $projectId)
    {
        return Weld::query()
            ->whereYear('welds.weld_date', $year)
            ->when($projectId, fn ($q, $id) => $q->whereHas('weldLog', fn ($w) => $w->where('project_id', $id)));
    }

    private function totals(int $year, ?int $projectId): array
    {
        $row = $this->query($year, $projectId)
            ->selectRaw('COUNT(*) as total')
            ->selectRaw("SUM(CASE WHEN type = ? THEN 1 ELSE 0 END) as repairs", [Weld::TYPE_REPAIR])
            ->selectRaw("SUM(CASE WHEN visual_inspection = 'ok' THEN 1 ELSE 0 END) as visual_ok")
            ->first();

        $total = (int) $row->total;
        $repairs = (int) $row->repairs;
        $visualOk = (int) $row->visual_ok;

        return [
            'total_welds' => $total,
            'repairs' => $repairs,
            'repair_rate' => $this->rate($repairs, $total),
            'visual_passed' => $visualOk,
            'visual_tested' => $total,
            'visual_pass_rate' => $this->rate($visualOk, $total),
        ];
    }

    /**
     * Per-method NDT figures. A test only counts once a verdict has been recorded,
     * so welds still awaiting NDT results do not drag the pass rate down.
     */
    private function methodBreakdown(int $year, ?int $projectId): array
    {
        $query = $this->query($year, $projectId);

        foreach (Weld::NDT_METHODS as $method) {
            $query->selectRaw("SUM(CASE WHEN ndt_{$method} = 1 AND ndt_{$method}_result IS NOT NULL THEN 1 ELSE 0 END) as {$method}_tests")
                ->selectRaw("SUM(CASE WHEN ndt_{$method} = 1 AND ndt_{$method}_result = 'accepted' THEN 1 ELSE 0 END) as {$method}_passed")
                ->selectRaw("SUM(CASE WHEN ndt_{$method} = 1 THEN 1 ELSE 0 END) as {$method}_requested");
        }

        $row = $query->first();

        return collect(Weld::NDT_METHODS)->map(function ($method) use ($row) {
            $tests = (int) $row->{"{$method}_tests"};
            $passed = (int) $row->{"{$method}_passed"};

            return [
                'method' => strtoupper($method),
                'requested' => (int) $row->{"{$method}_requested"},
                'tests' => $tests,
                'passed' => $passed,
                'pass_rate' => $this->rate($passed, $tests),
            ];
        })->values()->all();
    }

    private function projectBreakdown(int $year, ?int $projectId): array
    {
        $rows = $this->query($year, $projectId)
            ->join('weld_logs', 'welds.weld_log_id', '=', 'weld_logs.id')
            ->join('projects', 'weld_logs.project_id', '=', 'projects.id')
            ->groupBy('projects.id', 'projects.name', 'projects.project_no')
            ->selectRaw('projects.id as project_id, projects.name as project_name, projects.project_no')
            ->selectRaw('COUNT(*) as welds')
            ->selectRaw("SUM(CASE WHEN welds.type = ? THEN 1 ELSE 0 END) as repairs", [Weld::TYPE_REPAIR])
            ->orderByDesc('welds')
            ->get();

        return $rows->map(fn ($r) => [
            'project_id' => $r->project_id,
            'project_name' => $r->project_name,
            'project_no' => $r->project_no,
            'welds' => (int) $r->welds,
            'repairs' => (int) $r->repairs,
            'repair_rate' => $this->rate((int) $r->repairs, (int) $r->welds),
        ])->all();
    }

    /**
     * Twelve calendar months of the selected year, per NDT method plus the
     * welder's own visual inspection. Months with no tests report null so the
     * chart draws a gap rather than a drop to zero.
     */
    private function monthlyTrend(int $year, ?int $projectId): array
    {
        $query = $this->query($year, $projectId)
            ->groupByRaw('MONTH(welds.weld_date)')
            ->selectRaw('MONTH(welds.weld_date) as month')
            ->selectRaw('COUNT(*) as total')
            ->selectRaw("SUM(CASE WHEN visual_inspection = 'ok' THEN 1 ELSE 0 END) as visual_ok");

        foreach (Weld::NDT_METHODS as $method) {
            $query->selectRaw("SUM(CASE WHEN ndt_{$method} = 1 AND ndt_{$method}_result IS NOT NULL THEN 1 ELSE 0 END) as {$method}_tests")
                ->selectRaw("SUM(CASE WHEN ndt_{$method} = 1 AND ndt_{$method}_result = 'accepted' THEN 1 ELSE 0 END) as {$method}_passed");
        }

        $byMonth = $query->get()->keyBy('month');

        $series = ['visual' => [], 'rt' => [], 'mt' => [], 'pt' => [], 'vt' => []];
        $volume = [];

        for ($month = 1; $month <= 12; $month++) {
            $row = $byMonth->get($month);

            $volume[] = $row ? (int) $row->total : 0;
            $series['visual'][] = $row
                ? $this->rate((int) $row->visual_ok, (int) $row->total)
                : null;

            foreach (Weld::NDT_METHODS as $method) {
                $tests = $row ? (int) $row->{"{$method}_tests"} : 0;
                $series[$method][] = $tests > 0
                    ? $this->rate((int) $row->{"{$method}_passed"}, $tests)
                    : null;
            }
        }

        return [
            'months' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'volume' => $volume,
            'pass_rate' => $series,
        ];
    }

    private function availableYears(): array
    {
        $years = Weld::query()
            ->whereNotNull('weld_date')
            ->selectRaw('DISTINCT YEAR(weld_date) as year')
            ->orderByDesc('year')
            ->pluck('year')
            ->map(fn ($y) => (int) $y)
            ->all();

        $current = (int) now()->format('Y');

        if (!in_array($current, $years, true)) {
            array_unshift($years, $current);
        }

        return $years;
    }

    private function rate(int $numerator, int $denominator): ?float
    {
        if ($denominator === 0) {
            return null;
        }

        return round(($numerator / $denominator) * 100, 1);
    }
}
