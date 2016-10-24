var webpack = require('webpack');

module.exports = {
    entry: [
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
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
   plugins: [
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new webpack.optimize.AggressiveMergingPlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify('production')
		}
	})
   ]
};
