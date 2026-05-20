<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Checklist Rapport - {{ $userChecklist->title ?? $userChecklist->checklist?->name }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        h1 { font-size: 22px; margin: 0 0 4px 0; }
        h2 { font-size: 14px; margin: 18px 0 6px 0; padding-bottom: 4px; border-bottom: 1px solid #ddd; }
        .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
        .meta-table td { padding: 4px 8px; border: 1px solid #e0e0e0; vertical-align: top; }
        .meta-table td.label { width: 130px; background: #fafafa; font-weight: 600; }
        .summary { margin: 8px 0 18px 0; padding: 10px; border: 1px solid #e0e0e0; background: #fafafa; }
        .summary table { width: 100%; }
        .summary td { padding: 2px 6px; }
        .summary .num { font-size: 18px; font-weight: bold; }
        table.tasks { width: 100%; border-collapse: collapse; margin-top: 6px; }
        table.tasks th, table.tasks td { border: 1px solid #d8d8d8; padding: 6px 8px; vertical-align: top; }
        table.tasks th { background: #f3f3f3; font-weight: 600; text-align: left; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 3px; font-size: 10px; font-weight: bold; }
        .badge-pass { background: #d4edda; color: #155724; }
        .badge-fail { background: #f8d7da; color: #721c24; }
        .badge-na { background: #d1ecf1; color: #0c5460; }
        .badge-empty { background: #eee; color: #777; }
        .deviation { margin-top: 4px; padding: 4px 8px; background: #fff7e6; border-left: 3px solid #ff9f43; font-size: 11px; }
        .footer { margin-top: 24px; font-size: 10px; color: #888; text-align: right; }
    </style>
</head>
<body>
    <h1>Checklist Rapport</h1>
    <div style="font-size: 13px; margin-bottom: 12px;">
        {{ $userChecklist->title ?? $userChecklist->checklist?->name }}
    </div>

    <table class="meta-table">
        <tr>
            <td class="label">Template</td>
            <td>{{ $userChecklist->checklist?->name ?? '—' }}</td>
            <td class="label">Status</td>
            <td>{{ ucfirst(str_replace('_', ' ', $userChecklist->status)) }}</td>
        </tr>
        <tr>
            <td class="label">Submitted at</td>
            <td>{{ optional($userChecklist->submitted_at)->format('d.m.Y H:i') ?? '—' }}</td>
            <td class="label">Started at</td>
            <td>{{ optional($userChecklist->started_at)->format('d.m.Y H:i') ?? '—' }}</td>
        </tr>
        <tr>
            <td class="label">Project</td>
            <td>{{ $userChecklist->project ? ($userChecklist->project->project_no . ' - ' . $userChecklist->project->name) : '—' }}</td>
            <td class="label">Equipment</td>
            <td>{{ $userChecklist->equipment?->name ?? '—' }}</td>
        </tr>
        <tr>
            <td class="label">Performed/assigned</td>
            <td colspan="3">{{ $userChecklist->users->map->name->implode(', ') ?: '—' }}</td>
        </tr>
        @if($userChecklist->description)
        <tr>
            <td class="label">Description</td>
            <td colspan="3">{{ $userChecklist->description }}</td>
        </tr>
        @endif
    </table>

    <div class="summary">
        <table>
            <tr>
                <td><span class="num">{{ $userChecklist->completed_tasks }}</span> / {{ $userChecklist->total_tasks }} items completed</td>
                <td><span class="num">{{ $userChecklist->progress_percent }}%</span> progress</td>
                <td><span class="num">{{ $userChecklist->score_percent }}%</span> score</td>
                <td><span class="num">{{ $userChecklist->passed_tasks }}</span> passed</td>
                <td><span class="num">{{ $userChecklist->failed_tasks }}</span> failed</td>
                <td><span class="num">{{ $userChecklist->na_tasks }}</span> N/A</td>
            </tr>
        </table>
    </div>

    @php
        $answersByUctId = $userChecklist->answers->keyBy('user_checklist_task_id');
        $answersByTplId = $userChecklist->answers->keyBy('checklist_task_id');
    @endphp

    @foreach($userChecklist->snapshotSections as $section)
        <h2>{{ $section->name }}</h2>
        <table class="tasks">
            <thead>
                <tr>
                    <th style="width: 4%">#</th>
                    <th style="width: 36%">Task</th>
                    <th style="width: 12%">Result</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                @foreach($section->tasks as $idx => $task)
                    @php $answer = $answersByUctId->get($task->id) ?? $answersByTplId->get($task->source_checklist_task_id); @endphp
                    <tr>
                        <td>{{ $idx + 1 }}</td>
                        <td>{{ $task->name }}</td>
                        <td>
                            @switch($answer?->answer)
                                @case('PASS')
                                    <span class="badge badge-pass">OK</span>
                                    @break
                                @case('FAIL')
                                    <span class="badge badge-fail">Not OK</span>
                                    @break
                                @case('NA')
                                    <span class="badge badge-na">Not relevant</span>
                                    @break
                                @default
                                    <span class="badge badge-empty">—</span>
                            @endswitch
                        </td>
                        <td>
                            {{ $answer?->notes ?? '' }}
                            @if($answer?->deviation)
                                <div class="deviation">
                                    <strong>Deviation:</strong>
                                    {{ $answer->deviation->title }}
                                    @if($answer->deviation->type) ({{ $answer->deviation->type }}) @endif
                                    @if($answer->deviation->responsible_person) — {{ $answer->deviation->responsible_person }} @endif
                                </div>
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endforeach

    <div class="footer">
        Generated {{ now()->format('d.m.Y H:i') }}
    </div>
</body>
</html>
