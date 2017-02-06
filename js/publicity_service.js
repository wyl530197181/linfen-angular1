/**
 * Created by wangyuanlong on 17-1-18.
 */
angular.module('myApp.publicity', [])
    .factory('publicity', function ($http, $q, $state) {
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
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_bulletin_result/add.api ',
                    params: params
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (erro) {
                    deferred.reject(erro);
                });
                return deferred.promise;
            }

        }
    });
