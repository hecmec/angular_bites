/**
 * Created by jens on 22/10/2015.
 */
var mod = angular.module('exampleViewerApp.exampleListController',[]);

mod.controller('ExampleListCtrl', function ($scope, exampleService){
  exampleService.list(function(examples) {
    $scope.examples = examples;
  });
});