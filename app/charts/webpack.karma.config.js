import angular from 'angular';
import mocks from 'angular-mocks';

import main from './core/index';

let context = require.context('./tests', true, /\.spec\.js/);
context.keys().forEach(context);