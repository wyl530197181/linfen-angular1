/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('queryCtrl', function ($scope, $state, queryS) {
    $scope.queryCtrlList = {
        token: sessionStorage.getItem('token'),
        staff: '',
        staffOrgId: 1,
        page: 1,
        start: 0,
        limit: 30
    };
    $scope.query = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        queryS.queryLity($scope.queryCtrlList)
            .then(function (suc) {
                $scope.queryArr = suc.data.result;
                $scope.bigTotalItems =  suc.data.result.length;
                $.LoadingOverlay("hide")
            }, function () {
                swal('接口出错了');
            })
    };
    // 分页
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