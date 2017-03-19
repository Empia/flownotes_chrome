module.exports = function(config) {
    config.set({
     frameworks: ["mocha", "chai", "sinon", "karma-typescript"],
     singleRun: true,

     plugins: [
            require("karma-typescript"),
            require("karma-mocha"),
            require("karma-chai"),
            require("karma-sinon"),                        
            require("karma-mocha-reporter"),
            require("karma-phantomjs-launcher"),
            require("karma-sourcemap-loader")
        ],
        files: [
            { pattern: "app/components/__tests__/*.tsx" }, // *.tsx for React Jsx 
        ],
        preprocessors: {
            "app/components/__tests__/*.tsx": ["karma-typescript"], // *.tsx for React Jsx 
        },
        reporters: ["mocha","progress", "karma-typescript"],
        browsers: ['PhantomJS']
    });
};
