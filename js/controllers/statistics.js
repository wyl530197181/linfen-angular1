/**
 * Created by bobo on 17-2-8.
 */
angular.module("myApp.controller").controller('statisticsCtrl', function ($scope, $state, Statistics) {
    var aa;
    $scope.statisticsList = {
        token: sessionStorage.getItem('token'),
        eventCreateTimeFrom: '',
        eventCreateTimeTo: '',
        eventTimeFrom: '',
        eventTimeTo: ''
    };
    $scope.search = function () {
        $.LoadingOverlay("show", {
            image: "img/oval.svg",
            bgcolor: 'rgba(28,43,54,0.7)'
        });
        Statistics.StatisticsLity($scope.statisticsList)
            .then(function (suc) {
                // console.log(suc);
                $scope.aa = suc.data.result;
                console.log($scope.aa);
                var myChart = echarts.init(document.getElementById('main'));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['婚嫁', '丧葬']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: [$scope.aa[0].orgName, $scope.aa[1].orgName]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '婚嫁',
                            type: 'bar',
                            data: [$scope.aa[0].type1Count, $scope.aa[0].type2Count],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '丧葬',
                            type: 'bar',
                            data: [$scope.aa[1].type1Count, $scope.aa[1].type2Count],
                            markPoint: {
                                data: []
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                $.LoadingOverlay("hide")
            }, function () {
                swal('接口出错了');
            });
    };


});