var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/js/foundation.min.js',
    './app/main.tsx'
  ],
  externals: {
    jquery: 'jQuery',
    React: 'react'
  },
  plugins: [
   //replace({
    //  'process.env.NODE_ENV': JSON.stringify( 'production' )
    //}),
new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("development")
  }
}),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
  new ExtractTextPlugin('app.css', {
            allChunks: true
  }),   
  ],
  output: {
    path: path.resolve(__dirname, './.tmp'),
    filename: 'bundle.js'
  },
  resolve: {
    //root: __dirname,
    //alias: {
    //  Main: 'app/main.tsx',
    //},
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css']
  },
  target: 'node',
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
  /*
      { test: /\.css$/,
          loaders: [
              'style?sourceMap',
              'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      ]},
{
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
      notExtractLoader: 'style-loader',
      loader: 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!resolve-url!postcss',
  }),
},
{
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
},
*/
    {
      test: /\.css$/i,
      loader: ExtractTextPlugin.extract('style',
        'css?modules&localIdentName=[name]_[local]__[hash:base64:5]'),
    },



      { test: /\.tsx?$/, loader: 'ts-loader',      exclude: /node_modules/ }
    ]
  },
  //devtool: 'cheap-module-eval-source-map'
};
