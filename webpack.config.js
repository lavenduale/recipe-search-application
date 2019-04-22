// node package to get access
const path = require('path');

module.exports = {
    // entry point object is where it starts
    entry: './src/js/index.js',
    // output object is tell the webpack where to save the bundle file
    output: {
        // the path is absolute so it needs a built in node package to have access
        path: path.resolve(__dirname, 'dist/js'), // __dirname is current absolute path; dist/js is the one we want to bundle with
        filename: 'bundle.js'
    },
    // development mode simply builds our bundler without minifying our code in order to be as fast as possible
    mode: 'development'
}