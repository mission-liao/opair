"use strict";

define([], function () {
    return ["$scope", "$http", function ($scope, $http) {
        // TODO: check if we alreay logined.

        $scope.state = "default";
        $scope.oauth = function (provider) {
            // TODO: await for server side oauth
        }

        $scope.login = function () {
            $scope.state = "sign_up";
        }

        $scope.$apply();
    }];
});
