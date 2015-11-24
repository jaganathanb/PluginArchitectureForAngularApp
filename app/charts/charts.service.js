const SERVICES = new WeakMap();

class ChartsService {
	constructor(d3Service, $translate) {
		SERVICES.set(ChartsService, {
            d3 : d3Service,
            $translate: $translate
        });
	}
    
    barChart() {
    let width = 1000,
        height = 500,
        margin = {
            top: 20,
            right: 20,
            bottom: 80,
            left: 70
        },
        gap = 50,
        ease = 'cubic-in-out',
        svg,
        duration = 500,
        services = SERVICES.get(ChartsService);

    function chart(selection) {
        selection.each(function(barData) {

            let chartW = width - margin.left - margin.right,
                chartH = height - margin.top - margin.bottom,
                
                x1 = services.d3.scale.ordinal()
                .domain(barData.map(function(d, i){ return d.date; }))
                .rangeRoundBands([0, chartW], .1),
                
                y1 = services.d3.scale.linear()
                .domain([0, services.d3.max(barData, function(d, i){ return d.value; })])
                .range([chartH, 0]),
                
                xAxis = services.d3.svg.axis()
                .scale(x1)
                .tickSize(5)
                .tickSubdivide(true)
                .orient('bottom'),
                
                yAxis = services.d3.svg.axis()
                .scale(y1)
                .tickSize(5)
                .orient("left")
                .tickSubdivide(true);

            //var barW = chartW / barData.length;

            if(!svg) {
                svg = services.d3.select(this)
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('chart-group', true);
                container.append('g').classed('x-axis-group axis', true);
                container.append('g').classed('y-axis-group axis', true);
            }

            svg.transition().duration(duration).attr({width: width, height: height})
            svg.select('.container-group')
                .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

            svg.select('.x-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .attr({transform: 'translate(0,' + (chartH) + ')'})
                .call(xAxis);

            svg.select('.y-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .call(yAxis);

            var gapSize = x1.rangeBand() / 100 * gap,
                barW = x1.rangeBand() - gapSize,
                bars = svg.select('.chart-group')
                .selectAll('.bar')
                .data(barData);
                
            bars.enter().append('rect')
                .classed('bar', true)
                .attr({x: chartW,
                    width: barW,
                    y: function(d, i) { return y1(d.value); },
                    height: function(d, i) { return chartH - y1(d.value) }
                 });
                
            bars.transition()
                .duration(duration)
                .ease(ease)
                .attr({
                    width: barW,
                    x: function(d, i) { return x1(d.date) + gapSize/2; },
                    y: function(d, i) { return y1(d.value); },
                    height: function(d, i) { return chartH - y1(d.value); }
                });
                
            bars.exit().transition().style({opacity: 0}).remove();

            duration = 500;
            
            svg.select('.container-group').selectAll('text.y-label').remove();
            svg.select('.container-group').append("text")
                    .classed('y-label', true)
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left)
                    .attr("x",0 - (height / 2 - margin.bottom))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text("Value");
                    
                    
            svg.select('.container-group').selectAll('text.x-label').remove();
            svg.select('.container-group').append("text")
                .classed('x-label', true)
                .attr("transform", "translate(" + (width / 2 - margin.left) + " ," + (height - margin.bottom + margin.top) + ")")
                .style("text-anchor", "middle")
                .text("Date");

        });
    }
    
    chart.update = function (data) {
        if(svg) {
            svg.select('.chart-group')
                .selectAll('.bar').data(data).transition()
                .duration(duration)
                .ease(ease);
        }
    }
    
    chart.width = function(_x) {
        if (!arguments.length) return width;
        width = parseInt(_x);
        return this;
    };
    chart.height = function(_x) {
        if (!arguments.length) return height;
        height = parseInt(_x);
        duration = 0;
        return this;
    };
    chart.gap = function(_x) {
        if (!arguments.length) return gap;
        gap = _x;
        return this;
    };
    chart.ease = function(_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };
    
    return chart;
    }
}

ChartsService.$inject = ['d3Service', '$translate'];

export default ChartsService;