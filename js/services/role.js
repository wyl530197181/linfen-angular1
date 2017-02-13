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