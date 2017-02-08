/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('roleManage', function ($scope, Role) {
    //角色页面展示
    var page = function () {
        Role.UserName({
            token: sessionStorage.getItem('token'),
            page: 1,
            start: 0,
            limit: 30
        }).then(function (data) {
            // console.log(data);
            $scope.roleManage = data.data.result;
        }, function () {
            swal("信息错误!")
        });
    };
    page();
    //角色修改
    $scope.roleModify = function () {
        Role.roleUserModify({
            token: sessionStorage.getItem('token'),
            roleId: this.role.id
        }).then(function (data) {
            console.log(data);
            $scope.manageData = data.data.result.name;
            $scope.manageDataChock = data.data.result.functions;
        }, function () {
            swal("信息错误!")
        });
    };
    //角色删除
    $scope.del = function () {
        var data = {
            token: sessionStorage.getItem('token'),
            id: this.role.id
        }
        var delData = function () {
            Role.roleDel(data).then(function (data) {
                console.log(data);
            }, function () {
                swal("信息错误!")
            });
        };
        swal({
            title: "确认删除此角色?",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            cancelButtonText:'取消'
        }, function () {
            setTimeout(function () {
                delData();
                swal("删除成功!");
                page();
            }, 2000);
        });
    }
});