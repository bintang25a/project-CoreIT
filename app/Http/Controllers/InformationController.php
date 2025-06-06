<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\Information;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class InformationController extends Controller
{
    public function index()
    {
        $informations = Information::with('mainImage', 'bodyImage')->get();

        return response()->json([
            "success" => true,
            "message" => "Get all News",
            "data" => $informations
        ], 200);
    }

    public function show(string $id)
    {
        $information = Information::with('mainImage', 'bodyImage')->find($id);

        if ($information) {
            return response()->json([
                'success' => true,
                'message' => 'Show news id ' . $id,
                'data' => $information
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'News not found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'main_image' => 'required|image|mimes:jpeg,jpg,png|max:4096',
            'body_image' => 'required|image|mimes:jpeg,jpg,png|max:4096',
            'paragraph_1' => 'required|string',
            'paragraph_2' => 'required|string',
            'paragraph_3' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $mainImage = $request->file('main_image');
        $filename = $mainImage->hashName();
        $mainImage->storeAs('galleries', $filename, 'public');
        $mainGallery = Gallery::create([
            'name' => $request->title,
            'category' => 'news',
            'path' => $filename,
        ]);

        $bodyImage = $request->file('body_image');
        $filename = $bodyImage->hashName();
        $bodyImage->storeAs('galleries', $filename, 'public');
        $bodyGallery = Gallery::create([
            'name' => $request->title,
            'category' => 'news',
            'path' => $filename,
        ]);

        $information = Information::create([
            'title' => $request->title,
            'main_image_id' => $mainGallery->id,
            'body_image_id' => $bodyGallery->id,
            'paragraph_1' => $request->paragraph_1,
            'paragraph_2' => $request->paragraph_2,
            'paragraph_3' => $request->paragraph_3,
        ]);

        if ($information) {
            return response()->json([
                'success' => true,
                'message' => 'News added successfully',
                'data' => $information
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'News added failed'
        ], 409);
    }

    public function update(string $id, Request $request)
    {
        $information = Information::find($id);

        if (!$information) {
            return response()->json([
                'success' => false,
                'message' => 'News not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'main_image' => 'nullable|image|mimes:jpeg,jpg,png|max:4096',
            'body_image' => 'nullable|image|mimes:jpeg,jpg,png|max:4096',
            'paragraph_1' => 'required|string',
            'paragraph_2' => 'required|string',
            'paragraph_3' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'title' => $request->title,
            'paragraph_1' => $request->paragraph_1,
            'paragraph_2' => $request->paragraph_2,
            'paragraph_3' => $request->paragraph_3,
        ];

        if ($request->hasFile('main_image')) {
            $mainGallery = Gallery::find($information->main_image_id);

            $mainImage = $request->file('main_image');
            $mainImage->store('galleries', 'public');

            if ($mainGallery->path) {
                Storage::disk('public')->delete('galleries/' . $mainGallery->path);
            }

            $dataImage = [
                'name' => $request->title,
                'path' => $mainImage->hashName()
            ];

            $mainGallery->update($dataImage);
        }

        if ($request->hasFile('body_image')) {
            $bodyGallery = Gallery::find($information->body_image_id);

            $bodyImage = $request->file('body_image');
            $bodyImage->store('galleries', 'public');

            if ($bodyGallery->path) {
                Storage::disk('public')->delete("galleries/" . $bodyGallery->path);
            }

            $dataImage = [
                'name' => $request->title,
                'path' => $bodyImage->hashName(),
            ];

            $bodyGallery->update($dataImage);
        }

        $information->update($data);

        return response()->json([
            'success' => true,
            'message' => 'News update successfully',
            'data' => $information
        ], 200);
    }

    public function destroy(string $id)
    {
        $information = Information::find($id);

        if ($information) {
            $mainImage = Gallery::find($information->main_image_id);
            if ($mainImage) {
                Storage::disk('public')->delete("galleries/" . $mainImage->path);
                $mainImage->delete();
            }

            $bodyImage = Gallery::find($information->body_image_id);
            if ($bodyImage) {
                Storage::disk('public')->delete("galleries/" . $bodyImage->path);
                $bodyImage->delete();
            }

            $information->delete();

            return response()->json([
                'success' => true,
                'message' => 'News delete successfully'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'News not found, Delete failed'
            ], 404);
        }
    }
}
