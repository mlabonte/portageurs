'use strict';

/* App Module */
/* see http://scotch.io/tutorials/javascript/single-page-apps-with-angularjs-routing-and-templating */
var phonecatApp = angular.module('phonecatApp', ['ngRoute']);

phonecatApp.config(function($routeProvider) {
    $routeProvider.
      when('/a', {
        templateUrl: 'partials/a.html',
        controller: 'aCtrl'
      }).
      when('/details/:sortieid?', {
        templateUrl: 'partials/b.html',
        controller: 'bCtrl'
      }).
      otherwise({
        redirectTo: '/a'
      });
  });

// create the controller and inject Angular's $scope
phonecatApp.controller('aCtrl', function($scope) {
    $scope.message = 'Everyone come and see how good I look!';
});

phonecatApp.controller('bCtrl', function($scope, $routeParams) {
    alert($routeParams.sortieid);
    $scope.message = 'Look! I am an about page.';
});

