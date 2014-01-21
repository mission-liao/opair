define(['angular'], function () {
    'use strict';

    return ['$scope', '$state', 'svc_common_ApiRestangular', function ($scope, $state, ApiRestangular) {
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
                    // go to default state for logined-users.
                    $state.go('user.search_topic');
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
