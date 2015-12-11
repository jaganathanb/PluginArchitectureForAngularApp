/* global __DEV__ */
const SERVICES = new WeakMap();

class HomeController {
  constructor($scope, $translate, localeService, homeService) {
    SERVICES.set(HomeController, {
      $scope: $scope,
      $translate: $translate,
      localeService: localeService,
      homeService: homeService
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
    this.getUsageDetails();
  }
  
  getUsageDetails() {
    SERVICES.get(HomeController).homeService.getUsageDetaills().then((data) => {
      this.usages = data.usage;
    });
  }
}

HomeController.$inject = ['$scope', '$translate', 'localeService', 'homeService'];

export default HomeController;