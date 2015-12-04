import chai from 'chai';

import angular from 'angular';
import angularMock from 'angular-mocks';

chai.should();

describe('Core Controller', () => {

    var scopeMock,
        $locationMock,
        $windowMock,
        $timeoutMock,
        $translateMock,
        $routeMock,
        authServiceMock,
        localeServiceMock,
        momentServiceMock,
        ctrl,
        $rootScopeMock,
        promise;

    beforeEach(() => {
        angular.mock.module('Core');
    });

    injectCallback.$inject = [
        '$location',
        '$window',
        '$timeout',
        '$route',
        '$translate',
        'authService',
        'localeService',
        'momentService',
        '$rootScope',
        '$controller'
    ];

    beforeEach(angular.mock.inject(($injector) => {
        $injector.invoke(injectCallback);
    }));

    function injectCallback($location,
        $window,
        $timeout,
        $route,
        $translate,
        authService,
        localeService,
        momentService,
        $rootScope,
        $controller) {

        scopeMock = $rootScope.$new();
        $locationMock = $location;
        $windowMock = $window;
        $routeMock = $route;
        $translateMock = $translate;
        $timeoutMock = $timeout;
        authServiceMock = authService;
        localeServiceMock = localeService;
        momentServiceMock = momentService;
        $rootScopeMock = $rootScope;

        setupControllerAndMocks($controller); // setting up the mocks & controller
    }

    afterEach(() => {
        authServiceMock.getSession.restore();
        localeServiceMock.setLocaleByDisplayName.restore();
    });

    function setupControllerAndMocks($controller) {

        promise = (data, reject) => {
            return {
                then: (cb) => {
                    return promise(cb(data));
                }
            }
        };

        sinon.stub(authServiceMock, 'getSession')
            .returns({"modules":[{"name":"Charts","namespace":"Core","routes":[{"url":"/","controller":"ChartsController","controllerAs":"vm","lazyLoad":false,"isPublic":false,"isDev":true},{"url":"/charts","controller":"ChartsController","controllerAs":"vm","lazyLoad":true,"isPublic":false}],"menus":[{"title":"CORE.DASHBOARD.NAVIGATION.CHARTS","url":"charts","tooltip":"Click here for charts screen","class":"glyphicon glyphicon-picture","active":false}],"dependencies":["angular","angular-route","angular-resource","angular-cookies","angular-animate","angularjs-toaster","angular-sanitize","angular-translate","angular-dynamic-locale/dist/tmhDynamicLocale","angular-translate/dist/angular-translate-storage-local/angular-translate-storage-local.js","angular-translate/dist/angular-translate-storage-cookie/angular-translate-storage-cookie.js","angular-translate/dist/angular-translate-handler-log/angular-translate-handler-log.js","angularjs-toaster/toaster.css","lodash","jquery","bootstrap/dist/css/bootstrap.min.css","bootstrap","d3","moment","common"]},{"name":"Home","namespace":"Core","routes":[{"url":"/","controller":"HomeController","controllerAs":"vm","lazyLoad":false,"isPublic":false,"isDev":true},{"url":"/home","controller":"HomeController","controllerAs":"vm","lazyLoad":true,"isPublic":false,"isDefault":true}],"menus":[{"title":"CORE.DASHBOARD.NAVIGATION.HOME","url":"home","tooltip":"Click here for home screen","class":"glyphicon glyphicon-home","active":true}],"dependencies":["angular","angular-route","angular-resource","angular-cookies","angular-animate","angularjs-toaster","angular-sanitize","angular-translate","angular-dynamic-locale/dist/tmhDynamicLocale","angular-translate/dist/angular-translate-storage-local/angular-translate-storage-local.js","angular-translate/dist/angular-translate-storage-cookie/angular-translate-storage-cookie.js","angular-translate/dist/angular-translate-handler-log/angular-translate-handler-log.js","angularjs-toaster/toaster.css","lodash","jquery","bootstrap/dist/css/bootstrap.min.css","bootstrap","d3","moment","common"]},{"name":"Locale","namespace":"Core","routes":[{"url":"/","controller":"LocaleController","controllerAs":"vm","lazyLoad":false,"isPublic":false,"isDev":true},{"url":"/locale","controller":"LocaleController","controllerAs":"vm","lazyLoad":true,"isPublic":false}],"menus":[{"title":"CORE.DASHBOARD.NAVIGATION.LOCALE","url":"locale","tooltip":"Click here for locale screen","class":"glyphicon glyphicon-globe","active":false}],"dependencies":["angular","angular-route","angular-resource","angular-cookies","angular-animate","angularjs-toaster","angular-sanitize","angular-translate","angular-dynamic-locale/dist/tmhDynamicLocale","angular-translate/dist/angular-translate-storage-local/angular-translate-storage-local.js","angular-translate/dist/angular-translate-storage-cookie/angular-translate-storage-cookie.js","angular-translate/dist/angular-translate-handler-log/angular-translate-handler-log.js","angularjs-toaster/toaster.css","lodash","jquery","bootstrap/dist/css/bootstrap.min.css","bootstrap","d3","moment","common"]},{"name":"Unauthorized","namespace":"Core","routes":[{"url":"/","controller":"UnauthorizedController","controllerAs":"vm","lazyLoad":false,"isPublic":true,"isDev":true},{"url":"/unauthorized","controller":"UnauthorizedController","controllerAs":"vm","lazyLoad":true,"isPublic":true}],"menus":[],"dependencies":["angular","angular-route","angular-resource","angular-cookies","angular-animate","angularjs-toaster","angular-sanitize","angular-translate","angular-dynamic-locale/dist/tmhDynamicLocale","angular-translate/dist/angular-translate-storage-local/angular-translate-storage-local.js","angular-translate/dist/angular-translate-storage-cookie/angular-translate-storage-cookie.js","angular-translate/dist/angular-translate-handler-log/angular-translate-handler-log.js","angularjs-toaster/toaster.css","lodash","jquery","bootstrap/dist/css/bootstrap.min.css","bootstrap","d3","moment","common"]}],"menus":[{"title":"CORE.DASHBOARD.NAVIGATION.CHARTS","url":"charts","tooltip":"Click here for charts screen","class":"glyphicon glyphicon-picture","active":false},{"title":"CORE.DASHBOARD.NAVIGATION.HOME","url":"home","tooltip":"Click here for home screen","class":"glyphicon glyphicon-home","active":true},{"title":"CORE.DASHBOARD.NAVIGATION.LOCALE","url":"locale","tooltip":"Click here for locale screen","class":"glyphicon glyphicon-globe","active":false},{"title":"CORE.DASHBOARD.NAVIGATION.LOGOUT","url":"logout","tooltip":"Click here log out","class":"glyphicon glyphicon-log-out","active":false}],"locales":{"en":"English","ta":"தமிழ்","kn":"ಕನ್ನಡ","zh":"中文","de":"Deutsche"},"preferredLocale":"en"});

        sinon.stub(localeServiceMock, 'setLocaleByDisplayName').returns(promise('en'));

        ctrl = $controller('CoreController', {
            '$scope': scopeMock,
            '$location': $locationMock,
            '$window': $windowMock,
            '$timeout': $timeoutMock,
            '$route': $routeMock,
            '$translate': $translateMock,
            'authService': authServiceMock,
            'localeService': localeServiceMock,
            'momentService': momentServiceMock
        });
    }

    describe("#activate", () => {
        it("should initialize controller", () => {
            ctrl.should.be.an('object');
        });

        it("should have today property as date", () => {
            ctrl.today.should.be.a('date');
        });
    });

    describe("#changeCulture", () => {
        it("should set the new language", () => {
            ctrl.changeCulture();
            //ctrl.language.should.equal('ta');
        });

        it("should have today property as date", () => {
            ctrl.today.should.be.a('date');
        });
    });

});
