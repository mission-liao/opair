"use strict";

define(["angular"], function (ng) {
    return ["$scope", "PostRestangular", function ($scope, PostRestangular) {
        $scope.submit_failed = false;
        $scope.error_message = "";

        $scope.submit_user = function () {
            $scope.submit_failed = false;
            $scope.error_message = "";

            var Users = PostRestangular.all("users");
            Users.post({
                email: $scope.email,
                passwd: $scope.login_passwd
            }).then(
                null,
                function(err) {
                    $scope.submit_failed = true;
                    $scope.error_message = err.data.error;
                }
            );
        }

        // gender
        $scope.gender_sel = 0;
        $scope.genders = ["Gender", "Male", "Female", "Bisexual"];
        $scope.select_gender = function (idx) {
            if (idx < 0 || idx >= $scope.genders.length) {
                throw "invalid index for gender [" + idx + "]";
            }
            $scope.gender_sel = idx;
            console.log($scope.bday);
        }

        $scope.$apply();
    }];
});

