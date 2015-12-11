/* global angular */

import HomeController from './src/home.controller';
import HomeService from './src/home.service';
import Routes from './src/routes';

require('./src/home.html');
require('./src/home.scss');

var Home = angular
			.module('Core.Home', [ 'ngRoute', 'ngResource',
				'ngSanitize',
				'ngCookies',
				'toaster',
				'ngAnimate',
				'Common'])
			.controller('HomeController', HomeController)
			.service('homeService', HomeService)
			.config(['localeServiceProvider', 'tmhDynamicLocaleProvider', (localeServiceProvider, tmhDynamicLocaleProvider) => {
				tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.js');
			}])
			.config(Routes);

export default Home;
