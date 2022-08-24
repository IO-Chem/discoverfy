const config = require("./src/serverConfig");

var webpackConfig = {
    entry: {main: ["./bin/www"]},
    target: 'node',
    output: {
        path: config.distFolder,
        filename: "main.bundle.js",
    },
    mode: config.isProd ? "production" : "development",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
}

module.exports = webpackConfig;