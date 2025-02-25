<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'role' => 'nullable|in:admin,member'
        ]);

        $user = User::create($fields);
        $token = $user->createToken($request->name, [$request->role])->plainTextToken;

        $data = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json($data, 201);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::Check($request->password, $user->password)) {
            return response()->json([
                'errors' => ['email or password incorrect']
            ]);
        }

        $token = $user->createToken($user->name)->plainTextToken;


        

        $token = $user->createToken($user->name, [$user->role])->plainTextToken;
        $data = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json($data, 200);
    }

    public function logout(Request $request) {

        $request->user()->tokens()->delete();

        return response()->json(['message' => 'You are logged out']);

    }

}






    // public function edit(Request $request) {
    //     if ($request->user()->tokenCan('admin')) {
    //         return 'this user is an admin!';
    //     }
    //     return 'It is a member';
    // }
