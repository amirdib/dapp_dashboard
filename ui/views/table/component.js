angular.
    module('table').
    component('table', {
	templateUrl: 'templates/table.html',
	controller: ["$scope",
                     function($scope) {
			 console.log('test')

		     }]
    });
