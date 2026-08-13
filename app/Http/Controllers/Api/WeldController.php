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
        $data = $request->validated();

        if ($request->isRepair()) {
            $original = Weld::findOrFail($data['original_weld_id']);

            // A repair carries the original's weld number and is distinguished by
            // its repair number, so weld 4's first repair reads "4 R1".
            $data['weld_log_id'] = $original->weld_log_id;
            $data['weld_no'] = $original->weld_no;
            $data['repair_no'] = Weld::nextRepairNo($original);
        } else {
            $data['type'] = Weld::TYPE_WELD;
            $data['repair_no'] = 0;
        }

        $weld = Weld::create($data);

        return response()->json([
            'message' => $request->isRepair()
                ? 'Repair weld successfully registered.'
                : 'Weld successfully registered.',
            'data' => new WeldResource($weld->load('wps')),
        ], 201);
    }

    public function update(Request $request, Weld $weld)
    {
        $rules = [
            'wps_id' => ['nullable', 'exists:wps,id'],
            'welder_id' => ['sometimes', 'required', 'string', 'max:4'],
            'weld_date' => ['sometimes', 'required', 'date'],
            'visual_inspection' => ['sometimes', 'required', Rule::in(['ok', 'not_ok'])],
            'ndt_rt' => ['nullable', 'boolean'],
            'ndt_mt' => ['nullable', 'boolean'],
            'ndt_pt' => ['nullable', 'boolean'],
            'ndt_vt' => ['nullable', 'boolean'],
            'ndt_accepted' => ['nullable', Rule::in(['accepted', 'rejected'])],
        ];

        foreach (Weld::NDT_METHODS as $method) {
            $rules["ndt_{$method}_result"] = ['nullable', Rule::in(['accepted', 'rejected'])];
        }

        if ($weld->isRepair()) {
            // The weld number and repair number of an existing repair are fixed by
            // the original it belongs to; only the repair reason stays editable.
            $rules['repair_reason'] = ['sometimes', 'required', Rule::in(array_keys(Weld::REPAIR_REASONS))];
        } else {
            $rules['weld_no'] = [
                'sometimes', 'required', 'integer', 'min:1',
                Rule::unique('welds')
                    ->where('weld_log_id', $weld->weld_log_id)
                    ->where('repair_no', 0)
                    ->ignore($weld->id),
            ];
        }

        $validated = $request->validate($rules, [
            'weld_no.unique' => 'This weld number already exists in this weld log.',
        ]);

        // Renumbering an original weld has to carry its repairs with it, otherwise
        // "4 R1" would be orphaned from weld 5.
        if (!$weld->isRepair() && isset($validated['weld_no']) && $validated['weld_no'] != $weld->weld_no) {
            Weld::where('original_weld_id', $weld->id)->update(['weld_no' => $validated['weld_no']]);
        }

        $weld->update($validated);

        return response()->json([
            'message' => 'Weld successfully updated.',
            'data' => new WeldResource($weld->load('wps')),
        ]);
    }

    public function destroy(Weld $weld)
    {
        // Repairs of a repair point at the repair, not the original weld, so
        // deleting only the direct children would strand "4 R2" behind. The whole
        // repair series for this weld number goes with the weld it belongs to.
        if (!$weld->isRepair()) {
            Weld::where('weld_log_id', $weld->weld_log_id)
                ->where('weld_no', $weld->weld_no)
                ->where('id', '!=', $weld->id)
                ->delete();
        }

        $weld->delete();

        return response()->json(['message' => 'Weld successfully deleted.']);
    }
}
