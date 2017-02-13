/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('roleManage', function ($scope, Role) {
    //角色页面展示
    var page = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        Role.UserName({
            token: sessionStorage.getItem('token'),
            page: 1,
            start: 0,
            limit: 999
        }).then(function (data) {
            // console.log(data);
            $.LoadingOverlay("hide");
            $scope.roleManage = data.data.result;
            $scope.bigTotalItems =  data.data.result.length;
        }, function () {
            swal("信息错误!")
        });
    };
    page();
    //角色添加
    $scope.added={
        token: sessionStorage.getItem('token'),
        roleName:'',
        functionCodes:''
    };
    $scope.roleAdded=function () {
        $('input[type="checkbox"]').each(function (value,a) {
            if(a.checked==true){
                $scope.added.functionCodes=a.value;
                console.log($scope.added.functionCodes);
            }
        });
        //添加角色接口
        $('#myModal1').modal('hide');
        Role.roleAdd($scope.added).then(
            function (data) {

                console.log(data);
                page();
            }, function () {
                swal("信息错误!")
        });
    };
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
    };
    // 分页
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.maxSize = 5;

    $scope.bigCurrentPage = 1;

    $scope.zero=0;

    $scope.paging=function () {
        $scope.zero=(this.bigCurrentPage-1)*10;
    }
});