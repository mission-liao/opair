require.config({
    baseUrl: "js",

    paths: {
        angular: "../bower_components/angular/angular",
        angular_resource: "../bower_components/angular-resource/angular-resource",
        angular_cookies: "../bower_components/angular-cookies/angular-cookies",
        angular_sanitize: "../bower_components/angular-sanitize/angular-sanitize",
        jquery: "../bower_components/jquery/jquery",
        bootstrap_affix: "../bower_components/bootstrap-sass/js/bootstrap-affix",
        bootstrap_alert: "../bower_components/bootstrap-sass/js/bootstrap-alert",
        bootstrap_dropdown: "../bower_components/bootstrap-sass/js/bootstrap-dropdown",
        bootstrap_tooltip: "../bower_components/bootstrap-sass/js/bootstrap-tooltip",
        bootstrap_modal: "../bower_components/bootstrap-sass/js/bootstrap-modal",
        bootstrap_transition: "../bower_components/bootstrap-sass/js/bootstrap-transition",
        bootstrap_button: "../bower_components/bootstrap-sass/js/bootstrap-button",
        bootstrap_popover: "../bower_components/bootstrap-sass/js/bootstrap-popover",
        bootstrap_typeahead: "../bower_components/bootstrap-sass/js/bootstrap-typeahead",
        bootstrap_carousel: "../bower_components/bootstrap-sass/js/bootstrap-carousel",
        bootstrap_scrollspy: "../bower_components/bootstrap-sass/js/bootstrap-scrollspy",
        bootstrap_collapse: "../bower_components/bootstrap-sass/js/bootstrap-collapse",
        bootstrap_tab: "../bower_components/bootstrap-sass/js/bootstrap-tab",
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

// defering angular bootstrap-process,
// refer to https://github.com/angular/angular.js/pull/2052
window.name = "NG_DEFER_BOOTSTRAP!";

require([
    "angular",
    "app",
    "requirejs_domready"
], function (ng, app) {
    "use strict";

    var $body = ng.element(document.getElementsByTagName("body")[0]);
    $body.addClass("ng-app");
    console.log(app['name']);
    ng.bootstrap($body, [app["name"]]);
    ng.resumeBootstrap();
});

