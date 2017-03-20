module.exports = function (config) {
    config.set({
        frameworks: ["mocha", "karma-typescript"],
        singleRun: true,
        files: [
            { pattern: "node_modules/expect.js/index.js" },
            { pattern: "app/components/__tests__/*.tsx" }
        ],
        preprocessors: {
            "app/components/__tests__/*.tsx": ["karma-typescript"]
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["PhantomJS"]
    });
};
