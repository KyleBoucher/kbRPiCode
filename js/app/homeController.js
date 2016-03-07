
mainModule.controller('homeController', function($scope, $http, $interval) {
    
    $scope.LightSensor = {
        Options: {
            chart: {
                type:'lineWithFocusChart',
                height: 500,
                margin: {
                    top:20,
                    right:40,
                    bottom:60,
                    left:40
                },
                interpolate: 'monotone',
                x: function(d){return d.x;},
                y: function(d) {return d.y;},
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: "",
                    ticks:12,
                    tickFormat: function(d) {
                        return d3.time.format('%H:%M')(new Date(d));
                    },
                    showMaxMin: true
                },
                x2Axis: {
                    axisLabel: "",
                    tickFormat: function(d) {
                        return d3.time.format('%H:%M')(new Date(d));
                    },
                    showMaxMin: true
                },
                //xScale: d3.time.scale(),
                //yScale: d3.scale.linear(),
                //forceX: [moment().startOf('day').toDate(), moment().endOf('day').toDate()],
                forceY: [0.0, 1.0],
                yAxis: {
                    axisLabel: "",
                    ticks:10,
                    showMaxMin: true
                },
                showLegend: false,
//                zoom:{
//                    enabled: true,
//                    useNiceScale: true,
//                    verticalOff: true,
//                    horizontalOff: false,
//                    scale: 1,
//                    useFixedDomain: false,
//                    scaleExtent: [1,1],
//                    zoomed: function(xDomain, yDomain) {
//                        console.log(xDomain);
//                        var now = moment(new Date());
//                        //var xd1 = $scope.LightSensor.Options.chart.xScale(now.hour(0).minute(xDomain[0]).toDate());
//                        //var xd2 = $scope.LightSensor.Options.chart.xScale(now.hour(0).minute(24 + xDomain[1]).toDate());
//                        return {x1:xd1,x2:xd2,y1:0, y2:1};
//                    }
//                },
//                callback: function(chart){
//                    console.log("!!! lineChart callback !!!");
//                    console.log("yScale", chart.yScale());
//                }
            },
            title: {
                enable: true,
                text: "Weather Data"
            }
        },
        Data: []
    };
    
    //TODO: Fake data adding (random value 0-1) with faked timestamp 1min apart.
    //          - Get graph working then set python code to run on PI to test
    $interval(function() {
        var date = new Date();
        $scope.RandLightLevel = Math.pow(Math.sin(Math.PI*0.2 + 1e-4*date.getTime()), 2);
        post = {
            'timeStamp': date.toISOString(),
            'lightLevel': $scope.RandLightLevel,
            'temperature': 0,
            'pressure': 0,
            'humidity': 0,
            'windSpeed': 0,
            'windDirection': 'N'
        };
        // send post
        $http.post('/weather', post)
            .success(function(data) {
            
            })
            .error(function(data) {
                console.log("Error Posting data", data);
            })
    }, 60000);
    
    $interval(function() {
        $scope.GetData();
    }, 60000);
    
    $scope.GetData = function() {
        $http.get('/weather')
        .success(function(data) {
            //console.log(data);
            $scope.LightSensor.Data = [{
                values:[],
                key:'',
                color:'#ff0000'
            }];
            for(var i = 0; i < data.length; ++i) {
                $scope.LightSensor.Data[0].values.push({
                    x: new Date(data[i].timeStamp),
                    y: data[i].lightLevel
                });
            }

        })
        .error(function(data) {
            console.log("Error Posting data", data);
        });
    }
    $scope.GetData();

});

