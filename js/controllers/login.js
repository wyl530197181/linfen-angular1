/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('loginCtrl', function ($scope, loginUser) {
    $scope.user = {
        token: sessionStorage.getItem('token'),
        name: 'yiyi',
        password: '123456'
    };
    $scope.nameLogin = function () {
        if ($scope.user.name != '' && $scope.user.password != undefined) {
            $.LoadingOverlay("show", {
                image: "img/oval.svg",
                bgcolor: 'rgba(28,43,54,0.7)'
            });
            loginUser.login($scope.user).then(
                function (data) {
                    $.LoadingOverlay("hide");
                    console.log(data);
                    window.sessionStorage.setItem('token', data.token);
                },
                function () {
                    $.LoadingOverlay("hide");
                }
            );
        } else {
            swal("用户名或者密码有误!");
        }
    }
});