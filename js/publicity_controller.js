/**
 * Created by wangyuanlong on 17-1-18.
 */
angular.module('myApp.publicityCtrl', [])
    .controller('publicityCtrl', function ($scope, $state, publicity) {
        $scope.publicityCtrlList = {
            token: sessionStorage.getItem('token'),
            staff: '',
            auditStatus: -1,
            page: 1,
            start: 0,
            limit: 20
        };
        $scope.refresh = function () {
            publicity.publicList( $scope.publicityCtrlList)
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
    });