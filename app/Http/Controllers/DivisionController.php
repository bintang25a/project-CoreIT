<?php

namespace App\Http\Controllers;

use App\Models\Division;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DivisionController extends Controller
{
    public function index()
    {
        $divisions = Division::with('user')->get();

        return response()->json([
            "succes" => true,
            "message" => "Get all Divisions",
            "data" => $divisions
        ], 200);
    }

    public function show(string $id)
    {
        $division = Division::with('user')->find($id);

        if($division) {
            return response()->json([
                'succes' => true,
                'message' => 'Show division by id:',
                'data' => $division
            ], 200);
        }
        else {
            return response()->json([
                'succes' => false,
                'message' => 'Data not found'
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
                'succes' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $division = Division::create([
            'name' => $request->name,
            'description' => $request->description
        ]);

        return response()->json([
            'succes' => true,
            'message' => 'Division added to Database',
            'data' => $division
        ], 201);
    }

    public function update(string $id, Request $request)
    {
        $division = Division::find($id);

        if(!$division) {
            return response()->json([
                'succes' => false,
                'message' => 'Data not found, Update failed'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'description' => 'string'
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
            $division->delete();

            return response()->json([
                'success' => true,
                'message' => 'Division deleted',
                'data' => $division
            ], 200);
        }
        else {
            return response()->json([
                'success' => false,
                'message' => 'Data not found, Delete failed'
            ], 404);
        }
    }
}
