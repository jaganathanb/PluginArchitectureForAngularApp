var path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  Clean = require('clean-webpack-plugin'),
  appName = 'charts',
  config;

config = {
  watch: true,
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
    chunkFilename: "[name].[hash].module.js",
    publicPath: './'
  },
  module: {
    loaders: [{
      test: /.js?$/,
      loader: 'babel-loader',
      exclude: /(node_modules|webpack.config.js$|gulpfile.js$|dist)/,
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
      test: /\.jsx$/,
      exclude: /(tests|node_modules|dist)\//,
      loader: 'istanbul-instrumenter'
    }]
  },
  resolve: {
    root: [
      path.join(__dirname, "../node_modules"),
      path.join(__dirname, "../")
    ],
    extensions: ['', '.js', '.json', '.html', '.scss'],
    modulesDirectories: ['../node_modules', './src', '../']
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true
    }),
    new webpack.ProvidePlugin({
      "_": "lodash"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.ContextReplacementPlugin(/^\.\/locale$/, /en|ta/),
    new ExtractTextPlugin("app.css"),
    new HtmlWebpackPlugin({
      coreModule: 'Core.Charts',
      template: 'charts/index.html',
      inject: 'body',
      chunks: ['vendor', 'charts']
  }),
    new Clean(['dist'])
    /* ,
           new webpack.optimize.UglifyJsPlugin({ sourceMap: false, mangle: false }),
           new webpack.optimize.DedupePlugin(),
           new webpack.optimize.OccurenceOrderPlugin(true)*/
  ],
  stats: {
    colors: true,
    reasons: true
  },
  progress: true
};

config['entry'][appName] = ['./' + appName];

config['entry']['vendor'] = require('./dependencies');

module.exports = config;
