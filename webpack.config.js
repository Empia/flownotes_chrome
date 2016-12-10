var webpack = require('webpack');
module.exports = {
  entry: [
    //'script!jquery/dist/jquery.min.js',
    //'script!foundation-sites/dist/foundation.min.js',
    './app/main.tsx'
  ],
  //externals: {
    //jquery: 'jQuery'
  //},
  //plugins: [
    //new webpack.ProvidePlugin({
    //  '$': 'jquery',
    //  'jQuery': 'jquery'
   // })
  //],
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    //root: __dirname,
    //alias: {
    //  Main: 'app/main.tsx',
    //},
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  target: 'node',
  module: {
    loaders: [
      //{
        //loader: 'babel-loader',
        //query: {
        //  presets: ['react', 'es2015', 'stage-0']
        //},
        //test: /\.jsx?$/,
        //exclude: /(node_modules|bower_components)/
      //},
  {
  test: /\.json$/,
  loader: 'json'
},
      { test: /\.tsx?$/, loader: 'ts-loader',      exclude: /node_modules/ }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
