angular.module('patientAnalytics.medPlan', [])

.controller('MedplanCtrl', ['$scope', 'Patients', function($scope, Patients){
  $scope.patients = [];
  
  $scope.getPatientsInformation = function(){
    Patients.getAllPatientsInformation()
      .then(function(data){
        $scope.patients = data.userStats;
        console.log('data in MedplanCtrl: ', $scope.patients);
      })
      .catch(function(err){
        console.log('err in MedplanCtrl');
        console.error(err);
      });
  };

  $scope.getPatientsInformation();
}])

.directive('patientCard', function(){
  return {
    restrict: 'E',
    scope: { 
      patient: '='
    },
    templateUrl: 'app/medPlan/patient-card.html'
  };
})

.directive('planDetails', function(){
  return {
    restrict: 'E',
    scope: { 
      plan: '='
    },
    templateUrl: 'app/medPlan/plan-details.html'
  };
})

.directive('progressImage', function(){
  return {
    restrict: 'E',
    scope: { 
      progress: '='
    },
    templateUrl: 'app/medPlan/progress-image.html',
    link: function (scope, element, attrs) {
      scope.internalCheckTime = {};
      scope.internalCheckTime.timeliness = 'onTime';
      var scheduledTime = moment( (moment(scope.progress.creationDate).format("YYYY-MM-DD")+"T"+scope.$parent.plan.reminders[0].time)+":00.000Z" ).utcOffset('-0500');
      var creationDate = moment(scope.progress.creationDate).utcOffset('-0500');
      console.log('creationDate', creationDate)
      console.log('scheduledTime', scheduledTime)
      console.log(moment.duration( scheduledTime.diff(creationDate)).asHours());
    }
  };
})

.filter('age', function() {
  return function(birthday) {
    var millisecondsSinceBirth = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(millisecondsSinceBirth);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
});
