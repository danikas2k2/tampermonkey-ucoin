import fs from 'node:fs';
import moment from 'moment';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import monkey from 'vite-plugin-monkey';
import PACKAGE from './package.json';

function svgInlineLoader(): Plugin {
    return {
        name: 'svg-inline-loader',
        enforce: 'pre',
        load(id: string) {
            const [filePath, query] = id.split('?', 2);
            if (query) {
                return null;
            }
            if (!filePath.endsWith('.svg')) {
                return null;
            }
            const svg = fs.readFileSync(filePath, 'utf8');
            return `export default ${JSON.stringify(svg)};`;
        },
    };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            svgInlineLoader(),
            cssInjectedByJsPlugin(),
            monkey({
                entry: 'src/ucoin.ts',
                userscript: {
                    name: 'collector :: ucoin.net',
                    namespace: 'https://ucoin.net/',
                    version: `${PACKAGE.version} (${moment().utc().format('Y.M.D.H.m')})`,
                    author: 'danikas2k2',
                    icon: 'https://i.ibb.co/Tc6q9x3/apple-touch-icon-152.png',
                    downloadURL:
                        'https://raw.githubusercontent.com/danikas2k2/tampermonkey-ucoin/master/dist/ucoin.user.js',
                    updateURL:
                        'https://raw.githubusercontent.com/danikas2k2/tampermonkey-ucoin/master/dist/ucoin.user.js',
                    resource: {
                        TextboxListStyle: 'https://ucoin.net/js/auto/TextboxList.css',
                    },
                    require: [
                        'https://ucoin.net/js/auto/GrowingInput.js',
                        'https://ucoin.net/js/auto/TextboxList.js',
                        'https://ucoin.net/js/auto/TextboxList.Autocomplete.js',
                        'https://unpkg.com/showdown@1.9/dist/showdown.min.js',
                    ],
                    match: ['https://*.ucoin.net/*'],
                    'run-at': 'document-end',
                    grant: ['GM_xmlhttpRequest', 'GM_getResourceText', 'GM_addStyle'],
                },
                build: {
                    fileName: 'ucoin.user.js',
                    metaFileName: false,
                    externalGlobals: {
                        react: ['React', 'https://unpkg.com/react@18/umd/react.production.min.js'],
                        'react-dom/server': [
                            'ReactDOMServer',
                            'https://unpkg.com/react-dom@18/umd/react-dom-server-legacy.browser.production.min.js',
                        ],
                    },
                },
            }),
        ],
        define: {
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.API_KEY': JSON.stringify(env.API_KEY),
        },
        oxc: {
            jsx: { runtime: 'classic' },
        },
        build: {
            outDir: 'dist',
            emptyOutDir: true,
            sourcemap: false,
            target: 'es2024',
            minify: 'oxc',
        },
    };
});
