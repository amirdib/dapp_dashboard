angular.
module('collateral').
component('collateral', {
    templateUrl: 'templates/collateral.html',
    controller: ['$scope', '$http','d3Service', function($scope, $http, d3Service) {
        //        debugger;
        console.log('entering collateral module')
        //        var width = parseInt(d3.select('#loans-graph').style('width'), 10);
        console.log('entering collateral module')

        var margin = { left: 50, right: 50, top: 50, bottom: 50 },
            width = parseInt(d3.select('#pieChart').style('width'), 10),
            height = parseInt(d3.select('#pieChart').style('height'), 10);


        d3.json("http://127.0.0.1:8085/collaterals",function(error, data) {
            if (error) throw error;


            width = parseInt(d3.select('#pieChart').style('width'), 10)
            height = parseInt(d3.select('#pieChart').style('height'), 10)

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

            function redraw(width, height){
                d3.select('.d3-pie').remove()

                var pie = new d3pie("#pieChart", {
                    "header": {
                        "title": {
                            "text": "Collaterals distribution",
                            "fontSize": 24,
                            "font": "open sans"
                        },
                        "subtitle": {
                            "text": "Percentage of each collateral used in loans",
                            "color": "#999999",
                            "fontSize": 12,
                            "font": "open sans"
                        },
                        "titleSubtitlePadding": 0
                    },
                    "size": {
                        "canvasWidth": width,
                        "canvasHeight": height,
                        "pieOuterRadius": "50%"
                    },
                    "data": {
                        "smallSegmentGrouping": {
                            "enabled": true,
                            "value": 2
                        },
                        "content": data
                    }});

                pie.svg.attr('class', "d3-pie")
            }

            redraw(width, height);
        });
    }]
});



//        d3.json("http://127.0.0.1:8085/collaterals",function(error, data) {
//            if (error) throw error;
//
//
//            width = parseInt(d3.select('#pieChart').style('width'), 10)
//            height = parseInt(d3.select('#pieChart').style('height'), 10)
//
//            $('.grid-stack').on('gsresizestop', function (event, elem) {
//
//                var grid = $('.grid-stack').data('gridstack');
//                var gridCellWidth = grid.cellWidth(),
//                    gridCellHeight = grid.cellHeight();
//
//                var gridVerticalMargin = grid.opts.verticalMargin;
//
//                var elemWidth = $(elem).attr('data-gs-width'),
//                    elemHeight = $(elem).attr('data-gs-height');
//
//                var width = gridCellWidth * elemWidth,
//                    height = gridCellHeight * elemHeight + gridVerticalMargin * (elemHeight - 1);
//
//                redraw(width, height);
//            });
//
//            function redraw(width, height){
//                d3.select('.d3-pie').remove()
//
//                var pie = new d3pie("#pieChart", {
//                    "header": {
//                        "title": {
//                            "text": "Lots of Programming Languages",
//                            "fontSize": 24,
//                            "font": "open sans"
//                        },
//                        "subtitle": {
//                            "text": "A full pie chart to show off label collision detection and resolution.",
//                            "color": "#999999",
//                            "fontSize": 12,
//                            "font": "open sans"
//                        },
//                        "titleSubtitlePadding": 0
//                    },
//                    "size": {
//                        "canvasWidth": width,
//                        "canvasHeight": height,
//                        "pieOuterRadius": "50%"
//                    },
//                    "data": {
//                        "smallSegmentGrouping": {
//                            "enabled": true,
//                            "value": 2
//                        },
//                        "content": data
//                    }});
//
//                pie.svg.attr('class', "d3-pie")
//            }
//
//            redraw(width, height);
//        });



//                var colorLabel = 'Collaterals';
//
//                d3.select(".piechartgraph").remove()
//                var svg = d3.select("#pieChart").append("svg").attr("class", "piechartgraph")
//                .attr("width", "100%")
//                .attr("height", height);
//
//                var innerWidth = width - margin.left - margin.right;
//                var innerHeight = height - margin.top - margin.bottom;
//
//                var g = svg.append('g')
//                .attr('transform', 'translate('+margin.left+','+margin.top+')');
//                var colorLegendG = g.append('g')
//                .attr('transform', 'translate('+innerWidth+',50)');
//
//                var canvas = g.append('g')
//                .attr('transform', 'translate('+ innerWidth / 2 +','+innerHeight/2+')');
//
//                var temp = d3.select('body').append('div')
//                .attr('class', 'tooltip')
//                .style('opacity', 0);
//
//
//                g.append('text')
//                    .attr('class', 'subtitle')
//                    .attr('x', 250)
//                    .attr('y', margin.top)
//                    .style('font-weight', 'bold')
//                    .text('Collaterals used in loans');
//
//
//                colorLegendG.append('text')
//                    .attr('class', 'legend-label')
//                    .attr('x', -30)
//                    .attr('y', -20)
//                    .text(colorLabel);
//
//                var colorScale = d3.scaleOrdinal()
//                .range(d3.schemeCategory10);
//
//
//                var colorLegend = d3.legendColor()
//                .scale(colorScale)
//                .shape('square');
//
//                var pie = d3.pie().value(function(d) { return d.value ; });
//
//                var arc = d3.arc()
//                .innerRadius(innerHeight / 4)
//                .outerRadius(innerHeight / 2);
//
//                var temp = d3.select('body').append('div')
//                .attr('class', 'tooltip')
//                .style('opacity', 0);
//
//
//
//
//                var temp_data = d3.nest()
//                .key(function(d) { return d.label; })
//                .rollup(d => d.length)
//                .entries(data);
//
//                var arcs = pie(temp_data);
//
//                canvas.selectAll('path')
//                    .data(arcs)
//                    .enter()
//                    .append('path')
//                    .attr('d', arc)
//                    .attr('fill', d => colorScale(d.data.key))
//
//
//                colorLegendG.call(colorLegend)
//                    .selectAll('.cell text')
//                    .attr('dy', '0.1em');


//
//        d3.select(".piechartgraph").remove()
//                var svg = d3.select("#pieChart").append("svg")
//                .attr("class", "piechartgraph")
//                .attr("width", "100%")
//                .attr("height", height + margin.top + margin.bottom),
//                    radius = Math.min(width, height) / 2,
//                    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//
//                var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
//
//                var pie = d3.pie()
//                .sort(null)
//                .value(function(d) { return d.value; });
//
//                var path = d3.arc()
//                .outerRadius(radius - 10)
//                .innerRadius(0);
//
//                var label = d3.arc()
//                .outerRadius(radius - 40)
//                .innerRadius(radius - 40);
//
//
//                var arc = g.selectAll(".arc")
//                .data(pie(data))
//                .enter().append("g")
//                .attr("class", "arc");
//
//                arc.append("path")
//                    .attr("d", path)
//                    .attr("fill", function(d) { return color(d.data.label); });
//
//                arc.append("text")
//                    .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
//                    .attr("dy", "0.35em")
//                    .text(function(d) { return d.data.value; });
//            }
//
//
//            console.log('drawing with width ' + width + ', height ' + height)
//            redraw(width, height);
//        });
