define(['angular'], function (ng) {
    'use strict';

    return ng.module('ctrl.topic', [])
        .controller('ctrl_topic_create', ['svc_common_JSLoad', '$scope', '$modalInstance', 'svc_common_RRestangular', function (JSL, $scope, $modalInstance, RRestangular) {
            JSL.invoke_('topic/controller/create', this, {'$scope': $scope, '$modalInstance': $modalInstance, 'RRestangular': RRestangular});
        }])
        .controller('ctrl_topic_create_modal', ['svc_common_JSLoad', '$scope', '$modal', function (JSL, $scope, $modal) {
            JSL.invoke_('topic/controller/create_modal', this, {'$scope': $scope, '$modal': $modal});
        }])
        .controller('ctrl_topic_search', ['svc_common_JSLoad', '$scope', function (JSL, $scope) {
            JSL.invoke_('topic/controller/search', this, {'$scope', $scope});
        }])
        ;
});

