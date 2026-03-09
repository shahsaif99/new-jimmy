<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WeldLog\StoreRequest;
use App\Http\Resources\WeldLogResource;
use App\Models\WeldLog;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Plank\Mediable\Facades\MediaUploader;

class WeldLogController extends Controller
{
    public function index(Request $request)
    {
        $weldLogs = WeldLog::with('project')
            ->withCount('welds')
            ->search($request->search)
            ->applyFilters($request)
            ->when($request->perPage, fn($query, $perPage) => $query->paginate($perPage), fn($query) => $query->get());

        return WeldLogResource::collection($weldLogs);
    }

    public function store(StoreRequest $request)
    {
        $weldLog = WeldLog::create($request->validated());

        if ($request->hasFile('attachment')) {
            $media = MediaUploader::fromSource($request->file('attachment'))
                ->useOriginalFilename()
                ->toDirectory('weld-logs/' . $weldLog->id)
                ->upload();

            $weldLog->attachMedia($media, 'attachment');
        }

        return response()->json([
            'message' => 'Weld log successfully created.',
            'data' => new WeldLogResource($weldLog->load('project')),
        ], 201);
    }

    public function show(WeldLog $weldLog)
    {
        return response()->json([
            'message' => 'Weld log retrieved successfully.',
            'data' => new WeldLogResource($weldLog->load(['project.customer', 'welds.wps'])),
        ]);
    }

    public function update(Request $request, WeldLog $weldLog)
    {
        if ($request->has('ndt_required')) {
            $request->merge([
                'ndt_required' => filter_var($request->ndt_required, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
            ]);
        }

        $validated = $request->validate([
            'drawing_no' => [
                'sometimes', 'required', 'string', 'max:255',
                Rule::unique('weld_logs')->where(function ($query) use ($request, $weldLog) {
                    return $query->where('project_id', $request->project_id ?? $weldLog->project_id);
                })->ignore($weldLog->id),
            ],
            'project_id' => ['sometimes', 'required', 'exists:projects,id'],
            'status' => ['sometimes', 'required', Rule::in(['in_progress', 'completed'])],
            'ndt_required' => ['sometimes', 'boolean'],
            'ndt_rt' => ['nullable', 'integer', 'min:0'],
            'ndt_mt' => ['nullable', 'integer', 'min:0'],
            'ndt_pt' => ['nullable', 'integer', 'min:0'],
            'ndt_vt' => ['nullable', 'integer', 'min:0'],
        ]);

        $weldLog->update($validated);

        // Remove files
        if ($request->has('remove_media')) {
            foreach ($request->remove_media as $mediaId) {
                $weldLog->detachMedia($mediaId);
            }
        }

        // Attach new file
        if ($request->hasFile('attachment')) {
            $media = MediaUploader::fromSource($request->file('attachment'))
                ->useOriginalFilename()
                ->toDirectory('weld-logs/' . $weldLog->id)
                ->upload();

            $weldLog->attachMedia($media, 'attachment');
        }

        return response()->json([
            'message' => 'Weld log successfully updated.',
            'data' => new WeldLogResource($weldLog->load('project')),
        ]);
    }

    public function destroy(WeldLog $weldLog)
    {
        $weldLog->delete();

        return response()->json(['message' => 'Weld log successfully deleted.']);
    }

    public function exportPdf(WeldLog $weldLog)
    {
        $weldLog->load(['project', 'welds.wps']);

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('exports.weld-log-pdf', ['weldLog' => $weldLog]);

        return $pdf->download('weld-log-' . $weldLog->drawing_no . '.pdf');
    }

    public function exportXlsx(WeldLog $weldLog)
    {
        $weldLog->load(['project', 'welds.wps']);

        $fileName = 'weld-log-' . $weldLog->drawing_no . '.xlsx';

        return response()->json([
            'message' => 'Export data retrieved.',
            'data' => new WeldLogResource($weldLog),
        ]);
    }
}
