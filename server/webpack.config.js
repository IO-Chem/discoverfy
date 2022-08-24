import { distFolder, isProd } from "./src/serverConfig";

var webpackConfig = {
    entry: {main: ["./bin/www.js"]},
    target: 'node',
    output: {
        path: distFolder,
        filename: "main.bundle.js",
    },
    mode: isProd ? "production" : "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
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

export default webpackConfig;