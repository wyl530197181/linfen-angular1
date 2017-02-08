/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('publicityCtrl', function ($scope, $state, publicity) {
    $scope.publicityCtrlList = {
        token: sessionStorage.getItem('token'),
        staff: '',
        bulletinStatus: -1,
        page: 1,
        start: 0,
        limit: 20
    };
    $scope.refresh = function () {
        publicity.publicList($scope.publicityCtrlList)
            .then(
                function (success) {
                    console.log(success);
                    $scope.publicArr = success.data.result;
                    $.LoadingOverlay('hide');
                },
                function (error) {
                    swal('接口出错')
                }
            )
    };
    $scope.refresh();

    $scope.search = function () {
        $scope.refresh();
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });

    };
    $scope.selectStatus = function () {
        console.log(event)
    };
    // 公示内容接口
    $scope.publicContend = function () {
        console.log(this);
        $scope.publicContendList.content = '';
        $scope.eventId = this.data.id;
        publicity.publicContent(
            {
                token: sessionStorage.getItem('token'),
                eventId: $scope.eventId
            }
        ).then(
            function (success) {
                console.log(success);
                $scope.publicContendList.content = success.data.result.content;
            },
            function (error) {
                swal('接口出错')
            }
        )
    };
    //公示内容确认
    $scope.publicContendList = {
        token: sessionStorage.getItem('token'),
        eventId: '',
        content: '',
        attachmentFileCode: ''
    };
    $scope.publicContendConfirm = function () {
        $scope.publicContendList.eventId = $scope.eventId;
        publicity.publicContentConfirm($scope.publicContendList)
            .then(
                function (success) {
                    // console.log(success);
                    $scope.refresh();
                    swal({
                            title: "",
                            text: "公示成功!",
                            type: "success",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            closeOnConfirm: false
                        }
                    );
                },
                function (error) {
                    swal('接口出错')
                }
            );

    };
//公示结果
    $scope.publicOutcome = function () {
        console.log(this);
        $scope.publicOutcomeList.content = '';
        $scope.eventIds = this.data.id;
        publicity.publicContent(
            {
                token: sessionStorage.getItem('token'),
                eventId: $scope.eventIds
            }
        ).then(
            function (success) {
                console.log(success);
                $scope.publicOutcomeList.content = success.data.result.content;
            },
            function (error) {
                alert('接口出错')
            }
        )
    };
    $scope.publicOutcomeList = {
        token: sessionStorage.getItem('token'),
        eventId: '',
        content: '',
        status: ''
    };
    $scope.publicOutcomeConfirm = function () {
        // console.log(this);
        $scope.publicOutcomeList.eventId = $scope.eventIds;
        $scope.publicOutcomeList.status = this.data.eventType;

        publicity.publicOutcomeConfirm($scope.publicOutcomeList)
            .then(
                function (success) {
                    console.log(success);
                },
                function (error) {
                    alert('接口出错')
                }
            );
        swal({
                title: "",
                text: "公示结果成功!",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: false
            }
        );
        $scope.refresh();
    };
});