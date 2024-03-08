/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { build } = require('esbuild');
const { Generator } = require('npm-dts');
const { dependencies } = require('./package.json');

new Generator({
    entry: 'src/index.ts',
    output: 'dist/index.d.ts',
}).generate();

const sharedConfig = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    external: Object.keys(dependencies),
};

build({
    ...sharedConfig,
    platform: 'node', // for CJS
    outfile: 'dist/index.js',
});

build({
    ...sharedConfig,
    outfile: 'dist/index.esm.js',
    platform: 'neutral', // for ESM
    format: 'esm',
});
