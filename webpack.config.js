var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    module: {
        loaders: [
		{
            test: /\.(jsx?|js?)$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        },
        {
            test: /\.css$/, // Only .css files
	    loader: 'style!css' // Run both loaders
        },
       {
            test: /\.scss$/,
            loader: 'style!css!sass'
       }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: 'dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
