const SERVICES = new WeakMap();

class HomeService {
	/*@ngInject*/
	constructor($resource) {
		SERVICES.set(HomeService, {
			$resource: $resource
		});
	}

	getUsageDetaills() {
		return SERVICES.get(HomeService).$resource('/api/home/usage').get().$promise;
	}
}

export default HomeService;
