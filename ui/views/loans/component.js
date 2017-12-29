angular.
    module('loans').
    component('loans', {
	templateUrl: 'templates/loans.html',
	controller: ['$scope', '$http', function($scope, $http) {
	    
	    var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 700 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	    var x = d3.scaleTime().range([0, width]);
	    var y = d3.scaleLinear().range([height, 0]);

	    var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

	    var line = d3.line()
		.x(function(d) { console.log('line x: ' + x(d.x) + ' - x: ' + d.x); return x(d.x); })
		.y(function(d) { console.log('line y: ' + y(d.y) + ' - y: ' + d.y);return y(d.y); })
	    .curve(d3.curveMonotoneX);
	    

	    var svg = d3.select("#graph").append("svg")
	    	.attr("width", width + margin.left + margin.right)
	    	.attr("height", height + margin.top + margin.bottom)
	    	.append("g")
	    	.attr("transform",
	    	      "translate(" + margin.left + "," + margin.top + ")");

	    d3.json("http://127.0.0.1:8085/loans", function(error, data) {

	    	if (error) throw error;
		
	    	data.forEach(function(d) {
	    	    d.x = parseDate(d.x);
	    	    d.y = +d.y;
	    	});

		// Scale the range
		x.domain(d3.extent(data, function(d) { return d.x; }));
 		y.domain([0, d3.max(data, function(d) { return d.y; })]);
		
// 		// Add the X/Y  Axis
		svg.append("g")
		    .attr("transform", "translate(0," + height + ")")
		    .call(d3.axisBottom(x));
		svg.append("g")
		    .call(d3.axisLeft(y));

		
		svg.append('path')
		    .datum(data)
//	        .attr('stroke', 'red')
     	    	.attr('stroke-width', 3)
     	    	.attr('fill', 'none')
	    	    .attr("d", line);

		svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5);

	    });
	}]
    });
