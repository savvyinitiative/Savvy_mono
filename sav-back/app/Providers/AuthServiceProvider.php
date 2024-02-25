<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Hashing\BcryptHasher;
use App\Extensions\KeycloakUserProvider;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Foundation\Application;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // $this->registerPolicies();

        Auth::provider('keycloak', function (Application $app, array $config) {
            // Return an instance of Illuminate\Contracts\Auth\UserProvider...
 
            return new KeycloakUserProvider(new BcryptHasher(), $config['model']);
        });
 
        // Auth::provider('keycloak', function ($app, array $config) {
        //     // Return an instance of Illuminate\Contracts\Auth\UserProvider...
 
        //     return new KeycloakUserProvider(new BcryptHasher(), User::class);
           
        // });

      
    }
}
