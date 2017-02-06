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
            $scope.publicContendList = {
                token: sessionStorage.getItem('token'),
                eventId: this.data.id,
                content: '',
                attachmentFileCode: ''
            };
        };
        $scope.publicContendConfirm = function () {
            publicity.publicContent($scope.publicContendList)
                .then(
                    function (success) {
                        console.log(success);
                    },
                    function (error) {
                        alert('接口出错')
                    }
                )
        };
        //公示结果
        $scope.publicOutcome = function () {
            console.log(this);
            $scope.publicOutcomeList = {
                token: sessionStorage.getItem('token'),
                eventId: this.data.id,
                content: '',
                status: ''
            };
        };
        $scope.publicOutcomeConfirm = function () {
            publicity.publicOutcome($scope.publicOutcomeList)
                .then(
                    function (success) {
                        console.log(success);
                    },
                    function (error) {
                        alert('接口出错')
                    }
                )
        };
    });
