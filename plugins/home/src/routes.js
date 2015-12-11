'@ngInject' 
let Routes = function ($routeProvider, $provide) {
$routeProvider
.when('/',
{ template: require('./home.html'),
controller: 'HomeController',
controllerAs:'vm'})
.otherwise({redirectTo: '/unauthorized'}); 
'@ngInject'
$provide.decorator("$exceptionHandler", function($delegate, $injector) { return function(exception, cause) { /* eslint-disable no-constant-condition */if (true)  { $delegate(exception, cause); }/* eslint-enable no-constant-condition */$injector.get('toaster').pop({ type: 'error', title: exception.name, body: exception.message, showCloseButton: true}); };});};Routes.$inject = ['$routeProvider', '$provide'];export default Routes; 