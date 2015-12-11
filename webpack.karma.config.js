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
import common from './plugins/common';


import main from './shell/index';

let shell = require.context('./shell', true, /\.spec\.js/);
shell.keys().forEach(shell);

let plugins = require.context('./plugins', true, /\.spec\.js/);
plugins.keys().forEach(plugins);

module.exports = {
    shell: shell,
    plugins: plugins
};
