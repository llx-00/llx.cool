---
title: Projects - Longxiang Li
display: Projects
subtitle: A few baubles
description: A few baubles
projects:
  # Unplugins:
  #   - name: 'unplugin'
  #     link: 'https://github.com/unjs/unplugin'
  #     desc: 'Unified plugin system for Vite, Rollup, and Webpack'
  #     icon: 'i-carbon-plug'

  Starter Templates:
    - name: 'Vue SPA'
      link: 'https://github.com/llx-00/vue-spa-tem'
      desc: 'Vue single-page application template'
      icon: 'i-simple-icons-react'
    - name: 'React SPA'
      link: 'https://github.com/llx-00/react-spa-tem'
      desc: 'React single-page application template'
      icon: 'i-mdi-vuejs'

  Games:
    - name: '2048'
      link: 'https://llx.cool/2048'
      desc: '2048 web game'
      icon: 'i-arcticons-2048'
    - name: 'tic-tac-toe 井字棋'
      link: 'https://llx.cool/tic-tac-toe'
      desc: 'Tic-tac-toe web game'
      icon: 'i-carbon-hashtag'
    - name: 'minesweeper 扫雷'
      link: 'https://llx.cool/minesweeper'
      desc: 'Minesweeper web game'
      icon: 'i-mdi-mine'

  Components:
    - name: 'react-calendar-graph'
      link: 'https://www.npmjs.com/package/react-calendar-graph'
      desc: 'A calendar graph react-component'
      icon: 'i-simple-icons-react'
    - name: 'vue-calendar-graph'
      link: 'https://www.npmjs.com/package/vue-calendar-graph'
      desc: 'A calendar graph vue-component'
      icon: 'i-mdi-vuejs'



  # VS Code Extensions:
  #   - name: 'reTypewriter'
  #     link: 'https://github.com/antfu/retypewriter'
  #     desc: 'Smartly replay the steps of your changes at ease.'
  #     icon: 'i-carbon-keyboard'

  # Utilities / CLI:
  #   - name: 'ni'
  #     desc: 'Use the right package manager'
  #     link: 'https://github.com/antfu/ni'
  #     icon: 'i-codicon-package'

  # Configurations:
    # - name: 'eslint-config'
    #   link: 'https://github.com/llx-00/eslint-config'
    #   desc: 'My ESLint config presets'
    #   icon: 'i-simple-icons:eslint'
    # - name: 'vscode-settings'
    #   link: 'https://github.com/llx-00/vscode-settings'
    #   desc: 'My VS Code settings'
    #   icon: 'i-simple-icons:visualstudiocode'

---

<ListProjects :projects="frontmatter.projects" />
