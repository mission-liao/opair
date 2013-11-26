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
        'webApp.services'
    ])
    .config(function ($routeProvider, RestangularProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/intro.html',
        })
        .otherwise({
            redirectTo: '/'
        });

        RestangularProvider.setBaseUrl('/p');
    });
});

