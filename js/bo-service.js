/**
 * Created by bobo on 17-1-16.
 */
angular.module('myApp.bo-service', [])
    .factory('public', function ($http, $q) {
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
    })
    .factory('diaciplinary', function ($http, $q) {
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
            //公开通报删除接口
            diaciplinaryDel:function (params) {
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
        }
    })