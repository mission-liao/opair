define([
    'angular',
    'angular_cookies',
    'angular_sanitize',
    'angular_route',
    'angular_ui_router',
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
        'ui.router',

        'webApp.controllers',
        'webApp.services',
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        // default url is root
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('login', {
            url: '/login',
            views: {
                'content': {
                    templateUrl: 'views/login.html'
                },
                'top_r': {
                    templateUrl: 'views/login/form.html'
                }
            }
        })
        .state('home', {
            url: '/',
            views: {
                'top_r': {
                    templateUrl: 'views/login/logout.html'
                },
                'content': {
                    templateUrl: 'views/home.html'
                },
            },
        })
        .state('error', {
            url: '/error',
            views: {
                'content': {
                    templateUrl: 'views/error.html'
                },
            },
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

