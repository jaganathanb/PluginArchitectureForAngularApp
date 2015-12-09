var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome', 'PhantomJS'],
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'text-summary',
            dir: 'coverage/'
        },

        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,
        colors: true,
        port: 9876,

        basePath: '',
        files: ['webpack.karma.config.js'],
        preprocessors: { 'webpack.karma.config.js': ['webpack'] },
        exclude: [],
        webpack: {
            devtool: 'eval',
            module: {
                loaders: [
                    { test: /.js?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015'] } },
                    { test: /\.json$/, loader: 'json' },
                    { test: /\.html$/, loader: "ng-cache-loader" },
                    { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader' },
                    { test: /\.scss$/, loader: "style-loader!css-loader!autoprefixer-loader!sass-loader" },
                    { test: /\.eot(\?v=\d+\.\d+\.\d+)?|\.jpg($|\?)$/, loader: "file-loader" },
                    { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.svg($|\?)|\.png($|\?)/, loader: 'url-loader' }
                ]
            },
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery'
                }),
                new webpack.DefinePlugin({ __DEV__: true }),
                new webpack.ProvidePlugin({
                    "_": "lodash"
                })
            ]
        }
    });
};