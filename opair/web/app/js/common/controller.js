define(['angular'], function (ng) {
    'use strict';

    return ng.module('ctrl.common', [])
        .controller('ctrl_common_err', ['service_JSLoad', '$scope', function (JSL, $scope) {
            _invoke('common/controller/err', this, {'$scope': $scope});
        }]);
});

