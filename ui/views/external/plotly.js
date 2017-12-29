angular.module('plotly',[])
  .factory('plotly', ["$window", function ($window) {
    var plotly = $window.Plotly;
    return plotly;
  }]);
