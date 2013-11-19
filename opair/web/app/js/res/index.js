define(["angular", "angular_resource"], function (ng, res) {
    "use strict";

    return ng.module("webApp.res", ["ngResource"])
        .factory("res_user", ["$resource", function ($resource) {
            // angular would remove tailing slash for resource based url.
            // the hack to escape tailing slash could workaround this issue.
            return $resource("/p/user\\/")
        }]);
});
