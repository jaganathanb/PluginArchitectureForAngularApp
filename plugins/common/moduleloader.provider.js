/* global angular */
const PROVIDERS = new WeakMap();
const MODULES_LOADED = new WeakSet();
//const REQUIRED_MODULES = new WeakSet();

class ModuleProvider {
    /*@ngInject*/
    constructor($provide, $controllerProvider, $compileProvider, $filterProvider, $injector) {
        PROVIDERS.set(ModuleProvider, {
            $provide: $provide,
            $controllerProvider: $controllerProvider,
            $compileProvider: $compileProvider,
            $filterProvider: $filterProvider,
            $injector: $injector
        });
    }

    $get() {
        return {
            load: (config) => {
                let index, queueLength, moduleCount, invokeQueue, moduleName, moduleFn, invokeArgs, provider,
                    providers = PROVIDERS.get(ModuleProvider),
                    moduleNames = config.name.pop ? config.name : [config.name];
                if (moduleNames) {
                    let runBlocks = [];
                    for (moduleCount = moduleNames.length - 1; moduleCount >= 0; moduleCount--) {
                        moduleName = moduleNames[moduleCount];
                        moduleFn = angular.module(moduleName);
                        if (MODULES_LOADED.has(moduleFn)) {
                            continue;
                        }
                        MODULES_LOADED.add(moduleFn);
                        runBlocks = runBlocks.concat(moduleFn._runBlocks);
                        try {
                            for (invokeQueue = moduleFn._invokeQueue, index = 0, queueLength = invokeQueue.length; index < queueLength; index++) {
                                invokeArgs = invokeQueue[index];

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
                    angular.forEach(runBlocks, function(fn) {
                        providers.$injector.invoke(fn);
                    });
                }
            }
        }
    }
}

export default angular.module('ModuleLoader', []).provider('moduleProvider', ModuleProvider);
