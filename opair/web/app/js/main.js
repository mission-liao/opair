require.config({
    baseUrl: "js",

    paths: {
        angular: "../bower_components/angular/angular",
        angular_resource: "../bower_components/angular-resource/angular-resource",
        angular_cookies: "../bower_components/angular-cookies/angular-cookies",
        angular_sanitize: "../bower_components/angular-sanitize/angular-sanitize",
        jquery: "../bower_components/jquery/jquery",
        bootstrap_affix: "../bower_components/bootstrap-sass/js/affix",
        bootstrap_alert: "../bower_components/bootstrap-sass/js/alert",
        bootstrap_dropdown: "../bower_components/bootstrap-sass/js/dropdown",
        bootstrap_tooltip: "../bower_components/bootstrap-sass/js/tooltip",
        bootstrap_modal: "../bower_components/bootstrap-sass/js/modal",
        bootstrap_transition: "../bower_components/bootstrap-sass/js/transition",
        bootstrap_button: "../bower_components/bootstrap-sass/js/button",
        bootstrap_popover: "../bower_components/bootstrap-sass/js/popover",
        bootstrap_carousel: "../bower_components/bootstrap-sass/js/carousel",
        bootstrap_scrollspy: "../bower_components/bootstrap-sass/js/scrollspy",
        bootstrap_collapse: "../bower_components/bootstrap-sass/js/collapse",
        bootstrap_tab: "../bower_components/bootstrap-sass/js/tab",
        requirejs_domready: "../bower_components/requirejs-domready/domReady"
    },

    shim: {
        "angular": {
            exports: "angular"
        },
        "angular_resource": {
            deps: ["angular"]
        },
        "angular_cookies": {
            deps: ["angular"]
        },
        "angular_sanitize": {
            deps: ["angular"]
        }
    },

    map: {
        // special handle to make jquery-global private.
        // refer to http://requirejs.org/docs/jquery.html
        "*": {"jquery": "jquery-private"},
        "jquery-private": {"jquery": "jquery"}
    }
});

// refer to http://docs.angularjs.org/guide/bootstrap
// 'Deferred Bootstrap'
window.name = "NG_DEFER_BOOTSTRAP!";

require([
    "angular",
    "app",
    "requirejs_domready"
], function (ng, app) {
    "use strict";

    // trigger bootstrap for the 1st time.
    ng.bootstrap(document, [app["name"]]);
    ng.resumeBootstrap();
});

