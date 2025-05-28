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
            "succes" => true,
            "message" => "Get all Staffs",
            "data" => $staff
        ], 200);
    }

    public function show(string $id)
    {
        $staff = Staff::with('user', 'gallery')->find($id);

        if($staff) {
            return response()->json([
                'succes' => true,
                'message' => 'Show Staff by id',
                'data' => $staff
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
            'position' => 'required|string',
            'nim' => 'required|numeric|exists:users,nim|unique:staffs,nim',
            'password' => 'required|string|min:8',
            'image' => 'required|image|mimes:jpeg,jpg,png|max:4096',
            'image_name' => 'required|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $image = $request->file('image');
        $path = $image->store('galleries', 'public');

        $gallery = Gallery::create([
            'name' => $request->image_name,
            'category' => 'photo',
            'slug' => Str::slug($request->image_name . '-' . uniqid()),
            'image_path' => $path
        ]);

        $user = User::where('nim', $request->nim)->first();
        $user->role = 'bph';
        $user->save();

        $staff = Staff::create([
            'position' => $request->position,
            'nim' => $request->nim,
            'photo_id' => $gallery->id,
            'password' => bcrypt($request->password),
        ]);

        if($staff) {
            return response()->json([
                'success' => true,
                'message' => 'Staff created Successfully',
                'data' => $staff
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Staff failed to create'
        ], 409);
    }

    public function update(string $id, Request $request)
    {
        $staff = Staff::find($id);

        if(!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Data not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'position' => 'required|string',
            'nim' => 'required|numeric|exists:users,nim',
            'password' => 'required|string|min:8',
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:4096',
            'image_name' => 'required|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $gallery = Gallery::find($staff->photo_id);

        if($request->hasFile('image')) {

            Storage::disk('public')->delete($gallery->image_path);

            $image = $request->file('image');
            $path = $image->store('galleries', 'public');

            $dataImage = [
                'slug' => $image->hashName(),
                'image_path' => $path
            ];
        }

        $dataImage['name'] = $request->image_name;
        $gallery->update($dataImage);

        $dataStaff = [
            'position' => $request->position,
            'nim' => $request->nim,
            'photo_id' => $gallery->id,
            'password' => bcrypt($request->password),
        ];

        $staff->update($dataStaff);

        if($dataStaff) {
            return response()->json([
                'success' => true,
                'message' => 'Staff created Successfully',
                'data' => $staff
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Staff failed to create'
        ], 409);
    }

    public function destroy(string $id)
    {
        $staff = Staff::find($id);

        if($staff) {
            $user = User::where('nim', $staff->nim)->first();
            $user->role = 'member';
            $user->save();

            $staff->delete();

            return response()->json([
                'success' => true,
                'message' => 'Delete staff success'
            ], 200);
        }
        else {
            return response()->json([
                'success' => false,
                'message' => 'Data not found, Delete staff failed'
            ], 404);
        }
    }
}
