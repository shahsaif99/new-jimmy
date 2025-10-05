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

        // Sort by category relation
        $documents = $documents->sortBy(function ($item) {
            return $item->subcategory ? $item->subcategory->number : 0;
        });

        // Group by main category first and then subcategory
        $documents = $documents->groupBy(function ($item) {
            $categoryNumber = $item->category ? $item->category->number : 0;
            $categoryName = $item->category ? $item->category->name : 'Unknown';
            return $categoryNumber . '-' . $categoryName;
        })->map(function ($item) {
            return $item->groupBy(function ($item) {
                $subcategoryNumber = $item->subcategory ? $item->subcategory->number : 0;
                $subcategoryName = $item->subcategory ? $item->subcategory->name : 'Unknown';
                $categoryNumber = $item->category ? $item->category->number : 0;
                return $categoryNumber . '' . $subcategoryNumber . '-' . $subcategoryName;
            });
        });

        // Sort the grouped documents based on title count
        $documents = $documents->sortBy(function ($item, $key) {
            // Extract the numeric part of the title for sorting
            preg_match('/^(\d+)/', $key, $matches);
            return isset($matches[1]) ? (int)$matches[1] : PHP_INT_MAX; // Sort by numeric value or max if not found
        });

        $data = $this->getDocuments($documents->toArray());

        return $data;
    }

    // Create new array with title and documents as array of documents recursively
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
                if (!is_int($key)) {
                    $data[] = [
                        'title' => $key,
                        'documents' => $value,
                    ];
                } else {
                    if ($count < 10) {
                        $count = '0' . $count;
                    }

                    // Extract document type first letter
                    $type = substr($value['type'], 0, 1);

                    $categoryNumber = $value['category']['number'] ?? 'Unknown';
                    $subcategoryNumber = $value['subcategory']['number'] ?? 'Unknown';

                    $value['docId'] = $categoryNumber . $subcategoryNumber . '-' . $count . '-' . $type;
                    $data[] = $value;
                }
            }

            $count++;
        }

        return $data;
    }

    public function search(Request $request)
    {
        $searchWord = $request->input('q');
        $tags = $request->input('tags', []); // Get tags from the request, default to an empty array if not present

        $request->validate([
            'q' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'integer',
        ]);

        $documentsQuery = Document::query()
            ->with('category', 'subcategory');

        if (!empty($tags)) {
            $documentsQuery->where(function ($query) use ($tags) {
                foreach ($tags as $tag) {
                    $query->orWhereRaw("JSON_CONTAINS(tag_ids, ?)", ['{"id": ' . intval($tag) . '}']);
                }
            });
        }

        if (!empty($searchWord)) {
            $documentsQuery->where(function ($query) use ($searchWord) {
                $query->where('title', 'LIKE', '%' . $searchWord . '%')
                    ->orWhere('content', 'LIKE', '%' . $searchWord . '%');
            });
        }

        // Get the documents matching the query
        $documents = $documentsQuery->get();

        // Add content and title hit counts to each document
        $documents->each(function ($document) use ($searchWord) {
            $lowerSearchWord = strtolower($searchWord);
            $document->content_hits = !empty($searchWord) ? substr_count(strtolower(strip_tags($document->content)), $lowerSearchWord) : 0;
            $document->title_hits = !empty($searchWord) ? substr_count(strtolower($document->title), $lowerSearchWord) : 0;
        });

        // Sort documents by subcategory number with null check
        $documents = $documents->sortBy(function ($item, $key) {
            return $item->subcategory ? $item->subcategory->number : 0;
        });

        // Group documents by main category first and then subcategory
        $documents = $documents->groupBy(function ($item, $key) {
            $categoryNumber = $item->category ? $item->category->number : 0;
            $categoryName = $item->category ? $item->category->name : 'Unknown';
            return $categoryNumber . '-' . $categoryName;
        })->map(function ($item, $key) {
            return $item->groupBy(function ($item, $key) {
                $subcategoryNumber = $item->subcategory ? $item->subcategory->number : 0;
                $subcategoryName = $item->subcategory ? $item->subcategory->name : 'Unknown';
                $categoryNumber = $item->category ? $item->category->number : 0;
                return $categoryNumber . '' . $subcategoryNumber . '-' . $subcategoryName;
            });
        });

        // Format and prepare the documents for JSON response
        $data = $this->getDocuments($documents->toArray());

        // Sort data by title alphabetically
        usort($data, function ($a, $b) {
            return $a['title'] <=> $b['title'];
        });

        // Return the formatted data as JSON response
        return response()->json($data);
    }


    public function searchDocuments($documents)
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
                if (!is_int($key)) {
                    $data[] = [
                        'title' => $key,
                        'documents' => $value,
                    ];
                } else {
                    if ($count < 10) {
                        $count = '0' . $count;
                    }

                    $type = substr($value['type'], 0, 1);
                    $value['docId'] = $value['category']['number'] . $value['subcategory']['number'] . '-' . $count . '-' . $type;
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
