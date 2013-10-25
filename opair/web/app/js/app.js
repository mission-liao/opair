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
        console.log("config is called.");
        $routeProvider
        .when("/", {
            templateUrl: "views/main.html",
            controller: "MainCtrl"
        })
        .otherwise({
            redirectTo: '/'
        });
    });
});

