/* global __DEV__ */
const SERVICES = new WeakMap();

class UnauthorizedController {
  constructor($scope, $translate, localeService, $location) {
    SERVICES.set(UnauthorizedController, {
      $scope: $scope,
      $translate: $translate,
      localeService: localeService,
      $location: $location
    });
    
    if (__DEV__) {
      localeService.setLocales({'en': 'English', 'ta': 'தமிழ்', 'kn': 'ಕನ್ನಡ', 'zh': '中文', 'de': 'Deutsche' }, 'ta');
    }

    let settings = localeService.getLocaleSettings();

    localeService.setLocaleByDisplayName(settings.preferredLocale, require('./translations/' + settings.preferredLocale + '.json')).then(() => {
      this.activate();
    });
  }

  activate() {

  }

}

UnauthorizedController.$inject = ['$scope', '$translate', 'localeService', '$location'];

export default UnauthorizedController;