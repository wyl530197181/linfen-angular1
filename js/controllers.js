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
                        window.sessionStorage.setItem('token',data.token);
                        window.sessionStorage.setItem('name',data.user.username);
                        window.sessionStorage.setItem('roleId',data.user.id);
                    },
                    function () {
                        console.log(arguments);
                    }
                );
            }
        }
    })
    .controller('declareCtrl', function ($scope, userList) {
        $scope.declare={
            name:'',//申报人
            relation:'',//与申报人关系
            political:'',//政治面貌
            duty:'',//单位职务
            spouse:'', //配偶
            phone:'',//联系电话
            matter:'',//操办事项
            number:'',//操办次数
            date:'',//操办时间
            site:'',//操办地点
            tableNumber:'',//操办桌数
            peoples:'',//参加人数
            scope:'',//邀请范围
            cars:'',//用车数量
            source:'',//用车来源
            section:'',//所属部门
            list:'',//邀请名单
            promise:'',//本人承诺
            promiseMen:''//承诺人
        };
        $scope.submit=function () {
            userList.userlist($scope.declare).then(
                function (data) {
                    console.log(data);
                },
                function () {
                    console.log(arguments);
                }
            )

        }
    })
    .controller('homePageCtrl', function ($scope, $state) {
        $scope.logout=function () {
            $state.go('login')
        }
    })

    .controller('user-controlCtrl', function ($scope, $state) {

    })
