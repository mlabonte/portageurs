'use strict';

/* App Module */
/* see http://scotch.io/tutorials/javascript/single-page-apps-with-angularjs-routing-and-templating */
var phonecatApp = angular.module('phonecatApp', ['ngRoute']);

phonecatApp.config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/liste.html',
        controller: 'aCtrl'
      }).
      when('/details/:sortieid?', {
        templateUrl: 'partials/details.html',
        controller: 'bCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  });

function transformer_sortie(sortie){
    var desc = sortie["description"];
    if( !sortie["endroit"] ){
        sortie["endroit"] = desc;
        sortie["description"] = "";
    }
    if( desc && desc.indexOf("href")>0 ){
        sortie["description"] = "";
    }
    return sortie;
}
  
// create the controller and inject Angular's $scope
phonecatApp.controller('aCtrl', function($scope, $http, $location) {
  $http.get('//www.portageurs.qc.ca/cgi-bin/calendrierjson.pl').success(function(data) {
    var sorties = [];
    for(var i=0; i<data["sorties"].length; i++){
        var sortie = data["sorties"][i];
        sortie = transformer_sortie(sortie);
        sorties.push(sortie);
    }

    $scope.sorties = {"sorties": sorties};
    $scope.go = function(id_sortie){
        $location.path( "/details/" + id_sortie );
    };
  }).error(function(data, status, headers, config) {
      alert(status);
      $scope.sorties['status'] = status;
      $scope.sorties['headers'] = headers;
      $scope.sorties['data'] = data;
  });
});

phonecatApp.controller('bCtrl', function($scope, $routeParams, $sce) {
    var url = "//www.portageurs.qc.ca/cgi-bin/details.pl?id=" + $routeParams.sortieid;
    $scope.sortieUrl = $sce.trustAsResourceUrl(url);
});

