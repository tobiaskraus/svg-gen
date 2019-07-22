const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'pointsGrid': './src/pointsGrid/pointsGrid.ts',
        'trianglesGrid': './src/trianglesGrid/trianglesGrid.ts',
        'trianglesWeb-with-d3': './src/trianglesWeb-with-d3/trianglesWeb-with-d3.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/[name].bundle.js'
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
    plugins: [
        new CopyPlugin([
            { from: '**/*.html', context: 'src/' },
            { from: '**/*.css', context: 'src/' },
        ]),
    ]
};