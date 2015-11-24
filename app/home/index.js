/* global angular */

import HomeController from './home.controller';
import HomeService from './home.service';

require('./home.html');
require('./home.scss');

var Home = angular
			.module('Core.Home', [])
			.controller('HomeController', HomeController)
			.service('homeService', HomeService);
			
export default Home;