import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import electron from 'vite-plugin-electron'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), electron({
    entry: 'electron/index.ts'
  })],
  server: {
    host: '0.0.0.0', //解决“vite use `--host` to expose”
    port: 8080,
    // open: true
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
        //踩坑：诸如图片资源需要这样写：
        //'/icon':'./src/assets/image/icon',
        //<img src="/icon/logo.png" alt="" srcset=""/>
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/theme/style.less')}";`,
        },
        javascriptEnabled: true
      }
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})