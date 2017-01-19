/**
 * Created by wangyuanlong on 17-1-18.
 */
angular.module('myApp.publicity', [])
    .factory('publicity', function ($http, $q, $state) {
        return {
           publicList: function (params) {
                var deferred = $q.defer();//生成deferred异步对象
                $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/show_audit.api',
                    params: params
                }).then(function (success) {
                    console.log(success);
                    deferred.resolve(success);
                }, function (erro) {
                    console.log(erro);
                    deferred.reject(erro);
                });
                return deferred.promise;
            }
        }
    })
// .factory('passBy', function ($http, $q, $state) {
//     var a = sessionStorage.getItem('token');
//     return {
//         userlist: function (params) {
//             var deferred = $q.defer();
//             $http({
//                 token: a,
//                 method: 'POST',
//                 url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_audit/get_by_event.api',
//                 params: params
//             }).then(function (v) {
//                 console.log(v);
//                 deferred.resolve(v);
//             }, function (e) {
//                 console.log(e);
//                 deferred.reject(e);
//             });
//             return deferred.promise;
//         }
//     }
// })
//
// .factory('rejectBy', function ($http, $q, $state) {
//     var a = sessionStorage.getItem('token');
//
//     return {
//         userlist: function (params) {
//             var deferred = $q.defer();
//             $http({
//                 token: a,
//                 method: 'POST',
//                 url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_audit/get_by_event.api',
//                 params: params
//             }).then(function (v) {
//                 console.log(v);
//                 deferred.resolve(v);
//             }, function (e) {
//                 console.log(e);
//                 deferred.reject(e);
//             });
//             return deferred.promise;
//         }
//     }
// })
// .factory('confirmBy', function ($http, $q, $state) {
//     var a = sessionStorage.getItem('token');
//     return {
//         userlist: function (params) {
//             var deferred = $q.defer();
//             $http({
//                 token: a,
//                 method: 'POST',
//                 url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_audit/get_by_event.api',
//                 params: params
//             }).then(function (v) {
//                 console.log(v);
//                 deferred.resolve(v);
//             }, function (e) {
//                 console.log(e);
//                 deferred.reject(e);
//             });
//             return deferred.promise;
//         }
//     }
// });