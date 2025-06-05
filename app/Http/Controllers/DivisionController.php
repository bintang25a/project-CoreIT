<?php

namespace App\Http\Controllers;

use App\Models\Division;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DivisionController extends Controller
{
    public function index()
    {
        $divisions = Division::with('user')->get();

        return response()->json([
            "success" => true,
            "message" => "Get all Divisions",
            "data" => $divisions
        ], 200);
    }

    public function show(string $id)
    {
        $division = Division::with('user')->find($id);

        if ($division) {
            return response()->json([
                'success' => true,
                'message' => 'Show division id ' . $id,
                'data' => $division
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Division not found'
            ], 404);
        }
    }

    public function showLogo(string $path)
    {
        $division = Division::where('logo_path', 'like', $path)->with('user')->first();

        if ($division) {
            $path = storage_path('app/public/divisions/' . $division->logo_path);

            if (!$path) {
                return response()->json([
                    'success' => false,
                    'message' => 'Logo not found'
                ], 404);
            }

            return response()->file($path);
        }

        return response()->json([
            'success' => false,
            'message' => 'Logo not found'
        ], 404);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'logo' => 'nullable|image|mimes:jpeg,jpg,png|max:4096',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $logo = $request->file('logo');
        $filename = $logo->hashName();
        $logo->storeAs('divisions', $filename, 'public');

        $division = Division::create([
            'name' => $request->name,
            'description' => $request->description,
            'logo_path' => $filename
        ]);

        if ($division) {
            return response()->json([
                'success' => true,
                'message' => 'Division added successfully',
                'data' => $division
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Division added failed',
        ], 409);
    }

    public function update(string $id, Request $request)
    {
        $division = Division::find($id);

        if (!$division) {
            return response()->json([
                'success' => false,
                'message' => 'Division not found, Update failed'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,jpg,png|max:4096',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        if ($request->name) {
            $data = [
                'name' => $request->name,
                'description' => $request->description,
            ];
        }

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $filename = $logo->hashName();
            $logo->storeAs('divisions', $filename, 'public');

            if ($division->logo_path) {
                Storage::disk('public')->delete('divisions/' . $division->logo_path);
            }

            $data['logo_path'] = $filename;
        }

        $division->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Division update successfully',
            'data' => $division
        ], 200);
    }

    public function destroy(string $id)
    {
        $division = Division::find($id);

        if ($division) {
            $user = User::where('division_id', $division->id)->exists();

            if ($user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Division delete failed, Divison has member'
                ], 403);
            }

            $division->delete();

            return response()->json([
                'success' => true,
                'message' => 'Division delete successfully'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Division not found, Delete failed'
            ], 404);
        }
    }
}
