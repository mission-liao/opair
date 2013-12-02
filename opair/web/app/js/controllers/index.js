define(['angular', 'controllers/err'], function (ng) {
    'use strict';


    var _invoke = function (ctrl, pThis, param, inj, bSync) {
        if (bSync) {
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
            _invoke('controllers/login', this, {'$scope': $scope, 'ApiRestangular': ApiRestangular}, $injector, JSL.is_sync());
        }])
        .controller('ctrl_signUp', ['service_JSLoad', '$scope', '$injector', 'RRestangular', function (JSL, $scope, $injector, RRestangular) {
            _invoke('controllers/sign_up', this, {'$scope': $scope, 'RRestangular': RRestangular}, $injector, JSL.is_sync());
        }])
        .controller('ctrl_home', ['service_JSLoad', '$scope', '$injector', function (JSL, $scope, $injector) {
            _invoke('controllers/home', this, {'$scope': $scope}, $injector, JSL.is_sync());
        }])
        .controller('ctrl_err', ['service_JSLoad', '$scope', '$injector', function (JSL, $scope, $injector) {
            _invoke('controllers/err', this, {'$scope': $scope}, $injector, JSL.is_sync());
        }]);
});

