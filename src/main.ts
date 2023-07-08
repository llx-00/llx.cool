import 'virtual:uno.css'
import './styles/index.scss'
import './styles/markdown.scss'

import { ViteSSG } from 'vite-ssg'
import autoRoutes from 'pages-generated'
import App from './App.vue'


const routes = autoRoutes.map((i) => {
  return {
    ...i,
    alias: i.path.endsWith('/')
      ? `${i.path}index.html`
      : `${i.path}.html`,
  }
})

console.log('autoRoutes', autoRoutes)
console.log('routes', routes)

export const createApp = ViteSSG(
  App,
  { routes, }
)
