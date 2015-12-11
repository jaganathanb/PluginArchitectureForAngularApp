/* global angular, require */
import configs from './src/configs';
import CoreController from './src/core.controller';
import CoreView from './src/directives/core.directive';
import RouteLoadingIndicator from './src/directives/routeloadingidicator.directive';

require('./src/core.scss');

require('./src/partials/core.login.html');
require('./src/partials/core.dashboard.html');
require('./src/partials/core.nav.html');
require('./src/partials/core.header.html');

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
