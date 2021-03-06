var path = require('path');
module.exports = {
    entry: {
        app: './app/main.tsx'
    },
    output: {
        filename: './.tmp/bundle.js'
    },
    resolve: {
        root: [
            path.resolve('./src/my_modules'),
            path.resolve('node_modules')
        ],
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [{
                test: /\.tsx?$/,
                loader: 'ts-loader!preprocessor?file&config=preprocess-ts.json'
            }]
    }
};
