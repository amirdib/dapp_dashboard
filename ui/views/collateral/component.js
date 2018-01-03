angular.
module('collateral')
    .controller('collateralController', ['$scope', '$http', function($scope, $http) {


        $scope.$watch('id', function () {
            console.log('entering collateral module id: pieChart' + $scope.id)
        });

        var scheme = new ColorScheme;

        var colors = scheme.colors();



        d3.json("http://34.243.28.41:8085/collaterals",function(error, data) {
            if (error) throw error;

            var node  = $("#pieChart"+$scope.id)

            scheme.from_hue(data.length)
                .scheme('triade')
                .variation('soft');
            var colors = scheme.colors();

            colors.forEach((o, i, a) => a[i] = '#'+a[i])
            console.log(data.length)
            console.log(colors.length)

            labels = []
            serie = []
            data.forEach(function(d){labels.push(d.label); serie.push(d.value)})
            console.log(serie)
            console.log(labels)
            var myChart = new Chart(node, {
                type: 'pie',
                data : {
                    datasets: [{
                        data: serie,
                        backgroundColor: colors,
                        borderWidth: 0
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: labels,
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display:false,
                        labels: {
                            fontColor: '#000'
                        }
                    }
                }
            });
        });

    }])
        .directive('collateral', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/collateral.html'
        };
    });
