define(['angular'], function () {
    'use strict';

    return ['$scope', '$http', function ($scope) {
        // TODO: check if we alreay logined.

        $scope.state = 'default';
        $scope.oauth = function () {
            // TODO: await for server side oauth
        };

        $scope.login = function () {
        };

        $scope.$apply();
    }];
});

