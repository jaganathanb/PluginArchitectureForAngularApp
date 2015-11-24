/* global __dirname */
var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    watch: true,
    entry: {
        charts: './index',
        'en':'angular-i18n/en.js',
        'ta':'angular-i18n/ta.js',
        'kn': 'angular-i18n/kn.js',
        'zh': 'angular-i18n/zh.js',
        'de': 'angular-i18n/de.js',
        vendor: ['angular', 
                'angular-route', 
                'angular-resource',
                'angular-cookies', 
                'angular-animate', 
                'angularjs-toaster',
                'angular-sanitize',
                'angular-translate',
                'angular-dynamic-locale/dist/tmhDynamicLocale',
                'angular-translate/dist/angular-translate-storage-local/angular-translate-storage-local.js',
                'angular-translate/dist/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                'angular-translate/dist/angular-translate-handler-log/angular-translate-handler-log.js',
                'angularjs-toaster/toaster.css', 
                'lodash',
                'jquery', 
                'bootstrap/dist/css/bootstrap.min.css',
                'bootstrap',
                'd3',
                'moment',
                'common']
    },
    output: {
        path: path.join(__dirname, "charts"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].module.js",
        publicPath: './'
    },
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
    resolve: {
        root: [
            path.resolve("../node_modules"),
            path.resolve("../"),
        ],
        extensions: ['', '.js', '.json', '.html', '.scss'],
        modulesDirectories: ['node_modules', 'common', 'charts']
    },
    plugins: [
        new webpack.DefinePlugin({__DEV__: true}),
        new webpack.ProvidePlugin({
            "_": "lodash"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.ContextReplacementPlugin(/^\.\/locale$/, /en|ta/) /*,
        new ExtractTextPlugin("[name].css", {allChunks: true}),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: false, mangle: false }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true)*/
    ]
};