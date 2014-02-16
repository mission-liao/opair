define(['angular'], function () {
    'use strict';

    return ['$scope', 'countryInfo', function ($scope, countryInfo) {
        $scope.country = {name: '', name_list: null};
        $scope.country.name_list = countryInfo.get_full_name_list();

        $scope.$apply();
    }];
});
