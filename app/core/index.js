/* global angular, require */
import configs from './configs';
import CoreController from './core.controller';
import CoreView from './directives/core.directive';
import RouteLoadingIndicator from './directives/routeloadingidicator.directive';

require('./core.scss');

require('./partials/core.login.html');
require('./partials/core.dashboard.html');
require('./partials/core.nav.html');
require('./partials/core.header.html');

let Core = angular
	.module('Core', [
		'ngRoute',
		'ngResource',
		'ngSanitize',
		'ngCookies',
		'toaster',
		'ngAnimate',
		'Common'])
	.controller('CoreController', CoreController)
	.directive('coreView', CoreView.directiveFn)
	.directive('routeLoadingIndicator', RouteLoadingIndicator.directiveFn)
	.service('d3Service', () => { return require('d3'); })
	.service('momentService', () => { return require('moment'); })
	.config(configs.ROUTES)
	.config(configs.DEBUG_MODE)
	.config(configs.TRANSLATION)
	.run(configs.RUN);

angular.bootstrap(document.querySelector('html'), [Core.name]);