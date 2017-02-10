/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('public-notificationCtrl', function ($scope, public) {
    //公开通报展示数据
    $scope.content = {
        token: sessionStorage.getItem('token'),
        staff: '',
        page: 1,
        start: 0,
        limit: 999
    };
    //刷新页面
    $scope.refresh = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        public.publicData($scope.content).then(
            function (data) {
                console.log(data);
                $.LoadingOverlay("hide");
                $scope.tabArray = data;
                $scope.bigTotalItems =  data.length;
            }, function () {
                console.log(arguments)
            });
    };
    $scope.refresh();
    //公开通报查询数据
    $scope.search = function () {
        $scope.refresh();
    };
    //公开通报添加数据
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
        public.publicAdd($scope.addData).then(
            function (data) {
                console.log(data);
                $('#myModal').modal('hide');
                swal("添加成功!", "", "success");
                $scope.refresh()
            }, function () {
                console.log(arguments)
            });
    };
    //公开通报删除数据
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
                public.publicDel($scope.deleteData).then(
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
    //公开通报修改数据
    $scope.publicUpdate= {
        token: sessionStorage.getItem('token'),
        id: '',
        title: '',
        content: '',
        staff: '',
        staffOrgId: 1
    };
    $scope.revamp = function () {
        console.log(this.data.id);
        $scope.publicUpdate.id = this.data.id;
        $('#myModal1').modal('hide');
        public.publicUpdate($scope.publicUpdate).then(
            function (data) {
                console.log(data);
                if(data.data.success){
                    $scope.publicUpdate.title=data.data.result.title,
                    $scope.publicUpdate.staff=data.data.result.staff,
                    $scope.publicUpdate.content=data.data.result.content
                }
            }, function () {
                console.log(arguments)
            });
    };
    //修改模态中的确认
    $scope.revampSure = function () {
        console.log(this.data.id);
        $scope.publicUpdate.id = this.data.id;
        public.publicUpdate1($scope.publicUpdate).then(
            function (data) {
                console.log(data);
                $('#myModal1').modal('hide');
                swal("修改成功!", "", "success");
                $scope.refresh()
            }, function () {
                console.log(arguments)
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
