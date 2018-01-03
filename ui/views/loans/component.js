angular.
module('loans')
    .controller('loansController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {


        timeFormat = "%Y-%m-%d %H:%M:%S"
        var parseDate = d3.timeParse(timeFormat);

        console.log('entering loans module id: myChart' + $scope.id)

        $scope.$watch('id', function () {
            console.log('entering loans module id: myChart' + $scope.id)
        });




        console.log('processing dates')
        d3.json("http://54.77.50.118:8085/loans", function(error, data) {


            if (error) throw error;

            data.forEach(function(d) {
                d.x = parseDate(d.x);
                d.y = +d.y;
            });
            console.log('processing dates')

            var ctx = $("#myChart" + $scope.id)

            var scatterChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: false,
                        backgroundColor: 'rgba(247, 212, 168, 0.2)',
                        borderColor: 'rgba(241, 154, 42, 1)',
                        fill: true,
                        data: data,
                    }]
                },
                options: {
                    legend:{
                        display:false
                    },
                    maintainAspectRatio: false,
                    title:{
                        text: "Amount Funded"
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            time: {
                                format: timeFormat,
                                // round: 'day'
                                tooltipFormat: 'll HH:mm'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }, ],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Amount (ETH)'
                            }
                        }]
                    },
                }
            });
        });
    }])
    .directive('loans', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/loans.html'
    };
});

