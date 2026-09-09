<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerSupplier\StoreCustomerSupplierRequest;
use App\Http\Resources\CustomerSupplierResource;
use App\Models\CustomerSupplier;
use App\Models\CustomerSupplierDocument;
use App\Models\SupplierEvaluation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CustomerSupplierController extends Controller
{
    /** Columns the overview may be sorted by, mapped to their SQL expression. */
    private const SORTABLE = [
        'name' => 'customer_suppliers.name',
        'type' => 'customer_suppliers.type',
        'organization_number' => 'customer_suppliers.organization_number',
        'contact_person' => 'customer_suppliers.contact_person',
        'email' => 'customer_suppliers.email',
        'evaluation_status' => 'evaluation_status_sql',
        'latest_score' => 'latest_eval.total_score',
        'latest_evaluation_date' => 'latest_eval.evaluation_date',
        'created_at' => 'customer_suppliers.created_at',
    ];

    public function store(StoreCustomerSupplierRequest $request)
    {
        $validated = $request->validated();

        if (!isset($validated['status']) || is_null($validated['status'])) {
            unset($validated['status']);
        }

        return DB::transaction(function () use ($validated, $request) {
            $customerSupplier = CustomerSupplier::create($this->normalise($validated));

            // Evaluations staged in the create form, before the supplier had an id.
            $staged = $this->stagedEvaluations($request);
            if (!empty($staged)) {
                $customerSupplier->evaluations()->createMany($staged);
            }

            $this->storeDocuments($request, $customerSupplier);
            $customerSupplier->recomputeNextEvaluationDate();

            return response()->json([
                'message' => 'Customer/Supplier successfully created.',
                'data' => new CustomerSupplierResource(
                    $customerSupplier->load(['evaluations.performedByUser', 'documents', 'customerManager', 'latestEvaluation'])
                ),
            ], 201);
        });
    }

    public function update(StoreCustomerSupplierRequest $request, $id)
    {
        $validated = $request->validated();

        if (!isset($validated['status']) || is_null($validated['status'])) {
            unset($validated['status']);
        }

        $customerSupplier = CustomerSupplier::findOrFail($id);

        DB::transaction(function () use ($customerSupplier, $validated, $request) {
            $customerSupplier->update($this->normalise($validated));

            // Evaluations are their own records with their own endpoints. This
            // used to delete and recreate them on every save, which threw away
            // the history the evaluation status is derived from.
            $this->storeDocuments($request, $customerSupplier);

            // Switching the evaluate flag or the interval moves the due date.
            $customerSupplier->recomputeNextEvaluationDate();
        });

        return response()->json([
            'message' => 'Customer/Supplier successfully updated.',
            'data' => new CustomerSupplierResource(
                $customerSupplier->fresh()->load(['evaluations.performedByUser', 'documents', 'customerManager', 'latestEvaluation'])
            ),
        ]);
    }

    public function show($id)
    {
        $customerSupplier = CustomerSupplier::with([
            'evaluations' => fn ($q) => $q->with('performedByUser')->orderByDesc('evaluation_date')->orderByDesc('id'),
            'documents',
            'customerManager',
            'latestEvaluation',
        ])->findOrFail($id);

        return response()->json([
            'message' => 'Customer/Supplier retrieved successfully.',
            'data' => new CustomerSupplierResource($customerSupplier),
        ]);
    }

    public function index(Request $request)
    {
        $query = $this->filtered($request);

        $perPage = (int) $request->input('perPage', 10);
        $customerSuppliers = $query->paginate($perPage > 0 ? $perPage : 10);

        return response()->json([
            'customerSuppliers' => CustomerSupplierResource::collection($customerSuppliers),
            'pagination' => [
                'total' => $customerSuppliers->total(),
                'count' => $customerSuppliers->count(),
                'per_page' => $customerSuppliers->perPage(),
                'current_page' => $customerSuppliers->currentPage(),
                'total_pages' => $customerSuppliers->lastPage(),
                'has_more_pages' => $customerSuppliers->hasMorePages(),
            ],
        ]);
    }

    /**
     * The overview as a CSV. Exports everything the current filters match,
     * not just the page on screen.
     */
    public function export(Request $request): StreamedResponse
    {
        $rows = $this->filtered($request)->limit(5000)->get();
        $filename = 'customers-suppliers-' . now()->format('Y-m-d') . '.csv';

        return response()->streamDownload(function () use ($rows) {
            $out = fopen('php://output', 'w');

            // Excel opens UTF-8 correctly only when the file announces itself;
            // without this the Norwegian characters in company names break.
            fwrite($out, "\xEF\xBB\xBF");

            fputcsv($out, [
                'Name', 'Type / Role', 'Status', 'Organization Number', 'Contact Person',
                'Email', 'Telephone', 'Address', 'Postal Code', 'Place',
                'Customer Manager', 'Evaluation Status', 'Score', 'Latest Evaluation',
                'Next Evaluation', 'Evaluation Interval (months)', 'Management Systems', 'Supplier Of',
            ]);

            foreach ($rows as $row) {
                $status = $row->evaluation_status_sql ?? $row->evaluation_status;

                fputcsv($out, [
                    $row->name,
                    $this->typeLabel($row->type),
                    $row->is_active ? 'Active' : 'Deactivated',
                    $row->organization_number,
                    $row->contact_person,
                    $row->email,
                    $row->telephone_number,
                    $row->address,
                    $row->postal_code,
                    $row->place,
                    optional($row->customerManager)->name,
                    CustomerSupplier::EVALUATION_STATUSES[$status] ?? '',
                    $row->latest_score,
                    $row->latest_evaluation_date,
                    optional($row->next_evaluation_date)->toDateString(),
                    $row->evaluation_interval_months,
                    implode(', ', $row->management_systems ?? []),
                    implode(', ', array_map([$this, 'supplierOfLabel'], $row->supplier_of ?? [])),
                ]);
            }

            fclose($out);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function destroy($id)
    {
        $customerSupplier = CustomerSupplier::with('documents')->findOrFail($id);

        foreach ($customerSupplier->documents as $document) {
            if (Storage::disk('public')->exists($document->file_path)) {
                Storage::disk('public')->delete($document->file_path);
            }
        }

        $customerSupplier->documents()->delete();
        $customerSupplier->evaluations()->delete();
        $customerSupplier->delete();

        return response()->json(null, 204);
    }

    /**
     * Unchanged shape for the Suppliers report tab, which reads this endpoint.
     */
    public function getSupplierEvaluations(Request $request)
    {
        $query = SupplierEvaluation::with(['supplier', 'performedByUser']);

        if ($request->has('year')) {
            $query->whereYear('evaluation_date', $request->input('year'));
        }

        $evaluations = $query->orderBy('evaluation_date', 'desc')->get();

        $allSuppliers = CustomerSupplier::where('type', 'supplier')->orWhere('type', 'both')->get();

        return response()->json([
            'evaluations' => $evaluations->map(function ($evaluation) {
                return [
                    'id' => $evaluation->id,
                    'supplier_id' => $evaluation->supplier_id,
                    'supplier' => $evaluation->supplier ? [
                        'id' => $evaluation->supplier->id,
                        'name' => $evaluation->supplier->name,
                        'type' => $evaluation->supplier->type,
                        'management_systems' => $evaluation->supplier->management_systems,
                        'supplier_of' => $evaluation->supplier->supplier_of,
                        'status' => $evaluation->supplier->status,
                    ] : null,
                    'performed_by' => $evaluation->performed_by,
                    'performed_by_name' => optional($evaluation->performedByUser)->name,
                    'evaluation_date' => $evaluation->evaluation_date,
                    'total_score' => $evaluation->total_score,
                    'status' => $evaluation->status,
                    'evaluation_criteria' => $evaluation->evaluation_criteria,
                    'created_at' => $evaluation->created_at,
                ];
            }),
            'suppliers' => $allSuppliers->map(function ($supplier) {
                return [
                    'id' => $supplier->id,
                    'name' => $supplier->name,
                    'type' => $supplier->type,
                    'management_systems' => $supplier->management_systems,
                    'supplier_of' => $supplier->supplier_of,
                    'status' => $supplier->status,
                ];
            }),
        ]);
    }

    public function deleteDocument($id)
    {
        $document = CustomerSupplierDocument::findOrFail($id);

        if (Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return response()->json(['message' => 'Document deleted successfully'], 200);
    }

    /**
     * Shared by the overview and the export so both honour the same filters.
     */
    private function filtered(Request $request)
    {
        $query = CustomerSupplier::withEvaluationStatus()->with(['customerManager', 'documents']);

        // "Supplier" means anything that supplies, so records typed as both
        // belong in either list rather than only under "Customer & Supplier".
        if ($type = $request->input('type')) {
            if ($type === CustomerSupplier::TYPE_CUSTOMER) {
                $query->whereIn('customer_suppliers.type', [CustomerSupplier::TYPE_CUSTOMER, CustomerSupplier::TYPE_BOTH]);
            } elseif ($type === CustomerSupplier::TYPE_SUPPLIER) {
                $query->whereIn('customer_suppliers.type', [CustomerSupplier::TYPE_SUPPLIER, CustomerSupplier::TYPE_BOTH]);
            } else {
                $query->where('customer_suppliers.type', $type);
            }
        }

        if ($status = $request->input('evaluation_status')) {
            // The derived status is an expression, not a column, so the filter
            // has to repeat it rather than reference the select alias.
            $query->whereRaw('(' . CustomerSupplier::evaluationStatusSql() . ') = ?', [$status]);
        }

        if (!is_null($request->input('is_active')) && $request->input('is_active') !== '') {
            $query->where('customer_suppliers.is_active', filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        if ($system = $request->input('system')) {
            $query->whereJsonContains('management_systems', $system);
        }

        if ($supplierOf = $request->input('supplier_of')) {
            $query->whereJsonContains('supplier_of', $supplierOf);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('customer_suppliers.name', 'like', "%{$search}%")
                    ->orWhere('customer_suppliers.organization_number', 'like', "%{$search}%")
                    ->orWhere('customer_suppliers.email', 'like', "%{$search}%")
                    ->orWhere('customer_suppliers.contact_person', 'like', "%{$search}%");
            });
        }

        $date = $request->input('date');
        if (is_array($date) && count($date) === 2 && strtotime($date[0]) && strtotime($date[1])) {
            $query->whereBetween('customer_suppliers.created_at', [$date[0] . ' 00:00:00', $date[1] . ' 23:59:59']);
        }

        $sortBy = $request->input('sortBy', 'name');
        $column = self::SORTABLE[$sortBy] ?? self::SORTABLE['name'];
        $direction = $request->input('sortDesc') === 'true' ? 'desc' : 'asc';

        return $query->orderByRaw("{$column} {$direction}");
    }

    /**
     * Evaluation settings only mean something for suppliers, and an interval
     * without the flag set would silently drive the due date.
     */
    private function normalise(array $validated): array
    {
        $type = $validated['type'] ?? null;
        $isSupplier = in_array($type, [CustomerSupplier::TYPE_SUPPLIER, CustomerSupplier::TYPE_BOTH], true);

        if (!$isSupplier) {
            $validated['should_be_evaluated'] = false;
            $validated['evaluation_interval_months'] = null;
        } elseif (empty($validated['should_be_evaluated'])) {
            $validated['should_be_evaluated'] = false;
            $validated['evaluation_interval_months'] = null;
        }

        return $validated;
    }

    /** The stored slug is not something to put in front of a reader. */
    private function supplierOfLabel(string $value): string
    {
        return [
            'comprehensive_service' => 'Comprehensive service',
            'hiring_of_personnel' => 'Hiring of personnel',
            'subcontractors' => 'Subcontractors',
            'delivery_of_non_critical_goods' => 'Delivery of non-critical goods',
            'delivery_of_critical_goods_components' => 'Delivery of critical goods/components',
        ][$value] ?? $value;
    }

    private function typeLabel(?string $type): string
    {
        return [
            CustomerSupplier::TYPE_CUSTOMER => 'Customer',
            CustomerSupplier::TYPE_SUPPLIER => 'Supplier',
            CustomerSupplier::TYPE_BOTH => 'Customer & Supplier',
        ][$type] ?? (string) $type;
    }

    private function stagedEvaluations(Request $request): array
    {
        $staged = $request->input('supplier_evaluation', []);

        if (is_string($staged)) {
            $staged = json_decode($staged, true) ?: [];
        }

        return is_array($staged) ? $staged : [];
    }

    private function storeDocuments(Request $request, CustomerSupplier $customerSupplier): void
    {
        if (!$request->hasFile('documents')) {
            return;
        }

        foreach ($request->file('documents') as $file) {
            // The stored name used to be time() plus the original filename, so
            // two files uploaded in the same second under one name resolved to
            // the same path: the second silently overwrote the first, and
            // deleting either removed the file the other still pointed at.
            // Laravel's own hashed name is unique per file, and keeps a
            // caller-supplied filename out of the path entirely. The name the
            // user sees is preserved separately.
            $filePath = $file->store('customer_supplier_documents', 'public');

            $customerSupplier->documents()->create([
                'file_name' => $file->getClientOriginalName(),
                'file_path' => $filePath,
                'file_type' => $file->getClientMimeType(),
                'file_size' => $file->getSize(),
            ]);
        }
    }
}
