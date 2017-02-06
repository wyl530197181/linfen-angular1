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
                    Page($scope.approvalArry);
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
        $scope.passLists = {
            token: sessionStorage.getItem('token'),
            eventId: '',
            status: 1
        };
        $scope.pass = function (index) {
            console.log(this);
            $scope.passLists.eventId = $scope.approvalArry[index].id;
            $scope.passId = $scope.passLists.eventId;
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
            $scope.rejectId = $scope.rejectLists.eventId;
            approval.rejectList($scope.rejectLists).then(
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
            status: 1,
            content: ''
        };
        var aa = $scope.confirmLists.content;
        $scope.confirm = function () {
            $scope.confirmLists.eventId = $scope.passId;
            console.log($scope.confirmLists.eventId);
            approval.confirmList($scope.confirmLists).then(
                function (data) {
                    console.log(data);
                },
                function () {
                }
            );
            $scope.refresh();

        };
        //拒绝模态框
        $scope.rejectLists = {
            token: sessionStorage.getItem('token'),
            eventId: '',
            status: 1,
            content: ''
        };
        var aa = $scope.rejectLists.content;
        $scope.rejects = function () {
            $scope.rejectLists.eventId = $scope.$scope.rejectId;
            console.log($scope.rejectLists.eventId);
            approval.confirmList($scope.rejectLists).then(
                function (data) {
                    console.log(data);
                },
                function () {
                }
            );
            $scope.refresh();

        };
        //分页
        function Page(pagearr) {
            $scope.length = pagearr.length;

            $scope.numArry=[];
            for (var i=0;i<$scope.length;i++){
                $scope.numArry.push(i)
            }
            console.log($scope.numArry);
            $scope.currentPage = 0;
            $scope.changePage = function (num) {
                console.log(num);
                $scope.currentPage=num;
            };
            $scope.previous = function () {
                if ($scope.currentPage > 1) {
                    $scope.currentPage--;
                }
            };
            $scope.next = function () {
                console.log($scope.length);
                if ($scope.currentPage < $scope.length)
                    $scope.currentPage++;

            }
        }
    });
// 审批页面结束