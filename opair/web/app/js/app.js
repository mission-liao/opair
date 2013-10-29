"use strict";

define([
    "angular",
    "angular_resource",
    "angular_cookies",
    "angular_sanitize",
    "controllers/index"
], function (angular) {
    return angular.module("webApp", [
        "ngCookies",
        "ngResource",
        "ngSanitize",
        "webApp.controllers"
    ])
    .config(function ($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "ctrl.home"
        })
        .otherwise({
            redirectTo: '/'
        });
    });
});

