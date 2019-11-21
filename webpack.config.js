const path = require('path');
module.exports = {
    entry: {
        bundle: "./app/main",
    },
    output: {
        path: path.resolve(__dirname, "www/dist"),
        filename: "[name].js"
    },
    devtool: 'false',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "./app")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["env", "react"],
                    plugins: ["transform-object-rest-spread", "transform-runtime"],
                }
            },
            {
                test: /.(jpg|png|jpeg)$/,
                use: ['url-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name:"vendor",
                    test: /[\/]node_modules[\/]/,
                    priority: 5 // 优先级
                },
                default: {
                    name: "bundle",
                    priority: 0,
                    reuseExistingChunk: true
                }
            }
        }
    },
    mode: 'development',
    // mode: 'production',
}