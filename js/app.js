/**
 * Created by bobo on 17-1-11.
 */
angular.module("myApp", ['myApp.controller', 'myApp.service', 'ui.router',
    'myApp.controller2','myApp.bo-service',
    'myApp.approval','myApp.approvalCtrl','myApp.publicityCtrl','myApp.publicity'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'loginCtrl',
                templateUrl: 'templates/login.html'
            })
            .state('homePage', {
                url: '/homePage',
                controller: 'homePageCtrl',
                templateUrl: 'templates/homePage.html'
            })
            .state('homePage.declare', {
                url: '/declare',
                views: {
                    'main': {
                        controller: 'declareCtrl',
                        templateUrl: 'templates/declare.html'
                    }
                }
            })
            .state('homePage.user-management', {
                url: '/user-management',
                views: {
                    'main': {
                        controller: '',
                        templateUrl: 'templates/user-management.html'
                    }
                }
            })
            .state('homePage.role-management', {
                url: '/role-management',
                views: {
                    'main': {
                        controller: '',
                        templateUrl: 'templates/role-management.html'
                    }
                }
            })

            .state('homePage.public-notification', {
                url: '/public-notification',
                views: {
                    'main': {
                        controller: 'public-notificationCtrl',
                        templateUrl: 'templates/public-notification.html'
                    }
                }
            })
            .state('homePage.diaciplinary-treatment', {
                url: '/diaciplinary-treatment',
                views: {
                    'main': {
                        controller: '',
                        templateUrl: 'templates/diaciplinary-treatment.html'
                    }
                }
            })
            .state('homePage.precise-query', {
                url: '/precise-query',
                views: {
                    'main': {
                        controller: '',
                        templateUrl: 'templates/precise-query.html'
                    }
                }
            })
            .state('homePage.combination-query', {
                url: '/combination-query',
                views: {
                    'main': {
                        controller: '',
                        templateUrl: 'templates/combination-query.html'
                    }
                }
            })
            .state('homePage.quantity-statistics', {
                url: '/quantity-statistics',
                views: {
                    'main': {
                        controller: '',
                        templateUrl: 'templates/quantity-statistics.html'
                    }
                }
            })
            .state('homePage.supervision', {
                url: '/supervision',
                views: {
                    'main': {
                        controller: '',
                        templateUrl: 'templates/supervision.html'
                    }
                }
            })
            .state('homePage.approval', {
                url: '/approval',
                views: {
                    'main': {
                        controller: 'approvalCtrl',
                        templateUrl: 'templates/approval.html'
                    }
                }
            })
            .state('homePage.publicity', {
                url: '/publicity',
                views: {
                    'main': {
                        controller: 'publicityCtrl',
                        templateUrl: 'templates/publicity.html'
                    }
                }
            });
        $urlRouterProvider.otherwise('login');
    });