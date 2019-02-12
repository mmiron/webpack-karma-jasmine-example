import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import glob from 'glob';

export default function(env) {
    let filenameSearchPattern = "index.js";

    if (env && env.isTesting == 'true') {
        filenameSearchPattern = "test_index.js";
        // filenameOutputPattern = "src/test/javascript/spec-bundle.js";
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
        polyfills: './src/polyfills.js',
        ...entries(filenameSearchPattern)
    };

    return {
        entry: entryModules,
        output: {
            path: path.join(__dirname, 'dist'),
            chunkFilename: '[name].bundle.js',
            filename: '[name].bundle.js'
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
        plugins: [
            new HtmlWebpackPlugin({
                chunksSortMode: "manual",
                chunks: ['polyfills', 'vendors', 'app']
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            })
        ],
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
        },
        devtool: 'source-map'
    };
}
