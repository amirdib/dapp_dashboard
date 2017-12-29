angular.
    module('premium').
    component('premium', {
	templateUrl: 'templates/premium.html',
	controller: ["$scope",
                     function($scope) {
			 console.log('test')

		     }]
    });
