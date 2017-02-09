/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('diaciplinary-treatmentCtrl', function ($scope, diaciplinary) {
    //纪律处分展示接口
    $scope.content={
        token: sessionStorage.getItem('token'),
        staff: '',
        page: 1,
        start: 0,
        limit: 999
    };
    //刷新页面
    $scope.refresh = function () {
        diaciplinary.diaciplinaryData($scope.content).then(
            function (data) {
                console.log(data);
                $scope.arr = data;
                $scope.bigTotalItems =  data.length-10;
            }, function () {
                console.log(arguments)
            });
    };
    $scope.refresh();
    //纪律处分查询数据
    $scope.search=function () {
        $scope.refresh()
    };
    //纪律处分添加数据
    $scope.add = function () {
        $scope.addData.title = '';
        $scope.addData.staff = '';
        $scope.addData.content = ''
    };
    $scope.addData = {
        token: sessionStorage.getItem('token'),
        title: '',
        content: '',
        staff: '',
        staffOrgId: 1
    };
    $scope.addSure = function () {
        diaciplinary.diaciplinaryAdd($scope.addData).then(
            function (data) {
                console.log(data);
                $('#myModal').modal('hide');
                swal("添加成功!", "", "success");
                $scope.refresh()
            }, function () {
                console.log(arguments)
            });
    };

    //纪律处分删除数据
    $scope.deleteData = {
        token: sessionStorage.getItem('token'),
        id: ''
    };
    $scope.remove = function () {
        console.log(this.data.id);
        $scope.deleteData.id = this.data.id;
        swal({
                title: "确定删除此项?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认删除!",
                cancelButtonText: "取消",
                closeOnConfirm: false
            },
            function () {
                diaciplinary.diaciplinaryDel($scope.deleteData).then(
                    function (data) {
                        console.log(data);
                        $scope.refresh()
                    },
                    function () {
                        console.log(arguments)
                    });
                swal("已删除!", "", "success");
                setTimeout(function () {
                    swal.close()
                }, 2000)
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
        $scope.zero=10*this.bigCurrentPage
    }
});