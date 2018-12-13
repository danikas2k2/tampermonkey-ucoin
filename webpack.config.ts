import path from 'path';
import webpack from 'webpack';

// @ts-ignore
import WebpackAutoInject from 'webpack-auto-inject-version';



const config: webpack.Configuration = {
    mode: 'production',
    context: __dirname,
    entry: {
        'colnect': './src/colnect.ts',
        'ucoin': './src/ucoin.ts',
    },
    module: {
        rules: [
            {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},
            {test: /\.svg$/, use: 'svg-inline-loader'},
            {
                test: /\.less$/,
                use: [
                    // {loader: 'to-string-loader'},
                    // {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'less-loader'}
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.css', '.less'],
        modules: [
            'node_modules'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new WebpackAutoInject({
        }),
    ]
};

export default config;
