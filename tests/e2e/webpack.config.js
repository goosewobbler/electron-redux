'use strict';

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      electron: false,
    },
  },

  entry: {
    renderer: './src/renderer/renderer.js',
  },
  output: {
    path: path.join(__dirname, 'target'),
    filename: '[name].js',
  },
};
