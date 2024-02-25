<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;


class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function protected(){

        $token = Auth::token();
        $user = Auth::user();
        $id = Auth::id();
        $can_view_accounts = Auth::hasRole('reactjs', 'view_accounts');
        return array("user"=> $user, "id"=> $id, "can_view_accounts" => $can_view_accounts);
        return auth()->user();

        return "protected";
    }
}
