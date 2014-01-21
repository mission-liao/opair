define(['angular'], function (ng) {
    'use strict';

    return ng.module('ctrl.auth', [])
        .controller('ctrl_auth_login', ['svc_common_JSLoad', '$scope', 'svc_common_ApiRestangular', function (JSL, $scope, ApiRestangular) {
            JSL.invoke_('auth/controller/login', this, {'$scope': $scope, 'ApiRestangular': ApiRestangular});
        }])
        .controller('ctrl_auth_sign_up', ['svc_common_JSLoad', '$scope', 'svc_common_RRestangular', function (JSL, $scope, RRestangular) {
            _invoke('auth/controller/sign_up', this, {'$scope': $scope, 'RRestangular': RRestangular});
        }]);
});
