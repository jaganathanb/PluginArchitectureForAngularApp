let configs = {

  RUN: ['$rootScope', '$location', 'authService', '$translate', ($rootScope, $location, authService) => {
    
  }],

  ROUTES: require('../routes').default,

  DEBUG_MODE: ['$compileProvider', 'DEBUG_MODE', ($compileProvider, DEBUG_MODE) => {
    if (!DEBUG_MODE) {
      $compileProvider.debugInfoEnabled(false);// disables AngularJS debug info
    }
  }],

  TRANSLATION: ['localeServiceProvider', 'tmhDynamicLocaleProvider', (localeServiceProvider, tmhDynamicLocaleProvider) => {
    tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.bundle.js');
  }]
}

export default configs;




