/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('loginCtrl', function ($scope, loginUser) {
    $scope.user = {
        name: '',
        password: ''
    };
    $scope.nameLogin = function () {
        if (Boolean($scope.user.name )==true && Boolean($scope.user.password )== true) {
            $.LoadingOverlay("show", {
                image: "img/oval.svg",
                bgcolor: 'rgba(28,43,54,0.7)'
            });
            loginUser.login($scope.user)
                .then(function (data) {
                    console.log(data,'success');
                    $scope.data=data;
                        window.sessionStorage.setItem('token', data.data.result.token);
                    if (data.data.result == null) {
                        console.log(data.data.result);
                        swal('帐号或密码不正确,请重新输入!');
                        $.LoadingOverlay("hide");
                    }else{
                        $.LoadingOverlay("hide");
                    }
                },
                function (data) {
                    console.log(data,'fail');
                    $.LoadingOverlay("hide");
                }
            );
        }
        else {
            swal("帐号或密码不能为空,请输入!");
        }
    }
});