import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import glob from 'glob';

export default function(env, argv) {
    const NODE_ENV = argv.mode || "development";
    let filenameSearchPattern = "index.js";
    let filenameOutputPattern = "[name].js";

    if (env && env.isTesting == 'true') {
        filenameSearchPattern = "test_index.js";
        filenameOutputPattern = "spec-bundle.js";
    }

    function entries(filenameSearchPattern) {
        return (glob.sync('./src/**/' + filenameSearchPattern).reduce((prev, path) => {
            let matches = path.match(/src\/(.*)/);
            return {
                ...prev,
                [`${matches[1]}`
                    .replace('/' + filenameSearchPattern, '')
                ]: matches.input
            };
        }, {}));
    }

    let entryModules = {
        ...entries(filenameSearchPattern)
    };

    let config = {
        entry: entryModules,
        output: {
            path: path.join(__dirname, 'dist'),
            chunkFilename: '[name].js',
            filename: filenameOutputPattern
        },
        module: {
            rules: [{
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader'
                }]
            }]
        },
        performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        plugins: [
            new HtmlWebpackPlugin({
                chunksSortMode: "manual",
                chunks: ['vendors', 'app'],
                template: path.join(__dirname, 'src/index.template.html')
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            })
        ],
        externals: {
            "jquery": "jQuery",
        },
        resolve: {
            alias: {
                Promise: path.resolve(__dirname, 'node_modules/promise-polyfill/src/polyfill')
            }
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
                }
            }
        },
        stats: {
            colors: true
        }
    };

    if (NODE_ENV == "development") {
        config.devtool = 'source-map';
    }

    return config;
}
