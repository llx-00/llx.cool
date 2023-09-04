import "virtual:uno.css"
import "./styles/index.scss"
import "./styles/markdown.scss"

import { ViteSSG } from "vite-ssg"
import autoRoutes from "pages-generated"
import NProgress from "nprogress"
import { setupRouterScroller } from "vue-router-better-scroller"

import App from "./App.vue"

const routes = autoRoutes.map(i => {
  return {
    ...i,
  }
})

export const createApp = ViteSSG(
  App,
  { routes },
  ({ router, app, isClient }) => {
    if (isClient) {
      const html = document.querySelector("html")!
      setupRouterScroller(router, {
        selectors: {
          html(ctx) {
            // only do the sliding transition when the scroll position is not 0
            if (ctx.savedPosition?.top) html.classList.add("no-sliding")
            else html.classList.remove("no-sliding")
            return true
          },
        },
        behavior: "auto",
      })

      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  }
)
