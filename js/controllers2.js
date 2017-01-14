/**
 * Created by bobo on 17-1-14.
 */
angular.module("myApp.controller2", [])
    .controller('public-notificationCtrl', function ($scope) {
        $scope.tabArr = [];
        $scope.isShow = false;
        //时间
        setInterval(function () {
            $scope.myTime = new Date().toLocaleString()
        }, 1000);
        //清理模态框内容
        $scope.add = function () {
            $scope.name = '';
            $scope.tittle = '';
            $scope.content=''
        };
        //模态框中内容添加到表格
        $scope.addSure = function () {
            $scope.isShow = true;
            $scope.tabArr.push({
                name: $scope.name,
                department: '根组织',
                tittle: $scope.tittle,
                times: $scope.myTime,
                content:$scope.content,
                isEdit: false
            });
            //隐藏模态框
            $('#myModal').modal('hide');
        };
        //修改
        $scope.revamp=function () {

        }
    });