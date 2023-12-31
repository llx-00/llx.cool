import "vue-router"

import "vite-plugin-pages/client"

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "vue-router" {
  interface RouteMeta {
    frontmatter: any
  }
}
