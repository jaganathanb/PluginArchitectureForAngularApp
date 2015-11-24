/* global angular */

import LocaleController from './locale.controller';

require('./locale.html');
require('./locale.scss');

var Locale = angular
			.module('Core.Locale', [])
			.controller('LocaleController', LocaleController)
			.config(['$translateProvider', ($translateProvider) => {
				//$translateProvider.translations(LOCALES.preferredLocale, require('../../translations/' +LOCALES.preferredLocale + '/locale.json' ));
			}]);
			
export default Locale;