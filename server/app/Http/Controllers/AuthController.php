<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\MessageBag;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        if (!Auth::attempt($request->only(["email", "password"]))) {
            $errors = (new MessageBag())
                ->add("email", "Неверные данные. Повторите попытку.")
                ->add("password", "Неверные данные. Повторите попытку.");
            return response($errors, Response::HTTP_UNAUTHORIZED);
        }

        $user = User::where("email", $request->email)->first();
        $userInfo = [
            "username" => $user->name,
            "imageUrl" => $user->image_url
        ];

        return response($userInfo, Response::HTTP_OK);
    }

    public function signup(SignupRequest $request) {
        if (User::where("email", $request->email)->first()) {
            $errors = (new MessageBag())->add("email", "Этот адрес электронной почты уже занят. Попробуйте другой");
            return response($errors, Response::HTTP_CONFLICT);
        }

        User::create($request->all());
        $userInfo = [
            "username" => $request->name,
            "imageUrl" => null
        ];

        return response($userInfo, Response::HTTP_CREATED);
    }
}
