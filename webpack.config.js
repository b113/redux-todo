const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './dev/index.js',
	output: {
		path: path.resolve(__dirname, 'prod'),
		filename: 'bundle.js'
	},
	watch: NODE_ENV === 'development',
	devtool: NODE_ENV === 'development' && 'eval-source-map',
	mode: NODE_ENV,
	module: {
		rules: [
			{
		        test: /\.js$/,
		        enforce: "pre",
		        exclude: /node_modules/,
		        loader: "eslint-loader",
		    },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			// {
			// 	test: /\.css$/,
			// 	exclude: /node_modules/,
			// 	use: [
			// 		'style-loader', 'css-loader'
			// 	]
			// }
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: {
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: NODE_ENV === 'development' ? (
								'[name]__[local]__[hash:base64:5]'
							) : (
								'[hash:base64:12]'
							)
						}
					}
				})
			},
			{
        		test: /\.(png|jpg|gif)$/,
        		use: [
          			{
	            		loader: 'file-loader',
	            		options: {
	            			name: 'images/[hash].[ext]'
	            		}
          			}
        		]
      		}
		] 
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new CopyWebpackPlugin([
			{
				from: path.resolve('./dev/static'),
				to: path.resolve('./prod')
			}
		]),
		new webpack.DefinePlugin({
		 	'__DEV__': JSON.stringify(NODE_ENV === 'development')
		})
	]
};