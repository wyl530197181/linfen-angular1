/**
 * Created by bobo on 17-1-11.
 */
angular.module("myApp", ['myApp.controller','myApp.service', 'ui.router', 'ui.bootstrap'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'loginCtrl',
                templateUrl: 'templates/login.html'
            })
            .state('homePage', {
                url: '/homepage',
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
            .state('homePage.userManagement', {
                url: '/user-management',
                views: {
                    'main': {
                        controller: 'userManageCtrl',
                        templateUrl: 'templates/user-management.html'
                    }
                }
            })
            .state('homePage.roleManagement', {
                url: '/role-management',
                views: {
                    'main': {
                        controller: 'roleManage',
                        templateUrl: 'templates/role-management.html'
                    }
                }
            })

            .state('homePage.publicNotification', {
                url: '/public-notification',
                views: {
                    'main': {
                        controller: 'public-notificationCtrl',
                        templateUrl: 'templates/public-notification.html'
                    }
                }
            })
            .state('homePage.diaciplinaryTreatment', {
                url: '/diaciplinary-treatment',
                views: {
                    'main': {
                        controller: '',
                        templateUrl: 'templates/diaciplinary-treatment.html'
                    }
                }
            })
            .state('homePage.preciseQuery', {
                url: '/precise-query',
                views: {
                    'main': {
                        controller: 'queryCtrl',
                        templateUrl: 'templates/precise-query.html'
                    }
                }
            })
            .state('homePage.combinationQuery', {
                url: '/combination-query',
                views: {
                    'main': {
                        controller: 'combination-queryCtrl',
                        templateUrl: 'templates/combination-query.html'
                    }
                }
            })
            .state('homePage.quantityStatistics', {
                url: '/quantity-statistics',
                views: {
                    'main': {
                        controller: 'statisticsCtrl',
                        templateUrl: 'templates/quantity-statistics.html'
                    }
                }
            })
            .state('homePage.supervision', {
                url: '/supervision',
                views: {
                    'main': {
                        controller: 'supervisionCtrl',
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