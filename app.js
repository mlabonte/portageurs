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

// create the controller and inject Angular's $scope
phonecatApp.controller('aCtrl', function($scope, $http, $location) {
  $http.get('http://www.portageurs.qc.ca/cgi-bin/calendrierjson.pl').success(function(data) {
    $scope.sorties = data;
    $scope.go = function(id_sortie){
        $location.path( "/details/" + id_sortie );
    };
  }).error(function(data, status, headers, config) {
      alert(status);
      $scope.sorties['status'] = status;
      $scope.sorties['headers'] = headers;
      $scope.sorties['data'] = data;
  });
  
  $scope.select_sortie = function(){
    $http.get('http://www.portageurs.qc.ca/cgi-bin/calendrierjson.pl?id='+$scope.id_edit).success(function(data) {
      $scope.sortie = data;
    });
  }
});

phonecatApp.controller('bCtrl', function($scope, $routeParams, $sce) {
    var url = "http://www.portageurs.qc.ca/cgi-bin/details.pl?id=" + $routeParams.sortieid;
    $scope.sortieUrl = $sce.trustAsResourceUrl(url);
});

