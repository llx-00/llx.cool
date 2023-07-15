---
title: Hello World
date: 2023-7-1
---

# Hello World

```ts
import 'virtual:uno.css';
import './styles/index.scss';
import './styles/markdown.scss';

import { ViteSSG } from 'vite-ssg';
import autoRoutes from 'pages-generated';
import App from './App.vue';

const routes = autoRoutes.map((i) => {
  return {
    ...i,
  };
});

export const createApp = ViteSSG(App, { routes });
```
