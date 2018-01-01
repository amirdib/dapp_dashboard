'use strict';
angular.module('d3', [])
  .factory('d3Service', [function(){
    var d3;
    return{
        d3:d3
          };
  }]);

angular.module('collateral', ['d3']);
