var webpack = require("webpack");
var path = require("path");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'assets'),
        filename: 'app.bundle.js',
        publicPath: '/assets',
    },
    devServer: {
        open: true,
        contentBase: path.resolve(__dirname, 'src')
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
};