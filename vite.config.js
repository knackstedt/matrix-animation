// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";

export default defineConfig(({mode}) => ({
    plugins: mode == "pages" ? null : [dts({ rollupTypes: true })],
    server: {
        port: 4300,
        strictPort: true
    },
    build: {
        lib: mode == "pages" ? null : {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/public-api.ts'),
            name: 'MatrixAnimation',
            // the proper extensions will be added
            fileName: 'matrix-animation',
            formats: ['es', 'cjs', 'umd'],
            
        },
        sourcemap: true
    }
}));