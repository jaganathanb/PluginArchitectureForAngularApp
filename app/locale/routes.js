'@ngInject'
let Routes = function ($routeProvider, $provide) {
$routeProvider
.when('/',
{ template: require('./locale.html'),
controller: 'LocaleController',
controllerAs:'vm'
})
.otherwise({redirectTo: '/unauthorized'});
'@ngInject'
$provide.decorator("$exceptionHandler", function($delegate, $injector) { return function(exception, cause) { /*$delegate(exception, cause);*/$injector.get('toaster').pop({ type: 'error', title: exception.name, body: exception.message, showCloseButton: true}); };});};Routes.$inject = ['$routeProvider', '$provide'];export default Routes;
