<?php

namespace App\Http\Controllers;

use App\Models\Shortlink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ShortlinkController extends Controller
{
    public function index()
    {
        $shortlinks = Shortlink::all();

        return response()->json([
            "success" => true,
            "message" => "Get all Shortlinks",
            "data" => $shortlinks
        ], 200);
    }

    public function show(string $id)
    {
        $shortlink= Shortlink::find($id);

        if ($shortlink) {
            return response()->json([
                'success' => true,
                'message' => 'Show shortlink id ' . $id,
                'data' => $shortlink
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Staff not found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'shortlink' => 'required|string|unique:shortlinks,shortlink',
            'target' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $shortlinks = Shortlink::all();
        $id = count($shortlinks) + 1;


        $shortlink = Shortlink::create([
            'id' => $id,
            'shortlink' => $request->shortlink,
            'target' => $request->target,
        ]);

        if ($shortlink) {
            return response()->json([
                'success' => true,
                'message' => 'Shortlink added successfully',
                'data' => $shortlink
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Shortlink added failed'
        ], 409);
    }

    public function update(string $id, Request $request)
    {
        $shortlink = Shortlink::find($id);

        if (!$shortlink) {
            return response()->json([
                'success' => false,
                'message' => 'Shortlink not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'shortlink' => 'required|string',
            'target' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $dataShortlink = [
            'shortlink' => 'required|string',
            'target' => 'required|string'
        ];

        $shortlink->update($dataShortlink);

        return response()->json([
            'success' => true,
            'message' => 'Shortlink update successfully',
            'data' => $shortlink
        ], 200);
    }

    public function destroy(string $id)
    {
        $shortlink = Shortlink::find($id);

        if (!$shortlink) {
            return response()->json([
                'success' => false,
                'message' => 'Shortlink not found, Delete failed'
            ], 404);
        }

        $shortlink->delete();

        return response()->json([
            'success' => true,
            'message' => 'Shortlink delete successfully'
        ], 200);
    }
}
