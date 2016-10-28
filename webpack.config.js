var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src'
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
	devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: 'dist',
        publicPath: '/RecipeBox/',
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
