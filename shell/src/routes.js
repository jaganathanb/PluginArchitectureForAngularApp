/*@ngInject*/ 
let Routes = function ($routeProvider, $provide) {
$routeProvider
.when('/charts',
{ template: require('charts/src/charts.html'),
controller: 'ChartsController',
controllerAs:'vm',
resolve:  { /*@ngInject*/ 
 loadHomeModule: ['$q', 'authService', 'moduleProvider', '$location', function ($q, authService, moduleProvider, $location) {
var defered = $q.defer(),path = $location.path().split('/');
 if (authService.hasAccessToRoute(path[path.length-1]) || false) {
 require.ensure([], function () { 
require('charts');
moduleProvider.load({ name: 'Core.Charts', path: './charts' });
defered.resolve();
}, 'charts');
 } else { 
 defered.reject(); 
 $location.path('/unauthorized');  } 
 return defered.promise; 
 }] } 
})

.when('/home',
{ template: require('home/src/home.html'),
controller: 'HomeController',
controllerAs:'vm',
resolve:  { /*@ngInject*/ 
 loadHomeModule: ['$q', 'authService', 'moduleProvider', '$location', function ($q, authService, moduleProvider, $location) {
var defered = $q.defer(),path = $location.path().split('/');
 if (authService.hasAccessToRoute(path[path.length-1]) || false) {
 require.ensure([], function () { 
require('home');
moduleProvider.load({ name: 'Core.Home', path: './home' });
defered.resolve();
}, 'home');
 } else { 
 defered.reject(); 
 $location.path('/unauthorized');  } 
 return defered.promise; 
 }] } 
})
.when('/', { redirectTo: '/home' })
.when('/locale',
{ template: require('locale/src/locale.html'),
controller: 'LocaleController',
controllerAs:'vm',
resolve:  { /*@ngInject*/ 
 loadHomeModule: ['$q', 'authService', 'moduleProvider', '$location', function ($q, authService, moduleProvider, $location) {
var defered = $q.defer(),path = $location.path().split('/');
 if (authService.hasAccessToRoute(path[path.length-1]) || false) {
 require.ensure([], function () { 
require('locale');
moduleProvider.load({ name: 'Core.Locale', path: './locale' });
defered.resolve();
}, 'locale');
 } else { 
 defered.reject(); 
 $location.path('/unauthorized');  } 
 return defered.promise; 
 }] } 
})

.when('/unauthorized',
{ template: require('unauthorized/src/unauthorized.html'),
controller: 'UnauthorizedController',
controllerAs:'vm',
resolve:  { /*@ngInject*/ 
 loadHomeModule: ['$q', 'authService', 'moduleProvider', '$location', function ($q, authService, moduleProvider, $location) {
var defered = $q.defer(),path = $location.path().split('/');
 if (authService.hasAccessToRoute(path[path.length-1]) || false) {
 require.ensure([], function () { 
require('unauthorized');
moduleProvider.load({ name: 'Core.Unauthorized', path: './unauthorized' });
defered.resolve();
}, 'unauthorized');
 } else { 
 defered.reject(); 
 $location.path('/unauthorized');  } 
 return defered.promise; 
 }] } 
})
.otherwise({redirectTo: '/unauthorized'}); 
/*@ngInject*/
$provide.decorator("$exceptionHandler", function($delegate, $injector) { return function(exception, cause) { /* eslint-disable no-constant-condition */if (false)  { $delegate(exception, cause); }/* eslint-enable no-constant-condition */$injector.get('toaster').pop({ type: 'error', title: exception.name, body: exception.message, showCloseButton: true}); };});};Routes.$inject = ['$routeProvider', '$provide'];export default Routes; 