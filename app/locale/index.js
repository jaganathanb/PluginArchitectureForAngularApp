/* global angular */

import LocaleController from './locale.controller';
import Routes from './routes';

require('./locale.html');
require('./locale.scss');

var Locale = angular
	.module('Core.Locale', ['ngRoute', 'ngResource',
		'ngSanitize',
		'ngCookies',
		'toaster',
		'ngAnimate',
		'Common'])
	.controller('LocaleController', LocaleController)
	.config(['tmhDynamicLocaleProvider', (tmhDynamicLocaleProvider) => {
		tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.js');
	}])
	.config(Routes);

export default Locale;
