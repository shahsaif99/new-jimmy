<?php

namespace App\Http\Controllers\Api;

use App\Models\Document;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Document\StoreRequest;

class DocumentController extends Controller
{
    //

    public function index(Request $request){

        $documents = Document::query()
        // ->whereType($request->type)
        ->applyFilters($request)
        ->latest()
        ->get();

        $grouped = $documents->groupBy('category', true);

        return $grouped;
    }

    public function store(StoreRequest $request){

        Document::create($request->all());

        return response()->json([
            'message' => 'Document successfully created.',
        ], 200);
    }

    public function update(StoreRequest $request,  $documentId){

        $document = Document::findOrFail($documentId);

        $document->update($request->all());

        return response()->json([
            'message' => 'Document successfully updated.',
        ], 200);
    }

     /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function destroy(Document $document)
    {
        $document->delete();

        return response()->json([
            'message' => 'Document successfully deleted.',
        ], 200);
    }
}
