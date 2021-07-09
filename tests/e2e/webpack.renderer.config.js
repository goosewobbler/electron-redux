const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const templateParameters = {
  rendererSrc: './renderer.js',
  stylesheetHref: './renderer.css',
};

module.exports = {
  entry: './src/renderer/renderer.tsx',
  output: {
    path: path.join(__dirname, 'target'),
    filename: '[name].js',
  },
  mode: 'development',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      electron: false,
    },
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.ejs',
      inject: false,
      alwaysWriteToDisk: true,
      templateParameters,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
