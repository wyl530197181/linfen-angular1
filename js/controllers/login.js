/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('loginCtrl', function ($scope, loginUser) {
    $scope.user = {
        name: 'yiyi',
        password: '123456'
    };
    $scope.nameLogin = function () {
        if ($scope.user.name == '' || $scope.user.password == '') {
            swal("用户名或者密码有误!");
            return;
        } else {
            loginUser.login($scope.user).then(
                function (data) {
                    // console.log(data);
                    window.sessionStorage.setItem('token', data.token);
                },
                function () {
                    console.log(arguments);
                }
            );
        }
    }
});