const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        editor: './src/editor.js',
        userinfo: './src/userinfo.js',
        myzone: './src/myzone.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].[contenthash].js'
    },

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            }
        }
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/img',
            to: __dirname + '/dist/img'
        }]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/template/index.html',
            chunks: ['vendors', 'index', 'runtime'],
            title: '首页'
        }),
        new HtmlWebpackPlugin({
            filename: 'editor.html',
            template: './src/html/template/index.html',
            title: '编辑器',
            chunks: ['vendors', 'editor', 'runtime']
        }),
        new HtmlWebpackPlugin({
            filename: 'userinfo.html',
            template: './src/html/template/index.html',
            title: 'TA的信息',
            chunks: ['vendors', 'userinfo', 'runtime']
        }),
        new HtmlWebpackPlugin({
            filename: 'myzone.html',
            template: './src/html/template/index.html',
            title: '个人空间',
            chunks: ['vendors', 'myzone', 'runtime']
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: './css/[name].css',
        }),
    ],

    module: {
        rules: [{
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]',
                    outputPath: '/dist/img',
                }
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
}