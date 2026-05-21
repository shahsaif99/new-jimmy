<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class SubmittedChecklistResource extends JsonResource
{
    public function toArray($request)
    {
        $assignees = $this->whenLoaded('users', fn () => $this->users->map->name->all(), []);

        return [
            'id' => $this->id,
            'code' => 'S-' . str_pad((string) (1000 + $this->id), 4, '0', STR_PAD_LEFT),
            'title' => $this->title ?? $this->checklist?->name,
            'description' => $this->description,
            'work_location' => $this->work_location,
            'template' => $this->whenLoaded('checklist', fn () => $this->checklist ? [
                'id' => $this->checklist->id,
                'name' => $this->checklist->name,
                'icon' => $this->checklist->icon,
                'color' => $this->checklist->color,
            ] : null),
            'submitted_assigned' => $assignees,
            'submitted_assigned_label' => implode(', ', $assignees),
            'status' => $this->status,
            'status_label' => $this->statusLabel(),
            'date' => $this->submitted_at
                ? Carbon::parse($this->submitted_at)->format('d.m.Y')
                : Carbon::parse($this->started_at ?? $this->created_at)->format('d.m.Y'),
            'progress' => [
                'completed' => (int) $this->completed_tasks,
                'total' => (int) $this->total_tasks,
                'percent' => $this->progress_percent,
            ],
            'score_percent' => $this->score_percent,
            'deviation_count' => (int) $this->deviation_count,
            'project' => $this->whenLoaded('project', fn () => $this->project ? [
                'id' => $this->project->id,
                'name' => $this->project->name,
                'project_no' => $this->project->project_no ?? null,
            ] : null),
            'equipment' => $this->whenLoaded('equipment', fn () => $this->equipment ? [
                'id' => $this->equipment->id,
                'name' => $this->equipment->name,
            ] : null),
            'created_at' => Carbon::parse($this->created_at)->format('d.m.Y'),
        ];
    }

    private function statusLabel(): string
    {
        return match ($this->status) {
            'draft' => 'Draft',
            'assigned' => 'Assigned',
            'in_progress' => 'Started',
            'submitted' => 'Submitted',
            'overdue' => 'Overdue',
            default => ucfirst((string) $this->status),
        };
    }
}
