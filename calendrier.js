var myProject = angular.module('project', []);

function ListCtrl($scope, $http) {
  $http.get('http://www.portageurs.qc.ca/cgi-bin/calendrierjson.pl').success(function(data) {
    $scope.sorties = data;
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
}

ListCtrl.$inject = ['$scope', '$http'];