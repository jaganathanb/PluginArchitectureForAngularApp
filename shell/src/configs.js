/**
 * @mixin core/config
 */

let configs = {
/**
*    @summary run
*    @memberof core/config
*    @desc this function will set the default configurations once the application is loaded.
*/
  RUN: ['$rootScope', '$location', 'authService', '$translate', () => {

  }],

  /**
    *  @summary routes
    *   @memberof core/config
    *  @desc This function will register the routes for the application
  */
  ROUTES: require('./routes').default,
  /**
    *  @summary translation
    *   @memberof core/config
    *  @desc this function will set the locale location to load the locale on demand based on the user profile.
  */
  TRANSLATION: ['localeServiceProvider', 'tmhDynamicLocaleProvider', (localeServiceProvider, tmhDynamicLocaleProvider) => {
    tmhDynamicLocaleProvider.localeLocationPattern('{{locale}}.js');
  }]
}

export default configs;
