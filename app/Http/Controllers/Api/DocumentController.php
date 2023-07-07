<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\StoreRequest;
use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    //

    public function index(Request $request)
    {
        $documents = Document::query()
        // ->whereType($request->type)
        ->with('category', 'subcategory')
        ->applyFilters($request)
        ->get();

        // sort by category relation
        $documents = $documents->sortBy(function ($item, $key) {
            return $item->subcategory->number;
        });
        // group by main category first and then subcategory
        $documents = $documents->groupBy(function ($item, $key) {
            return $item->category->number.'-'.$item->category->name;
        })->map(function ($item, $key) {
            return $item->groupBy(function ($item, $key) {
                // return $item->subcategory->name . ' - ' . $item->subcategory->number;
                return $item->category->number.''.$item->subcategory->number.'-'.$item->subcategory->name;
            });
        });

      
      

        // return  $documents;
        $data = $this->getDocuments($documents->toArray());

        // // sort data by title and documents recursively
        // usort($data, function ($a, $b) {
        //     return $a['title'] <=> $b['title'];
        // });

        
      

        return $data;
    }

//    create new array with title and documents as array of documents recursively
    public function getDocuments($documents)
    {
        $data = [];
        $count = 1;
        foreach ($documents as $key => $value) {
            if (is_array($value) && !is_int($key)) {

                $data[] = [
                    'title' => $key,
                    'documents' => $this->getDocuments($value),
                ];
            } else {
                // if not int then it is a string
                if ( !is_int($key)) {
                    $data[] = [
                        'title' => $key,
                        'documents' => $value,
                    ];
                }
                else {
                    // check if $key is less than 10 then add 0 in front of it else add P
                    if ($count < 10) {
                        $count = '0'.$count;
                    } 

                    // extract document type first letter
                    $type = substr($value['type'], 0, 1);

                    $value['docId'] = $value['category']['number']. $value['subcategory']['number'] . '-' . $count.'-'.$type;
                    $data[] = $value;
                }


               
            }

            $count++;
        }

        return $data;
    }

    

    public function store(StoreRequest $request)
    {
        Document::create($request->all());

        return response()->json([
            'message' => 'Document successfully created.',
        ], 200);
    }

    public function update(StoreRequest $request, $documentId)
    {
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
