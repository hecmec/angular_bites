/**
 * Created by jens on 22/10/2015.
 */
var mod = angular.module('exampleViewerApp.exampleService',[]);

mod.factory('exampleService', function($http){

  function getData(callback){
    $http({
      method: 'GET',
      url: '../examples.json',
      cache: true
    }).success(callback);
  }

  return {
    list: getData,
    find: function(location, callback){
      getData(function(exList) {
        var ex = exList.find(function(elm, index, arr){
          if(elm.location === location){
            elm.index = index;
            return true
          }
          else{
            return false;
          }
        });
        callback(ex);
      });
    }
  };
});
