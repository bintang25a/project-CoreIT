<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Gallery;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class StaffController extends Controller
{
    public function index()
    {
        $staff = Staff::with('user', 'gallery')->get();

        return response()->json([
            "success" => true,
            "message" => "Get all Staffs",
            "data" => $staff
        ], 200);
    }

    public function show(string $id)
    {
        $staff = Staff::with('user', 'gallery')->find($id);

        if ($staff) {
            return response()->json([
                'success' => true,
                'message' => 'Show Staff id ' . $id,
                'data' => $staff
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
            'position' => 'required|string',
            'nim' => 'required|numeric|exists:users,nim|unique:staffs,nim',
            'password' => 'nullable|string|min:8',
            'photo' => 'required|image|mimes:jpeg,jpg,png|max:4096',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $photo = $request->file('photo');
        $filename = $photo->hashName();
        $photo->storeAs('galleries', $filename, 'public');

        $user = User::where('nim', $request->nim)->first();
        $user->role = 'bph';
        $user->save();

        $gallery = Gallery::create([
            'name' => $user->name,
            'category' => 'photo',
            'path' => $filename
        ]);


        $staff = Staff::create([
            'position' => $request->position,
            'nim' => $request->nim,
            'photo_id' => $gallery->id,
            'password' => bcrypt($request->password),
        ]);

        if ($staff) {
            return response()->json([
                'success' => true,
                'message' => 'Staff added successfully',
                'data' => $staff
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Staff added failed'
        ], 409);
    }

    public function update(string $id, Request $request)
    {
        $staff = Staff::find($id);

        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'position' => 'required|string',
            'nim' => 'required|numeric|exists:users,nim',
            'password' => 'string',
            'photo' => 'image|mimes:jpeg,jpg,png|max:4096',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $user = User::where('nim', $request->nim)->first();
        $user->role = 'bph';
        $user->save();

        if ($request->hasFile('photo')) {
            $gallery = Gallery::find($staff->photo_id);

            $photo = $request->file('photo');
            $photo->store('galleries', 'public');

            if ($gallery->path) {
                Storage::disk('public')->delete('galleries/' . $gallery->path);
            }

            $dataImage = [
                'name' => $user->name,
                'path' => $request->photo->hashName()
            ];

            $gallery->update($dataImage);
        }

        $dataStaff = [
            'position' => $request->position,
            'nim' => $request->nim,
            'password' => bcrypt($request->password),
        ];

        $staff->update($dataStaff);

        return response()->json([
            'success' => true,
            'message' => 'Staff update successfully',
            'data' => $staff
        ], 200);
    }

    public function destroy(string $id)
    {
        $staff = Staff::find($id);

        if ($id == 1) {
            return response()->json([
                'success' => false,
                'message' => 'Staff delete failed, admin',
            ], 403);
        }

        if ($staff) {
            $user = User::where('nim', $staff->nim)->first();
            $user->role = 'member';
            $user->save();

            $staff->delete();

            return response()->json([
                'success' => true,
                'message' => 'Staff delete successfully'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Staff not found, Delete failed'
            ], 404);
        }
    }
}
