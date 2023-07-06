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
        ->get();

        // sort by document_number

        $documents = $documents->sortBy('document_number');

        $grouped = $documents->groupBy('category', true);

        // groupby subcategory
        $grouped->transform(function($item, $key){
            return $item->groupBy('subcategory', true);
        });

        $grouped->transform(function($item, $key){
            $item->transform(function($item, $key){
                return $item->sortBy('document_number');
            });
            return $item;
        });

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
