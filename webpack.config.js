// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import 'dotenv/config';



const isProduction = process.env.NODE_ENV === 'production';



const WEBPACK_CONFIG = {

	entry: './src/index.ts',
	output: {
		filename: 'index.js',
		path: path.resolve('./dist/')
	},
	plugins: [
		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				use: 'ts-loader',
				exclude: /node_modules/
			}
			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	}
};



if (isProduction)
{
	WEBPACK_CONFIG.mode = 'production';
}
else {
	WEBPACK_CONFIG.mode = 'development';
	WEBPACK_CONFIG.devtool = 'inline-cheap-module-source-map';
}



export default WEBPACK_CONFIG;
