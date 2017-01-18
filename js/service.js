/**
 * Created by yang on 17-1-13.
 */

angular.module('myApp.service', [])
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
    .factory('userList', function ($http, $q, $state) {
        var a = sessionStorage.getItem('token');
        console.log(a);
        var deferred = $q.defer();
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
