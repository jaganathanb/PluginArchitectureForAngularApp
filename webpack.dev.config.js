var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    appName = 'shell',
    config;

process.env.NODE_ENV = 'dev';

config = {
    watch: true,
    debug: true,
    devtool: "source-map",
    entry: {
        'en': 'angular-i18n/en.js',
        'ta': 'angular-i18n/ta.js',
        'kn': 'angular-i18n/kn.js',
        'zh': 'angular-i18n/zh.js',
        'de': 'angular-i18n/de.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        chunkFilename: "[name].js",
        publicPath: './'
    },
    eslint: {
        // community formatter
        formatter: require("eslint-friendly-formatter"),
        configFile: './.eslintrc',
        failOnError: true
    },
    module: {
        loaders: [{
            test: /.js?$/,
            loader: 'ng-annotate',
            exclude: /(node_modules|route-generator\.js$|dependencies\.js$|start\.js$|test|dist|webpack.karma.config.js$|webpack.dev.config.js$|webpack.prod.config.js$)/
        }, {
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: /(node_modules|route-generator\.js$|dependencies\.js$|start\.js$|test|dist|webpack.karma.config.js$|webpack.prod.config.js$|webpack.dev.config.js$)/,
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
        preLoaders: [{
            test: /\.js$/,
            loader: "eslint-loader",
            exclude: /node_modules/
        }],
        postLoaders: [{ // << add subject as webpack's postloader
            test: /\.js$/,
            exclude: /(tests|node_modules|dist)\//,
            loader: 'istanbul-instrumenter'
        }]
    },
    resolve: {
        root: [
            path.join(__dirname, "node_modules"),
            path.join(__dirname, "plugins")
        ],
        extensions: ['', '.js', '.json', '.html', '.scss'],
        modulesDirectories: ['node_modules', 'plugins']
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: false
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "_": "lodash"
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        new webpack.ContextReplacementPlugin(/^\.\/locale$/, /en|ta/),
        new ExtractTextPlugin("app.css"),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            chunks: ['vendor', appName]
        })
    ],
    stats: {
        colors: true,
        reasons: true
    },
    progress: true
};

config['entry'][appName] = ['./' + appName];

config['entry']['vendor'] = require('./dependencies.js');

module.exports = config;
