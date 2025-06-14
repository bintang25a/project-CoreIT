<?php

return [

    'paths' => [
        'api/*',
        'login',
        'register',
        'sanctum/csrf-cookie',
        'storage/*',
        'divisions/*',
        'staffs/*',
        'members/*',
        'news/*',
        'galleries/*'
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000',
        'http://localhost:4173',
        'https://7418fqfm-3000.asse.devtunnels.ms',
    ],

    'allowed_origins_patterns' => [
        '^https:\/\/.*\.asse\.devtunnels\.ms$'
    ],


    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
