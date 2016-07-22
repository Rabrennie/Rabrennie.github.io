var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntry(sources) {
	if(process.env.NODE_ENV !== 'production') {
		sources.push('webpack-dev-server/client?http://0.0.0.0:8080/');
	}

	return sources;
}

module.exports = {
	entry: {
		main: getEntry([
			'./src/js/main'
		])
	},
	output: {
		filename: 'dist/[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!sass')
			},
            {
                test: /\.jade$/,
                loader: 'jade'
            }
		]
	},
	plugins: [
		new ExtractTextPlugin('dist/style.css', { allChunks:true }),
        new HtmlWebpackPlugin({ template: './src/index.jade' })
	]
};
