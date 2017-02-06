/**
 * Created by wangyuanlong on 17-1-24.
 */
angular.module("myApp.userManageCtrl", [])
    .controller('userManageCtrl', function ($scope, userManage) {
        //公开通报展示数据
        $scope.refresh = function () {
            userManage.userManageData({
                token: sessionStorage.getItem('token'),
                staff: '',
                page: 1,
                start: 0,
                limit: 30
            }).then(
                function (data) {
                    // console.log(data);
                    $scope.tabArray = data;
                }, function () {
                    // console.log(arguments)
                });
        };
        $scope.refresh();
        $scope.revise = function () {
            console.log(this);
            userManage.reviseList1({
                token: sessionStorage.getItem('token'),
                userId: this.obj.id
            }).then(
                function (data) {
                    // console.log(data);
                }, function () {
                    // console.log(arguments)
                });
            userManage.reviseList2({
                token: sessionStorage.getItem('token'),
                roleId: 0
            }).then(
                function (data) {
                    console.log(data);
                }, function () {
                    console.log(arguments)
                });
            userManage.reviseList3({
                token: sessionStorage.getItem('token'),
                userId: this.obj.id
            }).then(
                function (data) {
                    console.log(data);
                    $scope.name = data.name;
                    $scope.userName = data.username;
                    // $scope.roleName=data.role.functions;
                }, function () {
                    // console.log(arguments)
                });
        };

        $scope.confirm = function () {
            console.log(this);
            userManage.confirmList({
                token: sessionStorage.getItem('token'),
                userId: this.obj.id,
                orgId: 1,
                roleId: 1,
                name: this.obj.username,
                password: ''
            }).then(
                function (data) {
                    console.log(data);
                }, function () {
                    // console.log(arguments)
                });
            $scope.refresh();
        };
        $scope.delete = function () {
            swal({
                title: "确定删除此项?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认删除!",
                cancelButtonText: "取消",
                closeOnConfirm: false
            })
        }
    });
