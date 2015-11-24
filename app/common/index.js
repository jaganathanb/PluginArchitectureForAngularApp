/* global angular */
import LocaleService from './localeservice.provider';
import AuthService from './auth.service';
import ModuleLoader from './moduleloader.provider';

export default angular.module('Common', [LocaleService.name, AuthService.name, ModuleLoader.name]);