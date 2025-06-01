<?php

namespace App\Http\Controllers;

use App\Models\Division;
use App\Models\User;
use Illuminate\Http\Request;
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

        if($division) {
            return response()->json([
                'success' => true,
                'message' => 'Show division id ' . $id,
                'data' => $division
            ], 200);
        }
        else {
            return response()->json([
                'success' => false,
                'message' => 'Division not found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $division = Division::create([
            'name' => $request->name,
            'description' => $request->description
        ]);

        if($division) {
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

        if(!$division) {
            return response()->json([
                'success' => false,
                'message' => 'Division not found, Update failed'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string'
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'name' => $request->name,
            'description' => $request->description,
        ];

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

        if($division) {
            $user = User::where('division_id', $division->id)->exists();

            if($user) {
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
        }
        else {
            return response()->json([
                'success' => false,
                'message' => 'Division not found, Delete failed'
            ], 404);
        }
    }
}
