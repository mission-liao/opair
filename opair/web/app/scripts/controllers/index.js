define(["angular"], function (angular) {
    "use strict";

    return angular.module("webApp.controllers", [])
        .controller("MainCtrl", ["$scope", "$injector", function ($scope, $injector) {
            console.log("mission is here.");
            require(["controllers/welcome"], function (MainCtrl) {
                $injector.invoke(MainCtrl, this, {"$scope": $scope});
            });
        }]);
});
