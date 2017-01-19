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
                    console.log(succ);
                    $scope.approvalArry = succ.data.result;
                    // console.log($scope.approvalArry)
                },
                function () {
                    console.log(arguments);
                }
            );
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
        $scope.passLists = {
            token: sessionStorage.getItem('token'),
            eventId: '',
            status: 1
        };
        $scope.pass = function (index) {
            // console.log(index);
            $scope.passLists.eventId = $scope.approvalArry[index].id;
            console.log($scope.passLists.eventId);
            approval.passList($scope.passLists).then(
                function (bb) {
                    console.log(bb);
                },
                function () {
                }
            )
        };
        //审批拒绝
        $scope.rejectLists = {
            token: sessionStorage.getItem('token'),
            eventId: '',
            status: 2
        };
        $scope.reject = function (index) {
            console.log(index);
            $scope.rejectLists.eventId = $scope.approvalArry[index].id;
            approval.rejectList($scope.rejectLists).then(
                function (data) {
                    console.log(data);
                },
                function () {
                }
            )
        };
        // 模态框
        $scope.confirmLists = {
            token: sessionStorage.getItem('token'),
            eventId: '',
            status: 1,
            content: ''
        };
        var aa = $scope.confirmLists.content;
        $scope.confirm = function (index) {

            $scope.confirmLists.eventId = $scope.approvalArry[index].id;
            approval.confirmList($scope.confirmLists).then(
                function (data) {
                    console.log(data);
                },
                function () {
                }
            );
            $scope.refresh();

        };
        //分页
        $scope.pageSplice = function () {
            $scope.pageNum = 1;
            $scope.count = 5;
            //     Math.ceil( $scope.approvalArry.length / $scope.pageNum);//分几页
            // console.log( $scope.approvalArry.length);
            //按钮点击获取当前点击$index
            $scope.numberClick = function ($index) {
                $scope.tihsnum = $index + 1;
            };
            //上一页
            $scope.myLeft = function () {
                $scope.tihsnum--;
            };
            //下一页
            $scope.myRight = function () {
                $scope.tihsnum++;
            };
        }
    });
// 审批页面结束