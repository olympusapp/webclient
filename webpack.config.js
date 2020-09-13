const path = require('path')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: process.env.NODE_ENV,
	optimization: {
		minimize: true,
	},
	entry: {
		index: './src/index.ts',
	},
	plugins: [
		new WebpackBar({
			name: 'Web client',
		}),
		new HtmlWebpackPlugin({
			title: 'Web client',
			filename: path.resolve(__dirname, 'dist', 'index.html'),
			templateContent: `
				<html>
					<meta charset="UTF-8" />
					<body>
						<div id="App"></div>
					</body>
				</html>
			`,
		})
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(jpe?g|ttf|png|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: './[name].[ext]',
					outputPath: './',
				}
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: path.resolve(__dirname, './node_modules')
			},
		],
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		alias:{
			Constants: path.resolve(__dirname,'src/constants')
		}
	},
	target: 'web',
	output: {
		filename: 'index.js',
		path: path.join(__dirname, 'dist'),
		libraryTarget: 'umd',
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: true,
		port: 5000
	},
}