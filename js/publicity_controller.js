/**
 * Created by wangyuanlong on 17-1-18.
 */
angular.module('myApp.publicityCtrl', [])
    .controller('publicityCtrl', function ($scope, $state, publicity) {
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
                        // console.log( $scope.publicArr);
                    },
                    function (error) {
                        alert('接口出错')
                    }
                )
        };
        $scope.refresh();

        $scope.search = function () {
            $scope.refresh();

        };
        // 公示内容接口
        $scope.publicContend = function () {
            console.log(this);
            publicity.publicContent(
                {
                    token: sessionStorage.getItem('token'),
                    eventId: this.data.id
                }
            )
                .then(
                    function (success) {
                        console.log(success);
                    },
                    function (error) {
                        alert('接口出错')
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
            console.log(this);

            $scope.publicContendList.eventId = this.data.id;
            publicity.publicContentConfirm($scope.publicContendList)
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
                    text: "公示成功!",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    closeOnConfirm: false
                }
            );
            $scope.refresh()
        };
//公示结果
        $scope.publicOutcome = function () {
            console.log(this);
            publicity.publicContent(
                {
                    token: sessionStorage.getItem('token'),
                    eventId: this.data.id
                }
            ).then(
                function (success) {
                    console.log(success);
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
            $scope.publicOutcomeList.eventId = this.data.id;
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
                    closeOnConfirm: false
                }
            );
            $scope.refresh();
        };
    })
;
