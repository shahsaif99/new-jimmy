<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SupplierEvaluationResource;
use App\Models\CustomerSupplier;
use App\Models\SupplierEvaluation;
use App\Support\SupplierEvaluationCriteria;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SupplierEvaluationController extends Controller
{
    /**
     * Evaluations for one supplier, newest first.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => ['required', 'exists:customer_suppliers,id'],
        ]);

        $evaluations = SupplierEvaluation::with('performedByUser')
            ->where('supplier_id', $validated['supplier_id'])
            ->orderByDesc('evaluation_date')
            ->orderByDesc('id')
            ->get();

        return response()->json([
            'message' => 'Supplier evaluations retrieved successfully.',
            'data' => SupplierEvaluationResource::collection($evaluations),
        ]);
    }

    /**
     * The scoring model, so the form renders the same criteria and weights the
     * server scores against.
     */
    public function criteria()
    {
        return response()->json([
            'message' => 'Evaluation criteria retrieved successfully.',
            'data' => [
                'groups' => SupplierEvaluationCriteria::GROUPS,
                'pass_mark' => SupplierEvaluationCriteria::PASS_MARK,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validated($request);

        $supplier = CustomerSupplier::findOrFail($validated['supplier_id']);

        if (!$supplier->isSupplier()) {
            return response()->json([
                'message' => 'Only suppliers can be evaluated.',
            ], 422);
        }

        $evaluation = SupplierEvaluation::create($this->attributes($validated));

        return response()->json([
            'message' => 'Supplier evaluation successfully recorded.',
            'data' => new SupplierEvaluationResource($evaluation->load('performedByUser')),
        ], 201);
    }

    public function show(SupplierEvaluation $supplierEvaluation)
    {
        return response()->json([
            'message' => 'Supplier evaluation retrieved successfully.',
            'data' => new SupplierEvaluationResource($supplierEvaluation->load('performedByUser')),
        ]);
    }

    public function update(Request $request, SupplierEvaluation $supplierEvaluation)
    {
        // The supplier an evaluation belongs to is fixed; only its contents
        // are editable.
        $validated = $this->validated($request, $supplierEvaluation->supplier_id);

        $supplierEvaluation->update($this->attributes($validated));

        return response()->json([
            'message' => 'Supplier evaluation successfully updated.',
            'data' => new SupplierEvaluationResource($supplierEvaluation->load('performedByUser')),
        ]);
    }

    public function destroy(SupplierEvaluation $supplierEvaluation)
    {
        $supplierEvaluation->delete();

        return response()->json(['message' => 'Supplier evaluation successfully deleted.']);
    }

    private function validated(Request $request, ?int $forcedSupplierId = null): array
    {
        $rules = [
            'supplier_id' => ['required', 'exists:customer_suppliers,id'],
            'evaluation_date' => ['required', 'date'],
            'performed_by' => ['nullable', 'exists:users,id'],
            'scores' => ['required', 'array'],
            // A result the assessor wants to override the calculated one.
            'status' => ['nullable', Rule::in(array_keys(SupplierEvaluation::STATUSES))],
        ];

        foreach (SupplierEvaluationCriteria::keys() as $key) {
            $rules["scores.{$key}"] = ['nullable', 'numeric', 'min:0', 'max:100'];
        }

        $validated = $request->validate($rules);

        if ($forcedSupplierId !== null) {
            $validated['supplier_id'] = $forcedSupplierId;
        }

        return $validated;
    }

    /**
     * The total is always recomputed from the individual marks — a score posted
     * by the client is never trusted.
     */
    private function attributes(array $validated): array
    {
        $scores = $validated['scores'] ?? [];
        $total = SupplierEvaluationCriteria::score($scores);

        return [
            'supplier_id' => $validated['supplier_id'],
            'evaluation_date' => $validated['evaluation_date'],
            'performed_by' => $validated['performed_by'] ?? auth()->id(),
            'total_score' => $total,
            'status' => $validated['status'] ?? SupplierEvaluationCriteria::resultFor($total),
            'evaluation_criteria' => $scores,
        ];
    }
}
