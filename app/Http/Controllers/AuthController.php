<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\Rule;


class AuthController extends Controller
{
    public function staffreg(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'position' => 'required|string',
            'nim' => 'required|string|unique:staffs,nim|exists:users,nim',
            'photo' => 'required|image|mimes:jpeg,jpg,png|max:4096',
            'password' => 'required|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $member = User::where('nim', $request->nim)->first();
        $member->role = 'bph';
        $member->save();

        $photo = $request->file('photo');
        $photo->store('staffs', 'public');

        $information = Staff::create([
            'position' => $request->title,
            'nim' => $request->nim,
            'photo' => $photo->hashName(),
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'succes' => true,
            'message' => 'Staff added success, Welcome!',
            'data' => $information
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nim' => 'required|numeric',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('nim', 'password');

        if (!$token = auth()->guard('api_staff')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Akun bph salah atau tidak terdaftar'
            ], 401);
        }

        $staff = Staff::where('nim', $request->nim)->first();
        $staff->update(['isLogin' => true,]);

        return response()->json([
            'success' => true,
            'message' => 'Login successfully',
            'user' => auth()->guard('api_staff')->user(),
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        try {
            $user = auth()->guard('api_staff')->user();

            if ($user) {
                $user->update([
                    'isLogin' => false
                ]);
            }

            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'success' => true,
                'message' => 'Logout success'
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Logout failed'
            ], 500);
        }
    }
}
