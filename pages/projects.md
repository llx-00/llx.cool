---
title: Projects - Longxiang Li
display: Projects
subtitle: 一些小玩具
projects:
  Starter Templates:
    - name: 'Vue SPA Template'
      link: 'https://github.com/llx-00/vue-spa-tem'
      desc: 'Vue single-page application template'
      logo: '/react.svg'
    - name: 'React SPA Template'
      link: 'https://github.com/llx-00/react-spa-tem'
      desc: 'React single-page application template'
      logo: '/vue.svg'

  Components:
    - name: 'react-calendar-graph'
      link: 'https://www.npmjs.com/package/react-calendar-graph'
      desc: 'A calendar graph react-component'
      logo: '/react.svg'
    - name: 'vue-calendar-graph'
      link: 'https://www.npmjs.com/package/vue-calendar-graph'
      desc: 'A calendar graph vue-component'
      logo: '/vue.svg'
---

<ListProjects :projects="frontmatter.projects" />
