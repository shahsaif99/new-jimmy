<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Competence\StoreRequest;
use App\Http\Requests\Competence\UpdateRequest;
use App\Http\Resources\CompetenceResource;
use App\Models\Competence;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Plank\Mediable\Facades\MediaUploader;
use ZipArchive;

class CompetenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->updateStatuses();
        $competences = User::query()
        ->select('id','first_name','last_name')
        ->orderBy('first_name','asc')
        ->with(['competences' => ['competence' => ['media', 'category']]])
        ->search($request->q)
        ->when($request->q, function($query) use ($request){
            $query->orWhereHas('competences', function($query) use ($request){
                $query->whereHas('competence', function($query) use ($request){
                    $query->where('name', 'like', '%' . $request->q . '%');
                });
            });
        })
        // Filter by user_id
        ->when($request->user_id, function($query) use ($request){
            $query->where('id', $request->user_id);
        })
        // Filter by competence name
        ->when($request->competence_name, function($query) use ($request){
            $query->whereHas('competences', function($query) use ($request){
                $query->whereHas('competence', function($query) use ($request){
                    $query->where('name', $request->competence_name);
                });
            });
        })
        // Filter by status
        ->when($request->status, function($query) use ($request){
            $query->whereHas('competences', function($query) use ($request){
                $query->whereHas('competence', function($query) use ($request){
                    $query->where('status', $request->status);
                });
            });
        })
        // Filter by level
        ->when($request->has('level') && $request->level !== null && $request->level !== '', function($query) use ($request){
            $query->whereHas('competences', function($query) use ($request){
                $query->whereHas('competence', function($query) use ($request){
                    $query->where('level', $request->level);
                });
            });
        })
        ->applyFilters($request)
        ->get()
        ->when($request->group, function($query){
            $query->transform(function($item, $key){
                 return [
                     'mode' => 'span',
                     'label' => $item->first_name . ' ' . $item->last_name,
                     'children' => $item->competences
                        ->transform(function($item, $key){
                            $item->user_name = $item->user->name;
                            return $item;
                        })

                 ];
             });

         });
        return CompetenceResource::collection($competences);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {


        $competence = Competence::create($request->validated());

        if($request->hasFile('files')){

            $this->uploadDocuments($request, $competence);
        }

        $employees = User::whereIn('id', json_decode($request->employees))->get();

        $competence->employees()->saveMany($employees);

        return response()->json(['message' => 'Competence successfully created.'],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Competence  $competence
     * @return \Illuminate\Http\Response
     */
    public function show(Competence $competence)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Competence  $competence
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, Competence $competence)
    {
        $data = $request->validated();
        $competence->update([
            'name' => $data['name'],
            'completed_date' => $data['completed_date'] ?? null,
            'planned_date' => $data['planned_date'] ?? null,
            'valid_until' => $data['valid_until'] ?? null,
            'level' => $data['level'] ?? null,
        ]);
        // if($data['is_planned_date']){
        //     $competence->planned_date = $data['planned_date'];
        //     $competence->save();
        // }else{
        //     $competence->planned_date = null;
        //     $competence->save();
        // }
        if($request->hasFile('files')){

            $this->uploadDocuments($request, $competence);
        }


        return response()->json(['message' => 'Competence successfully updated.'], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Competence  $competence
     * @return \Illuminate\Http\Response
     */
    public function destroy(Competence $competence)
    {
        $competence->employees()->detach();
        $competence->delete();

        return response()->json([
            'message' => 'Competence successfully deleted.',
        ], 200);
    }

    public function uploadDocuments(Request $request, Competence $competence)
    {

        foreach ($request->file('files') as $file) {
            // Save the file to the specified disk
            $media = MediaUploader::fromSource($file)
                ->useOriginalFilename()
                ->toDirectory('competence/' . $competence->id)
                ->upload();

            $competence->attachMedia($media, 'competence');
        }

        return response()->json([
            'message' => 'Competence Documents successfully uploaded.',
        ], 200);

    }
    public function updateStatuses ()
    {
       $competences = Competence::all();
        $now = now();
        foreach($competences as $competence){
            if(Carbon::parse($competence->valid_until)->diffInDays($now) <= 90){
                $competence->status = 'expiring';
            }
            if(Carbon::parse($competence->valid_until)->isFuture()){
                $competence->status = 'valid';
            }
            if(Carbon::parse($competence->valid_until)->isPast()){
                $competence->status = 'expired';
            }
            if($competence->planned_date){
                $competence->status = 'planned';
            }
            if(!$competence->valid_until && !$competence->planned_date){
                $competence->status = 'valid';
            }
            $competence->save();
        }
    }

    public function downloadFiles(Competence $competence)
    {
        $media = $competence->getMedia('competence');

        if ($media->isEmpty()) {
            return response()->json(['message' => 'No files found.'], 404);
        }

        // If only one file, download it directly
        if ($media->count() === 1) {
            $file = $media->first();
            $path = storage_path('app/public/' . $file->getDiskPath());

            if (file_exists($path)) {
                return response()->download($path, $file->filename . '.' . $file->extension);
            }

            return response()->json(['message' => 'File not found.'], 404);
        }

        // If multiple files, create a zip
        $zipFileName = 'competence_' . $competence->id . '_files_' . time() . '.zip';
        $zipPath = storage_path('app/public/temp/' . $zipFileName);

        // Create temp directory if it doesn't exist
        if (!file_exists(storage_path('app/public/temp'))) {
            mkdir(storage_path('app/public/temp'), 0755, true);
        }

        $zip = new ZipArchive;

        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            foreach ($media as $file) {
                $filePath = storage_path('app/public/' . $file->getDiskPath());
                if (file_exists($filePath)) {
                    $zip->addFile($filePath, $file->filename . '.' . $file->extension);
                }
            }
            $zip->close();

            return response()->download($zipPath, $zipFileName)->deleteFileAfterSend(true);
        }

        return response()->json(['message' => 'Failed to create zip file.'], 500);
    }
}
