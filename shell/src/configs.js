let configs = {

  RUN: ['$rootScope', '$location', 'authService', '$translate', () => {

  }],

  ROUTES: require('./routes').default,

  DEBUG_MODE: ['$compileProvider', 'DEBUG_MODE', ($compileProvider, DEBUG_MODE) => {
    if (!DEBUG_MODE) {
      $compileProvider.debugInfoEnabled(false);// disables AngularJS debug info
    }
  }],

  TRANSLATION: ['localeServiceProvider', 'tmhDynamicLocaleProvider', (localeServiceProvider, tmhDynamicLocaleProvider) => {
    if(process.env.NODE_ENV === 'production') {
	tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.culture.js');
	}else{
	tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.js');
	}
  }]
}

export default configs;
