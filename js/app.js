/**
 * Created by bobo on 17-1-11.
 */
angular.module("myApp", ['myApp.controller', 'ui.router'])
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
                views:{
                    'main':{
                        controller: '',
                        templateUrl: 'templates/declare.html'
                    }
                }
            })
            .state('homePage.user-management', {
                url: '/user-management',
                views:{
                    'main':{
                        controller: '',
                        templateUrl: 'templates/user-management.html'
                    }
                }
            })
            .state('homePage.role-management', {
                url: '/role-management',
                views:{
                    'main':{
                        controller: '',
                        templateUrl: 'templates/role-management.html'
                    }
                }
            })
        $urlRouterProvider.otherwise('homePage');
    });