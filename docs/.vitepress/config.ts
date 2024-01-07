import path from 'node:path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { visualizer } from 'rollup-plugin-visualizer'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  title: 'Jason Hu\'s Portfolio',
  base: '/',
  description: 'Jason Hu\'s portfolios for MDM',
  markdown: {
    headers: {
      level: [0, 0],
    },
  },
  themeConfig: {
    siteTitle: 'Portfolio',
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Jason7158/portfolios-for-digital-media' },
    ],
    sidebar: [
      {
        text: 'Reference',
        items: [
          { text: 'Pages', link: '/pages/' },
          { text: 'Vue Components', link: '/vueComponents/' },
          { text: 'Charts', link: '/charts/' },
          { text: 'Codes', link: '/codes/' },
        ],
      },
    ],
    blog: {
      title: 'My Blog',
      description: 'Some articles for sample Blog',
    },
  } as any,
  vite: {
    ssr: {
      noExternal: ['element-plus'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../'),
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      UnoCSS(),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  },
  head: [
    ['link', { rel: 'icon', href: 'favicon.svg' }],
  ],
})
