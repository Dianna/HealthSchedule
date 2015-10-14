angular.module('patientAnalytics.patientService', [])
.factory('Patients', ['$http', function($http){

  // Retrieves patients information from stats.json
  var getAllPatientsInformation = function(){
    return $http({
      method: 'GET',
      url: '/patients',
    })
    .then(function(res){
      return res.data;
    }, function(res){
      console.log('error in patientService', res);
    });
  };

  return {
    getAllPatientsInformation: getAllPatientsInformation
  };
}]);
