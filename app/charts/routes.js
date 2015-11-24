'@ngInject' 
let Routes = function ($routeProvider, $provide) {
$routeProvider
.when('/',
{ template: require('charts/charts.html'),
controller: 'ChartsController',
controllerAs:'vm',
resolve:  { loadHomeModule: ['$q', 'authService', 'moduleProvider', '$location', function ($q, authService, moduleProvider, $location) {
var defered = $q.defer();
 if(false) {if (false || authService.hasAccessToRoute($location.path())) {
 require.ensure([], function () { 
require('charts');
moduleProvider.load({ name: 'Core.Charts', path: 'charts' });
defered.resolve();
}, 'charts');
 } else { 
 defered.reject(); 
 $location.path('/unauthorized');  } 
} else { defered.resolve(); } return defered.promise; 
 }] } 
})
.otherwise({redirectTo: '/unauthorized'}); 
'@ngInject'
$provide.decorator("$exceptionHandler", function($delegate, $injector) { return function(exception, cause) { /*$delegate(exception, cause);*/$injector.get('toaster').pop({ type: 'error', title: exception.name, body: exception.message, showCloseButton: true}); };});};Routes.$inject = ['$routeProvider', '$provide'];export default Routes; 