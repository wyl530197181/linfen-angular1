/**
 * Created by bobo on 17-2-8.
 */
angular.module('myApp.service', []);
/**
 * Created by bobo on 17-2-8.
 */
angular.module('myApp.service').factory('approval', function ($http, $q, $state) {
    return {
        approvalList: function (params) {
            var deferred = $q.defer();//生成deferred异步对象
            $http({
                method: 'GET',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/show_audit.api',
                params: params
            }).then(function (success) {
                deferred.resolve(success);
            }, function (erro) {
                console.log(erro);
                deferred.reject(erro);
            });
            return deferred.promise;
        },
        passList: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_audit/get_by_event.api',
                params: params
            }).then(function (v) {
                deferred.resolve(v);
            }, function (e) {
                console.log(e);
                deferred.reject(e);
            });
            return deferred.promise;
        },
        rejectList: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_audit/get_by_event.api',
                params: params

            }).then(function (v) {
                console.log(v);
                deferred.resolve(v);
            }, function (e) {
                console.log(e);
                deferred.reject(e);
            });
            return deferred.promise;
        },
        confirmList: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/audit.api',
                params: params
            }).then(function (v) {
                console.log(v);
                deferred.resolve(v);
            }, function (e) {
                console.log(e);
                deferred.reject(e);
            });
            return deferred.promise;
        }
    }
});
/**
 * Created by bobo on 17-2-8.
 */
angular.module('myApp.service').factory('combination_query', function ($http, $q, $state) {
    return {
        com_queryLity: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/search.api',
                params: params
            }).then(function (success) {
                    deferred.resolve(success);
                }
                , function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }
});
/**
 * Created by bobo on 17-2-8.
 */
//纪律处分接口
angular.module('myApp.service').factory('diaciplinary', function ($http, $q) {
    return {
        //纪律处分展示接口
        diaciplinaryData: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/show.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v.data.result);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        //纪律处分添加接口
        diaciplinaryAdd: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/add.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        //纪律处分删除接口
        diaciplinaryDel: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/delete.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        //纪律处分修改接口
        diaciplinaryUpdate:function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/get.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        diaciplinaryUpdate1:function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/update.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        }

}

});
/**
 * Created by bobo on 17-2-8.
 */
//登陆页面接口
angular.module('myApp.service').factory('loginUser', function ($http, $q, $state) {
        //生成deferred异步对象
        return {
            login: function (user) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/auth.api',
                    params: {
                        username: user.name,
                        password: user.password
                    }
                }).then(function (v) {
                    console.log(v);
                    if (v.data.result != null) {
                        deferred.resolve(v);
                        $state.go('homePage');
                        $.LoadingOverlay("hide");

                    } else {
                        swal('帐号或密码不正确,请重新输入!');
                        $.LoadingOverlay("hide");
                    }
                }, function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
                return deferred.promise;
            }
        }
    });
/**
 * Created by bobo on 17-2-8.
 */
//公开通报接口
angular.module('myApp.service').factory('public', function ($http, $q) {
    return {
        //公开通报展示接口
        publicData: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/public_notification/show.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v.data.result);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        //公开通报添加接口
        publicAdd: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/public_notification/add.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        //公开通报删除接口
        publicDel:function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/public_notification/delete.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        //公开通报修改接口
        publicUpdate:function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/public_notification/get.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        publicUpdate1:function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/public_notification/update.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        }
    }
});
/**
 * Created by bobo on 17-2-8.
 */
//公示页面接口
angular.module('myApp.service').factory('publicity', function ($http, $q, $state) {
    return {
        publicList: function (params) {
            var deferred = $q.defer();//生成deferred异步对象
            $http({
                method: 'GET',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/show_bulletin.api ',
                params: params
            }).then(function (success) {
                console.log(success);
                deferred.resolve(success);
            }, function (erro) {
                console.log(erro);
                deferred.reject(erro);
            });
            return deferred.promise;
        },
        publicContent: function (params) {
            var deferred = $q.defer();//生成deferred异步对象
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_bulletin/get_by_event.api',
                params: params
            }).then(function (success) {
                console.log(success);
                deferred.resolve(success);
            }, function (erro) {
                console.log(erro);
                deferred.reject(erro);
            });
            return deferred.promise;
        },
        publicContentConfirm: function (params) {
            var deferred = $q.defer();//生成deferred异步对象
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_bulletin/add.api ',
                params: params
            }).then(function (success) {
                console.log(success);
                deferred.resolve(success);
            }, function (erro) {
                console.log(erro);
                deferred.reject(erro);
            });
            return deferred.promise;
        },
        publicOutcome: function (params) {
            var deferred = $q.defer();//生成deferred异步对象
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_bulletin_result/get_by_event.api',
                params: params
            }).then(function (success) {
                deferred.resolve(success);
            }, function (erro) {
                deferred.reject(erro);
            });
            return deferred.promise;
        },
        publicOutcomeConfirm: function (params) {
            var deferred = $q.defer();//生成deferred异步对象
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_bulletin_result/add.api',
                params: params
            }).then(function (success) {
                console.log(success);
                deferred.resolve(success);
            }, function (erro) {
                console.log(erro);
                deferred.reject(erro);
            });
            return deferred.promise;
        }

    }
});
/**
 * Created by bobo on 17-2-8.
 */

angular.module('myApp.service').factory('queryS', function ($http, $q, $state) {
    return {
        queryLity: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/search.api',
                params: params
            }).then(function (success) {
                    deferred.resolve(success);
                }
                , function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }
});
/**
 * Created by bobo on 17-2-8.
 */
