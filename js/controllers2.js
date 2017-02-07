/**
 * Created by bobo on 17-1-14.
 */
angular.module("myApp.controller2", [])
    .controller('public-notificationCtrl', function ($scope, public) {
        //公开通报展示数据
        public.publicData({
            token: sessionStorage.getItem('token'),
            staff: '',
            page: 1,
            start: 0,
            limit: 30
        }).then(
            function (data) {
                console.log(data);
                $scope.tabArray = data
            }, function () {
                console.log(arguments)
            });

        //公开通报查询数据
        $scope.search = function () {
            public.publicData({
                token: sessionStorage.getItem('token'),
                staff: '',
                page: 1,
                start: 0,
                limit: 30
            }).then(
                function (data) {
                    console.log(data);
                    $scope.tabArray = data
                }, function () {
                    console.log(arguments)
                });
        };
        //公开通报添加数据
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
                    swal("添加成功!", "", "success");
                    $('#myModal').modal('hide');
                    $scope.search()
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
                            $scope.search()
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
        $scope.revamp = function () {
            console.log(this);
            // $('#myModal1').modal('show');
            public.publicUpdate({
                token: sessionStorage.getItem('token')
                // id: this.data.id
                // title: '',
                // content: '',
                // staff: '',
                // staffOrgId: 1
            }).then(
                function (data) {
                    console.log(data);
                    // $scope.title=data.title;
                    // $scope.staff=data.staff;
                    // $scope.content=data.content
                }, function () {
                    console.log(arguments)
                });
            // $scope.search()
            public.publicUpdate2({
                token: sessionStorage.getItem('token'),
                id: this.data.id
                // title: '',
                // content: '',
                // staff: '',
                // staffOrgId: 1
            }).then(
                function (data) {
                    console.log(data);
                    $scope.title=data.title;
                    $scope.staff=data.staff;
                    $scope.content=data.content
                }, function () {
                    console.log(arguments)
                });
        };

    })
    .controller('diaciplinary-treatmentCtrl', function ($scope, diaciplinary) {
        //纪律处分展示接口
        diaciplinary.diaciplinaryData({
            token: sessionStorage.getItem('token'),
            staff: '',
            page: 1,
            start: 0,
            limit: 30

        }).then(function (data) {
            console.log(data);
            $scope.arr = data
        }, function () {
            console.log(arguments)
        });
        //纪律处分查询数据
        $scope.search = function () {
            diaciplinary.diaciplinaryData({
                token: sessionStorage.getItem('token'),
                staff: '',
                page: 1,
                start: 0,
                limit: 30
            }).then(
                function (data) {
                    console.log(data);
                    $scope.arr = data
                }, function () {
                    console.log(arguments)
                });
        };
        //纪律处分添加数据
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
                    $scope.search()
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
                            $scope.search()
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
    });


