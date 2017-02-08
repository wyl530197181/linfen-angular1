/**
 * Created by bobo on 17-1-11.
 */
angular.module("myApp.controller", [])
//登陆
    .controller('loginCtrl', function ($scope, loginUser) {
        $scope.user = {
            name: 'yiyi',
            password: '123456'
        };
        $scope.nameLogin = function () {
            if ($scope.user.name == '' || $scope.user.password == '') {
                swal("用户名或者密码有误!")
                return;
            } else {
                loginUser.login($scope.user).then(
                    function (data) {
                        // console.log(data);
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
    })
    //主页面
    .controller('homePageCtrl', function ($scope, $state, approval) {
        $scope.logout = function () {
            $state.go('login')
        };
        //控制侧边栏折叠,头部隐藏显示
        $(function () {

            //控制侧边栏折叠
            $('.sidebar-menu .openable > a').click(function () {

                if (!$('aside').hasClass('sidebar-mini') || Modernizr.mq('(max-width: 991px)')) {
                    if ($(this).parent().children('.submenu').is(':hidden')) {
                        $(this).parent().siblings().removeClass('open').children('.submenu').slideUp(200);
                        $(this).parent().addClass('open').children('.submenu').slideDown(200);
                    }
                    else {
                        $(this).parent().removeClass('open').children('.submenu').slideUp(200);
                    }
                }
                return false;

            });

            //Open active menu
            if (!$('.sidebar-menu').hasClass('sidebar-mini') || Modernizr.mq('(max-width: 767px)')) {
                $('.openable.open').children('.submenu').slideDown(200);
            }

            //顶部三杠按钮切换侧边栏隐藏显示
            $('#sidebarToggleLG').click(function () {
                if ($('.wrapper').hasClass('display-right')) {
                    $('.wrapper').removeClass('display-right');
                    $('.sidebar-right').removeClass('active');
                }
                else {
                    //$('.nav-header').toggleClass('hide');
                    $('.top-nav').toggleClass('sidebar-mini');
                    $('aside').toggleClass('sidebar-mini');
                    $('footer').toggleClass('sidebar-mini');
                    $('.main-container').toggleClass('sidebar-mini');

                    $('.main-menu').find('.openable').removeClass('open');
                    $('.main-menu').find('.submenu').removeAttr('style');
                }
            });

            $('#sidebarToggleSM').click(function () {
                $('aside').toggleClass('active');
                $('.wrapper').toggleClass('display-left');
            });
        });
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
    .controller('supervisionCtrl', function ($scope, Supervision) {
        //未监督页面展示
        $scope.superviseUser = {
            token: sessionStorage.getItem('token'),
            staff: '',
            superviseStatus: -1,
            page: 1,
            start: 0,
            limit: 20
        };
        var refresh = function () {
            Supervision.supervisionList($scope.superviseUser).then(
                function (data) {
                    $scope.list = data.data.result;
                }, function () {
                    swal("信息错误!")
                });
        };
        refresh();
        $scope.supervise = function () {
            $scope.determine = {
                title: '',
                content: '',
                token: sessionStorage.getItem('token'),
                eventId: this.lists.id
            };
        };
        //监督报告
        $scope.reportConfirm = function () {
            console.log($scope.determine);
            Supervision.superviseReport($scope.determine).then(
                function (data) {
                    refresh();
                }, function () {
                    swal("信息错误!")
                });
        };
        //违纪登记
        $scope.discipline = function () {
            Supervision.disciplineData({
                token: sessionStorage.getItem('token'),
                eventId: this.lists.id
            }).then(
                function (data) {
                    console.log(data);
                }, function () {
                    swal("信息错误!")
                });
            $scope.disciplineData = {
                token: sessionStorage.getItem('token'),
                eventId: this.lists.id,
                isCashGiftOutOfLimits: 0,//礼金超标
                isUsePublicCar: 0,//使用公车
                isUsePublicGoods: 0,//使用公产
                isUsePublicAsserts: 0,//使用公务
                isUsePublicMoney: 0,//使用公款
                attachmentFileCode: '',//附件
                otherQuestion: '',//其他问题
                content: ''//意见内容
            }
        };
        $scope.disciplineConfirm = function () {
            Supervision.disciplineList($scope.disciplineData).then(
                function (data) {
                    // console.log(data);
                }, function () {
                    swal("信息错误!")
                });
        };
        //现场监督--已监督
        $scope.query = function () {
            refresh();
        }
        //分页
        $scope.totalItems = 50;
        $scope.currentPage = 1;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
    })
    //角色管理
    .controller('roleManage', function ($scope, Role) {
        //角色页面展示
        var page = function () {
            Role.UserName({
                token: sessionStorage.getItem('token'),
                page: 1,
                start: 0,
                limit: 30
            }).then(function (data) {
                // console.log(data);
                $scope.roleManage = data.data.result;
            }, function () {
                swal("信息错误!")
            });
        };
        page();
        //角色修改
        $scope.roleModify = function () {
            Role.roleUserModify({
                token: sessionStorage.getItem('token'),
                roleId: this.role.id
            }).then(function (data) {
                console.log(data);
                $scope.manageData = data.data.result.name;
                $scope.manageDataChock = data.data.result.functions;
            }, function () {
                swal("信息错误!")
            });
        }
        //角色删除
        $scope.del = function () {
            var data = {
                token: sessionStorage.getItem('token'),
                id: this.role.id
            }
            var delData = function () {
                Role.roleDel(data).then(function (data) {
                    console.log(data);
                }, function () {
                    swal("信息错误!")
                });
            };
            swal({
                title: "确认删除此角色?",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function () {
                setTimeout(function () {
                    delData();
                    swal("删除成功!");
                    page();
                }, 2000);
            });
        }
    })
