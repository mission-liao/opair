"use strict";

define(["angular"], function (ng) {
    return ["$scope", "$http", function ($scope, $http) {
        // TODO: check if we alreay logined.

        $scope.state = "default";
        $scope.oauth = function (provider) {
            // TODO: await for server side oauth
        }

        $scope.login = function () {
        }

        $scope.$apply();
    }];
});

