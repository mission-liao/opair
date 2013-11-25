define(['angular'], function () {
    'use strict';

    return ['$scope', 'PostRestangular', function ($scope, PostRestangular) {
        $scope.submit_failed = false;
        $scope.err_msg = '';

        $scope.submit_user = function () {
            $scope.submit_failed = false;
            $scope.error_message = '';

            var Users = PostRestangular.all('users');
            Users.post({
                email: $scope.email,
                passwd: $scope.login_passwd
            }).then(
                null,
                function(err) {
                    if ('data' in err && typeof(err.data) == 'object' && 'error' in err.data) {
                        $scope.err_msg = err.data.error;
                    } else {
                        $scope.err_msg = 'submit failed: http[' + err.status + ']';
                    }
                    $scope.submit_failed = true;
                }
            );
        };

        // Email
        $scope.validate = function () {
            
        };

        // gender
        $scope.gender_sel = 0;
        $scope.genders = ['Gender', 'Male', 'Female', 'Bisexual'];
        $scope.select_gender = function (idx) {
            if (idx < 0 || idx >= $scope.genders.length) {
                throw 'invalid index for gender [' + idx + ']';
            }
            $scope.gender_sel = idx;
        };

        $scope.$apply();
    }];
});

