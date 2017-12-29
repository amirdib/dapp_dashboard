angular.
    module('collateral').
    component('collateral', {
	templateUrl: 'templates/collateral.html',
	controller: ["$scope",
                     function($scope) {
			 console.log('test')

		     }]
    });
