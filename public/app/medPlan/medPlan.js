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
      scope.timeliness = 'On Time';
      // Format scheduledTime and creationDate to same timeZone
      var scheduledTime = moment.tz( (moment(scope.progress.creationDate).format("YYYY-MM-DD")+' '+scope.$parent.plan.reminders[0].time), 'America/New_York');
      var creationDate = moment(scope.progress.creationDate).tz('Europe/London');
      creationDate = moment(creationDate.clone().tz('America/New_York').format());
      // Find difference between time taken and scheduled time
      var diff = moment.duration( scheduledTime.diff(creationDate)).asHours();
      // Set time as early or late if necessary
      if (diff > 1){
        scope.timeliness = 'Early';
      } else if (diff < -1){
        scope.timeliness = 'Late';
      }
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
