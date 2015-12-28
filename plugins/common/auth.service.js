/* global _ */
/* global angular */
const SERVICES = new WeakMap();

class AuthService {
	/*@ngInject*/
	constructor($http, $cookieStore, $timeout) {
		SERVICES.set(AuthService, {
			$http: $http,
			$cookieStore: $cookieStore,
			$timeout: $timeout
		});
	}

	login(username, password, callback) {
		return SERVICES.get(AuthService).$http.post('/api/core/login', { username: username, password: password }).then((response) => { callback(response.data); });
	}

	hasAccessToRoute(routeToCheck) {
		let session = this.getSession();
		return session && (session.modules || []).find(module => module.name.toLowerCase() === routeToCheck);
	}

	getSession() {
		//return SERVICES.get(AuthService).$cookieStore.get('session');
		return JSON.parse(localStorage.getItem('session'));
	}

	getModules() {
		let services = SERVICES.get(AuthService);
		return services.$http.get('/api/core/modules').then((response) => {
			let menuItems = [];
			for (var index = 0; index < response.data.length; index++) {
				for (var j = 0; j < response.data[index].menus.length; j++) {
					menuItems.push(response.data[index].menus[j]);
				}
			}
			return { menus: menuItems.filter(menu => menu), modules: response.data };
		});
	}

	updateSession(settings) {
		let services = SERVICES.get(AuthService),
			existsSettings = services.$cookieStore.get('session');

		_.merge(existsSettings, settings);

        //services.$cookieStore.put('session', settings);
		localStorage.setItem('session', JSON.stringify(settings));
	}

	clearSession() {
		localStorage.clear('session');
    }

}

export default angular
				.module('AuthService', ['ngCookies'])
				.service('authService', AuthService);
