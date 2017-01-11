/**
 * Created by bobo on 17-1-11.
 */
angular.module("myApp.controller", [])

    .controller('loginCtrl', function ($scope, $state) {
        $scope.login = 'hello world';
        // $state.go('login');
    })
    .controller('loginCtrl', function ($scope, $state) {
        $scope.login = 'hello world';
        // $state.go('declare');
    })
    .controller('homePageCtrl', function ($scope, $state) {
    $scope.login = 'hello world';
    $state.go('homePage');
});