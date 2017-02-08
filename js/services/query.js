/**
 * Created by bobo on 17-2-8.
 */

angular.module('myApp.service').factory('queryS', function ($http, $q, $state) {
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
});