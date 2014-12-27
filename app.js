'use strict';

var calendrierApp = angular.module('calendrierApp', ['ngRoute']);

calendrierApp.config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/liste.html',
        controller: 'listeCtrl'
      }).
      when('/details/:sortieid?', {
        templateUrl: 'partials/details.html',
        controller: 'detailsCtrl'
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

    var mois_idx = sortie["debut"].match(/(\d{4})-(\d{2})-(\d{2})/)[2];
    sortie["mois_idx"] = mois_idx - 1;
    
    return sortie;
}
  
// Controlleur de la liste
calendrierApp.controller('listeCtrl', function($scope, $http, $location) {
  $http.get('//www.portageurs.qc.ca/cgi-bin/calendrierjson.pl').success(function(data) {
    var sorties = [];
    $scope.mois = [ {"nom": "Janvier", "sorties": []},
                    {"nom": "Février",  "sorties": []},
                    {"nom": "Mars", "sorties": []},
                    {"nom": "Avril",  "sorties": []},
                    {"nom": "Mai", "sorties": []},
                    {"nom": "Juin", "sorties": []},
                    {"nom": "Juillet", "sorties": []},
                    {"nom": "Août", "sorties": []},
                    {"nom": "Septembre", "sorties": []},
                    {"nom": "Octobre", "sorties": []},
                    {"nom": "Novembre", "sorties": []},
                    {"nom": "Décembre", "sorties": []} ];
                    
    for(var i=0; i<data["sorties"].length; i++){
        var sortie = data["sorties"][i];
        sortie = transformer_sortie(sortie);
        $scope.mois[sortie["mois_idx"]]["sorties"].push(sortie);
    }

    $scope.sorties = {"sorties": sorties, "annee": data["anne"]};
    $scope.go = function(id_sortie){
        $location.path( "/details/" + id_sortie );
    };
    $scope.filtre_type = function(actual, expected){
        //alert(actual);
        return true;
    }
  }).error(function(data, status, headers, config) {
      alert(status);
      $scope.sorties['status'] = status;
      $scope.sorties['headers'] = headers;
      $scope.sorties['data'] = data;
  });
});

// Controleur de la page de détails (iframe pour l'instant)
calendrierApp.controller('detailsCtrl', function($scope, $routeParams, $sce) {
    var url = "//www.portageurs.qc.ca/cgi-bin/details.pl?id=" + $routeParams.sortieid;
    $scope.sortieUrl = $sce.trustAsResourceUrl(url);
});

