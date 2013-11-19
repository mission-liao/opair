"use strict";

define(["angular", "res/index"], function (ng) {
    return ["$scope", "res_user", function ($scope, User) {
        $scope.submit_user = function () {
            User.save(
                {},
                {
                    email: $scope.email,
                    passwd: $scope.login_passwd
                },
                // success
                function (val, resp) {
                    console.log("mission success");
                },
                // error
                function (resp) {
                    console.log("mission error");
                    console.log(resp);
                }
            );
        }
        $scope.$apply();
    }];
});

