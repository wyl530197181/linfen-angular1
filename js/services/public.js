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
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/public_notification/show.api',
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
        publicUpdate2:function (params) {
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
        publicUpdate3:function (params) {
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