import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['index.ts'],
    format: ['cjs', 'esm', 'iife'],
    dts: true,
    clean: true,
    sourcemap: true,
    target: 'es2020',
    globalName: 'QRCodeVanilla',
    external: ['@intosoft/qrcode'],
});
