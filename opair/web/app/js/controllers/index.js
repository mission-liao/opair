define(['angular'], function (ng) {
    'use strict';

    var _invoke = function (ctrl, pThis, param, inj, JSL) {
        if (JSL.is_sync()) {
            var c = require(ctrl);
            inj.invoke(c, pThis, param);
        } else {
            require([ctrl,], function (c) {
                inj.invoke(c, pThis, param);
            });
        }
    };

    return ng.module('webApp.controllers', [])
        .controller('ctrl_login', ['service_JSLoad', '$scope', '$injector', 'ApiRestangular', function (JSL, $scope, $injector, ApiRestangular) {
            _invoke('controllers/login', this, {'$scope': $scope, 'ApiRestangular': ApiRestangular}, $injector, JSL);
        }])
        .controller('ctrl_signUp', ['service_JSLoad', '$scope', '$injector', 'RRestangular', function (JSL, $scope, $injector, RRestangular) {
            _invoke('controllers/sign_up', this, {'$scope': $scope, 'RRestangular': RRestangular}, $injector, JSL);
        }]);
});

