const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const pkg = require('./package.json'); //loads npm config file

let filenameSearchPattern = "index.js";
let filenameOutputPattern = "src/main/webapp/bundles/[name].js"; // public/bundles/[name].js";

module.exports = function(env) {

    if (env && env.isTesting == 'true') {
        filenameSearchPattern = "test_index.js";
        filenameOutputPattern = "src/test/javascript/spec-bundle.js";
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
        //vendor: Object.keys(pkg.dependencies),
        //'style': glob.sync("./node_modules/**/dist/**/*.css"),
        ...entries(filenameSearchPattern)
    };

    return {
        mode: 'development',
        entry: entryModules,
        output: {
            filename: filenameOutputPattern,
            path: path.resolve(__dirname, '.')
        },
        devtool: 'inline-source-map',
        watch: false,
        watchOptions: {
            ignored: /node_modules/
        },
        module: {
            rules: [{
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }),
            //Finally add this line to bundle the vendor code separately
            // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min-[hash:6].js'),
            new webpack.ProvidePlugin({
                Promise: 'es6-promise-promise', // works as expected
            })
        ],
        externals: {
            // require("jquery") is external and available on the global var jQuery
            "jquery": "jQuery"
        },
        optimization: {
            runtimeChunk: {
                name: 'common-runtime'
            },
            occurrenceOrder: true, // To keep filename consistent between different modes (for example building only)
            splitChunks: {
                chunks: "async",
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: true,
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                        enforce: true

                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    }
                }
            },
            minimizer: [
                // we specify a custom UglifyJsPlugin here to get source maps in production
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        compress: false,
                        ecma: 6,
                        mangle: true
                    },
                    sourceMap: true
                })
            ]
        },
        stats: {
            colors: true
        }
    };
};
