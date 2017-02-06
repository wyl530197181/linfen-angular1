/**
 * Created by wangyuanlong on 17-1-18.
 */

angular.module('myApp.approvalCtrl', [])
    .controller('approvalCtrl', function ($scope, $state, approval) {
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
        };
        $scope.selectStatus = function () {
            console.log(event)
        };
        //审批通过

        $scope.pass = function () {
            approval.passList(
                {
                    token: sessionStorage.getItem('token'),
                    eventId: this.obj.id,
                    status: this.obj.eventType
                }
            ).then(
                function (bb) {
                    console.log(bb);
                },
                function () {
                }
            );
        };
        //审批拒绝
        $scope.reject = function () {
            console.log(this);
            approval.rejectList(
                {
                    token: sessionStorage.getItem('token'),
                    eventId: this.obj.id,
                    status: this.obj.eventType
                }
            ).then(
                function (data) {
                    console.log(data);
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
            // console.log(this);
            $scope.confirmLists.eventId = this.obj.id;
            $scope.confirmLists.status = this.obj.eventType;
            approval.confirmList(
                $scope.confirmLists
            ).then(
                function (data) {
                    console.log(data);
                },
                function () {
                }
            );
            swal({
                    title: "",
                    text: "审批成功!",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    closeOnConfirm: false
                }
            );
            $scope.refresh();

        };
        //拒绝模态框
        $scope.rejectLists = {
            token: sessionStorage.getItem('token'),
            eventId: '',
            status: '',
            content: ''
        };
        $scope.rejects = function () {
            // console.log(this);
            $scope.rejectLists.eventId = this.obj.id;
            $scope.rejectLists.status = this.obj.eventType;
            approval.confirmList($scope.rejectLists).then(
                function (data) {
                    console.log(data);
                },
                function () {
                }
            );
            swal({
                    title: "",
                    text: "审批成功!",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    closeOnConfirm: false
                }
            );
            $scope.refresh();

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
    });
// 审批页面结束