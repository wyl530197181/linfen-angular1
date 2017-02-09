/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('approvalCtrl', function ($scope, $state, approval) {


    $scope.approvallist = {
        token: sessionStorage.getItem('token'),
        staff: '',
        auditStatus: -1,
        page: 1,
        start: 0,
        limit: 20
    };
    // 更新函数
    $scope.refresh = function () {
        approval.approvalList($scope.approvallist).then(
            function (succ) {
                // console.log(succ);
                $.LoadingOverlay('hide');
                $scope.approvalArry = succ.data.result;
                // Page($scope.approvalArry);
            },
            function () {
                console.log(arguments);
            }
        )
    };
    $scope.refresh();
    // 查询函数
    $scope.search = function () {
        $scope.refresh();//调用刷新页面
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
    };
    $scope.selectStatus = function () {
        console.log(event)
    };
    //审批通过
    $scope.dataId = '';
    $scope.dataType = '';
    $scope.pass = function () {
        console.log(this);
        $scope.confirmLists.content = '';
        $scope.dataId = this.obj.id;
        $scope.dataType = this.obj.eventType;
        approval.passList(
            {
                token: sessionStorage.getItem('token'),
                eventId: $scope.dataId,
                status: $scope.dataType
            }
        ).then(
            function (bb) {
                console.log(bb);
                if (bb.data.result == null) {
                    $scope.confirmLists.content = null
                } else {
                    $scope.confirmLists.content = bb.data.result.content
                }
            },
            function () {
            }
        );
    };

    //审批拒绝
    $scope.dataIds = '';
    $scope.dataTypes = '';
    $scope.reject = function () {
        console.log(this);
        $scope.rejectLists.content = '';
        $scope.dataIds = this.obj.id;
        $scope.dataTypes = this.obj.eventType;
        approval.rejectList(
            {
                token: sessionStorage.getItem('token'),
                eventId: $scope.dataIds,
                status: $scope.dataTypes
            }
        ).then(
            function (data) {
                console.log(data);
                if (data.data.result == null) {
                    $scope.rejectLists.content = null
                } else {
                    $scope.rejectLists.content = data.data.result.content
                }
            },
            function () {
            }
        )
    };
    // 通过模态框
    $scope.confirmLists = {
        token: sessionStorage.getItem('token'),
        eventId: '',
        status: '',
        content: ''
    };
    $scope.confirm = function () {
        console.log($scope.dataId);
        $scope.confirmLists.eventId = $scope.dataId;
        $scope.confirmLists.status = $scope.dataType;
        approval.confirmList(
            $scope.confirmLists
        ).then(
            function (data) {
                $.LoadingOverlay('hide');
                console.log(data);
                $scope.refresh();
                swal({
                    title: "",
                    text: "审批成功!",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    closeOnConfirm: false
                });
            },
            function () {
            }
        );

    };
    //拒绝模态框
    $scope.rejectLists = {
        token: sessionStorage.getItem('token'),
        eventId: '',
        status: '',
        content: ''
    };
    $scope.rejects = function () {
        $scope.rejectLists.eventId = $scope.dataIds;
        $scope.rejectLists.status = $scope.dataTypes;
        approval.confirmList($scope.rejectLists)
            .then(
                function (data) {
                    console.log(data);
                    $scope.refresh();
                    swal({
                            title: "",
                            text: "审批成功!",
                            type: "success",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            closeOnConfirm: false
                        }
                    );
                },
                function () {
                }
            );
    };
    //分页
    // function Page(pagearr) {
    //     $scope.length = pagearr.length;
    //
    //     $scope.numArry = [];
    //     for (var i = 0; i < $scope.length; i++) {
    //         $scope.numArry.push(i)
    //     }
    //     console.log($scope.numArry);
    //     $scope.currentPage = 0;
    //     $scope.changePage = function (num) {
    //         console.log(num);
    //         $scope.currentPage = num;
    //     };
    //     $scope.previous = function () {
    //         if ($scope.currentPage > 1) {
    //             $scope.currentPage--;
    //         }
    //     };
    //     $scope.next = function () {
    //         console.log($scope.length);
    //         if ($scope.currentPage < $scope.length)
    //             $scope.currentPage++;
    //
    //     }
    // }
    $scope.totalItems = 50;
    $scope.currentPage = 1;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.maxSize = 5;

    $scope.bigCurrentPage = 1;

    $scope.zero=1;

    $scope.paging=function () {
        $scope.zero=10*this.bigCurrentPage
    }
});