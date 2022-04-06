import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias:{
      '@' : resolve(__dirname, './src'),
      '~' : resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      name: 'vite-test-lib',
      entry: resolve(__dirname, 'src/index.js'),
      fileName: (format) => {
        const isESM = ('es' === format)
        return isESM ? `vite-test-lib.mjs` : `vite-test-lib.${format}.js`
      },
    },
    rollupOptions: {

      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['vue'],

      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },

        // No easy option to rename extracted stylesheet
        assetFileNames: (assetInfo) => {
          const isStylesheet = assetInfo.name === 'style.css'
          return isStylesheet ? 'vite-test-lib.css' : assetInfo.name
        },
      },
    },
  },
})
