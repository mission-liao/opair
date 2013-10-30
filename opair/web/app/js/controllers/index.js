define(["angular"], function (ng) {
    "use strict";

    return ng.module("webApp.controllers", [])
        .controller("ctrl.login", ["$scope", "$injector", "$http", function ($scope, $injector, $http) {
            require(["controllers/login/login"], function (c) {
                $injector.invoke(c, this, {"$scope": $scope, "$http": $http});
            });
        }])
        .controller("ctrl.sign_up", ["$scope", "$injector", function ($scope, $injector) {
            require(["controllers/sign_up"], function (c) {
                $injector.invoke(c, this, {"$scope": $scope});
            });
        }])
        .controller("ctrl.psswd", ["$scope", "$injector", "$element", function ($scope, $injector, $elm) {
            require(["controllers/login/psswd"], function (c) {
                $injector.invoke(c, this, {"$scope": $scope, "$elm": $elm});
            });
        }]);
});
