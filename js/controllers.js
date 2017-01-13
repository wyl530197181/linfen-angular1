angular.module("myApp.controller", [])

    .controller('loginCtrl', function ($scope, $state) {

    })
    .controller('homePageCtrl', function ($scope, $state) {
        // $scope.login = 'hello world';
    })
    .controller('loginCtrl', function ($scope, $state) {

    })
    .controller('user-controlCtrl', function ($scope, $state) {

    })
    .controller('approvalCtrl', function ($scope, $state) {
        console.log(arguments);
        $scope.totalItems = 64;
    })
    .controller('publicityCtrl', function ($scope, $state) {
        console.log(arguments);
        $scope.totalItems = 64;
    })
;