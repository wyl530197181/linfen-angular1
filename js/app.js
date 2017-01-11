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
            .state('declare', {
                url: '/declare',
                controller: 'declareCtrl',
                templateUrl: 'templates/declare.html'
            })
            .state('homePage', {
                url: '/homePage',
                controller: 'homePageCtrl',
                templateUrl: 'templates/homePage.html'
            });
        $urlRouterProvider.otherwise('/homePage');
    });