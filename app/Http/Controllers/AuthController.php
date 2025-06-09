<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\User;
use App\Models\Staff;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nim' => 'required',
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
        $member = User::where('nim', $staff->nim)->first();
        $image = Gallery::find($staff->photo_id);

        return response()->json([
            'success' => true,
            'message' => 'Login successfully',
            'user' => [
                'id' => $staff->id,
                'nim' => $staff->nim,
                'position' => $staff->position,
                'name' => $member ? $member->name : null,
                'image' => $image ? $image->path : null,
            ],
            // 'user' => auth()->guard('api_staff')->user(),
            'token' => $token
        ], 200);
    }

    public function validateToken(Request $request)
    {
        $staff = Staff::with('user', 'gallery')->find($request->user()->id);

        return response()->json([
            'success' => true,
            'message' => 'Token is valid',
            'user' => $request->user()
        ]);
    }

    public function changePassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'passwordNow' => 'required',
            'passwordNew' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $staff = Staff::find($id);

        if (!Hash::check($request->passwordNow, $staff->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect'
            ], 422);
        }

        $data['password'] = bcrypt($request->passwordNew);
        $staff->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Password changed successfully',
        ]);
    }

    public function getRecruitmentStatus()
    {
        $status = Setting::where('key', 'isRecrut')->value('value');

        return response()->json([
            'success' => true,
            'message' => 'Get recruitment status successfully',
            'data' => $status,
        ]);
    }

    public function toggleRecruitmentStatus()
    {
        $setting = Setting::where('key', 'isRecrut')->first();
        $setting->value = !$setting->value;
        $setting->save();

        return response()->json([
            'success' => true,
            'message' => 'Recruitment status updated successfully',
            'data' => $setting->value,
        ]);
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
