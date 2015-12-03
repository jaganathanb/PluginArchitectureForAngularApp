import angular from 'angular';
import mocks from 'angular-mocks';
import ngRoute from 'angular-route';
import ngResource from 'angular-resource';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';
import toaster from 'angularjs-toaster';
import translate from 'angular-translate';
import dynamiclocale from 'angular-dynamic-locale';
import common from './app/common';


import main from './app/core/index';

let context = require.context('./test', true, /\.spec\.js/);
context.keys().forEach(context);

module.exports = context;
