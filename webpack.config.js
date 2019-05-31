const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js"
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    plugins: [

        new webpack.ProvidePlugin({

            $: "jquery",

            jQuery: "jquery",

            "windows.jQuery": "jquery"

        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ],

    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    }
}