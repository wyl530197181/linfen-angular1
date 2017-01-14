/**
 * Created by bobo on 17-1-11.
 */
angular.module("myApp.controller", [])

    .controller('loginCtrl', function ($scope, loginUser) {
        $scope.user = {
            name: '',
            password: ''
        };
        $scope.nameLogin = function () {
            if ($scope.user.name == '' || $scope.user.password == '') {
                alert('信息不全');
                return;
            } else {
                loginUser.login($scope.user).then(
                    function (data) {
                        console.log(data);
                        // window.localStorage.setItem('token',data.token);
                        // window.localStorage.setItem('name',data.user.username);
                        // window.localStorage.setItem('roleId',data.user.id);
                    },
                    function () {
                        console.log(arguments);
                    }
                );
            }
        }
    })
    .controller('homePageCtrl', function ($scope, $state) {

    })

    .controller('user-controlCtrl', function ($scope, $state) {

    })
