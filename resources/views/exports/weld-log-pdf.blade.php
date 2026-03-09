<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Weld Log - {{ $weldLog->drawing_no }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        h1 { font-size: 18px; margin-bottom: 5px; }
        .header-info { margin-bottom: 20px; }
        .header-info p { margin: 2px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #333; padding: 5px 8px; text-align: left; font-size: 11px; }
        th { background-color: #f0f0f0; font-weight: bold; }
        .badge { padding: 2px 6px; border-radius: 3px; font-size: 10px; }
        .badge-ok { background-color: #d4edda; color: #155724; }
        .badge-not-ok { background-color: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <h1>Weld Log</h1>
    <div class="header-info">
        <p><strong>Drawing No:</strong> {{ $weldLog->drawing_no }}</p>
        <p><strong>Project:</strong> {{ $weldLog->project->project_no ?? '' }} - {{ $weldLog->project->name ?? '' }}</p>
        <p><strong>Status:</strong> {{ ucfirst(str_replace('_', ' ', $weldLog->status)) }}</p>
        @if($weldLog->ndt_required)
        <p><strong>NDT Requirements:</strong> RT: {{ $weldLog->ndt_rt }} | MT: {{ $weldLog->ndt_mt }} | PT: {{ $weldLog->ndt_pt }} | VT: {{ $weldLog->ndt_vt }}</p>
        @endif
    </div>

    <table>
        <thead>
            <tr>
                <th>Weld No.</th>
                <th>WPS</th>
                <th>ID</th>
                <th>Date</th>
                <th>Visual</th>
                <th>RT</th>
                <th>MT</th>
                <th>PT</th>
                <th>VT</th>
                <th>NDT Result</th>
            </tr>
        </thead>
        <tbody>
            @forelse($weldLog->welds as $weld)
            <tr>
                <td>{{ $weld->weld_no }}</td>
                <td>{{ $weld->wps->name ?? '-' }}</td>
                <td>{{ $weld->welder_id }}</td>
                <td>{{ $weld->weld_date->format('d-m-Y') }}</td>
                <td>
                    <span class="badge {{ $weld->visual_inspection === 'ok' ? 'badge-ok' : 'badge-not-ok' }}">
                        {{ $weld->visual_inspection === 'ok' ? 'OK' : 'Not OK' }}
                    </span>
                </td>
                <td>{{ $weld->ndt_rt ? '✓' : '' }}</td>
                <td>{{ $weld->ndt_mt ? '✓' : '' }}</td>
                <td>{{ $weld->ndt_pt ? '✓' : '' }}</td>
                <td>{{ $weld->ndt_vt ? '✓' : '' }}</td>
                <td>{{ $weld->ndt_accepted ? ucfirst($weld->ndt_accepted) : '-' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="10" style="text-align: center;">No welds registered</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
