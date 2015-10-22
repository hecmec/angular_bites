var app = angular.module('exampleViewerApp', [
  'ngRoute',

  'exampleViewerApp.exampleService',
  'exampleViewerApp.exampleListController',
  'exampleViewerApp.exampleDetailController'
]);

app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'example-list.html',
      controller: 'ExampleListCtrl'
    }).
    when('/:location', {
      templateUrl: 'example-detail.html',
      controller: 'ExampleDetailCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
});


// Responsible for navigating based on key events.
app.controller('MainCtrl', function ($scope, $document, $location, exampleService){
  exampleService.list(function(examples){
    // keycode for left and right key
    var LEFT = 37,
        RIGHT = 39;

    $scope.changeExample = function(e) {
      var path = $location.path();
          // The example location
      var loc = path.substr(1);

      // If there is a location,
      if(loc){
        exampleService.find(loc, function(example){
          var index = example.index || 0;
          if(e.keyCode === RIGHT && index < examples.length ){
            index++;
          } else if(e.keyCode === LEFT && index > 0) {
            index--;
          }

          var nextLocation = examples[index].location
          // Navigate to the previous or next example.
          $location.path('/' + nextLocation);
        });

      }
    };
  });
});

/**
 * The `file` directive loads the content of an 
 * example source code file into a CodeMirror instance
 * for syntax-highlighted presentation.
 */
app.directive('file', function(){
  return {
    scope: {
      file: '=',
      example: '='
    },
    restrict: 'A',
    controller: function($scope, $http){
      var path = [
        '../examples/angular',
        $scope.example.location,
        $scope.file
      ].join('/');
      $http.get(path).success(function(data) {
        if(typeof(data) === 'object'){
          // un-parse auto-parsed JSON files for presentation as text
          data = JSON.stringify(data, null, 2);
        } else {
          // Remove trailing newlines from code presentation
          data = data.trim();
        }
        $scope.content = data;
      });
    },
    link : function(scope, element, attrs) {
      var textArea = element[0];
      var editor = CodeMirror.fromTextArea(textArea, {
        mode: scope.file.split('.').pop() == 'js' ? 'text/typescript' : 'text/html',
        lineNumbers: true,
        viewportMargin: Infinity
      });
      scope.$watch('content', function(data){
        if(data) {
          editor.setValue(data);
        }
      });
    }
  };
});
