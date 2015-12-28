/* global _ */
/* global __DEV__ */
const SERVICES = new WeakMap();

class LocaleController {
    /*@ngInject*/
  constructor($scope, $translate, localeService) {
    this.usageDetails = [];

    SERVICES.set(LocaleController, {
      localeService: localeService,
      $translate: $translate,
      $scope: $scope
    });

    if (__DEV__) {
      localeService.setLocales({'en': 'English', 'ta': 'தமிழ்', 'kn': 'ಕನ್ನಡ', 'zh': '中文', 'de': 'Deutsche' }, 'ta');
    }

    let settings = localeService.getLocaleSettings();

    localeService.setLocaleByDisplayName(settings.preferredLocale, require('./translations/' + settings.preferredLocale + '.json')).then(() => {
      this.activate(settings);
    });

  }

  activate(settings) {

    this.availableLocales = settings.locales;

    this.today = new Date();

    this.selectedLocale = settings.preferredLocale;
  }

  changeLocale() {
    let services = SERVICES.get(LocaleController),
      settings = services.localeService.getLocaleSettings(),
      coreTrans = {},
      localeTrans = {};

    services.localeService.setLocales(settings.locales, this.selectedLocale);

    if (!__DEV__) {
      coreTrans = require('../../../shell/src/translations/' + this.selectedLocale + '.json');
    }

    localeTrans = require('./translations/' + this.selectedLocale + '.json');

    services.localeService.setLocaleByDisplayName(this.selectedLocale, _.merge(localeTrans, coreTrans, {})).then(() => {
    });
  }

}

export default LocaleController;
