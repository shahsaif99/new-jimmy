<?php

namespace App\Http\Controllers\Api;

use App\Models\CompanyLocation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Plank\Mediable\Facades\MediaUploader;

class CompanyLocationController extends Controller
{
    /**
     * List all locations with media.
     */
    public function index()
    {
        $locations = CompanyLocation::with('media')->orderBy('id', 'desc')->get();

        $locations->each(function ($location) {
            if ($location->media) {
                $location->media->each(function ($media) {
                    $media->url = '/storage/' . $media->directory . '/' . $media->filename . '.' . $media->extension;
                });
            }
        });

        return response()->json([
            'data' => $locations,
        ]);
    }

    /**
     * Create a new location with attachments.
     */
    public function store(Request $request)
    {
        if (!auth()->user()->hasRole('Admin')) {
            return response()->json(['message' => 'You are not authorized to perform this action.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
        ]);

        $location = CompanyLocation::create($validated);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $media = MediaUploader::fromSource($file)
                    ->useOriginalFilename()
                    ->toDirectory('company/locations/' . $location->id)
                    ->upload();

                $location->attachMedia($media, 'location-attachments');
            }
        }

        return response()->json([
            'message' => 'Location created successfully.',
            'data' => $location->load('media'),
        ], 201);
    }

    /**
     * Update a location.
     */
    public function update(Request $request, $id)
    {
        if (!auth()->user()->hasRole('Admin')) {
            return response()->json(['message' => 'You are not authorized to perform this action.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
        ]);

        $location = CompanyLocation::findOrFail($id);
        $location->update($validated);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $media = MediaUploader::fromSource($file)
                    ->useOriginalFilename()
                    ->toDirectory('company/locations/' . $location->id)
                    ->upload();

                $location->attachMedia($media, 'location-attachments');
            }
        }

        $location->load('media');

        $location->media->each(function ($media) {
            $media->url = '/storage/' . $media->directory . '/' . $media->filename . '.' . $media->extension;
        });

        return response()->json([
            'message' => 'Location updated successfully.',
            'data' => $location,
        ]);
    }

    /**
     * Delete a location.
     */
    public function destroy($id)
    {
        if (!auth()->user()->hasRole('Admin')) {
            return response()->json(['message' => 'You are not authorized to perform this action.'], 403);
        }

        $location = CompanyLocation::findOrFail($id);
        $location->detachMediaTags('location-attachments');
        $location->delete();

        return response()->json([
            'message' => 'Location deleted successfully.',
        ]);
    }

    /**
     * Delete a location attachment.
     */
    public function deleteAttachment($id)
    {
        if (!auth()->user()->hasRole('Admin')) {
            return response()->json(['message' => 'You are not authorized to perform this action.'], 403);
        }

        $media = \Plank\Mediable\Media::findOrFail($id);
        $media->delete();

        return response()->json([
            'message' => 'Attachment deleted successfully.',
        ]);
    }
}
