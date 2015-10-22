/**
 * Created by jens on 22/10/2015.
 */
var mod = angular.module('exampleViewerApp.exampleDetailController',[]);

mod.controller('ExampleDetailCtrl',
  function ($scope, $routeParams, $http, $sce, exampleService){

    exampleService.find($routeParams.location, function(example) {
      $scope.example = example;
      var examplePath = '../examples/angular/' + example.location;
      $scope.runUrl = examplePath + '/index.html';

      $http.get(examplePath + '/README.md').success(function(data) {
        // Remove first line, as it appears elsewhere on the page (called 'message').
        var md = data.split('\n').splice(1).join('\n');
        $scope.readme = $sce.trustAsHtml(marked(md));
      });
    });

  });
