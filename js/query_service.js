/**
 * Created by wangyuanlong on 17-1-19.
 */
angular.module('myApp.query', [])
    .factory('queryS', function ($http, $q, $state) {
        return {
            queryLity: function (params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/search.api',
                    params: params
                }).then(function (success) {
                        deferred.resolve(success);
                    }
                    , function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            }
        }
    })
    .factory('combination_query', function ($http, $q, $state) {
        return {
            com_queryLity: function (params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/search.api',
                    params: params
                }).then(function (success) {
                        deferred.resolve(success);
                    }
                    , function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            }
        }
    })
    .factory('Statistics', function ($http, $q, $state) {
        return {
            StatisticsLity: function (params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/org_event_type_count',
                    params: params
                }).then(function (success) {
                        deferred.resolve(success);
                    }
                    , function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            }
        }
    })