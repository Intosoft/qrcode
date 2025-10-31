import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['index.tsx'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    target: 'es2020',
    external: ['@intosoft/qrcode', 'react', 'react-native', 'react-native-svg'],
    jsx: 'react-jsx',
});
