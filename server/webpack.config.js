const config = require("./src/serverConfig");

var webpackConfig = {
    entry: {main: ["./bin/www"]},
    target: "node",
    output: {
        path: config.distFolder,
        filename: "main.bundle.js",
        publicPath: "/assets/"
    },
    mode: config.isProd ? "production" : "development",
};

module.exports = webpackConfig;