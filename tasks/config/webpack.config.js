var webpack = require('webpack');
var path = require('path');

module.exports = {
  // Where to start
  entry: {
    Particles: path.resolve(__dirname, '../../src/index.jsx')
  },

  // Where to output
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },

  externals: {
    'classnames': true,
    'react': 'React',
    'react-dom': true,
    'react-addons-css-transition-group': true
  },

  module: {
    preLoaders: [{
      test: /\.(jsx?|es6)$/,
      exclude: /(node_modules|dist)/,
      include: /src\/.*/,
      loader: 'eslint'
    }],
    loaders: [
      // ES6/JSX for App
      {
        test: /\.(jsx?|es6)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  eslint: {
    // Strict linting enforcing
    failOnWarning: true
  },

  stats: {
    children: false,
    colors: true,
    modules: false,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    fallback: path.resolve(__dirname, '../../node_modules')
  },

  resolveLoader: {
    fallback: path.resolve(__dirname, '../../node_modules')
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ],

  devtool: 'source-map'
};
