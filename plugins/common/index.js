/* global angular */
import AuthService from './auth.service';
import LocaleService from './localeservice.provider';
import ModuleLoader from './moduleloader.provider';

export default angular.module('Common', [LocaleService.name, AuthService.name, ModuleLoader.name]);
