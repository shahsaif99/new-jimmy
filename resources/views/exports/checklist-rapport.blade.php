<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Checklist Rapport - {{ $userChecklist->title ?? $userChecklist->checklist?->name }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        h1 { font-size: 22px; margin: 0 0 4px 0; }
        h2 { font-size: 14px; margin: 18px 0 6px 0; padding-bottom: 4px; border-bottom: 1px solid #ddd; }
        .submission-code { color: #c0392b; font-weight: 600; font-size: 13px; margin-bottom: 8px; }
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
        .header-row { width: 100%; margin-bottom: 8px; }
        .header-row td { vertical-align: middle; padding: 0; }
        .header-row .title-cell h1 { margin: 0; }
        .header-row .logo-cell { text-align: right; width: 160px; }
        .header-row .logo-cell img { max-height: 42px; max-width: 150px; }
        .deviation-summary { margin: 8px 0 14px 0; padding: 10px 12px; border: 1px solid #b8e0c2; background: #f1faf3; font-size: 12px; }
        .deviation-summary .label-icon { color: #2e7d4a; font-weight: 700; margin-right: 6px; }
        .deviation-summary table { width: 100%; }
        .deviation-summary td { padding: 2px 8px; }
        .deviation-summary .ds-title { font-weight: 700; color: #2e7d4a; }
        .deviation-summary .ds-stat { font-weight: 700; }
        .deviation-summary .ds-total { color: #333; }
        .deviation-summary .ds-open { color: #c9a227; }
        .deviation-summary .ds-closed { color: #2e7d4a; }
        .deviation-card {
            margin-top: 6px;
            padding: 8px 10px;
            border-radius: 4px;
            font-size: 11px;
        }
        .deviation-card.open { background: #fff7e1; border: 1px solid #f6c343; color: #6a4d00; }
        .deviation-card.closed { background: #e8f6ec; border: 1px solid #6dbf85; color: #14532b; }
        .deviation-card .dc-head { width: 100%; }
        .deviation-card .dc-head td { padding: 0; vertical-align: middle; }
        .deviation-card .dc-id { font-weight: 700; font-size: 11px; letter-spacing: 0.02em; }
        .deviation-card .dc-pill { font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 999px; letter-spacing: 0.04em; }
        .deviation-card.open .dc-pill { background: #f6c343; color: #5a3a06; }
        .deviation-card.closed .dc-pill { background: #6dbf85; color: #0c3915; }
        .deviation-card .dc-row { padding: 1px 0; line-height: 1.5; }
        .deviation-card .dc-label { font-weight: 700; }
        .deviation-card .dc-body { line-height: 1.45; padding: 1px 0 2px; }
        .deviation { margin-top: 4px; padding: 4px 8px; background: #fff7e6; border-left: 3px solid #ff9f43; font-size: 11px; }
        .attachments-page { page-break-before: always; }
        .attachment-card {
            border: 1px solid #333;
            background: #fff;
            color: #000;
            padding: 10px;
            margin-bottom: 10px;
            border-collapse: collapse;
            width: 100%;
        }
        .attachment-card td { padding: 8px; vertical-align: top; }
        .attachment-card .photo-cell { width: 160px; }
        .attachment-card img { max-width: 150px; max-height: 150px; border: 1px solid #333; }
        .attachment-card .meta-cell { font-size: 11px; line-height: 1.6; }
        .attachment-card .meta-label { color: #000; font-weight: 600; text-decoration: underline; margin-right: 4px; }
        .footer { margin-top: 24px; font-size: 10px; color: #888; text-align: right; }
    </style>
</head>
<body>
    @php
        $code = 'S-' . str_pad((string) (1000 + $userChecklist->id), 4, '0', STR_PAD_LEFT);
        $area = is_array($userChecklist->work_location)
            ? ($userChecklist->work_location['address']
                ?? $userChecklist->work_location['location']
                ?? $userChecklist->work_location['name']
                ?? '')
            : ($userChecklist->work_location ?? '');
        $answersByUctId = $userChecklist->answers->keyBy('user_checklist_task_id');
        $answersByTplId = $userChecklist->answers->keyBy('checklist_task_id');
        $imageAnswers = $userChecklist->answers
            ->filter(fn ($a) => !empty($a->img))
            ->values();
        $deviations = $userChecklist->answers->pluck('deviation')->filter()->values();
        $deviationsClosed = $deviations->filter(fn ($d) => !empty($d->close_date) || strtolower((string) $d->status) === 'closed')->count();
        $deviationsOpen = $deviations->count() - $deviationsClosed;
        $logoPath = $logoPath ?? public_path('images/logo/logo.png');
    @endphp

    <table class="header-row">
        <tr>
            <td class="title-cell">
                <h1>Checklist Rapport</h1>
                <div class="submission-code">{{ $code }} &nbsp; {{ $userChecklist->title ?? $userChecklist->checklist?->name }}</div>
            </td>
            <td class="logo-cell">
                @if(file_exists($logoPath))
                    <img src="{{ $logoPath }}" alt="Logo">
                @endif
            </td>
        </tr>
    </table>

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
            <td>{{ $userChecklist->users->map->name->implode(', ') ?: '—' }}</td>
            <td class="label">Area</td>
            <td>{{ $area ?: '—' }}</td>
        </tr>
        <tr>
            <td class="label">Description</td>
            <td colspan="3">{{ $userChecklist->description ?: '—' }}</td>
        </tr>
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

    @if($deviations->isNotEmpty())
        <div class="deviation-summary">
            <table>
                <tr>
                    <td style="width: 38%">
                        <span class="ds-title">Deviation Summary</span>
                        <div style="font-size: 11px; color: #555; margin-top: 2px;">
                            See details for the failed item(s) below.
                        </div>
                    </td>
                    <td>
                        <span class="ds-stat ds-total">Total deviations:</span>
                        <span class="ds-stat ds-total">{{ $deviations->count() }}</span>
                    </td>
                    <td>
                        <span class="ds-stat ds-open">Open deviations:</span>
                        <span class="ds-stat ds-open">{{ $deviationsOpen }}</span>
                    </td>
                    <td>
                        <span class="ds-stat ds-closed">Closed deviations:</span>
                        <span class="ds-stat ds-closed">{{ $deviationsClosed }}</span>
                    </td>
                </tr>
            </table>
        </div>
    @endif

    @foreach($userChecklist->snapshotSections as $sIdx => $section)
        <h2>{{ ($sIdx + 1) . '. ' . $section->name }}</h2>
        <table class="tasks">
            <thead>
                <tr>
                    <th style="width: 6%">#</th>
                    <th style="width: 38%">Task</th>
                    <th style="width: 12%">Result</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                @foreach($section->tasks as $idx => $task)
                    @php $answer = $answersByUctId->get($task->id) ?? $answersByTplId->get($task->source_checklist_task_id); @endphp
                    <tr>
                        <td>{{ ($sIdx + 1) . '.' . ($idx + 1) }}</td>
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
                                @php
                                    $dev = $answer->deviation;
                                    $devClosed = !empty($dev->close_date) || strtolower((string) $dev->status) === 'closed';
                                    $devCode = 'DV-' . str_pad((string) $dev->id, 4, '0', STR_PAD_LEFT);
                                    $devCreated = $dev->created_at ? $dev->created_at->format('d.m.Y H:i') : '';
                                    $devClosedAt = $dev->close_date ? \Illuminate\Support\Carbon::parse($dev->close_date)->format('d.m.Y H:i') : '';
                                    $devDue = $dev->closing_deadline ? \Illuminate\Support\Carbon::parse($dev->closing_deadline)->format('d.m.Y') : '';
                                    $devClosedBy = $dev->closedBy ? trim(($dev->closedBy->first_name ?? '') . ' ' . ($dev->closedBy->last_name ?? '')) : '';
                                @endphp
                                <div class="deviation-card {{ $devClosed ? 'closed' : 'open' }}">
                                    <table class="dc-head">
                                        <tr>
                                            <td><span class="dc-id">DEVIATION {{ $devCode }}</span></td>
                                            <td style="text-align: right;"><span class="dc-pill">{{ $devClosed ? 'CLOSED' : 'OPEN' }}</span></td>
                                        </tr>
                                    </table>
                                    <div class="dc-row"><span class="dc-label">Status:</span> {{ $devClosed ? 'Closed' : 'Open' }}</div>
                                    @if($devCreated)
                                        <div class="dc-row"><span class="dc-label">Created:</span> {{ $devCreated }}</div>
                                    @endif
                                    @if($devClosed && $devClosedAt)
                                        <div class="dc-row"><span class="dc-label">Closed:</span> {{ $devClosedAt }}</div>
                                    @elseif(!$devClosed && $devDue)
                                        <div class="dc-row"><span class="dc-label">Due date:</span> {{ $devDue }}</div>
                                    @endif
                                    @if($dev->corrective_actions)
                                        <div class="dc-row"><span class="dc-label">Corrective actions:</span></div>
                                        <div class="dc-body">{{ $dev->corrective_actions }}</div>
                                    @endif
                                    @if($devClosed && $devClosedBy)
                                        <div class="dc-row"><span class="dc-label">Closed by:</span> {{ $devClosedBy }}</div>
                                    @elseif(!$devClosed && $dev->responsible_person)
                                        <div class="dc-row"><span class="dc-label">Assigned to:</span> {{ $dev->responsible_person }}</div>
                                    @endif
                                </div>
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endforeach

    @if($imageAnswers->isNotEmpty())
        <div class="attachments-page">
            <h2 style="border-bottom: 1px solid #333;">Attached photos</h2>
            @foreach($imageAnswers as $i => $answer)
                @php
                    $task = \App\Models\UserChecklistTask::find($answer->user_checklist_task_id);
                    $section = $task ? \App\Models\UserChecklistSection::find($task->user_checklist_section_id) : null;
                    $imgPath = $answer->img;
                    $absolute = $imgPath ? public_path(ltrim(str_replace('storage/', 'storage/', $imgPath), '/')) : null;
                @endphp
                <table class="attachment-card">
                    <tr>
                        <td class="photo-cell">
                            @if($absolute && file_exists($absolute))
                                <img src="{{ $absolute }}" alt="Attached photo">
                            @else
                                <span style="color: #888;">[Image unavailable]</span>
                            @endif
                        </td>
                        <td class="meta-cell">
                            <div><strong>{{ ($i + 1) . '. ' . ($task?->name ?? '(Image)') }}</strong></div>
                            <br>
                            <div>
                                <span class="meta-label">Checklist:</span>
                                {{ $code }} {{ $userChecklist->checklist?->name }}
                            </div>
                            <div>
                                <span class="meta-label">List item:</span>
                                {{ $section?->name ?? '' }} — {{ $task?->name ?? '' }}
                            </div>
                            <br>
                            <div>
                                <span class="meta-label">Uploaded by:</span>
                                {{ $answer->user?->name ?? $userChecklist->users->first()?->name ?? '—' }},
                                {{ optional($answer->updated_at)->format('d.m.Y H:i') }}
                            </div>
                        </td>
                    </tr>
                </table>
            @endforeach
        </div>
    @endif

    <div class="footer">
        Generated {{ now()->format('d.m.Y H:i') }}
    </div>
</body>
</html>
