/**
 * Created by wangyuanlong on 17-1-24.
 */
angular.module('myApp.userManage', [])
    .factory('userManage', function ($http, $q) {
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
            }
        };

    });