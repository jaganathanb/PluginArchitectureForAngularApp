import 'angular';
import 'angular-mocks';
import 'angular-route';
import 'angular-resource';
import 'angular-animate';
import 'angular-sanitize';
import 'angular-cookies';
import 'angularjs-toaster';
import 'angular-translate';
import 'angular-dynamic-locale';
import '../common';

import './index';

let context = require.context('./test', true, /\.spec\.js/);
context.keys().forEach(context);
