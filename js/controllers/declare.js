/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('declareCtrl', function ($scope, UserList) {
    $scope.relation = function () {
        $scope.declare.staffRelationship = this.declare.staffRelationship;
    };
    $scope.duty = function () {
        $scope.declare.staffJob = this.declare.staffJob;
    };
    $scope.matter = function () {
        $scope.declare.eventType = this.declare.eventType;
    };
    $scope.section = function () {
        $scope.declare.attachmentFileCode = this.declare.attachmentFileCode;
    };
    $scope.declare = {
        staff: '',//申报人
        staffRelationship: '',//与申报人关系
        staffPoliticalStatus: '',//政治面貌
        staffJob: '',//单位职务
        staffSpouse: '', //配偶
        staffPhone: '',//联系电话
        eventType: '',//操办事项
        eventCount: '',//操办次数
        eventDate: '',//操办时间
        location: '',//操办地点
        tableCount: '',//操办桌数
        peopleCount: '',//参加人数
        peopleRange: '',//邀请范围
        carCount: '',//用车数量
        carSource: '',//用车来源
        attachmentFileCode: '',//所属部门
        selfPromise: '',//邀请名单
        promisePeople: '',//本人承诺
        staffOrgId: '',//承诺人
        token: sessionStorage.getItem('token'),
    };
    $scope.submit = function () {
        UserList.userlist($scope.declare).then(
            function (data) {
                console.log(data);
                swal("提交成功!", "", "success")
            },
            function () {
                console.log(arguments);
                swal("提交失败!信息不完整")
            }
        )
    }
});