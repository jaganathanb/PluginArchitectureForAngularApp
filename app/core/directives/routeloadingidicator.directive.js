const SERVICES = new WeakMap();

class RouteLoadingIndicator {

    constructor($rootScope) {
        this.template = "<div class='col-lg-12' ng-if='core.isRouteLoading'><h3>Loading module... <i class='fa fa-cog fa-spin'></i></h3></div>";
        this.restrict = 'E'

        SERVICES.set(RouteLoadingIndicator, {
            $rootScope: $rootScope
        });
    }

    link(scope) {
        scope.core.isRouteLoading = false;

        SERVICES.get(RouteLoadingIndicator).$rootScope.$on('$routeChangeStart', function() {
          scope.core.isRouteLoading = true;
        });

        SERVICES.get(RouteLoadingIndicator).$rootScope.$on('$routeChangeSuccess', function() {
          scope.core.isRouteLoading = false;
        });
    }

    static directiveFn($rootScope) {
        return new RouteLoadingIndicator($rootScope);
    }
}

export default RouteLoadingIndicator;
