define(['angular'], function (ng) {
    'use strict';

    return ng.module('webApp.services', [])
        .factory('RRestangular', function (Restangular) {
            return Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setBaseUrl('/r');
                RestangularConfigurer.setRequestSuffix('/');
            });
        })
        .factory('ApiRestangular', function (Restangular) {
            return Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setBaseUrl('/p');
                RestangularConfigurer.setRequestSuffix('/');
            });
        })
        .service('service_JSLoad', function () {
            // load async by default
            this.sync_load = false;

            // config function
            this.set_sync = function (bSync) {
                this.sync_load = bSync;
            };

            // get function
            this.is_sync = function () {
                return this.sync_load;
            };
        })
        .factory('_err_interceptor', function ($q, $state, $rootScope) {
            return {
                'responseError': function (response) {
                    if (response.status == 401) {
                        // TODO: redirect to a specific login page
                        $state.go('login');
                    } else if (response.status >= 500 && response.status < 600) {
                        // cache the response
                        $rootScope.http_response = response;
                        // server side error, redirect to error page.
                        $state.go('error');
                    }

                    // always continue to process this response.
                    // don't eat it.
                    return $q.reject(response);
                }
            };
        })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('_err_interceptor');
        });
});

