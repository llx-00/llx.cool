import path, { resolve } from "path"
import fs from "fs-extra"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Unocss from "unocss/vite"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import Pages from "vite-plugin-pages"
import Markdown from "unplugin-vue-markdown/vite"
import matter from "gray-matter"
import IconsResolver from "unplugin-icons/resolver"
import Shiki from "markdown-it-shiki"

export default defineConfig({
  resolve: {
    alias: {
      "~": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Unocss(), // see ./unocss.config

    Pages({
      extensions: ["vue", "md"],
      dirs: "src/pages",
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))
        if (path.endsWith(".md")) {
          const md = fs.readFileSync(path, "utf-8")
          const { data } = matter(md)
          // console.log(`matter(md).data: ${JSON.stringify(data, null, 2)}`)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }
        return route
      },
    }),

    Markdown({
      markdownItOptions: {
        quotes: "\"\"''",
      },
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          highlightLines: true,
        })
      },
    }),

    AutoImport({
      // https://github.com/antfu/unplugin-auto-import
      imports: ["vue", "vue-router", "@vueuse/core", "@vueuse/head"],
      dts: true,
      dirs: ["./src/composables", "./src/utils"],
      vueTemplate: true,
    }),

    Components({
      // https://github.com/antfu/unplugin-vue-components
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: "",
        }),
      ],
    }),
  ],
})
