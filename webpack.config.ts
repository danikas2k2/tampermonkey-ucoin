import fs from 'fs';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import PACKAGE from './package.json';

const config = (): webpack.Configuration => ({
    mode: 'production',
    context: __dirname,
    entry: {
        ucoin: './src/ucoin.ts',
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.svg$/, use: 'svg-inline-loader' },
            { test: /\.less$/, use: [{ loader: 'css-loader' }, { loader: 'less-loader' }] },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'webpack-replace',
                        options: {
                            replace: [
                                {
                                    from: '{{project.version}}',
                                    to: PACKAGE.version,
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: fs.readFileSync('./USERSCRIPT.ts', 'utf8').replace(/{{project\.version}}/g, PACKAGE.version),
            entryOnly: true,
            raw: true,
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.css', '.less'],
        modules: ['node_modules'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].user.js',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: /^\**!/,
                    },
                },
            }),
        ],
    },
});

export default config;
