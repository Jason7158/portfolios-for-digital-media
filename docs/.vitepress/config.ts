import path from 'node:path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { visualizer } from 'rollup-plugin-visualizer'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: '/portfolio/',
  description: 'Jason Hoo\'s portfolios for MDM',
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
    footer: {
      // message: 'VitePress Unocss Starter',
      // copyright: 'Copyright © 2023 infinite-creatioin',
    },
    // socialLinks: [
    //    { icon: 'github', link: 'https://github.com/infinite-creation/vitepress-unocss-starter' },
    // ],
    // nav: [
    //   { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
    //   { text: 'Configs', link: '/config/', activeMatch: '/config/' },
    //   { text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
    // ],
    sidebar: {
      '/guide/': sidebarGuide(),
      '/config/': sidebarConfig(),
    },
    blog: {
      title: 'My Blog',
      description: 'Some articles for sample Blog',
    },
  } as any,
  vite: {
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

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        { text: 'What is this?', link: '/guide/' },
      ],
    },
    {
      text: 'Features',
      collapsible: true,
      items: [
        { text: 'UnoCSS', link: '/guide/features/unocss' },
        { text: 'Anu', link: '/guide/features/anu' },
      ],
    },
  ]
}

function sidebarConfig() {
  return [
    {
      text: 'Config',
      items: [
        { text: 'Introduction', link: '/config/' },
        { text: 'UnoCSS', link: '/config/unocss' },
        { text: 'Anu', link: '/config/anu' },
      ],
    },
  ]
}
