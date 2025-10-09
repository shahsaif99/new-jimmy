<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomerSupplier;
use App\Models\SupplierEvaluation;
use App\Http\Requests\CustomerSupplier\StoreCustomerSupplierRequest;
use App\Http\Requests\StoreSupplierEvaluationRequest;
use App\Http\Resources\CustomerSupplierResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CustomerSupplierController extends Controller
{
    // Store a new CustomerSupplier with multiple SupplierEvaluations
    public function store(StoreCustomerSupplierRequest $request)
    {
        $validated = $request->validated();

        if (!isset($validated['status']) || is_null($validated['status'])) {
            unset($validated['status']);
        }


        return DB::transaction(function () use ($validated, $request) {
            // Create CustomerSupplier
            $customerSupplier = CustomerSupplier::create($validated);

            // Extract and insert SupplierEvaluations if provided
            $supplierEvaluationsData = $request->input('supplier_evaluation', []);
            if (!empty($supplierEvaluationsData)) {
                $customerSupplier->evaluations()->createMany($supplierEvaluationsData);
            }

            return response()->json($customerSupplier->load('evaluations'), 201);
        });
    }

    // Update an existing CustomerSupplier along with its SupplierEvaluations
    public function update(StoreCustomerSupplierRequest $request, $id)
    {
        $validated = $request->validated();

        if (!isset($validated['status']) || is_null($validated['status'])) {
            unset($validated['status']);
        }


        // Find the CustomerSupplier with evaluations
        $customerSupplier = CustomerSupplier::with('evaluations')->findOrFail($id);

        DB::transaction(function () use ($customerSupplier, $validated, $request) {
            // Update the CustomerSupplier
            $customerSupplier->update($validated);

            // Delete old evaluations
            $customerSupplier->evaluations()->delete();

            // Create new evaluations if data is provided
            $supplierEvaluationsData = $request->input('supplier_evaluation', []);
            if (!empty($supplierEvaluationsData)) {
                $customerSupplier->evaluations()->createMany($supplierEvaluationsData);
            }
        });

        return response()->json($customerSupplier->load('evaluations'), 200);
    }

    // Show a specific CustomerSupplier with its evaluations
    public function show($id)
    {
        $customerSupplier = CustomerSupplier::with('evaluations')->findOrFail($id);

        return response()->json($customerSupplier);
    }

    // Get a list of all CustomerSuppliers
    public function index(Request $request)
    {
        $query = CustomerSupplier::query();

        // Apply filters based on request parameters
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('date')) {
            $date = $request->input('date');
        
            // Ensure the date array exists and has valid start & end values
            if (is_array($date) && count($date) === 2 && strtotime($date[0]) && strtotime($date[1])) {
                $startDate = $date[0] . ' 00:00:00'; // Start of the day
                $endDate = $date[1] . ' 23:59:59';   // End of the day
        
                $query->whereBetween('created_at', [$startDate, $endDate]);
            }
        }

        if ($request->has('evaluation')) {
            $query->where('total_evaluation', $request->evaluation);
        }

        if ($request->has('system')) {
            $query->whereJsonContains('management_systems', $request->system);
        }

        if ($request->has('supplier_of')) {
            $query->whereJsonContains('supplier_of', $request->supplier_of);
        }

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%$search%");
        }

        if ($request->has('sortBy')) {
            $sortBy = $request->input('sortBy');
            $sortDesc = $request->input('sortDesc') === 'true' ? 'desc' : 'asc';
        
            $query->orderBy($sortBy, $sortDesc);
        } else {
            $query->orderBy('id', 'desc'); // Default sorting
        }
        

        // Fetch filtered results
        $customerSuppliers = $query->paginate(10);

        return response()->json([
            'customerSuppliers' => CustomerSupplierResource::collection($customerSuppliers),
            'pagination' => [
                'total' => $customerSuppliers->total(),
                'count' => $customerSuppliers->count(),
                'per_page' => $customerSuppliers->perPage(),
                'current_page' => $customerSuppliers->currentPage(),
                'total_pages' => $customerSuppliers->lastPage(),
                'has_more_pages' => $customerSuppliers->hasMorePages(),
            ]
        ]);
    }

    // Delete a specific CustomerSupplier and its SupplierEvaluations
    public function destroy($id)
    {
        $customerSupplier = CustomerSupplier::findOrFail($id);

        // Delete associated evaluations
        $customerSupplier->evaluations()->delete();

        // Delete the CustomerSupplier
        $customerSupplier->delete();

        return response()->json(null, 204);
    }
}
