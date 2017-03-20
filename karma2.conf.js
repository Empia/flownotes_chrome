var webpackConfig = require('./webpack.config.js');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = function (config) {
    config.set({
        frameworks: ["mocha", "chai", "sinon", "karma-typescript"],
        singleRun: true,
        plugins: [
            require("karma-typescript"),
            require("karma-mocha"),
            require("karma-chai"),
            require("karma-webpack"),
            require("karma-sinon"),
            require("karma-mocha-reporter"),
            require("karma-phantomjs-launcher"),
            require("karma-sourcemap-loader")
        ],
        files: [
            { pattern: "app/components/__tests__/*.tsx" },
        ],
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig_test.json"
        },
        webpackMiddleware: {
            quiet: true,
            stats: {
                colors: true
            }
        },
        preprocessors: {
            "app/components/__tests__/*.tsx": ["karma-typescript"],
        },
        reporters: ["mocha", "progress", "karma-typescript"],
        browsers: ['PhantomJS']
    });
};
