var StatsPlugin = require('stats-webpack-plugin'),
    path = require('path'),
    webpack = require('webpack'),
    fs = require('fs'),
    glob = require('glob'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    appName = 'shell',
    config;

process.env.NODE_ENV = 'production';

config = {
    entry: {
        'en': 'angular-i18n/en.js',
        'ta': 'angular-i18n/ta.js',
        'kn': 'angular-i18n/kn.js',
        'zh': 'angular-i18n/zh.js',
        'de': 'angular-i18n/de.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name].[hash].min.js',
        chunkFilename: "[name].[hash].min.js",
        publicPath: './'
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
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name]-[hash].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            },
            sourceMap: false,
            mangle: true
        }),
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.DefinePlugin({
            __DEV__: false
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "_": "lodash"
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[hash].min.js"),
        new webpack.ContextReplacementPlugin(/^\.\/locale$/, /en|ta/),
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

config.plugins.push(
    function() {
        this.plugin("done", function(stats) {
            var files = glob.sync(config.output.path + '**/*.js'),
                matcher = '.culture.js',
                replacement = '.' + stats.hash + '.min.js';

            for (var i = 0; i < files.length; i++) {
                console.log('\nReplacing in %s: %s => %s', files[i], matcher, replacement);
                var str = fs.readFileSync(files[i], 'utf8');
                var out = str.replace(new RegExp(matcher, 'g'), replacement);
                fs.writeFileSync(files[i], out);
            }
        });
    }
);

config['entry'][appName] = ['./' + appName];

config['entry']['vendor'] = require('./dependencies.js');

module.exports = config;