//角色管理接口
angular.module('myApp.service') .factory('Role',function ($http,$q) {
    return {
        //角色页面展示
        UserName: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'get',
                url: 'http://bigbug.tech:8080/wdm-api/api/role/show.api',
                params: params,
                responseType: 'json',
                timeout: 30000
            }).then(function (data) {
                // console.log(data);
                deferred.resolve(data);
            }, function (e) {
                deferred.reject(e)
            })
            return deferred.promise;
        },
        //角色添加
        roleAdd: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'get',
                url: 'http://bigbug.tech:8080/wdm-api/api/role/add.api',
                params: params,
                responseType: 'json',
                timeout: 30000
            }).then(function (data) {
                console.log(data);
                deferred.resolve(data);
            }, function (e) {
                deferred.reject(e)
            })
            return deferred.promise;
        },
        //角色修改
        roleUserModify: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: 'http://bigbug.tech:8080/wdm-api/api/role/get.api',
                params: params,
                responseType: 'json',
                timeout: 30000
            }).then(function (data) {
                console.log(data);
                deferred.resolve(data);
            }, function (e) {
                deferred.reject(e)
            });
            return deferred.promise;
        },
        //角色删除
        roleDel:function (params) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: 'http://bigbug.tech:8080/wdm-api/api/role/delete.api',
                params: params,
                responseType: 'json',
                timeout: 30000
            }).then(function (data) {
                console.log(data);
                deferred.resolve(data);
            }, function (e) {
                deferred.reject(e)
            })
            return deferred.promise;
        },
    }
});
/**
 * Created by bobo on 17-2-8.
 */
angular.module('myApp.service').factory('Statistics', function ($http, $q, $state) {
    return {
        StatisticsLity: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/org_event_type_count',
                params: params
            }).then(function (success) {
                    deferred.resolve(success);
                }
                , function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }
});
/**
 * Created by bobo on 17-2-8.
 */
//现场监督接口
angular.module('myApp.service').factory('Supervision', function ($http, $q)
{
    return {
        supervisionList: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/show_supervise.api',
                params: params,
                responseType: 'json',
                timeout: 30000
            }).then(function (v) {
                // console.log(v);
                deferred.resolve(v);
            }, function (e) {
                // console.log(e);
                deferred.reject(e);
            });
            return deferred.promise;
        },
        //监督报告
        superviseReport:function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_supervise_report/add.api',
                params: params,
                responseType: 'json',
                timeout: 30000
            }).then(function (v) {
                console.log(v);
                deferred.resolve(v);
            }, function (e) {
                // console.log(e);
                deferred.reject(e);
            });
            return deferred.promise;
        },
        //监督报告get数据
        getSupervision:function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_supervise_report/get_by_event.api',
                params: params,
                responseType: 'json',
                timeout: 30000
            }).then(function (v) {
                // console.log(v);
                deferred.resolve(v);
            }, function (e) {
                // console.log(e);
                deferred.reject(e);
            });
            return deferred.promise;
        },
        //违纪登记
        disciplineList:function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_supervise_principle_breaking/add.api',
                params: params,
                responseType: 'json',
                timeout: 30000
            }).then(function (v) {
                console.log(v);
                deferred.resolve(v);
            }, function (e) {
                // console.log(e);
                deferred.reject(e);
            });
            return deferred.promise;
        },
        //违纪登陆get数据
        disciplineData:function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_supervise_principle_breaking/get_by_event.api',
                params: params,
                responseType: 'json',
                timeout: 30000
            }).then(function (v) {
                console.log(v);
                deferred.resolve(v);
            }, function (e) {
                // console.log(e);
                deferred.reject(e);
            });
            return deferred.promise;
        },
    }
});
/**
 * Created by bobo on 17-2-8.
 */
//申报页面接口
angular.module('myApp.service').factory('UserList', function ($http, $q) {
    return {
        userlist: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/add.api',
                params: params,
                responseType: 'json',
                timeout: 30000
            }).then(function (v) {
                console.log(v);
                deferred.resolve(v);
            }, function (e) {
                console.log(e);
                deferred.reject(e);
            });
            return deferred.promise;
        }
    }
});
/**
 * Created by bobo on 17-2-8.
 */
angular.module('myApp.service').factory('userManage', function ($http, $q) {
    return {
        //角色管理展示接口
        userManageData: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'http://bigbug.tech:8080/wdm-api/api/user/show.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v.data.result);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        reviseList1: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: 'http://bigbug.tech:8080/wdm-api/api/org/show.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v.data.result);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        reviseList2: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: 'http://bigbug.tech:8080/wdm-api/api/role/get_all.api',
                params: params
            }).then(
                function (v) {
                    console.log(v);
                    deferred.resolve(v.data.result);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        reviseList3: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: 'http://bigbug.tech:8080/wdm-api/api/user/get.api',
                params: params
            }).then(
                function (v) {
                    // console.log(v);
                    deferred.resolve(v.data.result);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        confirmList: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: 'http://bigbug.tech:8080/wdm-api/api/user/update.api',
                params: params
            }).then(
                function (v) {
                    // console.log(v);
                    deferred.resolve(v);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        deleteList: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: 'http://bigbug.tech:8080/wdm-api/api/user/delete.api',
                params: params
            }).then(
                function (v) {
                    // console.log(v);
                    deferred.resolve(v);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        },
        confirmLists: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: 'http://bigbug.tech:8080/wdm-api/api/user/add.api',
                params: params
            }).then(
                function (v) {
                    // console.log(v);
                    deferred.resolve(v);
                },
                function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
            return deferred.promise;
        }

    };

});