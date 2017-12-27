angular.
    module('reports').
    component('reports', {
	templateUrl: 'templates/reports.html',
	controller: ["$scope",
                     function($scope) {
			 console.log('test')

		     }]
    });
