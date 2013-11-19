"use strict";

define([
    "angular",
    "angular_resource",
    "angular_cookies",
    "angular_sanitize",
    "angular_route",
    "controllers/index",
    "res/index"
], function (angular) {
    return angular.module("webApp", [
        "ngCookies",
        "ngResource",
        "ngSanitize",
        "ngRoute",
        "webApp.controllers",
        "webApp.res"
    ])
    .config(function ($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
        })
        .otherwise({
            redirectTo: '/'
        });
    });
});

