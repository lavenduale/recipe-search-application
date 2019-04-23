// node package to get access
const path = require('path');
const HtmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
    // entry point object is where it starts
    entry: ['babel-polyfill', './src/js/index.js'],
    // output object is tell the webpack where to save the bundle file
    output: {
        // the path is absolute so it needs a built in node package to have access
        path: path.resolve(__dirname, 'dist'), // __dirname is current absolute path; dist/js is the one we want to bundle with
        filename: 'js/bundle.js'
    },
    // development mode simply builds our bundler without minifying our code in order to be as fast as possible
    //mode: 'development'

    // for webpack devServer config
    devServer: {
        // for which webpack should serve, here is in distribution folder
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};