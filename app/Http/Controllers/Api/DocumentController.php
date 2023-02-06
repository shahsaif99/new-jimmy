<?php

namespace App\Http\Controllers\Api;

use App\Models\Document;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Document\StoreRequest;

class DocumentController extends Controller
{
    //

    public function getDocuments(Request $request){

        $documents = Document::query()
        ->whereType($request->type)
        ->latest()
        ->get();

        $grouped = $documents->groupBy('category', true);

        return $grouped;
    }

    public function storeDocument(StoreRequest $request){

        Document::create($request->all());

        return response()->json([
            'message' => 'Document successfully created.',
        ], 200);
    }

    public function updateDocument(StoreRequest $request,  $documentId){

        $document = Document::findOrFail($documentId);

        $document->update($request->all());

        return response()->json([
            'message' => 'Document successfully updated.',
        ], 200);
    }
}
