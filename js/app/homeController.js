
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
                    axisLabelDistance: -10
                },
                xTickFormat: function(d) {
//                    var date = new Date(d);
//                    var hh = date.getHours();
//                    var mm = date.getMinutes();
//                    
//                    return (hh < 10 ? "0" + hh : hh) + ":" + (mm < 10 ? "0" + mm : mm);
                    return d3.time.format('%H')(new Date(d));
                },
                xScale: d3.time.scale.utc(),
//                forceX: [0,23],
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
        
            console.log($scope.Data);
            console.log(data);

        });
    
    $scope.CreatePost = function() {
        $http.post('/weather', {
                timeStamp: new Date(),
                lightLevel: 0.5,
                temperature: 0,
                pressure: 1,
                humidity: 2,
                windSpeed: 50,
                windDirection: "NE"
            })
            .success(function(data) {
                console.log("post success");
            })
            .error(function(data) {
                console.log("post error", data);
            });
    }

});