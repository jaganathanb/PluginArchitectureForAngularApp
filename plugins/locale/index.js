/* global angular */

import LocaleController from './src/locale.controller';
import Routes from './src/routes';

require('./src/locale.html');
require('./src/locale.scss');

var Locale = angular
	.module('Core.Locale', ['ngRoute', 'ngResource',
		'ngSanitize',
		'ngCookies',
		'toaster',
		'ngAnimate',
		'Common'])
	.controller('LocaleController', LocaleController)
	.config(['tmhDynamicLocaleProvider', (tmhDynamicLocaleProvider) => {
		if(process.env.NODE_ENV === 'production') {
	tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.culture.js');
	}else{
	tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.js');
	}
	}])
	.config(Routes);

export default Locale;
