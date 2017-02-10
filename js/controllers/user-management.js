/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('userManageCtrl', function ($scope, userManage) {
    //公开通报展示数据
    $scope.refresh = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        userManage.userManageData({
            token: sessionStorage.getItem('token'),
            staff: '',
            page: 1,
            start: 0,
            limit: 999
        }).then(
            function (data) {
                $.LoadingOverlay("hide");
                // console.log(data);
                $scope.tabArray = data;
                $scope.bigTotalItems = data.length;
            }, function () {
                // console.log(arguments)
            });
    };
    $scope.refresh();
    $scope.revise = function () {
        // console.log(this);
        $scope.updateParams = {
            token: sessionStorage.getItem('token'),
            userId: this.obj.id,
            orgId: 1,
            roleId: 1,
            name: '',
            password: ''
        };
        userManage.reviseList1({
            token: sessionStorage.getItem('token'),
            userId: this.obj.id
        }).then(
            function (data) {
                // console.log(data);
            }, function () {
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
                $scope.updateParams.name=data.name;
                $scope.userName = data.username;//用户名
            }, function () {
            });
    };


    $scope.confirm = function () {

        userManage.confirmList($scope.updateParams).then(
            function (data) {
                console.log(data);
                $scope.refresh();
            }, function () {
            });
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
                swal('信息有误')
            });
        };
        swal({
            title: "确认删除此角色?",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            cancelButtonText: '取消'
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
        roleId: '266',
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
    // 分页
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.maxSize = 5;

    $scope.bigCurrentPage = 1;

    $scope.zero = 0;

    $scope.paging = function () {
        $scope.zero = (this.bigCurrentPage - 1) * 10;
    }
});