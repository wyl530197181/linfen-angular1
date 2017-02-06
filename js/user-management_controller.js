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
            console.log(this);
            var data = {
                token: sessionStorage.getItem('token'),
                id: this.obj.id
            };
            var delData = function () {
                userManage.deleteList(data).then(function (data) {
                    console.log(data);
                }, function () {
                    alert('信息有误')
                });
            };
            swal({
                title: "确认删除此角色?",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function () {
                setTimeout(function () {
                    delData();
                    swal("删除成功!");
                    $scope.refresh();
                }, 2000);

            });
        };
        $scope.add = function () {
            userManage.reviseList1({
                token: sessionStorage.getItem('token')
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
                    // console.log(arguments)
                });
        };
        $scope.addData = {
            token: sessionStorage.getItem('token'),
            orgId: 1,
            username: '',
            roleId: '',
            name: '',
            password: ''
        };
        $scope.confirms = function () {
            userManage.confirmLists($scope.addData).then(
                function (data) {
                    console.log(data);
                }, function () {
                    // console.log(arguments)
                });
            $scope.refresh();
        };

    });
