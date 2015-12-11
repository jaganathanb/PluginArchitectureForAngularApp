var webpack = require("webpack"),
    path = require('path');

module.exports = function(config) {
    config.set({

        basePath: '',

        files: ['webpack.karma.config.js'],

        browsers: ['Chrome'],

        // frameworks to use
        frameworks: ['mocha', 'es6-shim', 'phantomjs-shim', 'sinon'],

        preprocessors: {
            // only specify one entry point
            // and require all tests in there
            'webpack.karma.config.js': ['webpack', 'sourcemap'],
            'plugins/**/*.js': ['coverage'],
            'shell/**/*.js': ['coverage']
        },

        exclude: [],

        reporters: ['spec', 'coverage', 'progress'],

        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                root: [
                    path.join(__dirname, "node_modules"),
                    path.join(__dirname, "plugins")
                ],
                extensions: ['', '.js', '.json', '.html', '.scss'],
                modulesDirectories: ['node_modules', 'plugins']
            },
            module: {
                loaders: [{
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules|route-generator\.js$|dependencies\.js$|start\.js$|dist|webpack.config.js$|gulpfile.js$)/,
                    query: {
                        presets: ['es2015']
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
                }),
                new webpack.ContextReplacementPlugin(/^\.\/locale$/, /en|ta/)
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
            require("karma-sinon"),
            require("karma-coverage"),
            require("karma-phantomjs-launcher"),
            require("karma-chrome-launcher"),
            require("karma-spec-reporter"),
            require("karma-es6-shim"),
            require("karma-phantomjs-shim"),
            require("karma-sourcemap-loader")
        ]
    });
};
