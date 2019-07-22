const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'points-grid': './src/points-grid.ts',
        'triangles-grid': './src/triangles-grid.ts',
        'triangles-web-with-d3': './src/triangles-web-with-d3.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};