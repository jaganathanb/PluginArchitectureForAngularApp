/* global __DEV__ */
const SERVICES = new WeakMap();

class ChartsController {
    /*@ngInject*/
  constructor($scope, $translate, localeService) {
    SERVICES.set(ChartsController, {
      $scope: $scope,
      $translate: $translate,
      localeService: localeService
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
    this.chartOptions = { width: 1000, height: 300, 'bar': 'aaa' };
    this.chartData = [{ value: 110, date: new Date('01/11/2013') }, { value: 209, date: new Date('02/11/2013') }, { value: 320, date: new Date('03/11/2013') }, { value: 400, date: new Date('04/11/2013') }];
  }
}

export default ChartsController;
