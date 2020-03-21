const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname + "/src"),
        filename: 'bundle.js'
    },
    mode:"none",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: "/node_modules",
                use: ['babel-loader'],
            },
            {
                test:/\.(png|jpg|svg)$/,
                use:[
                    'file-loader'
                ]
            }
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx','.ts','.tsx'] // <-.ts , .tsx 확장자 추가
    },
    // webpack.config.js
    devServer: {
        contentBase: __dirname + "/src/",
        inline: true,
        hot: true,
        host: "localhost",
        port: 5500
    }
};