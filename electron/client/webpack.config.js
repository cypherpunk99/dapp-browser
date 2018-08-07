var path = require('path');
var webpack = require('webpack');

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    // target: 'electron-renderer',
    entry: { 
        app: [
        'react-hot-loader/patch',
        `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr&reload=true`,
        './index.tsx'
        ],
        vendor: ['react', 'react-dom']
    },
    output: {
        publicPath: `http://localhost:${port}/build/`
    },
    // entry: './index.tsx',
    // output: {
    //     path: path.resolve(__dirname, 'build'),
    //     filename: 'app.bundle.js'
    // },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
         
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    stats: {
        colors: true
    },
   
    plugins: [
        // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
    ]
    // watch: true
};
