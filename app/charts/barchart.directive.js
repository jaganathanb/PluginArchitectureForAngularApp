/* global angular */
const SERVICES = new WeakMap();

class BarChart {

    constructor($compile, $rootScope, $translate, d3Service, chartsService) {
        this.template = '<div class="chart"></div>';
        this.scope = {
            height: '=',
            width: '=',
            data: '='
        };
        this.restrict = 'E'
        this.replace = true;

        SERVICES.set(BarChart, {
            $compile: $compile,
            d3: d3Service,
            chartsService: chartsService,
            $rootScope: $rootScope,
            $translate: $translate
        });
    }

    link(scope, element, attributes, controller, transcludeFn) {
        let services = SERVICES.get(BarChart),
            chartEl = services.d3.select(element[0]),
            chart = services.chartsService.barChart(),
            translateCb;

        translateCb = services.$rootScope.$on('$translateChangeSuccess', () => {
            if (scope.data) {
                for (var index = 0; scope.data[index]; index++) {
                    scope.data[index].date = services.$translate.instant('CHARTS.DATE', { date: scope.data[index].date });
                }
                chart.update(scope.data);
            }
        });

        scope.$watch('data', (newVal, oldVal) => {
            if (newVal) {
                for (var index = 0; scope.data[index]; index++) {
                    scope.data[index].date = services.$translate.instant('CHARTS.DATE', { date: scope.data[index].date });
                }
                chartEl.datum(newVal).call(chart);
            }
        });

        scope.$watch('height', (d, i) => {
            if (scope.data) {
                chartEl.call(chart.height(scope.height));
            }
        });

        scope.$watch('width', (d, i) => {
            if (scope.data) {
                chartEl.call(chart.width(scope.width));
            }
        });

        scope.$on('$destroy', () => {
            translateCb();
        })
    }

    static directiveFn($compile, $rootScope, $translate, d3Service, chartsService) {
        return new BarChart($compile, $rootScope, $translate, d3Service, chartsService);
    }
}

export default BarChart;