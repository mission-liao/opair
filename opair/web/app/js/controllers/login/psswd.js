"use strict";

define(["angular"], function (ng) {
    return ["$scope", "$elm", function ($scope, $elm) {
        // keep span-element
        var $alert_span = $elm.find("span");

        // the default status is weak password
        $scope.strength = "weak";

        $scope.$watch("login_psswd", function () {
            if (ng.isDefined($scope.login_psswd)) {
                if ($scope.login_psswd.length > 8) {
                    $scope.strength = "strong";
                } else if ($scope.login_psswd.length > 3) {
                    $scope.strength = "medium";
                } else {
                    $scope.strength = "weak";
                }
            }

            if ($alert_span) {
                $alert_span.removeClass("alert alert-success alert-warning alert-danger");
                if ($scope.strength == "strong") {
                    $alert_span.addClass("alert alert-success");
                } else if ($scope.strength == "medium") {
                    $alert_span.addClass("alert alert-warning");
                } else if ($scope.strength == "weak" ) {
                    $alert_span.addClass("alert alert-danger");
                } else {
                    throw "Unknown password-strength status" + $scope.strength;
                }
            }
        });

        $scope.$apply();
    }];
});

