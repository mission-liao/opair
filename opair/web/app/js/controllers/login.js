define(['angular'], function () {
    'use strict';

    return ['$scope', 'ApiRestangular', function ($scope, ApiRestangular) {
        // TODO: check if we alreay logined.

        $scope.oauth = function () {
            // TODO: await for server side oauth
        };

        $scope.login = function () {
            var login = ApiRestangular.all('/login');
            login.post({
                email: $scope.email,
                password: $scope.login_psswd
            }).then(
                function (data) {
                    console.log(data);
                },
                function (err) {
                    console.log(err);
                }
            );
        };

        $scope.$apply();
    }];
});

