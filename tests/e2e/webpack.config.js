const path = require('path');

module.exports = {
  entry: {
    renderer: './src/renderer/renderer.tsx',
    main: './src/main/main.ts',
  },
  output: {
    path: path.join(__dirname, 'target'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      electron: false,
    },
  },
};
