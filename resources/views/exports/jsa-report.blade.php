{{--
    Lays out the client's own "Method Statement / Risk Assessment" Word
    template: the same headings, the same Norwegian "Dato" label, and the same
    two tables. The blank rows at the end of each table are not padding for
    looks — the printed copy is carried onto site and filled in by hand, so the
    report has to work both as a digital record and as a paper form.
--}}
@php
    $logoPath = $logoPath ?? public_path('images/logo/logo.png');

    $hazards = $jsa->hazards;
    $participants = $jsa->participants;

    // Keep the printed form useful: always leave a few empty lines to write on.
    $hazardBlankRows = max(4, 10 - $hazards->count());

    // The signature table grows with the crew instead of being padded out to a
    // fixed height: one row per participant, plus a few spare lines for anyone
    // who joins the job after the JSA was printed. A long crew is allowed to
    // run onto a second page.
    $participantSpareRows = 3;
    $participantBlankRows = $participantSpareRows;

    $fmtDate = fn ($date) => $date ? $date->format('d.m.Y') : '';
@endphp
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $jsa->jsa_no }} - {{ $jsa->title }}</title>
    <style>
        @page { margin: 28px 32px; }
        body { font-family: sans-serif; font-size: 11px; color: #222; }

        .header { margin-bottom: 10px; }
        .header img { max-height: 46px; max-width: 170px; }

        h1 { font-size: 18px; margin: 10px 0 10px 0; }

        table.meta { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        table.meta td { border: 1px solid #c8c8c8; padding: 5px 7px; vertical-align: top; }
        table.meta td.label { background: #f4f4f4; font-weight: bold; width: 90px; white-space: nowrap; }

        .description { border: 1px solid #c8c8c8; padding: 7px; margin-bottom: 14px; }
        .description .label { font-weight: bold; margin-bottom: 3px; }

        table.grid { width: 100%; border-collapse: collapse; }
        table.grid th, table.grid td { border: 1px solid #c8c8c8; padding: 5px 7px; vertical-align: top; }
        table.grid th { background: #f4f4f4; font-weight: bold; text-align: left; }
        table.grid td.num { width: 24px; text-align: center; color: #555; }
        table.grid tr.blank td { height: 24px; }

        h2 { font-size: 13px; margin: 16px 0 6px 0; }

        table.signatures { width: 100%; border-collapse: collapse; }
        table.signatures th, table.signatures td { border: 1px solid #c8c8c8; padding: 5px 7px; }
        table.signatures th { background: #f4f4f4; font-weight: bold; text-align: left; }
        table.signatures td.name-col { width: 34%; }
        table.signatures td.date-col { width: 20%; }
        table.signatures tr.blank td { height: 26px; }
        .signed { color: #1f6f3f; }
        .signed .mark { font-weight: bold; }
        .signed .when { font-size: 10px; color: #3b6f52; }
        .paper-note { font-size: 10px; color: #555; }

        .footer-note { margin-top: 14px; font-size: 9px; color: #777; }
    </style>
</head>
<body>

{{-- The client's template carries the logo alone in the header; the logo
     already spells out the company name, so nothing is printed beside it. --}}
<div class="header">
    @if(file_exists($logoPath))
        <img src="{{ $logoPath }}" alt="Logo">
    @endif
</div>

<h1>Job Safety Analysis (JSA)</h1>

<table class="meta">
    <tr>
        <td class="label">JSA Name:</td>
        <td>{{ $jsa->title }}</td>
        <td class="label">JSA No.:</td>
        <td>{{ $jsa->jsa_no }}</td>
    </tr>
    <tr>
        <td class="label">Project:</td>
        <td>{{ $jsa->project ? trim($jsa->project->project_no . ' ' . $jsa->project->name) : '' }}</td>
        <td class="label">Dato:</td>
        <td>{{ $fmtDate($jsa->jsa_date) }}</td>
    </tr>
    <tr>
        <td class="label">Location:</td>
        <td>{{ $jsa->work_location }}</td>
        <td class="label">JSA Leader:</td>
        <td>{{ optional($jsa->leader)->name }}</td>
    </tr>
</table>

<div class="description">
    <div class="label">Description:</div>
    <div>{!! nl2br(e($jsa->description)) !!}</div>
</div>

<table class="grid">
    <thead>
        <tr>
            <th class="num">#</th>
            <th style="width: 26%;">Work Type</th>
            <th style="width: 37%;">Hazards</th>
            <th>Control Measures</th>
        </tr>
    </thead>
    <tbody>
        @foreach($hazards as $index => $hazard)
            <tr>
                <td class="num">{{ $index + 1 }}</td>
                <td>{{ $hazard->work_type }}</td>
                <td>{!! nl2br(e($hazard->hazard)) !!}</td>
                <td>{!! nl2br(e($hazard->control)) !!}</td>
            </tr>
        @endforeach

        @for($i = 0; $i < $hazardBlankRows; $i++)
            <tr class="blank">
                <td class="num">{{ $hazards->count() + $i + 1 }}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        @endfor
    </tbody>
</table>

<h2>I have read and understood the content</h2>

<table class="signatures">
    <thead>
        <tr>
            <th class="name-col">Name</th>
            <th class="date-col">Dato</th>
            <th>Signature</th>
        </tr>
    </thead>
    <tbody>
        @foreach($participants as $participant)
            <tr>
                <td class="name-col">{{ $participant->name }}</td>
                <td class="date-col">{{ $participant->signed_at ? $participant->signed_at->format('d.m.Y') : '' }}</td>
                <td>
                    @if($participant->signature_status === 'signed_in_app')
                        <span class="signed">
                            <span class="mark">Digitally signed</span>
                            <span class="when">{{ $participant->signed_at->format('d.m.Y') }} at {{ $participant->signed_at->format('H:i') }}</span>
                        </span>
                    @elseif($participant->signature_status === 'signed_on_paper')
                        <span class="paper-note">Signed on paper</span>
                    @endif
                </td>
            </tr>
        @endforeach

        {{-- Room for anyone who joins the job after the JSA was printed. --}}
        @for($i = 0; $i < $participantBlankRows; $i++)
            <tr class="blank">
                <td class="name-col"></td>
                <td class="date-col"></td>
                <td></td>
            </tr>
        @endfor
    </tbody>
</table>

<div class="footer-note">
    {{ $jsa->jsa_no }} &middot; Generated {{ now()->format('d.m.Y H:i') }}
</div>

</body>
</html>
