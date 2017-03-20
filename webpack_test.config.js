module.exports = {
    output: {
        filename: 'build/bundle.js'
    },

    resolve: {
        extensions: ['', '.ts', '.tsx','.js'],
        modulesDirectories: ['./app/components/__tests__/', 'node_modules']
    },

    module: {
        loaders: [
            // { test: /\.ts$/, loader: 'babel-loader?presets[]=es2015!ts-loader', exclude: /node_modules/ }
            { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
            { test: /\.tsx$/, loader: 'ts-loader', exclude: /node_modules/ }

        ]
    },

    devtool: 'source-map'
}
