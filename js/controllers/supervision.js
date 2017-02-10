/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('supervisionCtrl', function ($scope, Supervision) {
    //未监督页面展示
    $scope.superviseUser = {
        token: sessionStorage.getItem('token'),
        staff: '',
        superviseStatus: -1,
        page: 1,
        start: 0,
        limit: 9999
    };
    var refresh = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        Supervision.supervisionList($scope.superviseUser).then(
            function (data) {
                // console.log(data);
                $.LoadingOverlay("hide");
                $scope.list = data.data.result;
                $scope.bigTotalItems =  data.data.result.length;
            }, function () {
                swal("信息错误!")
            });
    };
    refresh();
    //监督报告
    $scope.supervise = function () {
        $scope.determine = {
            title: '',
            content: '',
            token: sessionStorage.getItem('token'),
            eventId: this.lists.id
        };
        Supervision.getSupervision({
            token: sessionStorage.getItem('token'),
            eventId:this.lists.id
        }).then(
            function (data) {
                console.log(data);
                if(data.data.result!=null){
                    $scope.determine.title=data.data.result.title;
                    $scope.determine.content=data.data.result.content;
                }
            }, function () {
                swal("信息错误!")
            });
    };
    $scope.reportConfirm = function () {
        // console.log($scope.determine);
        Supervision.superviseReport($scope.determine).then(
            function (data) {
                refresh();
            }, function () {
                swal("信息错误!")
            });
    };
    //违纪登记
    $scope.discipline = function () {
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
        };
        Supervision.disciplineData({
            token: sessionStorage.getItem('token'),
            eventId: this.lists.id
        }).then(
            function (data) {
                if(data.data.result!=null){
                    // $scope.disciplineData.eventId=data.data.result.id;
                    if(data.data.result.isCashGiftOutOfLimits==true){
                        $scope.disciplineData.isCashGiftOutOfLimits='1';
                    }else {
                        $scope.disciplineData.isCashGiftOutOfLimits='0';
                    }
                    if(data.data.result.isUsePublicCar==true){
                        $scope.disciplineData.isUsePublicCar='1';
                    }else {
                        $scope.disciplineData.isUsePublicCar='0';
                    }
                    if(data.data.result.isUsePublicGoods==true){
                        $scope.disciplineData.isUsePublicGoods='1';
                    }else {
                        $scope.disciplineData.isUsePublicGoods='0';
                    }
                    if(data.data.result.isUsePublicAsserts==true){
                        $scope.disciplineData.isUsePublicAsserts='1';
                    }else {
                        $scope.disciplineData.isUsePublicAsserts='0';
                    }
                    if(data.data.result.isUsePublicMoney==true){
                        $scope.disciplineData.isUsePublicMoney='1';
                    }else {
                        $scope.disciplineData.isUsePublicMoney='0';
                    }
                    $scope.disciplineData.otherQuestion=data.data.result.otherQuestion;
                    $scope.disciplineData.content=data.data.result.content;
                }
            }, function () {
                swal("信息错误!")
            });
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
    $scope.superviseChange=function () {
        console.log(this);
        $scope.superviseUser.superviseStatus = this.superviseUser.superviseStatus;
        console.log($scope.superviseUser.superviseStatus);
    };
    $scope.query = function () {
        refresh();
    };
    //分页
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