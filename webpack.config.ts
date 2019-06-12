import path from 'path';
import webpack from 'webpack';
// @ts-ignore
import WebpackAutoInject from 'webpack-auto-inject-version';

const config: webpack.Configuration = {
    mode: 'production',
    context: __dirname,
    entry: {
        'ucoin': './src/ucoin.ts',
    },
    module: {
        rules: [
            {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},
            {test: /\.svg$/, use: 'svg-inline-loader'},
            {test: /\.less$/, use: [{loader: 'css-loader'}, {loader: 'less-loader'}]}
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.css', '.less'],
        modules: ['node_modules']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].user.js'
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new WebpackAutoInject({
            SILENT: true,
            components: {
                AutoIncreaseVersion: true,
                InjectAsComment: false,
                InjectByTag: true,
            },
        }),
    ]
};

export default config;
