/* global __DEV__ */
/* global angular */

import ChartsController from './charts.controller.js';
import ChartsService from './charts.service.js';
import BarChart from './barchart.directive';
import Routes from './routes';

require('./charts.scss');

var Charts = angular
	.module('Core.Charts', [ 'ngRoute', 'ngResource',
		'ngSanitize',
		'ngCookies',
		'toaster',
		'ngAnimate',
		'Common'])
	.controller('ChartsController', ChartsController)
	.service('chartsService', ChartsService)
	.service('d3Service', () => { return require('d3'); })
	.directive('barChart', BarChart.directiveFn)
	.config(['localeServiceProvider', 'tmhDynamicLocaleProvider', (localeServiceProvider, tmhDynamicLocaleProvider) => {
		tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.bundle.js');
	}])
	.config(Routes);

export default Charts;