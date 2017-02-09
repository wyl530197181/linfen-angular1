/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('combination-queryCtrl', function ($scope, $state, combination_query) {
    $('.datetimepicker').datetimepicker({
        format: 'yyyy-mm-dd hh:ii'
    });
    $scope.com_queryCtrlList = {
        token: sessionStorage.getItem('token'),
        eventType: '',
        peopleCountMin: '',
        peopleCountMax: '',
        eventCreateTimeFrom: '',
        eventCreateTimeTo: '',
        eventTimeFrom: '',
        eventTimeTo: '',
        page: 1,
        start: 0,
        limit: 999
    };

    $scope.selectPeopleCount = function () {
        if ($scope.com_queryCtrlList.peopleCount == '') {
            $scope.com_queryCtrlList.peopleCountMin = '';
            $scope.com_queryCtrlList.peopleCountMax = '';
        } else {
            $scope.com_queryCtrlList.peopleCountMix = this.com_queryCtrlList.peopleCount.substr(0, 3);
            $scope.com_queryCtrlList.peopleCountMax = this.com_queryCtrlList.peopleCount.substr(3, 3);
        }
    };
    $scope.search = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        combination_query.com_queryLity($scope.com_queryCtrlList)
            .then(function (suc) {
                console.log(suc);
                $scope.com_queryyArr = suc.data.result;
                $scope.bigTotalItems =  suc.data.result.length-10;
                $.LoadingOverlay("hide")

            }, function () {
                swal('接口出错了');
            });
        // 分页
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.maxSize = 5;

        $scope.bigCurrentPage = 1;

        $scope.zero=1;

        $scope.paging=function () {
            $scope.zero=10*this.bigCurrentPage
        }
    };

});