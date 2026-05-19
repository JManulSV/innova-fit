<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        //1. Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|string|same:password',
            'role' => 'required|in:client,coach',
        ]);

        //2. Create the user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        //3. Create a token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        //4. Return the token and user info
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ],
            'message' => 'Registration successful',
        ], 201);
    }

    public function login(Request $request)
    {
        //1. Validate the request
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        //2. Search user in the database
        $user = User::where('email', $credentials['email'])->first();

        //3. If user not found or password does not match, return error
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password',
            ], 401);
        }

        //4. Create a token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        //5. Return the token and user info
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ],
            'message' => 'Login successful',
        ]);
    }

    public function logout(Request $request)
    {
        //1. Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();

        //2. Return success message
        return response()->json([
            'success' => true,
            'message' => 'Logout successful',
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user(),
        ]);
    }
}
