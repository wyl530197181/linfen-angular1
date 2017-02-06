/**
 * Created by yang on 17-1-13.
 */

angular.module('myApp.service', [])
    //登陆页面接口
    .factory('loginUser', function ($http, $q, $state) {
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
                    // console.log(v);
                    if (v.data.result != null) {
                        deferred.resolve(v.data.result);
                        $state.go('homePage');
                    } else {
                        alert('信息有误');
                    }
                }, function (e) {
                    console.log(e);
                    deferred.reject(e);
                });

                return deferred.promise;
            }
        }
    })
    //申报页面接口
    .factory('UserList', function ($http, $q) {
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
    })

    //公示页面接口
    .factory('publicity', function ($http, $q) {
        return {
            userlist: function (declare) {
                $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/add.api',
                    params: {
                        token: a,
                        staff: declare.name,
                        staffRelationship: declare.relation,
                        staffPoliticalStatus: declare.political,
                        staffJob: declare.duty,
                        staffSpouse: declare.spouse,
                        staffPhone: declare.phone,
                        eventType: declare.declare,
                        eventCount: declare.number,
                        eventDate: declare.date,
                        location: declare.site,
                        tableCount: declare.tableNumber,
                        peopleCount: declare.peoples,
                        peopleRange: declare.scope,
                        carCount: declare.cars,
                        carSource: declare.source,
                        attachmentFileCode: declare.section,
                        selfPromise: declare.list,
                        promisePeople: declare.promise,
                        staffOrgId: declare.promiseMen

                    }
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

    })
    //现场监督接口
    .factory('Supervision', function ($http, $q) {
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
            //现场监督--已监督
        }
    })
    //角色管理接口
    .factory('Role',function ($http,$q) {
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
    })
