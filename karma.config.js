var webpack = require("webpack");

module.exports = function(config) {
    config.set({

        basePath: '',

        files: ['webpack.karma.config.js'],

        // frameworks to use
        frameworks: ['mocha', 'es6-shim', 'phantomjs-shim'],

        preprocessors: {
            // only specify one entry point
            // and require all tests in there
            'webpack.karma.config.js': ['webpack'],
            './app/**/*.js': ['coverage']
        },

        exclude: [],

        reporters: ['spec', 'coverage', 'progress'],

        webpack: {
            devtool: 'eval',
            module: {
                loaders: [{
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules|webpack\.config\.js$)/,
                    query: {
                        presets: ['es2015'],
                        plugins: ['transform-runtime']
                    }
                }, {
                    test: /\.json$/,
                    loader: 'json'
                }, {
                    test: /\.html$/,
                    loader: "ng-cache-loader"
                }, {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader!autoprefixer-loader'
                }, {
                    test: /\.scss$/,
                    loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
                }, {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?|\.jpg($|\?)$/,
                    loader: "file-loader"
                }, {
                    test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.svg($|\?)|\.png($|\?)/,
                    loader: 'url-loader'
                }],
                postLoaders: [{ // << add subject as webpack's postloader
                    test: /\.js$/,
                    exclude: /(test|node_modules|dist)\//,
                    loader: 'istanbul-instrumenter'
                }]
            },
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery'
                })
            ]
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            noInfo: true
        },

        plugins: [
            require("karma-webpack"),
            require("istanbul-instrumenter-loader"),
            require("karma-mocha"),
            require("karma-coverage"),
            require("karma-phantomjs-launcher"),
            require("karma-chrome-launcher"),
            require("karma-spec-reporter"),
            require("karma-es6-shim"),
            require("karma-phantomjs-shim")
        ],

        browsers: ['PhantomJS']
    });
};
