var webpack = require('webpack');
var path = require('path');


module.exports = {
    entry: {
        'index': path.join(__dirname, '/front_src/jsx/') + 'index.jsx'
    },
    output: {
        path: path.join(__dirname, '/app/public/js/'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }})
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};