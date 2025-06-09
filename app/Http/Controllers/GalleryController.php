<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\Information;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::with('staff', 'informationMainImage', 'informationBodyImage')->get();

        return response()->json([
            "success" => true,
            "message" => "Get all Images",
            "data" => $galleries
        ], 200);
    }

    public function show(string $id)
    {
        $gallery = Gallery::with('staff', 'informationMainImage', 'informationBodyImage')->find($id);

        if ($gallery) {
            return response()->json([
                'success' => true,
                'message' => 'Show image id ' . $id,
                'data' => $gallery
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Image not found'
            ], 404);
        }
    }

    public function showImage(string $path)
    {
        $gallery = Gallery::where('path', 'like', $path)->with('staff', 'informationMainImage', 'informationBodyImage')->first();

        if ($gallery) {
            $path = storage_path('app/public/galleries/' . $gallery->path);

            if (!$path) {
                return response()->json([
                    'success' => false,
                    'message' => 'Image not found'
                ], 404);
            }

            return response()->file($path);
        }

        return response()->json([
            'success' => false,
            'message' => 'Image not found',
            'data' => $gallery
        ], 404);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'category' => 'required|in:photo,news,meeting,program,project,competition,achievment',
            'image' => 'required|image|mimes:jpeg,jpg,png|max:4096',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $image = $request->file('image');
        $image->store('galleries', 'public');

        $gallery = Gallery::create([
            'name' => $request->name,
            'category' => $request->category,
            'path' => $request->image->hashName()
        ]);

        if ($gallery) {
            return response()->json([
                'success' => true,
                'message' => 'Image added successfully',
                'data' => $gallery
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Image added failed',
        ], 409);
    }

    public function destroy($id)
    {
        $gallery = Gallery::find($id);

        if ($gallery) {
            $useStaff = Staff::where('photo_id', $gallery->id)->exists();
            $useNews = Information::where('main_image_id', $gallery->id)
                ->orWhere('body_image_id', $gallery->id)
                ->exists();

            if ($useStaff || $useNews) {
                return response()->json([
                    'success' => false,
                    'message' => 'Image delete failed, Image has owned'
                ], 403);
            }

            Storage::disk('public')->delete("galleries/" . $gallery->path);


            $gallery->delete();

            return response()->json([
                'success' => true,
                'message' => 'Image delete successfully'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Image not found, Delete failed'
            ], 404);
        }
    }
}
