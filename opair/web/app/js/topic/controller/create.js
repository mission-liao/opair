define(['angular'], function () {
    'use strict';

    return ['$scope', '$modalInstance', 'RRestangular', function ($scope, $modalInstance, RRestangular) {

        $scope.topic = {};
        $scope.save = function () {
            var api = RRestangular.all('topics');
            api.post({
                title: $scope.topic.title,
                desc: $scope.topic.desc,
            }
            ).then(
                null,
                // TODO: error handling
                null
            )['finally'](
                function () {
                    $modalInstance.close();
                }
            )
            ;
        };

        $scope.close = function () {
            $modalInstance.dismiss();
        };

        $scope.$apply();
    }];
});

