define(["angular"], function (ng) {
    "use strict";

    return ng.module("webApp.services", [])
        .factory("PostRestangular", function (Restangular) {
            return Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setRequestSuffix("/");
            });
        });
});

