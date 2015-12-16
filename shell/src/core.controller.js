const SERVICES = new WeakMap();
/**
	Class representing a Core Controller.
	@memberof module:Core
*/
class CoreController {
	/**
	 * @summary Core Controller
	 * @desc Creates a Core Controller.
	 * @param {scope} $scope - The scope.
	 * @param {location} $location - The location service.
	 */
	constructor($scope, $location, $window, $timeout, $route, $translate, authService, localeService, momentService) {
		SERVICES.set(CoreController, {
			$scope: $scope,
			$location: $location,
			$window: $window,
			$timeout: $timeout,
			$route: $route,
			$translate: $translate,
			authService: authService,
			localeService: localeService,
			moment: momentService
		});

		this.activate();
	}
	/**
	 * @summary Activates the controller.
	 * @function
	 * @desc The activate function initiates the controller by setting the locales, language from the user profile
	 */
	activate() {
		let services = SERVICES.get(CoreController),
			settings;

		this.today = new Date();

		if ((settings = services.authService.getSession())) {

			services.localeService.setLocales(settings.locales, settings.preferredLocale);

			services.localeService.setLocaleByDisplayName(settings.preferredLocale, require('./translations/' + settings.preferredLocale + '.json')).then(() => {

				this.language = services.localeService.getLocaleDisplayName();
				let path = services.$location.path().replace(/\//ig, '');
				settings.menus.forEach(function(menu) {
					menu.active = menu.url === path || (path === "" && menu.url === "home") || path === 'unauthorized' && menu.url === 'home';
				});

				this.navItems = settings.menus;

				this.loggedIn = true;

				services.$timeout(() => {
					services.$route.reload();
				});
			});
		} else {
			services.$location.path('/unauthorized');
		}
	}
	/**
	 * @summary Changes the culture.
	 * @function
	 * @desc The changeCulture function will chnage the culture/locale based on the selection made by the user on demand
	 */
	changeCulture() {
		let services = SERVICES.get(CoreController),
			culture = services.localeService.getLocaleSettings().preferredLocale === 'en' ? 'ta' : 'en';
			services.localeService.setLocaleByDisplayName(culture, services.$location.path().replace(/\//ig, '')).then(() => {
				services.moment.locale(culture);
				this.today = new Date();
				this.language = services.localeService.getLocaleDisplayName();
			});
	}
	/**
	 * @summary App login.
	 * @function
	 * @desc This fucntion logs in you if the provided credentials are correct
	 */
	login() {
		var services = SERVICES.get(CoreController);

		services.authService.login(this.username, this.password, (response) => {

			if (response.success) {
				/** updates the session */
				services.authService.updateSession({username: this.username, password: this.password});

				services.localeService.setLocales(response.locales, response.preferredLocale);

				services.localeService.setLocaleByDisplayName(response.preferredLocale, require('./translations/' + response.preferredLocale + '.json')).then(() => {
					this.language = services.localeService.getLocaleDisplayName();

					services.authService.getModules().then((data) => {
						this.navItems = data.menus || [];
						this.navItems.push({title: "CORE.DASHBOARD.NAVIGATION.LOGOUT",
								url: "logout",
								tooltip: "Click here log out",
								'class': "glyphicon glyphicon-log-out"});

						let path = services.$location.path().replace(/\//ig, '');
						this.navItems.forEach(function(menu) {
							menu.active = menu.url === path || (path === "" && menu.url === "home") || path === 'unauthorized' && menu.url === 'home';
						});

						services.authService.updateSession({ modules: data.modules, menus: this.navItems, locales: response.locales, preferredLocale: response.preferredLocale});

						this.loggedIn = response.success;

						services.$timeout(() => {
							services.$location.path('/home').replace();
						});
					});
				});

			} else {
				this.error = response.message;
			}
		});
	}
	/**
	 * @summary navigates the user
	 * @param  {string} moduleName the module where you would be navigated
	 * @return {void}  returns nothing
	 */
	navigate(moduleName) {
		let services = SERVICES.get(CoreController);

		if (moduleName === 'logout') {
			this.logout();
		} else {
			let menu = this.navItems.find(m => m.url === moduleName),
				activeMenu = this.navItems.find(m => m.active === true);

			activeMenu.active = false;
			menu.active = true;

			services.$location.path(moduleName);
		}
	}
	/**
	 * @summary logs you out
	 * @desc logs you out by clearing the session & reloads the app.
	 * @return {void} returns nothing
	 */
	logout() {
		let services = SERVICES.get(CoreController);
		services.authService.clearSession();
		services.$window.location.reload();
	}
}

CoreController.$inject = ['$scope', '$location', '$window', '$timeout', '$route', '$translate', 'authService', 'localeService', 'momentService'];

export default CoreController;
