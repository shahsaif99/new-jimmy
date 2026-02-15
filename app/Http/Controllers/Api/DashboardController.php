<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Models\User;
use App\Models\Order;
use App\Models\Equipment;
use App\Models\Competence;
use App\Models\AvvikListing;
use Illuminate\Http\Request;
use App\Models\InformationBoard;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function statistics()
    {
        $now = Carbon::now();

        // --- Incidents this week ---
        $incidentsThisWeek = AvvikListing::whereBetween('created_at', [
            $now->copy()->startOfWeek(),
            $now->copy()->endOfWeek(),
        ])->count();

        $incidentsLastWeek = AvvikListing::whereBetween('created_at', [
            $now->copy()->subWeek()->startOfWeek(),
            $now->copy()->subWeek()->endOfWeek(),
        ])->count();

        $incidentsWeekDiff = $incidentsThisWeek - $incidentsLastWeek;

        // --- Incidents this year ---
        $incidentsThisYear = AvvikListing::whereYear('created_at', $now->year)->count();
        $incidentsLastYear = AvvikListing::whereYear('created_at', $now->year - 1)->count();
        $incidentsYearChange = $incidentsLastYear > 0
            ? round((($incidentsThisYear - $incidentsLastYear) / $incidentsLastYear) * 100)
            : 0;

        // --- Incidents overdue ---
        $incidentsOverdue = AvvikListing::whereNull('close_date')
            ->where('closing_deadline', '<', $now)
            ->count();

        // --- Monthly incidents (6 months) ---
        $monthlyLabels = [];
        $monthlyCounts = [];

        for ($i = 5; $i >= 0; $i--) {
            $date = $now->copy()->subMonths($i);
            $monthlyLabels[] = $date->format('M');
            $monthlyCounts[] = AvvikListing::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();
        }

        $monthlyAverage = count($monthlyCounts) > 0
            ? round(array_sum($monthlyCounts) / count($monthlyCounts), 1)
            : 0;

        // --- Expiring equipment (within 3 months) ---
        $expiringEquipment = Equipment::whereBetween('valid_until', [
            $now->copy(),
            $now->copy()->addMonths(3),
        ])->count();

        $expiringEquipmentLastWeek = Equipment::whereBetween('valid_until', [
            $now->copy()->subWeek(),
            $now->copy()->subWeek()->addMonths(3),
        ])->count();

        $expiringEquipmentDiff = $expiringEquipment - $expiringEquipmentLastWeek;

        // --- Expiring competence (within 3 months) ---
        $expiringCompetence = Competence::whereBetween('valid_until', [
            $now->copy(),
            $now->copy()->addMonths(3),
        ])->count();

        $expiringCompetenceLastWeek = Competence::whereBetween('valid_until', [
            $now->copy()->subWeek(),
            $now->copy()->subWeek()->addMonths(3),
        ])->count();

        $expiringCompetenceDiff = $expiringCompetence - $expiringCompetenceLastWeek;

        // --- My tasks (last 5 open) ---
        $user = auth()->user();
        $myTasks = Task::whereHas('assignedUsers', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->where('status', '!=', 'completed')
            ->with('category')
            ->orderBy('due_date', 'asc')
            ->limit(5)
            ->get()
            ->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'description' => $task->description,
                    'due_date' => $task->due_date,
                    'category' => $task->category ? $task->category->name : null,
                    'status' => $task->status,
                ];
            });

        // --- Information board (latest published) ---
        $boardItems = InformationBoard::where('status', 'published')
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'content' => $item->content,
                    'created_at' => \Carbon\Carbon::parse($item->getRawOriginal('created_at'))->format('d.m.Y'),
                    'author' => $item->user ? $item->user->name : 'Unknown',
                ];
            });

        return response()->json([
            'incidents_this_week' => $incidentsThisWeek,
            'incidents_week_diff' => $incidentsWeekDiff,
            'incidents_this_year' => $incidentsThisYear,
            'incidents_year_change' => $incidentsYearChange,
            'incidents_overdue' => $incidentsOverdue,
            'monthly_labels' => $monthlyLabels,
            'monthly_counts' => $monthlyCounts,
            'monthly_average' => $monthlyAverage,
            'expiring_equipment' => $expiringEquipment,
            'expiring_equipment_diff' => $expiringEquipmentDiff,
            'expiring_competence' => $expiringCompetence,
            'expiring_competence_diff' => $expiringCompetenceDiff,
            'my_tasks' => $myTasks,
            'board_items' => $boardItems,
        ]);
    }


    public function storeBoardInformation(Request $request){

        InformationBoard::create($request->all());
    }
}
