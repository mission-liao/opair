define([
    'angular',
    'angular_cookies',
    'angular_sanitize',
    'angular_route',
    'angular_ui_router',
    'restangular',
    'common/service',
    'common/controller',
    'auth/controller'
], function (ng) {
    'use strict';

    return ng.module('webApp', [
        'ngCookies',
        'ngSanitize',
        'ngRoute',
        'restangular',
        'ui.router',

        'svc.common',
        'ctrl.common',
        'ctrl.auth'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        // default url is root
        $urlRouterProvider.otherwise('/');

        //
        // Shared state object
        //
        var stateSearchTopic = {
            url: '/',
            views: {
                'content@': {
                    templateUrl: 'view/common/topic/search.html'
                },
            },
        };
        var stateSearchTopicResult = {
            url: '/q?kw',
            views: {
                'content@': {
                    templateUrl: 'view/common/topic/result.html'
                },
            },
        };
        var stateTopic = {
            url: '/t/{topic_id}',
            views: {
                'content@': {
                    templateUrl: 'view/common/topic/detail.html'
                },
            },
        };
        var stateGroup = {
            url: '/t/{topic_id}/g/{group_id}',
            views: {
                'content@': {
                    templateUrl: 'view/common/group/detail.html'
                },
            },
        };
        var stateAbout = {
            url: '^/about',
            views: {
                'content@': {
                    templateUrl: 'view/common/about.html'
                },
            },
        };
        var stateError = {
            url: '^/error',
            views: {
                'content@': {
                    templateUrl: 'view/common/error.html'
                },
            },
        }

        $stateProvider
        //
        // main states
        //
        .state('anony', {
            abstract: true,
            url: '/a',
            views: {
                'logo': {
                    templateUrl: 'view/anony/logo.html'
                },
                'ctrl': {
                    templateUrl: 'view/common/auth/form_login.html'
                },
                'footer': {
                    templateUrl: 'view/anony/footer.html'
                },
            },
        })
        .state('user', {
            abstract: true,
            url: '/u',
            views: {
                'header': {
                    templateUrl: 'view/user/header.html'
                },
                'footer': {
                    templateUrl: 'view/user/footer.html'
                },
            },
        })
        //
        // child state
        // - anonymous
        //
        .state('anony.search_topic', ng.copy(stateSearchTopic))
        .state('anony.search_topic_result', ng.copy(stateSearchTopicResult))
        .state('anony.topic', ng.copy(stateTopic))
        .state('anony.group', ng.copy(stateGroup))
        .state('anony.sign_up', {
            url: '/sign_up',
            views: {
                'content': {
                    templateUrl: 'view/common/auth/sign_up.html'
                },
            },
        })
        .state('anony.about', ng.copy(stateAbout))
        .state('anony.error', ng.copy(stateError))

        //
        // child state
        // - user (logined)
        //
        .state('user.search_topic', ng.copy(stateSearchTopic))
        .state('user.search_topic_result', ng.copy(stateSearchTopicResult))
        .state('user.topic', ng.copy(stateTopic))
        .state('user.group', ng.copy(stateGroup))
        .state('user.profile', {
            views: {
                'content': {
                    templateUrl: 'view/user/profile.html'
                },
            },
        })
        .state('user.setting', {
            views: {
                'content': {
                    templateUrl: 'view/user/setting.html'
                },
            },
        })
        .state('user.about', ng.copy(stateAbout))
        .state('user.error', ng.copy(stateError))
        ;
    })
    .run(['$rootScope', 'svc_common_ApiRestangular', function ($rootScope, ApiRestangular) {

        $rootScope.$on('$stateChangeSuccess', function (event, to, toP, from, fromP) {
            console.log(to);
        });
        $rootScope.$on('$stateChangeError', function (event, to, toP, from, fromP, err) {
        });


        // init UI state
        $rootScope.ui_state = {};
        $rootScope.ui_state.login = false;

        // init http-response cache, for error
        $rootScope.http_response = {};
        // init an invalid value to status code
        $rootScope.http_response.status = 0;

        // init global user object
        $rootScope.user = {};
        // query user-email from server, once queried, which
        // means we've login.
        var user = ApiRestangular.one('login');
        user.get().then(
            function (data) {
                $rootScope.user.email = data.email;
            },
            function (err) {
                $rootScope.ui_state.login = false;
            }
        );

        // TODO: check cookie for user-id
    }]);
});

