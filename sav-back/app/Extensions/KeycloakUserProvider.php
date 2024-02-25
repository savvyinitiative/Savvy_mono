<?php


namespace App\Extensions;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Support\Arrayable;
use Closure;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class KeycloakUserProvider extends EloquentUserProvider
{
    public function custom_retrieve(object $token, array $credentials)
    {
        
 
        try {
            // Extract user information from the Keycloak token
            
            $userAttributes = [
                'first_name' => $token->given_name,
                'last_name' => $token->family_name,
                'email' => $token->email,
            ];
            Log::channel("keycloak")->info('KeycloakUserProvider' , ["msg" => "custom_retrieve: create or update user"]);


            // Create or update the user in your database
            User::updateOrCreate(['email' => $userAttributes['email']], $userAttributes);

            // Retrieve the user based on provided credentials
            $model = parent::retrieveByCredentials($credentials);

            // If the user doesn't exist, you can handle it here
            if (!isset($model)) {
                // Log or handle user creation
                \Log::info('User does not exist in your database: ' . $userAttributes['email']);
            }

            // Add a custom property to the user model
            if ($model) {
                $model->customRetrieve = true;
            }

            return $model;
        } catch (\Throwable $th) {
          
            Log::channel("keycloak")->error('Error in custom_retrieve' , ["msg" => $th->getMessage()]);


            return null;
        }
    
    }
}