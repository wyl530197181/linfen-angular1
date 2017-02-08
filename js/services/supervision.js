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
});