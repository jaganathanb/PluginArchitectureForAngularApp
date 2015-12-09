/* global angular */

import HomeController from './unauthorized.controller';

require('./unauthorized.html');
require('./unauthorized.scss');

var Home = angular
			.module('Core.Unauthorized', [])
			.controller('UnauthorizedController', HomeController)
			.config(['tmhDynamicLocaleProvider', (tmhDynamicLocaleProvider) => {
				tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.js');
			}]);

export default Home;
