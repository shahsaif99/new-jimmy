<?php

namespace App\Http\Controllers\Api;

use App\Traits\Upload;
use App\Models\CompanyInformation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Plank\Mediable\Facades\MediaUploader;

class CompanyInformationController extends Controller
{
    /**
     * Get company information (single record).
     */
    public function show()
    {
        $company = CompanyInformation::with('media')->first();

        if ($company && $company->media) {
            $company->media->each(function ($media) {
                $media->url = '/storage/' . $media->directory . '/' . $media->filename . '.' . $media->extension;
            });
        }

        return response()->json([
            'data' => $company,
        ]);
    }

    /**
     * Update company information (admin only).
     */
    public function update(Request $request)
    {
        if (!auth()->user()->hasRole('Admin')) {
            return response()->json(['message' => 'You are not authorized to perform this action.'], 403);
        }

        $validated = $request->validate([
            'legal_name' => 'nullable|string|max:255',
            'display_name' => 'nullable|string|max:255',
            'org_number' => 'nullable|string|max:255',
            'duns_number' => 'nullable|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
            'postal_address' => 'nullable|string|max:255',
            'visiting_address' => 'nullable|string|max:255',
            'additional_information' => 'nullable|string',
        ]);

        $company = CompanyInformation::first();

        if ($company) {
            $company->update($validated);
        } else {
            $company = CompanyInformation::create($validated);
        }

        return response()->json([
            'message' => 'Company information updated successfully.',
            'data' => $company,
        ]);
    }

    /**
     * Upload/update company logo.
     */
    public function uploadLogo(Request $request)
    {
        if (!auth()->user()->hasRole('Admin')) {
            return response()->json(['message' => 'You are not authorized to perform this action.'], 403);
        }

        $request->validate([
            'logo' => 'required|string',
        ]);

        $company = CompanyInformation::first();

        if (!$company) {
            $company = CompanyInformation::create([]);
        }

        // Delete old logo if exists
        if ($company->logo) {
            Storage::disk('public')->delete('company/' . $company->logo);
        }

        $avatar = Upload::uploadBase64Avatar($request->logo, 'company');
        $company->update(['logo' => $avatar]);

        return response()->json([
            'message' => 'Logo uploaded successfully.',
            'data' => $company,
        ]);
    }

    /**
     * Upload documents/declarations.
     */
    public function uploadDocuments(Request $request)
    {
        if (!auth()->user()->hasRole('Admin')) {
            return response()->json(['message' => 'You are not authorized to perform this action.'], 403);
        }

        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file',
            'title' => 'nullable|string|max:255',
        ]);

        $company = CompanyInformation::first();

        if (!$company) {
            $company = CompanyInformation::create([]);
        }

        $title = $request->input('title');

        foreach ($request->file('files') as $file) {
            $media = MediaUploader::fromSource($file)
                ->useOriginalFilename()
                ->toDirectory('company/documents')
                ->upload();

            if ($title) {
                $media->title = $title;
                $media->save();
            }

            $company->attachMedia($media, 'company-documents');
        }

        return response()->json([
            'message' => 'Documents uploaded successfully.',
        ]);
    }

    /**
     * Delete a document.
     */
    public function deleteDocument($id)
    {
        if (!auth()->user()->hasRole('Admin')) {
            return response()->json(['message' => 'You are not authorized to perform this action.'], 403);
        }

        $media = \Plank\Mediable\Media::findOrFail($id);
        $media->delete();

        return response()->json([
            'message' => 'Document deleted successfully.',
        ]);
    }
}
