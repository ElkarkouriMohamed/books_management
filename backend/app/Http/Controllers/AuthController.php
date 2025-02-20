<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        $user = User::create($fields);
        $token = $user->createToken($request->name)->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken($user->name)->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function logout() {
        return 'logout';
    }
}
