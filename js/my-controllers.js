/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller",[]);
/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('approvalCtrl', function ($scope, $state, approval) {
    $scope.approvallist = {
        token: sessionStorage.getItem('token'),
        staff: '',
        auditStatus: -1,
        page: 1,
        start: 0,
        limit: 999
    };
    // 更新函数
    $scope.refresh = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        approval.approvalList($scope.approvallist).then(
            function (succ) {
                console.log(succ);
                $.LoadingOverlay('hide');
                $scope.approvalArry = succ.data.result;
                $scope.bigTotalItems =  succ.data.result.length;
            },
            function () {
                console.log(arguments);
            }
        )
    };
    $scope.refresh();
    // 查询函数
    $scope.search = function () {
        $scope.refresh();//调用刷新页面
    };
    $scope.selectStatus = function () {
        console.log(event)
    };
    //审批通过
    $scope.dataId = '';
    $scope.pass = function () {
        console.log(this);
        $scope.confirmLists.content = '';
        $scope.dataId = this.obj.id;
        approval.passList(
            {
                token: sessionStorage.getItem('token'),
                eventId: $scope.dataId,
                status: 1
            }
        ).then(
            function (bb) {
                console.log(bb);
                if (bb.data.result == null) {
                    $scope.confirmLists.content = null
                } else {
                    $scope.confirmLists.content = bb.data.result.content
                }
            },
            function () {

            }
        );
    };
    //审批拒绝
    $scope.dataIds = '';
    $scope.reject = function () {
        console.log(this);
        $scope.rejectLists.content = '';
        $scope.dataIds = this.obj.id;
        approval.rejectList(
            {
                token: sessionStorage.getItem('token'),
                eventId: $scope.dataIds,
                status: 2
            }
        ).then(
            function (data) {
                console.log(data);
                if (data.data.result == null) {
                    $scope.rejectLists.content = null
                } else {
                    $scope.rejectLists.content = data.data.result.content
                }
            },
            function () {
            }
        )
    };
    // 通过模态框
    $scope.confirmLists = {
        token: sessionStorage.getItem('token'),
        eventId: '',
        status: 1,
        content: ''
    };
    $scope.confirm = function () {
        $('#myModal').modal('hide');
        console.log($scope.dataId);
        $scope.confirmLists.eventId = $scope.dataId;
        approval.confirmList($scope.confirmLists)
       .then(
            function (data) {
                $.LoadingOverlay('hide');
                console.log(data);
                $scope.refresh();
                swal({
                    title: "",
                    text: "审批成功!",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    closeOnConfirm: false
                });
            },
            function () {
            }
        )

    };
    //拒绝模态框
    $scope.rejectLists = {
        token: sessionStorage.getItem('token'),
        eventId: '',
        status: 2,
        content: ''
    };
    $scope.rejects = function () {

        $scope.rejectLists.eventId = $scope.dataIds;
        // $scope.rejectLists.status = $scope.dataTypes;
        approval.confirmList($scope.rejectLists)
            .then(
                function (data) {
                    console.log(data);
                    $scope.refresh();
                    swal({
                            title: "",
                            text: "审批成功!",
                            type: "success",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            closeOnConfirm: false
                        }
                    );
                    $('#myModals').modal('hide');
                },
                function () {
                }
            );
    };
    //分页
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
                $scope.bigTotalItems = suc.data.result.length;
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

        $scope.zero = 0;

        $scope.paging = function () {
            $scope.zero = (this.bigCurrentPage - 1) * 10;
        }
    };

});
/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('declareCtrl', function ($scope, UserList) {
    $('.datetimepicker').datetimepicker({
        format: 'yyyy-mm-dd hh:ii'
    });
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
        token: sessionStorage.getItem('token')
    };
    $scope.submit = function () {

        if($scope.declare.staff!=''&&$scope.declare.staffPhone!=''&& $scope.declare.location!=''&&$scope.declare.carSource!=''){
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
    }
});
/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('diaciplinary-treatmentCtrl', function ($scope, diaciplinary) {
    //纪律处分展示接口
    $scope.content = {
        token: sessionStorage.getItem('token'),
        staff: '',
        page: 1,
        start: 0,
        limit: 999
    };
    //刷新页面
    $scope.refresh = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        diaciplinary.diaciplinaryData($scope.content).then(
            function (data) {
                console.log(data);
                $.LoadingOverlay("hide");
                $scope.arr = data;
                console.log(data.length);
                $scope.bigTotalItems = data.length;
            }, function () {
                console.log(arguments)
            });
    };
    $scope.refresh();
    //纪律处分查询数据
    $scope.search = function () {
        $scope.refresh()
    };
    //纪律处分添加数据
    $scope.add = function () {
        $scope.addData.title = '';
        $scope.addData.staff = '';
        $scope.addData.content = ''
    };
    $scope.addData = {
        token: sessionStorage.getItem('token'),
        title: '',
        content: '',
        staff: '',
        staffOrgId: 1
    };
    $scope.addSure = function () {
        diaciplinary.diaciplinaryAdd($scope.addData).then(
            function (data) {
                console.log(data);
                $('#myModal').modal('hide');
                swal("添加成功!", "", "success");
                $scope.refresh()
            }, function () {
                console.log(arguments)
            });
    };

    //纪律处分删除数据
    $scope.deleteData = {
        token: sessionStorage.getItem('token'),
        id: ''
    };
    $scope.remove = function () {
        console.log(this.data.id);
        $scope.deleteData.id = this.data.id;
        swal({
                title: "确定删除此项?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认删除!",
                cancelButtonText: "取消",
                closeOnConfirm: false
            },
            function () {
                diaciplinary.diaciplinaryDel($scope.deleteData).then(
                    function (data) {
                        console.log(data);
                        $scope.refresh()
                    },
                    function () {
                        console.log(arguments)
                    });
                swal("已删除!", "", "success");
                setTimeout(function () {
                    swal.close()
                }, 2000)
            });
    };
    //纪律处分修改数据
    $scope.diaciplinaryUpdate = {
        token: sessionStorage.getItem('token'),
        id: '',
        title: '',
        content: '',
        staff: '',
        staffOrgId: 1
    };
    $scope.revamp = function () {
        console.log(this.data.id);
        $scope.diaciplinaryUpdate.id = this.data.id;
        $('#myModal1').modal('hide');
        diaciplinary.diaciplinaryUpdate($scope.diaciplinaryUpdate).then(
            function (data) {
                console.log(data);
                if (data.data.success) {
                        $scope.diaciplinaryUpdate.title = data.data.result.title,
                        $scope.diaciplinaryUpdate.staff = data.data.result.staff,
                        $scope.diaciplinaryUpdate.content = data.data.result.content
                }
            }, function () {
                console.log(arguments)
            });
    };
    //修改模态中的确认
    $scope.revampSure = function () {
        console.log(this.data.id);
        $scope.diaciplinaryUpdate.id = this.data.id;
        diaciplinary.diaciplinaryUpdate1($scope.diaciplinaryUpdate).then(
            function (data) {
                console.log(data);
                $('#myModal1').modal('hide');
                swal("修改成功!", "", "success");
                $scope.refresh()
            }, function () {
                console.log(arguments)
            });
    };
    // 分页
    // $scope.totalItems = 50;
    $scope.currentPage = 1;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.maxSize = 5;

    $scope.bigCurrentPage = 1;

    $scope.zero = 0;

    $scope.paging = function () {
        $scope.zero = (this.bigCurrentPage - 1) * 10;
    }
});
/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('homePageCtrl', function ($scope, $state, approval) {
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
});
/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('loginCtrl', function ($scope, loginUser) {
    $scope.user = {
        name: '',
        password: ''
    };
    $scope.nameLogin = function () {
        if (Boolean($scope.user.name )==true && Boolean($scope.user.password )== true) {
            $.LoadingOverlay("show", {
                image: "img/oval.svg",
                bgcolor: 'rgba(28,43,54,0.7)'
            });
            loginUser.login($scope.user)
                .then(function (data) {
                    console.log(data,'success');
                    $scope.data=data;
                        window.sessionStorage.setItem('token', data.data.result.token);
                    if (data.data.result == null) {
                        console.log(data.data.result);
                        swal('帐号或密码不正确,请重新输入!');
                        $.LoadingOverlay("hide");
                    }else{
                        $.LoadingOverlay("hide");
                    }
                },
                function (data) {
                    console.log(data,'fail');
                    $.LoadingOverlay("hide");
                }
            );
        }
        else {
            swal("帐号或密码不能为空,请输入!");
        }
    }
});
/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('public-notificationCtrl', function ($scope, public) {
    //公开通报展示数据
    $scope.content = {
        token: sessionStorage.getItem('token'),
        staff: '',
        page: 1,
        start: 0,
        limit: 999
    };
    //刷新页面
    $scope.refresh = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        public.publicData($scope.content).then(
            function (data) {
                console.log(data);
                $.LoadingOverlay("hide");
                $scope.tabArray = data;
                $scope.bigTotalItems =  data.length;
            }, function () {
                console.log(arguments)
            });
    };
    $scope.refresh();
    //公开通报查询数据
    $scope.search = function () {
        $scope.refresh();
    };
    //公开通报添加数据
    $scope.add = function () {
        $scope.addData.title = '';
        $scope.addData.staff = '';
        $scope.addData.content = ''
    };

    $scope.addData = {
        token: sessionStorage.getItem('token'),
        title: '',
        content: '',
        staff: '',
        staffOrgId: 1
    };
    $scope.addSure = function () {
        public.publicAdd($scope.addData).then(
            function (data) {
                console.log(data);
                $('#myModal').modal('hide');
                swal("添加成功!", "", "success");
                $scope.refresh()
            }, function () {
                console.log(arguments)
            });
    };
    //公开通报删除数据
    $scope.deleteData = {
        token: sessionStorage.getItem('token'),
        id: ''
    };
    $scope.remove = function () {
        console.log(this.data.id);
        $scope.deleteData.id = this.data.id;
        swal({
                title: "确定删除此项?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认删除!",
                cancelButtonText: "取消",
                closeOnConfirm: false
            },
            function () {
                public.publicDel($scope.deleteData).then(
                    function (data) {
                        console.log(data);
                        $scope.refresh()
                    },
                    function () {
                        console.log(arguments)
                    });
                swal("已删除!", "", "success");
                setTimeout(function () {
                    swal.close()
                }, 2000)
            });

    };
    //公开通报修改数据
    $scope.publicUpdate= {
        token: sessionStorage.getItem('token'),
        id: '',
        title: '',
        content: '',
        staff: '',
        staffOrgId: 1
    };
    $scope.revamp = function () {
        console.log(this.data.id);
        $scope.publicUpdate.id = this.data.id;
        $('#myModal1').modal('hide');
        public.publicUpdate($scope.publicUpdate).then(
            function (data) {
                console.log(data);
                if(data.data.success){
                    $scope.publicUpdate.title=data.data.result.title,
                    $scope.publicUpdate.staff=data.data.result.staff,
                    $scope.publicUpdate.content=data.data.result.content
                }
            }, function () {
                console.log(arguments)
            });
    };
    //修改模态中的确认
    $scope.revampSure = function () {
        console.log(this.data.id);
        $scope.publicUpdate.id = this.data.id;
        public.publicUpdate1($scope.publicUpdate).then(
            function (data) {
                console.log(data);
                $('#myModal1').modal('hide');
                swal("修改成功!", "", "success");
                $scope.refresh()
            }, function () {
                console.log(arguments)
            });
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

/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('publicityCtrl', function ($scope, $state, publicity) {
    $scope.publicityCtrlList = {
        token: sessionStorage.getItem('token'),
        staff: '',
        bulletinStatus: -1,
        page: 1,
        start: 0,
        limit: 999
    };
    $scope.refresh = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        publicity.publicList($scope.publicityCtrlList)
            .then(
                function (success) {
                    console.log(success);
                    $scope.publicArr = success.data.result;
                    $scope.bigTotalItems =  success.data.result.length;
                    $.LoadingOverlay('hide');
                },
                function (error) {
                    swal('接口出错')
                }
            )
    };
    $scope.refresh();

    $scope.search = function () {
        $scope.refresh();
    };
    $scope.selectStatus = function () {
        console.log(event)
    };
    // 公示内容接口
    $scope.publicContend = function () {
        console.log(this);
        $scope.publicContendList.content = '';
        $scope.eventId = this.data.id;
        publicity.publicContent(
            {
                token: sessionStorage.getItem('token'),
                eventId: $scope.eventId
            }
        ).then(
            function (success) {
                console.log(success);
                if (success.data.result == null) {
                    $scope.publicContendList.content = null
                } else {
                    $scope.publicContendList.content = success.data.result.content;
                }
            },
            function (error) {
                swal('接口出错')
            }
        )
    };
    //公示内容确认
    $scope.publicContendList = {
        token: sessionStorage.getItem('token'),
        eventId: '',
        content: '',
        attachmentFileCode: ''
    };
    $scope.publicContendConfirm = function () {
        $scope.publicContendList.eventId = $scope.eventId;
        publicity.publicContentConfirm($scope.publicContendList)
            .then(
                function (success) {
                    // console.log(success);
                    $scope.refresh();
                    swal({
                            title: "",
                            text: "公示成功!",
                            type: "success",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            closeOnConfirm: false
                        }
                    );
                },
                function (error) {
                    swal('接口出错')
                }
            );

    };
//公示结果
    $scope.publicOutcome = function () {
        console.log(this);
        $scope.publicOutcomeList.content = '';
        $scope.eventIds = this.data.id;
        publicity.publicContent(
            {
                token: sessionStorage.getItem('token'),
                eventId: $scope.eventIds
            }
        ).then(
            function (success) {
                console.log(success);
                if (success.data.result == null) {
                    $scope.publicContendList.content = null
                }
                else {
                    $scope.publicOutcomeList.content = success.data.result.content;
                }
            },
            function (error) {
                alert('接口出错')
            }
        )
    };
    $scope.publicOutcomeList = {
        token: sessionStorage.getItem('token'),
        eventId: '',
        content: '',
        status: ''
    };
    $scope.publicOutcomeConfirm = function () {
        // console.log(this);
        $scope.publicOutcomeList.eventId = $scope.eventIds;
        $scope.publicOutcomeList.status = this.data.eventType;

        publicity.publicOutcomeConfirm($scope.publicOutcomeList)
            .then(
                function (success) {
                    console.log(success);
                },
                function (error) {
                    alert('接口出错')
                }
            );
        swal({
                title: "",
                text: "公示结果成功!",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: false
            }
        );
        $scope.refresh();
    };
    //分页
    // $scope.totalItems = 50;
    // $scope.currentPage = 1;

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
/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('roleManage', function ($scope, Role) {
    //角色页面展示
    var page = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        Role.UserName({
            token: sessionStorage.getItem('token'),
            page: 1,
            start: 0,
            limit: 999
        }).then(function (data) {
            // console.log(data);
            $.LoadingOverlay("hide");
            $scope.roleManage = data.data.result;
            $scope.bigTotalItems =  data.data.result.length;
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
    };
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
            showLoaderOnConfirm: true,
            cancelButtonText:'取消'
        }, function () {
            setTimeout(function () {
                delData();
                swal("删除成功!");
                page();
            }, 2000);
        });
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
/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('statisticsCtrl', function ($scope, $state, Statistics) {
    $('.datetimepicker').datetimepicker({
        format: 'yyyy-mm-dd hh:ii'
    });
    $scope.statisticsList = {
        token: sessionStorage.getItem('token'),
        eventCreateTimeFrom: '',
        eventCreateTimeTo: '',
        eventTimeFrom: '',
        eventTimeTo: ''
    };
    $scope.search = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        Statistics.StatisticsLity($scope.statisticsList)
            .then(function (suc) {
                console.log(suc);
                $scope.aa = suc.data.result;
                console.log(suc.data.result);
                var myChart = echarts.init(document.getElementById('main'));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['婚嫁', '丧葬']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: [$scope.aa[0].orgName, $scope.aa[1].orgName]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '婚嫁',
                            type: 'bar',
                            data: [$scope.aa[0].type1Count, $scope.aa[0].type2Count],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '丧葬',
                            type: 'bar',
                            data: [$scope.aa[1].type1Count, $scope.aa[1].type2Count],
                            markPoint: {
                                data: []
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                $.LoadingOverlay("hide")
            }, function () {
                swal('接口出错了');
            });
    };


});
/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('supervisionCtrl', function ($scope, Supervision) {
    //未监督页面展示
    $scope.superviseUser = {
        token: sessionStorage.getItem('token'),
        staff: '',
        superviseStatus: -1,
        page: 1,
        start: 0,
        limit: 9999
    };
    var refresh = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        Supervision.supervisionList($scope.superviseUser).then(
            function (data) {
                // console.log(data);
                $.LoadingOverlay("hide");
                $scope.list = data.data.result;
                $scope.bigTotalItems =  data.data.result.length;
            }, function () {
                swal("信息错误!")
            });
    };
    refresh();
    //监督报告
    $scope.supervise = function () {
        $scope.determine = {
            title: '',
            content: '',
            token: sessionStorage.getItem('token'),
            eventId: this.lists.id
        };
        Supervision.getSupervision({
            token: sessionStorage.getItem('token'),
            eventId:this.lists.id
        }).then(
            function (data) {
                console.log(data);
                if(data.data.result!=null){
                    $scope.determine.title=data.data.result.title;
                    $scope.determine.content=data.data.result.content;
                }
            }, function () {
                swal("信息错误!")
            });
    };
    $scope.reportConfirm = function () {
        // console.log($scope.determine);
        Supervision.superviseReport($scope.determine).then(
            function (data) {
                refresh();
            }, function () {
                swal("信息错误!")
            });
    };
    //违纪登记
    $scope.discipline = function () {
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
        };
        Supervision.disciplineData({
            token: sessionStorage.getItem('token'),
            eventId: this.lists.id
        }).then(
            function (data) {
                if(data.data.result!=null){
                    // $scope.disciplineData.eventId=data.data.result.id;
                    if(data.data.result.isCashGiftOutOfLimits==true){
                        $scope.disciplineData.isCashGiftOutOfLimits='1';
                    }else {
                        $scope.disciplineData.isCashGiftOutOfLimits='0';
                    }
                    if(data.data.result.isUsePublicCar==true){
                        $scope.disciplineData.isUsePublicCar='1';
                    }else {
                        $scope.disciplineData.isUsePublicCar='0';
                    }
                    if(data.data.result.isUsePublicGoods==true){
                        $scope.disciplineData.isUsePublicGoods='1';
                    }else {
                        $scope.disciplineData.isUsePublicGoods='0';
                    }
                    if(data.data.result.isUsePublicAsserts==true){
                        $scope.disciplineData.isUsePublicAsserts='1';
                    }else {
                        $scope.disciplineData.isUsePublicAsserts='0';
                    }
                    if(data.data.result.isUsePublicMoney==true){
                        $scope.disciplineData.isUsePublicMoney='1';
                    }else {
                        $scope.disciplineData.isUsePublicMoney='0';
                    }
                    $scope.disciplineData.otherQuestion=data.data.result.otherQuestion;
                    $scope.disciplineData.content=data.data.result.content;
                }
            }, function () {
                swal("信息错误!")
            });
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
    $scope.superviseChange=function () {
        console.log(this);
        $scope.superviseUser.superviseStatus = this.superviseUser.superviseStatus;
        console.log($scope.superviseUser.superviseStatus);
    };
    $scope.query = function () {
        refresh();
    };
    //分页
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
/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('userManageCtrl', function ($scope, userManage) {
    //公开通报展示数据
    $scope.refresh = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        userManage.userManageData({
            token: sessionStorage.getItem('token'),
            staff: '',
            page: 1,
            start: 0,
            limit: 999
        }).then(
            function (data) {
                $.LoadingOverlay("hide");
                // console.log(data);
                $scope.tabArray = data;
                $scope.bigTotalItems = data.length;
            }, function () {
                // console.log(arguments)
            });
    };
    $scope.refresh();
    $scope.revise = function () {
        // console.log(this);
        $scope.updateParams = {
            token: sessionStorage.getItem('token'),
            userId: this.obj.id,
            orgId: 1,
            roleId: '',
            name: '',
            password: ''
        };
        userManage.reviseList1({
            token: sessionStorage.getItem('token'),
            userId: this.obj.id
        }).then(
            function (data) {
                // console.log(data);
            }, function () {
            });
        userManage.reviseList2({
            token: sessionStorage.getItem('token'),
            roleId: 0
        }).then(
            function (data) {
                console.log(data);
                $scope.arry=data;
            }, function () {
                console.log(arguments)
            });
        userManage.reviseList3({
            token: sessionStorage.getItem('token'),
            userId: this.obj.id
        }).then(
            function (data) {
                console.log(data);
                $scope.updateParams.name=data.name;
                $scope.userName = data.username;//用户名
            }, function () {
            });
    };

$scope.selectRevise=function (arr) {
    $scope.updateParams.roleId=arr;
};
    $scope.confirm = function () {

        userManage.confirmList($scope.updateParams).then(
            function (data) {
                console.log(data);
                $scope.refresh();
            }, function () {
            });
    };
    $scope.delete = function () {
        console.log(this);
        var data = {
            token: sessionStorage.getItem('token'),
            id: this.obj.id
        };
        var delData = function () {
            userManage.deleteList(data).then(function (data) {
                console.log(data);
            }, function () {
                swal('信息有误')
            });
        };
        swal({
            title: "确认删除此角色?",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            cancelButtonText: '取消'
        }, function () {
            setTimeout(function () {
                delData();
                swal("删除成功!");
                $scope.refresh();
            }, 2000);

        });
    };
    $scope.add = function () {
        $scope.addData.username='';
        $scope.addData.name='';
        $scope.addData.password='';
        passwordagain='';
        userManage.reviseList1({
            token: sessionStorage.getItem('token')
        }).then(
            function (data) {
                // console.log(data);
            }, function () {
                // console.log(arguments)
            });
        userManage.reviseList2({
            token: sessionStorage.getItem('token'),
            roleId: 0
        }).then(
            function (data) {
                console.log(data);
                $scope.arr=data;
                $scope.length=$scope.arr.length;
                console.log($scope.arr.length)
            }, function () {
            });
    };
    $scope.selectAdd=function (roleId) {
        $scope.addData.roleId=roleId;

    };
    $scope.addData = {

        token: sessionStorage.getItem('token'),
        orgId: 1,
        username: '',
        roleId: '',
        name: '',
        password: ''
    };
    $scope.confirms = function () {
        $('#myModal').modal('hide');
        console.log( $scope.addData.username);
        if ( $scope.addData.username !=''&& $scope.addData.name !=''
            && $scope.addData.password !=''&&$scope.addData.roldId !=''){
            userManage.confirmLists($scope.addData).then(
                function (data) {
                    console.log(data);
                    console.log($scope.addData.roleId);
                    $scope.refresh();
                }, function () {
                });

        }
        else {
            swal("提交失败!信息不完整")
        }
    };
    // 分页
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.maxSize = 5;

    $scope.bigCurrentPage = 1;

    $scope.zero = 0;

    $scope.paging = function () {
        $scope.zero = (this.bigCurrentPage - 1) * 10;
    }
});