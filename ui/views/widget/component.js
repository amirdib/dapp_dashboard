angular.module('widget')
    .controller('widgetController', ['$scope', '$window', function($scope, $window, $injector) {


        $scope.grid = $('.grid-stack').data('gridstack');


        var node = [{x: 12 * Math.random(),
                     y: 5 * Math.random(),
                     width: 1 + 3 * Math.random(),
                     height: 1 + 3 * Math.random()}][0]


        $scope.remove = function($event){
            console.log($event.target)
            target = $event.target
            if ($event.target.className == "fa fa-trash-o fa-lg"){
                var  node = $(target).closest('.grid-stack-item')
                console.log($(target).closest('.grid-stack-item'))
                console.log('click grid')
                $scope.grid.removeWidget(node)
            }
        }

        $scope.removeAll = function () {
            $('.grid-stack').data('gridstack').removeAll()
        }


        $scope.addWidget = function (cardType) {

            var node = [{x: 12 * Math.random(),
                         y: 5 * Math.random(),
                         width: 1 + 3 * Math.random(),
                         height: 1 + 3 * Math.random()}][0]

            id = new Date().getTime()

            console.log(cardType)
            switch (cardType) {
                case 'card':
                    element ="<div id='"+ id + "' id='gsi-1' class='grid-stack-item ui-draggable ui-resizable ui-resizable-autohide' data-gs-x='1' data-gs-y='0' data-gs-width='4' data-gs-height='2'> <article class='tile is-child box grid-stack-item-content'><p class='title'>Value Card 1</p><p class='subtitle'>Card 1</p></article></div>"
                    break;

                case 'totalAmount':

                    element = "<div id='"+ id + "' data-gs-x='1' data-gs-y='3' data-gs-width='10' data-gs-height='4'> <div class='grid-stack-item-content card' id='loans-graph"+id+"'> <header class='card-header'> <p class='card-header-title' align='center'> Total amount funded in ETH </p> <a href='#' class='card-header-icon' aria-label='Delete card'> <span class='icon has-text-danger'> <i class='fa fa-trash-o fa-lg'></i> </span> </a> </header> <div class='card-content' > <div class='chart-container' style='position: relative; height:100%; width:100%'> <canvas id='myChart"+id+"'></canvas> </div> <div class='content' ng-controller='loansController' ng-init='id ="+id+"'><loans></loans></div> </div> </div> </div>"
                    break;

                case 'collaterals':
                    element = "<div id='"+ id + "' data-gs-x='7' data-gs-y='6' data-gs-width='5' data-gs-height='6'> <div class='grid-stack-item-content card' id='pieChart'> <header class='card-header'> <p class='card-header-title' align='center'> Collateral used in loans </p> <a href='#' class='card-header-icon' aria-label='Delete card'> <span class='icon has-text-danger'> <i class='fa fa-trash-o fa-lg'></i> </span> </a> </header> <div class='card-content' > <div class='content'><collateral></collateral> </div> </div> </div> </div>"

                    element = "<div id='"+ id + "' data-gs-x='1' data-gs-y='3' data-gs-width='10' data-gs-height='4'> <div class='grid-stack-item-content card'> <header class='card-header'> <p class='card-header-title' align='center'> Total amount funded in ETH </p> <a href='#' class='card-header-icon' aria-label='Delete card'> <span class='icon has-text-danger'> <i class='fa fa-trash-o fa-lg'></i> </span> </a> </header> <div class='card-content' > <div class='chart-container' style='position: relative; height:100%; width:100%'> <canvas id='pieChart"+id+"'></canvas> </div> <div class='content' ng-controller='collateralController' ng-init='id ="+id+"'><collateral></collateral></div> </div> </div> </div>"
                    break;

                case 'topLenders':
                    element ="<div id='"+ id + "' class='grid-stack-item' data-gs-x='0' data-gs-y='10' data-gs-width='7' data-gs-height='8'> <div class='grid-stack-item-content card'> <header class='card-header'> <p class='card-header-title' align='center'> Lenders </p> <a href='#' class='card-header-icon' aria-label='Delete card'> <span class='icon has-text-danger'> <i class='fa fa-trash-o fa-lg'></i> </span> </a> </header> <div class='card-content' > <div class='content'><div ng-controller='Controller'><tablemodule></tablemodule></div> </div> </div> </div> </div>"
                    console.log('Lenders')
                    break;
            }

            recompile = function(el){
                angular.element(document).injector().invoke(function ($compile) {
                    var scope = angular.element(el).scope();
                    $compile(el)(scope);
                });}

            $('.grid-stack').gridstack();
            var grid = $('.grid-stack').data('gridstack');
            $('.grid-stack').append(element)
            var widget = $('#'+id)


            recompile(widget)
            grid.makeWidget(widget);

        }

    }])
