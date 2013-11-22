require.config({
    baseUrl: "js",

    paths: {
        angular: "../bower_components/angular/angular",
        angular_cookies: "../bower_components/angular-cookies/angular-cookies",
        angular_sanitize: "../bower_components/angular-sanitize/angular-sanitize",
        angular_route: "../bower_components/angular-route/angular-route",
        jquery: "../bower_components/jquery/jquery",
        bootstrap: "../bower_components/bootstrap-sass/js",
        requirejs_domready: "../bower_components/requirejs-domready/domReady",
        restangular: "../bower_components/restangular/dist/restangular.min",
        lodash: "../bower_components/lodash/dist/lodash.compat.min"
    },

    shim: {
        "angular": {
            exports: "angular"
        },
        "angular_cookies": {
            deps: ["angular"]
        },
        "angular_sanitize": {
            deps: ["angular"]
        },
        "angular_route": {
            deps: ["angular"]
        },
        "restangular": {
            deps: ["lodash"],
        },
        // not beautiful, shim didn't allow wildchar
        // we have to declare deps for each bootstrap module
        // we included.
        "bootstrap/dropdown": {
            deps: ["jquery"],
            exports: "$.fn.popover"
        },
    },

    /*
    map: {
        // special handle to make jquery-global private.
        // refer to http://requirejs.org/docs/jquery.html
        "*": {"jquery": "jquery-private"},
        "jquery-private": {"jquery": "jquery"}
    },
    */

    enforceDefine: true
});

// refer to http://docs.angularjs.org/guide/bootstrap
// 'Deferred Bootstrap'
window.name = "NG_DEFER_BOOTSTRAP!";

require([
    "angular",
    "app",
    "requirejs_domready",
    "bootstrap/dropdown"
], function (ng, app) {
    "use strict";

    // trigger bootstrap for the 1st time.
    ng.bootstrap(document, [app["name"]]);
    ng.resumeBootstrap();
});

