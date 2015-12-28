/* global angular */

import HomeController from './src/unauthorized.controller';
import Routes from './src/routes';

require('./src/unauthorized.html');
require('./src/unauthorized.scss');

var Home = angular
    .module('Core.Unauthorized', ['ngRoute', 'ngResource',
        'ngSanitize',
        'ngCookies',
        'toaster',
        'ngAnimate',
        'Common'
    ])
    .controller('UnauthorizedController', HomeController)
	.config(['tmhDynamicLocaleProvider', (tmhDynamicLocaleProvider) => {
		if(process.env.NODE_ENV === 'production') {
	tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.culture.js');
	}else{
	tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.js');
	}
	}])
	.config(Routes);

export default Home;
