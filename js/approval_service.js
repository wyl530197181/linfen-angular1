/**
 * Created by wangyuanlong on 17-1-14.
 */
angular.module('myApp.approval', [])
    .factory('approval', function ($http, $q, $state) {
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




