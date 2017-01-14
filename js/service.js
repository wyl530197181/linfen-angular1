/**
 * Created by yang on 17-1-13.
 */

angular.module('myApp.service',[])
    .factory('loginUser',function ($http,$q,$state) {
        var deferred = $q.defer();//生成deferred异步对象
        return {
            login:function (user) {
                $http({
                    method:'POST',
                    url:'http://bigbug.tech:8080/wdm-api/api/user/auth.api',
                    params:{
                        username:user.name,
                        password:user.password
                    }
                }).then(function (v) {
                    console.log(v);
                    if (v.data.result != null) {
                        deferred.resolve(v.data.result);
                        $state.go('homePage');
                    } else {
                        alert('信息有误');
                    }
                },function (e) {
                    console.log(e);
                    deferred.reject(e);
                });
                return deferred.promise;
            }
        }
    });
