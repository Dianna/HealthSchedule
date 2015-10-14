var app = angular.module('patientAnalytics', [
  'patientAnalytics.patientService',
  'patientAnalytics.medPlan',
  'ui.router'
])
// Routing
.config(function($stateProvider, $urlRouterProvider, $httpProvider){
  $urlRouterProvider.otherwise("/analysis");
  $stateProvider
    .state('analysis', {
      url: '/analysis',
      templateUrl: 'app/medPlan/medPlan.html',
      controller: 'MedplanCtrl'
    });
});
