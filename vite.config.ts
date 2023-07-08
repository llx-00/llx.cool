import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
// import VueMacros from 'unplugin-vue-macros/vite'


export default defineConfig({
  base: '/', // https://cn.vitejs.dev/config/shared-options.html#base
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    // VueMacros({
    //   plugins: {
    //     vue: vue({
    //       reactivityTransform: true,
    //     }),
    //   },
    // }),
    vue(),
    Unocss(), // see ./unocss.config
    AutoImport({ // https://github.com/antfu/unplugin-auto-import
      imports: [
        'vue',
        // '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    Components({ // https://github.com/antfu/unplugin-vue-components
      dts: true,
    }),
  ]
})
