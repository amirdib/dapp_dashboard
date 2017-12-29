angular.
    module('cards').
    component('cards', {
	templateUrl: 'templates/cards.html',
	controller: ["$scope",
                     function($scope) {
			 console.log('test')

		     }]
    });
