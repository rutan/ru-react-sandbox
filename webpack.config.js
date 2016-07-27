var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var paths = (function () {
    var rootPath = path.join(__dirname, './');
    return {
        root: rootPath,
        nodeModules: path.join(rootPath, './node_modules/'),
        src: path.join(rootPath, './src'),
        output: path.join(rootPath, './_build')
    };
})();

module.exports = {
    entry: {
        bundle: [
            path.join(paths.nodeModules, '/normalize.css/normalize.css'),
            path.join(paths.src, '/css/index.scss'),
            path.join(paths.src, '/js/index.js')
        ]
    },
    output: {
        path: paths.output,
        publicPath: '/_build',
        filename: '[name].js',
    },
    module: {
        loaders: [
                {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'es2016', 'react'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css!sass?sourceMap&includePaths[]=' + paths.nodeModules
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]
};
