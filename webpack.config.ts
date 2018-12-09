import path from 'path';
import webpack from 'webpack';
// import TerserPlugin from 'terser-webpack-plugin';


const config: webpack.Configuration = {
    mode: 'production',
    entry: {
        'colnect': './src/colnect.ts',
        'ucoin.coin': './src/ucoin.coin.ts',
        'ucoin.gallery': './src/ucoin.gallery.ts',
        'ucoin.swap-list': './src/ucoin.swap-list.ts',
        'ucoin.swap-mgr': './src/ucoin.swap-mgr.ts',
    },
    // devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    optimization: {
        minimize: false
    },
};

export default config;
