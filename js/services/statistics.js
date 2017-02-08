/**
 * Created by bobo on 17-2-8.
 */
angular.module('myApp.service').factory('Statistics', function ($http, $q, $state) {
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
});