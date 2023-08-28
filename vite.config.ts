import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueDevTools(),
    VueRouter({
      // Folder(s) to scan for vue components and generate routes. Can be a string, or
      // an object, or an array of those. Each option allows to override global options.
      // like exclude, extensions, etc.
      routesFolder: 'src/pages',

      // allowed extensions for components to be considered as pages
      // can also be a suffix: e.g. `.page.vue` will match `home.page.vue`
      // but remove it from the route path
      extensions: ['.vue'],

      // list of glob files to exclude from the routes generation
      // e.g. ['**/__*'] will exclude all files and folders starting with `__`
      // e.g. ['**/__*/**/*'] will exclude all files within folders starting with `__`
      // e.g. ['**/*.component.vue'] will exclude components ending with `.component.vue`
      exclude: ['**/__*', '**/components/**/*'],

      // Path for the generated types. Defaults to `./typed-router.d.ts` if typescript
      // is installed. Can be disabled by passing `false`.
      dts: './typed-router.d.ts',

      // Override the name generation of routes. unplugin-vue-router exports two versions:
      // `getFileBasedRouteName()` (the default) and `getPascalCaseRouteName()`. Import any
      // of them within your `vite.config.ts` file.
      // getRouteName: (routeNode) => myOwnGenerateRouteName(routeNode),

      // Customizes the default langage for `<route>` blocks
      // json5 is just a more permissive version of json
      routeBlockLang: 'json5',

      // Change the import mode of page components. Can be 'async', 'sync', or a function with the following signature:
      // (filepath: string) => 'async' | 'sync'
      importMode: 'async'
    }),
    // ⚠️ Vue must be placed after VueRouter()

    vue(),
    Layouts({
      layoutsDir: 'src/layouts'
    }),
    vueJsx(),
    AutoImport({
      resolvers: [ArcoResolver()],
      imports: [
        // Vue
        'vue',

        VueRouterAutoImports,

        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink']
        }
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json'
      },
      dts: true
    }),
    Components({
      dts: true, // default is true
      globs: ['**/components/*.{vue}'],
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
