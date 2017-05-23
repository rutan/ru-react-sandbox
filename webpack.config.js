const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = (function () {
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
            path.join(paths.src, '/css/index.css'),
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
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]
};
