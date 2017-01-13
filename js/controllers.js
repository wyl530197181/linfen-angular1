/**
 * Created by bobo on 17-1-11.
 */
angular.module("myApp.controller", [])

    .controller('loginCtrl', function ($scope, $state) {
        $scope.user={
            name:'',
            password:''
        };
        $scope.login=function () {
            $state.go('homePage');
        }
    })
    .controller('homePageCtrl', function ($scope, $state) {

    })
    .controller('user-controlCtrl', function ($scope, $state) {

    });