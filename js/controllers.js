/**
 * Created by bobo on 17-1-11.
 */
angular.module("myApp.controller", [])
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
    .controller('declareCtrl', function ($scope, userList) {
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
                },
                function () {
                    console.log(arguments);
                }
            )
        }
    })
    .controller('homePageCtrl', function ($scope, $state) {
        $scope.logout = function () {
            $state.go('login')
        };

    })
    .controller('user-controlCtrl', function ($scope, $state) {

    });
    // // 审批页面开始
    // .controller('approvalCtrl', function ($scope, $state, approval, passBy, rejectBy, confirmBy) {
    //     $scope.approvallist = {
    //         token: sessionStorage.getItem('token'),
    //         staff: '',
    //         auditStatus: -1,
    //         page: 1,
    //         start: 0,
    //         limit: 20
    //     };
    //     // 更新函数
    //     $scope.refresh = function () {
    //         // $scope.pageSplice($scope.approvaArry);
    //         approval.approvalList($scope.approvallist).then(
    //             function (succ) {
    //                 console.log(succ);
    //                 $scope.approvaArry = succ.data.result;
    //             },
    //             function () {
    //                 console.log(arguments);
    //             }
    //         );
    //     };
    //     $scope.refresh();
    //     // 查询函数
    //     $scope.search = function () {
    //         $scope.refresh();//调用刷新页面
    //         approval.approvalList().then(
    //             function (succ) {
    //                 // $scope.approvaArry = succ.data.result;
    //             },
    //             function () {
    //                 console.log(arguments);
    //             }
    //         )
    //     };
    //     $scope.selectStatus = function () {
    //         console.log(event)
    //     };
    //     //审批通过
    //     $scope.passList = {
    //         token: sessionStorage.getItem('token'),
    //         eventId: '',
    //         //sessionStorage.getItem('eventId'),
    //         status: 1
    //     };
    //     $scope.pass = function (index) {
    //         console.log(index);
    //         // console.log( $scope.approvaArry);
    //         $scope.passList.eventId = $scope.approvaArry[index].id;
    //         console.log($scope.passList.eventId);
    //         passBy.userlist($scope.passList).then(
    //             function (bb) {
    //                 console.log(bb);
    //             },
    //             function () {
    //             }
    //         )
    //     };
    //     //审批拒绝
    //     $scope.rejectList = {
    //         token: sessionStorage.getItem('token'),
    //         eventId: '',
    //         status: 2
    //     };
    //     $scope.reject = function (index) {
    //         console.log(index);
    //         $scope.rejectList.eventId = $scope.approvaArry[index].id;
    //         passBy.userlist($scope.rejectList).then(
    //             function (data) {
    //                 console.log(data);
    //             },
    //             function () {
    //             }
    //         )
    //     };
    //     // 模态框
    //     $scope.confirmList = {
    //         token: sessionStorage.getItem('token'),
    //         eventId: sessionStorage.getItem('eventId'),
    //         status: 1,
    //         content: ''
    //     };
    //     var aa = $scope.confirmList.content;
    //     $scope.confirm = function (index) {
    //         $scope.confirmList.eventId = $scope.approvaArry[index].id;
    //         // $scope.approvaArry.splice(index, 1);
    //         confirmBy.userlist($scope.confirmList).then(
    //             function (data) {
    //                 console.log(data);
    //             },
    //             function () {
    //             }
    //         )
    //     };
    //     //分页
    //     $scope.pageSplice = function () {
    //         $scope.pageNum = 1;
    //         $scope.count = 5;
    //         //     Math.ceil( $scope.approvaArry.length / $scope.pageNum);//分几页
    //         // console.log( $scope.approvaArry.length);
    //         //按钮点击获取当前点击$index
    //         $scope.numberClick = function ($index) {
    //             $scope.tihsnum = $index + 1;
    //         };
    //         //上一页
    //         $scope.myLeft = function () {
    //             $scope.tihsnum--;
    //         };
    //         //下一页
    //         $scope.myRight = function () {
    //             $scope.tihsnum++;
    //         };
    //     }
    // });
// 审批页面结束


