const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const paths = (() => {
  var rootPath = path.join(__dirname, './');
  return {
    root: rootPath,
    nodeModules: path.join(rootPath, './node_modules/'),
    src: path.join(rootPath, './src'),
    output: path.join(rootPath, './_build')
  };
})();

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    bundle: [path.join(paths.nodeModules, '/ress/ress.css'), path.join(paths.src, '/global.scss'), path.join(paths.src, '/index.ts')]
  },
  output: {
    path: paths.output,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: paths.src,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.src, 'index.html')
    })
  ]
};
