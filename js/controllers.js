/**
 * Created by bobo on 17-1-11.
 */
angular.module("myApp.controller", [])
    //登陆
    .controller('loginCtrl', function ($scope, loginUser) {
        $scope.user = {
            name: '',
            password: ''
        };
        $scope.nameLogin = function () {
            if ($scope.user.name == '' || $scope.user.password == '') {
                alert('信息不全');
                return;
            } else {
                loginUser.login($scope.user).then(
                    function (data) {
                        console.log(data);
                        window.sessionStorage.setItem('token', data.token);
                    },
                    function () {
                        console.log(arguments);
                    }
                );
            }
        }
    })
    //申报
    .controller('declareCtrl', function ($scope, UserList) {
        $scope.relation = function () {
            $scope.declare.staffRelationship = this.declare.staffRelationship;
        };
        $scope.duty = function () {
            $scope.declare.staffJob = this.declare.staffJob;
        };
        $scope.matter = function () {
            $scope.declare.eventType =this.declare.eventType;
        };
        $scope.section = function () {
            $scope.declare.attachmentFileCode = this.declare.attachmentFileCode;
        };
        $scope.declare = {
            name: '',//申报人
            relation: '',//与申报人关系
            political: '',//政治面貌
            duty: '',//单位职务
            spouse: '', //配偶
            phone: '',//联系电话
            matter: '',//操办事项
            number: '',//操办次数
            date: '',//操办时间
            site: '',//操办地点
            tableNumber: '',//操办桌数
            peoples: '',//参加人数
            scope: '',//邀请范围
            cars: '',//用车数量
            source: '',//用车来源
            section: '',//所属部门
            list: '',//邀请名单
            promise: '',//本人承诺
            promiseMen: ''//承诺人
        };
        $scope.submit = function () {
            userList.userlist($scope.declare).then(
                function (data) {
                    console.log(data);
                    alert('提交成功')
                },
                function () {
                    console.log(arguments);
                    alert('提交失败')
                }
            )
        }
    })
    //主页面
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
                    // console.log(data);
                },
                function () {
                    console.log(arguments);
                }
            )
        };
        $scope.approvals();
    })
    //公示
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
                // console.log(data);
            },
            function () {
                console.log(arguments);
            }
        )
    })
    //监督页面
    .controller('supervisionCtrl',function ($scope,Supervision) {
        var refresh=function () {
            Supervision.supervisionList({
                token: sessionStorage.getItem('token'),
                staff: '',
                superviseStatus: '-1',
                page: 1,
                start: 0,
                limit: 30
            }).then(function (data) {
                $scope.list=data.data.result;
                // console.log($scope.list);
            },function () {
                alert('信息错误')
            });
        };
        refresh();
        $scope.supervise=function () {
            $scope.determine ={
                title:'',
                content:'',
                token: sessionStorage.getItem('token'),
                eventId:this.lists.id
            };
        };

        $scope.reportConfirm=function () {
            console.log($scope.determine);
            $('#myModal').modal('hide');
            Supervision.superviseReport($scope.determine).then(
                function (data) {
                    console.log(data)
                },function () {
                alert('信息错误')
            });
            refresh();
        };

    });
