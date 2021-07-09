const path = require('path');

module.exports = {
  entry: './src/renderer/preload.js',
  output: {
    path: path.join(__dirname, 'target'),
    filename: 'preload.js',
  },
  mode: 'development',
  target: 'electron-preload',
  resolve: {
    extensions: ['.js'],
    alias: {
      electron: false,
    },
  },
};
