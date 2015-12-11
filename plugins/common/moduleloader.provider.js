/* global angular */
const PROVIDERS = new WeakMap();
const MODULES_LOADED = new WeakSet();

class ModuleProvider {
	constructor($provide, $controllerProvider, $compileProvider, $filterProvider, $injector) {
		PROVIDERS.set(ModuleProvider, {
			$provide: $provide,
			$controllerProvider: $controllerProvider,
			$compileProvider: $compileProvider,
			$filterProvider: $filterProvider,
			$injector: $injector
		});

		this.$get.$inject = ['$q', '$rootScope'];
	}

	$get() {
		return {
			load: (config) => {
				let i, ii, k, invokeQueue, moduleName, moduleFn, invokeArgs, provider,
					providers = PROVIDERS.get(ModuleProvider),
					moduleNames = config.name.pop ? config.name : [config.name];
				if (moduleNames) {
					let runBlocks = [];
					for (k = moduleNames.length - 1; k >= 0; k--) {
						moduleName = moduleNames[k];
						moduleFn = angular.module(moduleName);
						if (MODULES_LOADED.has(moduleFn)) {
							continue;
						}
						MODULES_LOADED.add(moduleFn);
						runBlocks = runBlocks.concat(moduleFn._runBlocks);
						try {
							for (invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i < ii; i++) {
								invokeArgs = invokeQueue[i];

								if (providers.hasOwnProperty(invokeArgs[0])) {
									provider = providers[invokeArgs[0]];
								} else {
									return 'Unknow provider!';
								}
								provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
							}

							for (var configIndex = 0; configIndex < moduleFn._configBlocks.length; configIndex++) {
								let localconfig = moduleFn._configBlocks[configIndex];
								providers[localconfig[0]][localconfig[1]](localconfig[2][0]);
							}

						} catch (e) {
							if (e.message) {
								e.message += ' from ' + moduleName;
							}
							throw e;							
						}
						moduleNames.pop();
					}
					angular.forEach(runBlocks, function (fn) {
						providers.$injector.invoke(fn);
					});
				}
			}
		}
	}
}

ModuleProvider.$inject = ['$provide', '$controllerProvider', '$compileProvider', '$filterProvider', '$injector'];

export default  angular.module('ModuleLoader', []).provider('moduleProvider', ModuleProvider);
