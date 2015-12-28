/* global angular __DEV__ */
let SERVICES = new WeakMap(),
    locales = Symbol(),
	localeKeys = Symbol(),
	displayNames = Symbol(),
	currentLocale = Symbol(),
	translations = Symbol(),
	cultures = Symbol();

class LocaleService {
    /*@ngInject*/
	constructor($translateProvider) {
		SERVICES.set(LocaleService, {
			$translateProvider: $translateProvider
		});

		this[locales] = [];
		this[localeKeys] = [];
		this[displayNames] = [];
		this[translations] = [];
		this[cultures] = [];

		for (var key of Object.keys(this[locales])) {
			this[displayNames].push(this[locales][key]);
		}

        //$translateProvider.useSanitizeValueStrategy('sanitize');
	}

	init(localeName) {
		let services = SERVICES.get(LocaleService);

		if (__DEV__) {
			services.$translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
		}

        //services.$translateProvider.useSanitizeValueStrategy('sanitize');

		this[currentLocale] = localeName;
	}
    /*@ngInject*/
	$get($translate, $rootScope, tmhDynamicLocale) {

		return {
			getLocaleDisplayName: () => {
				return this[locales][this[currentLocale]];
			},
			getLocaleSettings: () => {
				return {
					locales: this[locales],
					preferredLocale: this[currentLocale]
				};
			},
			setLocales: (defaultLocales, preferredLocale) => {
				this[locales] = defaultLocales;
				this[localeKeys] = Object.keys(defaultLocales);
				this[displayNames] = Array.of(this[localeKeys].length);
				this[currentLocale] = preferredLocale;
			},
			setLocaleByDisplayName: (localeName, translations) => {
				let locale = this[locales][localeName],
					services = SERVICES.get(LocaleService);

				if (!locale) {
					console.warn('Locale name "' + locale[localeName] + '" is invalid');
					return;
				}

				return tmhDynamicLocale.set(localeName).then(() => {
					document.documentElement.setAttribute('lang', localeName);// sets "lang" attribute to html

					this[currentLocale] = localeName;// updating current locale

					services.$translateProvider.translations(localeName, translations);

					services.$translateProvider.preferredLanguage(localeName);

					$translate.use(localeName);

					return localeName;
				});
			},
			getLocalesDisplayNames: () => {
				return this[displayNames];
			}
		}
	}
}

export default angular
				.module('LocaleService', ['ngSanitize', 'pascalprecht.translate', 'tmh.dynamicLocale', 'AuthService'])
				.constant('DEBUG_MODE', !1)
				.provider('localeService', LocaleService);
