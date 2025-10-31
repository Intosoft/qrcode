import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    target: 'es2020',
    external: ['@intosoft/qrcode', '@angular/core', '@angular/common'],
});
