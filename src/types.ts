export interface Post {
  path: string
  title: string
  date: string
  type?: "post" | "cook"
}

export interface Game {
  desc: string
  logo?: string
  link: string
  name: string
}

export interface Project {
  desc: string
  logo?: string
  link: string
  name: string
}

export interface Frontmatter {
  title: string
  display?: string
  subtitle?: string
  date?: string
}

export interface NavItem {
  label: string
  path: string
  icon: string
}
