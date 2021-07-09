const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './src/main/main.ts',
  output: {
    path: path.join(__dirname, 'target'),
    filename: '[name].js',
  },
  mode: 'development',
  target: 'electron-main',
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
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      electron: false,
    },
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  externals: [
    ({ request }, callback) => {
      if (request[0] === '.') {
        callback();
      } else {
        callback(null, `require('${request}')`);
      }
    },
  ],
};
