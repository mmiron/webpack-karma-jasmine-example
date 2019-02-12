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
        //vendor: Object.keys(pkg.dependencies),
        //'style': glob.sync("./node_modules/**/dist/**/*.css"),
        ...entries(filenameSearchPattern)
    };

    console.log("entryModules", entryModules);

    return {
        // entry: path.join(__dirname, 'src/index.js'),
        entry: entryModules,
        output: {
            path: path.join(__dirname, 'dist'),
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
                title: 'Custom template',
                template: path.join(__dirname, 'src/index.template.html')
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            })
        ],
        stats: {
            colors: true
        },
        devtool: 'source-map'
    };
}
