/**
 * Created by bobo on 17-1-11.
 */
angular.module("myApp.controller", [])
    .controller('loginCtrl', function ($scope, loginUser) {
        $scope.user = {
            name: 'yiyi',
            password: '123456'
        };
        $scope.nameLogin = function () {
            if ($scope.user.name == '' || $scope.user.password == '') {
                alert('信息不全');
                return;
            } else {
                loginUser.login($scope.user).then(
                    function (data) {
                        // console.log(data);
                        window.sessionStorage.setItem('token', data.token);
                        window.sessionStorage.setItem('name', data.user.username);
                        window.sessionStorage.setItem('roleId', data.user.id);
                    },
                    function () {
                        // console.log(arguments);
                    }
                );
            }
        }
    })
    .controller('declareCtrl', function ($scope, UserList) {
        $scope.relation = function () {
            $scope.declare.staffRelationship = this.declare.staffRelationship;
            // $scope.declare.staffRelationship=event.target.selectedIndex+1;
            // console.log($scope.declare.staffRelationship);
        };
        $scope.duty = function () {
            $scope.declare.staffJob = this.declare.staffJob;
            // $scope.declare.staffJob=event.target.selectedIndex+1;
        };
        $scope.matter = function () {
            $scope.declare.eventType =this.declare.eventType;
            // $scope.declare.eventType=event.target.selectedIndex+1;
        };
        $scope.section = function () {
            // $scope.declare.attachmentFileCode = this.declare.attachmentFileCode;
            // $scope.declare.attachmentFileCode=event.target.selectedIndex+1;
        };
        $scope.declare = {
            staff: '',//申报人
            staffRelationship: '',//与申报人关系
            staffPoliticalStatus: '',//政治面貌
            staffJob: '',//单位职务
            staffSpouse: '', //配偶
            staffPhone: '',//联系电话
            eventType:'',//操办事项
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
            staffOrgId: '   ',//承诺人
            token: sessionStorage.getItem('token')
        };
        $scope.submit = function () {
            UserList.userlist($scope.declare).then(
                function (data) {
                    console.log(data);
                    alert('提交成功')
                },
                function () {
                    alert('提交失败');
                    console.log(arguments);
                }
            )
        }
    })
    .controller('homePageCtrl', function ($scope, $state, approval) {
        $scope.logout = function () {
            $state.go('login')
        };
        // 跳转审批接口
        $scope.approvallist = {
            token: '',
            staff: '',
            auditStatus: '',
            page: '',
            start: '',
            limit: ''
        };
        $scope.approvals = function () {
            approval.approvalList().then(
                function (data) {
                    console.log(data);
                },
                function () {
                    console.log(arguments);
                }
            )
        };
        $scope.approvals();
    })

    .controller('publicityCtrl', function ($scope, $state, publicity) {
        publicity.publicityList(
            {
                token: sessionStorage.getItem('token'),
                staff: '',
                bulletinStatus: -1,
                page: 1,
                start: 0,
                limit: 30
            }
        ).then(
            function (data) {
                console.log(data);
            },
            function () {
                console.log(arguments);
            }
        )
    })
// .controller('declareCtrl', function ($scope, $state) {
//
// });
