/* global angular */

import HomeController from './unauthorized.controller';

require('./unauthorized.html');
require('./unauthorized.scss');

var Home = angular
			.module('Core.Unauthorized', [])
			.controller('UnauthorizedController', HomeController)
			.config(['$translateProvider', ($translateProvider) => {
				//$translateProvider.translations(LOCALES.preferredLocale, require('../../translations/' +LOCALES.preferredLocale + '/unauthorized.json' ));
			}]);
			
export default Home;