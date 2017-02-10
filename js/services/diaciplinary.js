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