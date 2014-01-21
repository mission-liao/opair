define(['angular'], function () {
    'use strict';

    return ['$scope', 'svc_common_ApiRestangular', function ($scope, ApiRestangular) {
        // TODO: check if we alreay logined.

        $scope.err_msg = '';
        $scope.user = {};

        $scope.oauth = function () {
            // TODO: await for server side oauth
        };

        $scope.login = function () {
            var login = ApiRestangular.all('login');
            login.post({
                email: $scope.user.email,
                password: $scope.user.password
            }).then(
                function (data) {
                    // TODO: go to login-ed state
                },
                function (err) {
                    // TODO: show error message
                    $scope.err_msg = err.data.error;
                }
            );
        };

        $scope.dismiss = function () {
            $scope.err_msg = '';
        };

        $scope.$apply();
    }];
});

