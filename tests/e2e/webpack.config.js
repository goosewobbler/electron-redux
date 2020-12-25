"use strict";

const path = require("path");

module.exports = {
	resolve: {
		alias: {
			electron: require.resolve("@mckayla/electron-redux/electron"),
		},
	},

	entry: {
		renderer: "./src/renderer/renderer.js",
	},
	output: {
		path: path.join(__dirname, "target"),
		filename: "[name].js",
	},
};
