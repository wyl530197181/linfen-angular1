/**
 * Created by bobo on 17-2-8.
 */
//申报页面接口
angular.module('myApp.service').factory('UserList', function ($http, $q) {
    return {
        userlist: function (params) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/add.api',
                params: params,
                responseType: 'json',
                timeout: 30000
            }).then(function (v) {
                console.log(v);
                deferred.resolve(v);
            }, function (e) {
                console.log(e);
                deferred.reject(e);
            });
            return deferred.promise;
        }
    }
});