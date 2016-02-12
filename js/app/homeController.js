
mainModule.controller('homeController', function($scope, $http) {
    
    $scope.LightSensor = {
        Options: {
            chart: {
                type:'lineChart',
                height: 200,
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
                    axisLabel: "Time",
                    axisLabelDistance: -10,
                    rotate: 45,
                },
                xTickFormat: function(d) {
//                    var date = new Date(d);
//                    var hh = date.getHours();
//                    var mm = date.getMinutes();
//                    
//                    return (hh < 10 ? "0" + hh : hh) + ":" + (mm < 10 ? "0" + mm : mm);
                    return d3.time.format('%H:%M')(new Date(d));
                },
                xScale: d3.time.scale(),
                //forceX: [moment().startOf('day'), moment().endOf('day')],
                forceY: [0, 1],
                yAxis: {
                    axisLabel: "",
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: "Light Level"
            }
        },
        Data: []
    };
    
    //TODO: Fake data adding (random value 0-1) with faked timestamp 1min apart.
    //          - Get graph working then set python code to run on PI to test
    
    $http.get('/weather')
        .success(function(data) {
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

        });

});