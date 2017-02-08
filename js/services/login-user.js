/**
 * Created by bobo on 17-2-8.
 */
//登陆页面接口
angular.module('myApp.service').factory('loginUser', function ($http, $q, $state) {
        //生成deferred异步对象
        return {
            login: function (user) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/auth.api',
                    params: {
                        username: user.name,
                        password: user.password
                    }

                }).then(function (v) {
                    // console.log(v);
                    if (v.data.result != null) {
                        deferred.resolve(v.data.result);
                        $state.go('homePage');
                    } else {
                        alert('信息有误');
                    }
                }, function (e) {
                    console.log(e);
                    deferred.reject(e);
                });

                return deferred.promise;
            }
        }
    })