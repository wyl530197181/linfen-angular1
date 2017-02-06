/**
 * Created by wangyuanlong on 17-1-19.
 */
angular.module('myApp.queryCtrl', [])
    .controller('queryCtrl', function ($scope, $state, queryS) {
        $scope.queryCtrlList = {
            token: sessionStorage.getItem('token'),
            staff: '',
            staffOrgId: 1,
            page: 1,
            start: 0,
            limit: 30
        };
        $scope.query = function () {
            queryS.queryLity($scope.queryCtrlList)
                .then(function (suc) {
                    $scope.queryArr = suc.data.result
                }, function () {
                    console.log(123);
                })
        };
    })
    .controller('combination-queryCtrl', function ($scope, $state, combination_query) {
        $scope.com_queryCtrlList = {
            token: sessionStorage.getItem('token'),
            eventType: '',
            peopleCountMin: '',
            peopleCountMax: '',
            eventCreateTimeFrom: '',
            eventCreateTimeTo: '',
            eventTimeFrom: '',
            eventTimeTo: '',
            page: 1,
            start: 0,
            limit: 20
        };
        $scope.selectPeopleCount = function () {
            if ($scope.com_queryCtrlList.peopleCount == '') {
                $scope.com_queryCtrlList.peopleCountMin = '';
                $scope.com_queryCtrlList.peopleCountMax = '';
            } else {
                $scope.com_queryCtrlList.peopleCountMix = this.com_queryCtrlList.peopleCount.substr(0, 3);
                $scope.com_queryCtrlList.peopleCountMax = this.com_queryCtrlList.peopleCount.substr(3, 3);
            }
        };
        $scope.search = function () {
            combination_query.com_queryLity($scope.com_queryCtrlList)
                .then(function (suc) {
                    console.log(suc);
                    $scope.com_queryyArr = suc.data.result
                }, function () {
                    console.log('接口出错了');
                })
        };
    })

    .controller('statisticsCtrl', function ($scope, $state, Statistics) {
        var aa;
        $scope.statisticsList = {
            token: sessionStorage.getItem('token'),
            eventCreateTimeFrom: '',
            eventCreateTimeTo: '',
            eventTimeFrom: '',
            eventTimeTo: ''
        };
        $scope.search = function () {
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
                }, function () {
                    console.log('接口出错了');
                });
        };


    })
