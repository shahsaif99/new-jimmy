<?php

namespace App\Models;

use App\Events\NewNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class UserChecklist extends Model
{
    use HasFactory;

    protected $guarded = [];

    public const STATUS_DRAFT = 'draft';
    public const STATUS_ASSIGNED = 'assigned';
    public const STATUS_IN_PROGRESS = 'in_progress';
    public const STATUS_SUBMITTED = 'submitted';
    public const STATUS_OVERDUE = 'overdue';

    public const STATUSES = [
        self::STATUS_DRAFT,
        self::STATUS_ASSIGNED,
        self::STATUS_IN_PROGRESS,
        self::STATUS_SUBMITTED,
        self::STATUS_OVERDUE,
    ];

    protected $casts = [
        'is_started' => 'boolean',
        'started_at' => 'datetime',
        'submitted_at' => 'datetime',
        'due_date' => 'datetime',
        'work_location' => 'array',
        'total_tasks' => 'integer',
        'completed_tasks' => 'integer',
        'passed_tasks' => 'integer',
        'failed_tasks' => 'integer',
        'na_tasks' => 'integer',
    ];

    protected $appends = ['progress_percent', 'score_percent', 'deviation_count'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_checklist_pivots');
    }

    public function files()
    {
        return $this->hasMany(UserChecklistFile::class);
    }

    public function checklist()
    {
        return $this->belongsTo(Checklist::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function assigner()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function answers()
    {
        return $this->hasMany(TaskCheckListAnswer::class);
    }

    public function snapshotSections()
    {
        return $this->hasMany(UserChecklistSection::class)->orderBy('position');
    }

    public function snapshotTasks()
    {
        return $this->hasManyThrough(
            UserChecklistTask::class,
            UserChecklistSection::class,
            'user_checklist_id',
            'user_checklist_section_id',
            'id',
            'id'
        );
    }

    public function snapshotFromTemplate(?Checklist $template = null): void
    {
        $template = $template ?? $this->checklist;
        if (!$template) {
            return;
        }

        if ($this->snapshotSections()->exists()) {
            return;
        }

        $template->load('sections.checklistTasks');

        foreach ($template->sections as $sectionIdx => $section) {
            $snapshotSection = $this->snapshotSections()->create([
                'source_section_id' => $section->id,
                'name' => $section->name,
                'position' => $sectionIdx,
            ]);

            foreach ($section->checklistTasks as $taskIdx => $task) {
                $snapshotSection->tasks()->create([
                    'source_checklist_task_id' => $task->id,
                    'name' => $task->name,
                    'type' => $task->type ?? 'procedure',
                    'param' => $task->param,
                    'is_img_required' => (bool) $task->is_img_required,
                    'img' => $task->img,
                    'position' => $taskIdx,
                ]);
            }
        }

        $this->update(['total_tasks' => $this->snapshotTasks()->count()]);
    }

    public function deviations()
    {
        return $this->hasManyThrough(
            AvvikListing::class,
            TaskCheckListAnswer::class,
            'user_checklist_id',
            'id',
            'id',
            'avvik_listing_id'
        );
    }

    public function getProgressPercentAttribute(): int
    {
        if (!$this->total_tasks) {
            return 0;
        }
        return (int) round(($this->completed_tasks / $this->total_tasks) * 100);
    }

    public function getScorePercentAttribute(): int
    {
        $scored = $this->passed_tasks + $this->failed_tasks;
        if (!$scored) {
            return 0;
        }
        return (int) round(($this->passed_tasks / $scored) * 100);
    }

    public function getDeviationCountAttribute(): int
    {
        if (array_key_exists('deviation_count_cache', $this->attributes)) {
            return (int) $this->attributes['deviation_count_cache'];
        }
        return $this->answers()->whereNotNull('avvik_listing_id')->count();
    }

    public function scopeMine($query, ?int $userId = null)
    {
        $userId = $userId ?? auth()->id();
        return $query->whereHas('users', fn ($q) => $q->where('users.id', $userId));
    }

    public function scopeApplyFilters($query, Request $request)
    {
        return $query
            ->when($request->q, function ($q, $term) {
                $q->where(function ($inner) use ($term) {
                    $inner->where('title', 'like', "%{$term}%")
                        ->orWhereHas('checklist', fn ($c) => $c->where('name', 'like', "%{$term}%"));
                });
            })
            ->when($request->checklist_id, fn ($q, $id) => $q->where('checklist_id', $id))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->project_id, fn ($q, $id) => $q->where('project_id', $id))
            ->when($request->equipment_id, fn ($q, $id) => $q->where('equipment_id', $id))
            ->when($request->employee_id, function ($q, $id) {
                $q->whereHas('users', fn ($u) => $u->where('users.id', $id));
            })
            ->when($request->has('date') && is_array($request->date) && count($request->date) === 2, function ($q) use ($request) {
                $q->whereBetween('created_at', [
                    $request->date[0] . ' 00:00:00',
                    $request->date[1] . ' 23:59:59',
                ]);
            })
            ->when($request->sortBy, function ($q, $sortBy) use ($request) {
                $direction = $request->sortDesc === 'true' ? 'desc' : 'asc';
                $q->orderBy($sortBy, $direction);
            }, fn ($q) => $q->latest('id'));
    }

    public function recalculateProgress(): void
    {
        $totalTasks = $this->snapshotTasks()->count();
        if ($totalTasks === 0) {
            $totalTasks = $this->checklist?->tasks()->count() ?? 0;
        }

        $answers = $this->answers()->get();

        $this->update([
            'total_tasks' => $totalTasks,
            'completed_tasks' => $answers->whereIn('answer', ['PASS', 'FAIL', 'NA'])->count(),
            'passed_tasks' => $answers->where('answer', 'PASS')->count(),
            'failed_tasks' => $answers->where('answer', 'FAIL')->count(),
            'na_tasks' => $answers->where('answer', 'NA')->count(),
        ]);
    }
}

UserChecklist::saved(function ($userChecklist) {
    if ($userChecklist->is_started && $userChecklist->wasChanged('is_started')) {
        $userChecklist->users->each(function ($user) use ($userChecklist) {
            $user->notify(new NewNotification($user, 'You have a new checklist to complete'));
        });
    }
});
