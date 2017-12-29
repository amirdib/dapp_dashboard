angular.
    module('collateral').
    component('collateral', {
	templateUrl: 'templates/collateral.html',
	controller: ['$scope', '$http', function($scope, $http) {

	    d3.json("http://127.0.0.1:8085/collaterals",function(error, data) {
		if (error) throw error;


		var pie = new d3pie("pieChart", {
		    "data": {
			"content": data
		    }});
	    });
	}]
    });
