/* global angular */

import ChartsController from './src/charts.controller.js';
import ChartsService from './src/charts.service.js';
import BarChart from './src/barchart.directive';
import Routes from './src/routes';

require('./src/charts.scss');

var Charts = angular
	.module('Core.Charts', [ 'ngRoute', 'ngResource',
		'ngSanitize',
		'ngCookies',
		'toaster',
		'ngAnimate',
		'Common'])
	.controller('ChartsController', ChartsController)
	.service('chartsService', ChartsService)
	.service('d3Service', () => { return window.d3; })
	.directive('barChart', BarChart.directiveFn)
	.config(['localeServiceProvider', 'tmhDynamicLocaleProvider', (localeServiceProvider, tmhDynamicLocaleProvider) => {
		tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.js');
	}])
	.config(Routes);

export default Charts;
