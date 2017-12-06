const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            path.join(paths.src, '/index.js')
        ]
    },
    output: {
        path: paths.output,
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
        new HtmlWebpackPlugin({
            template: path.join(paths.src, 'index.html')
        })
    ]
};
