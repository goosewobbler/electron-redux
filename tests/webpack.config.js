"use strict";

const path = require("path");

module.exports = {
	mode: "development",
	resolve: {
		alias: {
			electron: require.resolve("../electron"),
		},
	},

	entry: {
		renderer: "./renderer/renderer.js",
	},
	output: {
		path: path.join(__dirname, "target"),
		filename: "[name].js",
	},

	module: {
		rules: [{ use: require.resolve("babel-loader") }],
	},
};
