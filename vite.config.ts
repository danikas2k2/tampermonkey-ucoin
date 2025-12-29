import fs from 'node:fs';
import path from 'node:path';
import moment from 'moment';
import { defineConfig, type Plugin } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import PACKAGE from './package.json';

function userscriptBanner(): Plugin {
    const banner = fs
        .readFileSync(path.resolve(__dirname, 'USERSCRIPT.ts'), 'utf8')
        .replace(/{{project\.version}}/g, () => `${PACKAGE.version} (${moment().utc().format('Y.M.D.H.m')})`)
        .trimEnd();

    return {
        name: 'userscript-banner',
        apply: 'build',
        generateBundle(_outputOptions, bundle) {
            for (const [, item] of Object.entries(bundle)) {
                if (item.type !== 'chunk') {
                    continue;
                }
                if (!item.fileName.endsWith('.js')) {
                    continue;
                }
                if (item.code.startsWith('/**!!')) {
                    continue;
                }
                item.code = `${banner}\n${item.code}`;
            }
        },
    };
}

function svgInlineLoader(): Plugin {
    return {
        name: 'svg-inline-loader',
        enforce: 'pre',
        load(id) {
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

export default defineConfig({
    plugins: [svgInlineLoader(), cssInjectedByJsPlugin(), userscriptBanner()],
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
    },
    esbuild: {
        // Ensure classic React JSX transform (no react/jsx-runtime import).
        jsx: 'transform',
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false,
        target: 'es2024',
        minify: 'terser',
        terserOptions: {
            compress: {
                toplevel: true,
                passes: 2,
            },
            format: {
                comments: /^\**!!/,
            },
        },
        rollupOptions: {
            input: path.resolve(__dirname, 'src/ucoin.ts'),
            external: ['react', 'react-dom', 'react-dom/server'],
            output: {
                dir: 'dist',
                format: 'iife',
                entryFileNames: 'ucoin.user.js',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-dom/server': 'ReactDOMServer',
                },
            },
        },
    },
});


