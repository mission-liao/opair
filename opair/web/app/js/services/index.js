define(['angular'], function (ng) {
    'use strict';

    return ng.module('webApp.services', [])
        .factory('PostRestangular', function (Restangular) {
            return Restangular.withConfig(function (RestangularConfigurer) {
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
        });
});

