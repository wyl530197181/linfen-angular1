/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('supervisionCtrl', function ($scope, Supervision) {
    //未监督页面展示
    $scope.superviseUser = {
        token: sessionStorage.getItem('token'),
        staff: '',
        superviseStatus: 1,
        page: 1,
        start: 0,
        limit: 50
    };
    var refresh = function () {
        Supervision.supervisionList($scope.superviseUser).then(
            function (data) {
                $scope.list = data.data.result;
            }, function () {
                swal("信息错误!")
            });
    };
    refresh();
    $scope.supervise = function () {
        $scope.determine = {
            title: '',
            content: '',
            token: sessionStorage.getItem('token'),
            eventId: this.lists.id
        };
    };
    //监督报告
    $scope.reportConfirm = function () {
        console.log($scope.determine);
        Supervision.superviseReport($scope.determine).then(
            function (data) {
                refresh();
            }, function () {
                swal("信息错误!")
            });

    };
    //违纪登记
    $scope.discipline = function () {
        Supervision.disciplineData({
            token: sessionStorage.getItem('token'),
            eventId: this.lists.id
        }).then(
            function (data) {
                console.log(data);
            }, function () {
                swal("信息错误!")
            });
        $scope.disciplineData = {
            token: sessionStorage.getItem('token'),
            eventId: this.lists.id,
            isCashGiftOutOfLimits: 0,//礼金超标
            isUsePublicCar: 0,//使用公车
            isUsePublicGoods: 0,//使用公产
            isUsePublicAsserts: 0,//使用公务
            isUsePublicMoney: 0,//使用公款
            attachmentFileCode: '',//附件
            otherQuestion: '',//其他问题
            content: ''//意见内容
        }
    };
    $scope.disciplineConfirm = function () {
        Supervision.disciplineList($scope.disciplineData).then(
            function (data) {
                // console.log(data);
            }, function () {
                swal("信息错误!")
            });
    };
    //现场监督--已监督
    $scope.query = function () {
        refresh();
    };
    //分页
    $scope.totalItems = 50;
    $scope.currentPage = 1;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
});