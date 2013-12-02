define([
    'angular',
    'angular_cookies',
    'angular_sanitize',
    'angular_route',
    'restangular',
    'controllers/index',
    'services/index',
], function (angular) {
    'use strict';

    return angular.module('webApp', [
        'ngCookies',
        'ngSanitize',
        'ngRoute',
        'restangular',

        'webApp.controllers',
        'webApp.services',
    ])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
        })
        .when('/intro', {
            templateUrl: 'views/intro.html',
        })
        .when('/login', {
            templateUrl: 'views/login.html',
        })
        .when('/error', {
            templateUrl: 'views/error.html',
        })
        .otherwise({
            redirectTo: '/'
        });
    })
    .run(function ($rootScope, ApiRestangular) {
        // init UI state
        $rootScope.ui_state = {};
        $rootScope.ui_state.login = false;

        // init http-response cache, for error
        $rootScope.http_response = {};
        // init an invalid value to status code
        $rootScope.http_response.status = 0;

        // init global user object
        $rootScope.user = {};
        // query user-email from server, once queried, which
        // means we've login.
        var user = ApiRestangular.one('login');
        user.get().then(
            function (data) {
                $rootScope.user.email = data.email;
            },
            function (err) {
                $rootScope.ui_state.login = false;
            }
        );

        // TODO: check cookie for user-id
    });
});

