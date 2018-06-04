const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const testing = true; 

let filenameSearchPattern = "index.js";
let filenameOutputPattern = "public/bundles/[name].js";

if (testing) {
    filenameSearchPattern = "*.spec.js";
    filenameOutputPattern = "test/spec-bundle.js";
}

let globModules = (glob.sync('./src/**/' + filenameSearchPattern).map(path => {
    let matches = path.match(/src\/(.*)/);
    return {
        [`${matches[1]}`.replace('/' + filenameSearchPattern, '')]: matches.input
    };
}));

// convert array to object
function convertArrayToObject(arr) {
    var obj = {};
    for (var val of arr) {
        let keys = Object.keys(val);
        obj[keys[0]] = val[keys[0]];
    }
    return obj;
}

module.exports = {
    mode: 'development',
    entry: convertArrayToObject(globModules),
    output: {
        filename: filenameOutputPattern,
        path: path.resolve(__dirname, 'build')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build',
        // hot: true,
        host: process.env.IP,
        port: process.env.PORT,
        "public": "mmiron-g0liath.c9users.io" //no trailing slashs
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
