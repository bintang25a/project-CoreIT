<?php

namespace App\Http\Controllers;

use App\Models\Division;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {     
        $users = User::with('division')->get();
         
        return response()->json([
            "success" => true,
            "message" => "Get all Members",
            "data" => $users
        ], 200);
    }

    public function show(string $id) {
        $user = User::with('division')->find($id);

        if($user) {
            return response()->json([
                'success' => true,
                'message' => 'Show member id ' . $id,
                'data' => $user
            ], 200);
        }
        else {
            return response()->json([
                'success' => false,
                'message' => 'Member not found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $divisions = Division::pluck('name')->map(function($name) {
            return strtolower($name);
        })->toArray();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'nim' => 'required|unique:users|string|max:20',
            'prodi' => 'required|string',
            'email' => 'required|email|max:255|unique:users',
            'phone_number' => 'required|numeric',
            'division' => ['required', Rule::in($divisions)],
            'role' => 'required|string',
            'link_project' => 'string'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $division_id = array_search(strtolower($request->division), $divisions) + 1;

        $user = User::create([
            'name' => $request->name,
            'nim' => $request->nim,
            'prodi' => $request->prodi,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'division_id' => $division_id,
            'role' => $request->role,
            'link_project' => $request->link_project
        ]);

        if($user) {
            return response()->json([
                'success' => true,
                'message' => 'Member added successfully',
                'data' => $user
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Member added failed'
        ], 409);
    }

    public function update(string $id, Request $request) {
        $member = User::find($id);

        if(!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Member not found, Update failed'
            ], 404);
        }

        $divisions = Division::pluck('name')->map(function($name) {
            return strtolower($name);
        })->toArray();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'nim' => 'required|string|max:20',
            'prodi' => 'required|string',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|numeric',
            'division' => ['required', Rule::in($divisions)],
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $staff = Staff::where('nim', $member->nim)->first();
        if($staff) {
            if(($request->nim != $member->nim)) {
                $staff->delete();
            }
        }

        $division_id = array_search(strtolower($request->division), $divisions) + 1;
        
        $data = [
            'name' => $request->name,
            'nim' => $request->nim,
            'prodi' => $request->prodi,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'division_id' => $division_id,
        ];

        if($request->has('role')) {
            $data['role'] = $request->role;
        }

        if($request->has('link_project')) {
            $data['link_project'] = $request->link_project;
        }

        $member->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Member update successfully',
            'data' => $data
        ], 201);
    }

    public function destroy(string $id)
    {
        $member = User::find($id);

        if($id == 1) {
            return response()->json([
                'success' => false,
                'message' => 'Member delete failed, admin'
            ], 403);
        }

        if($member) {
            $member->delete();

            return response()->json([
                'success' => true,
                'message' => 'Member delete successfully'
            ], 200);
        }
        else {
            return response()->json([
                'succes' => false,
                'message' => 'Data not found, Delete failed'
            ], 404);
        }
    }
}
