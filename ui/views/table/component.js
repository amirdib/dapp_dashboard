angular.module('tableModule', ['ngTable'])
    .controller('Controller', ['$scope', '$http', 'NgTableParams', function($scope, $http, NgTableParams) {

    $http
            .get('http://54.77.50.118:8085/table')
            .then(function(response) {
        var lenders = response.data;
            $scope.tableParams = new NgTableParams({page: 1, count: 10}, { data: lenders});
        });

    }])
    .directive('tablemodule', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/table.html'
    };
    });


// angular.
//     module('table').
//     component('table', {
// 	templateUrl: 'templates/table.html',
// 	controller: ["$scope", 'NgTableParams',
//                      function($scope, NgTableParams) {

// 			 var self = this;
// 			 var data = [{name: "Moroni", age: 50}, {name: "Morona", age: 70}  /*,*/];
// 			 this.tableParams = new NgTableParams({}, { dataset: data});
// //			 			 debugger;

// 		     }]
//     });
