/* global angular */
const SERVICES = new WeakMap();

class CoreView {

    constructor($compile, authService) {
        this.template = '<div>Welcome!!</div>';
        this.scope = true;
        this.restrict = 'E'
        this.replace = true;

        SERVICES.set(CoreView, {
            $compile: $compile,
            authService: authService
        });
    }

    link(scope, element) {
        let ele,
            services = SERVICES.get(CoreView);

        scope.$watch('core.loggedIn', function () {
            if (services.authService.getSession()) {
                ele = angular.element('<section dashboard ng-include="\'core.dashboard.html\'"></section>');
            } else {
                ele = angular.element('<section login ng-include="\'core.login.html\'"></section>');
            }
            element.empty();
            services.$compile(ele)(scope);
            element.append(ele);
            this.viewUpdated =  !this.viewUpdated;
        });
    }

    static directiveFn($compile, authService) {
        return new CoreView($compile, authService);
    }
}

export default CoreView;
