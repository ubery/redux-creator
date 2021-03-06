var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/reduxCreator.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'redux-creator.min.js',
        library: 'reduxCreator',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            },
            output: {
                comments: false
            }
        })
    ]
}