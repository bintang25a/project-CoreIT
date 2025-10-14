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
        $host = $request->getHost();
        $link = $host . "/me/" . $request->shortlink;

        $validator = Validator::make([
            'input_shortlink' => $request->shortlink,
            'final_shortlink' => $link,
            'target' => $request->target,
        ], [
            'input_shortlink' => 'required|string',
            'final_shortlink' => 'required|string|unique:shortlinks,shortlink',
            'target' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $shortlink = Shortlink::create([
            'shortlink' => $link,
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

        $host = $request->getHost();
        $link = $host . "/me/" . $request->shortlink;

        $validator = Validator::make([
            'input_shortlink' => $request->shortlink,
            'final_shortlink' => $link,
            'target' => $request->target,
        ], [
            'input_shortlink' => 'required|string',
            'final_shortlink' => 'required|string|unique:shortlinks,shortlink,' . $id,
            'target' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $dataShortlink = [
            'shortlink' => $link,
            'target' => $request->target
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
