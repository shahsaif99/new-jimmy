<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Weld\StoreRequest;
use App\Http\Resources\WeldResource;
use App\Models\Weld;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class WeldController extends Controller
{
    public function store(StoreRequest $request)
    {
        $weld = Weld::create($request->validated());

        return response()->json([
            'message' => 'Weld successfully registered.',
            'data' => new WeldResource($weld->load('wps')),
        ], 201);
    }

    public function update(Request $request, Weld $weld)
    {
        $weld->update($request->validate([
            'weld_no' => [
                'sometimes', 'required', 'integer', 'min:1',
                Rule::unique('welds')->where('weld_log_id', $weld->weld_log_id)->ignore($weld->id),
            ],
            'wps_id' => ['nullable', 'exists:wps,id'],
            'welder_id' => ['sometimes', 'required', 'string', 'max:4'],
            'weld_date' => ['sometimes', 'required', 'date'],
            'visual_inspection' => ['sometimes', 'required', Rule::in(['ok', 'not_ok'])],
            'ndt_rt' => ['nullable', 'boolean'],
            'ndt_mt' => ['nullable', 'boolean'],
            'ndt_pt' => ['nullable', 'boolean'],
            'ndt_vt' => ['nullable', 'boolean'],
            'ndt_accepted' => ['nullable', Rule::in(['accepted', 'rejected'])],
        ]));

        return response()->json([
            'message' => 'Weld successfully updated.',
            'data' => new WeldResource($weld->load('wps')),
        ]);
    }

    public function destroy(Weld $weld)
    {
        $weld->delete();

        return response()->json(['message' => 'Weld successfully deleted.']);
    }
}
