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
                    plugins: ["transform-object-rest-spread", "transform-runtime",['import', { libraryName: 'antd', style: true }]],
                }
            },
            {
                test: /.(jpg|png|jpeg)$/,
                use: ['url-loader']
            }
        ]
    },
    mode: 'production'
}