angular.
module('loans').
component('loans', {
    templateUrl: 'templates/loans.html',
    controller: ['$scope', '$http', function($scope, $http) {
        console.log('enter loans module')

        var margin = {top: 60, right: 30, bottom: 30, left: 50};
        width = parseInt(d3.select('#loans-graph').style('width'), 10)
        height = parseInt(d3.select('#loans-graph').style('height'), 10)

        var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

        d3.json("http://127.0.0.1:8085/loans", function(error, data) {

            if (error) throw error;

            console.log(data)

            data.forEach(function(d) {
                d.x = parseDate(d.x);
                d.y = +d.y;
            });

            $('.grid-stack').on('gsresizestop', function (event, elem) {

                var grid = $('.grid-stack').data('gridstack');
                var gridCellWidth = grid.cellWidth(),
                    gridCellHeight = grid.cellHeight();

                var gridVerticalMargin = grid.opts.verticalMargin;

                var elemWidth = $(elem).attr('data-gs-width'),
                    elemHeight = $(elem).attr('data-gs-height');

                var width = gridCellWidth * elemWidth,
                    height = gridCellHeight * elemHeight + gridVerticalMargin * (elemHeight - 1);

                redraw(width, height);
            });

            function redraw(width, height ){

                width = width - margin.left - margin.right,
                    height = height - margin.top - margin.bottom;

                d3.select("#loans-graph svg").remove()
                var svg = d3.select("#loans-graph").append("svg")
                .attr("class", "d3-graph")
                .attr("width", "100%")
                .attr("height", height + margin.top + margin.bottom),
                    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var x = d3.scaleTime()
                .rangeRound([0, width]);

                var y = d3.scaleLinear()
                .rangeRound([height, 0]);

                var area = d3.area()
                .x(function(d) { return x(d.x); })
                .y1(function(d) { return y(d.y); });

                // Scale the range
                x.domain(d3.extent(data, function(d) { return d.x; }));
                y.domain([0, d3.max(data, function(d) { return d.y; })]);
                area.y0(y(0));

                g.append("path")
                    .datum(data)
                    .attr("fill", "steelblue")
                    .attr("d", area);

                g.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                g.append("g")
                    .attr("text-anchor", "begin")
                    .attr("class", "xAxis")
                    .call(d3.axisLeft(y))
                    .append("text")
                    .attr("fill", "#000")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 7)
                    .attr("dy", "2em")
                    .text("ETH");

               // d3.select(".xAxis").attr("text-anchor", "begin")
            }

            console.log('drawing with width ' + width + ', height ' + height)
            redraw(width, height);
        });
    }]
});
