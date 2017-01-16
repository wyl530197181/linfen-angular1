/**
 * Created by wangyuanlong on 17-1-14.
 */
angular.module('myApp.approval', [])
    .factory('approval', function ($http, $q, $state) {
        var deferred = $q.defer();//生成deferred异步对象
        return {
            approvalList: function () {
                $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/show_audit.api',
                    params: {
                        token: sessionStorage.getItem('token'),
                        staff: '',
                        auditStatus: '-1',
                        page: '1',
                        start: '0',
                        limit: '30'
                    }
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

    });


