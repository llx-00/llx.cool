export interface Post {
  path: string
  title?: string
  display?: string
  subtitle?: string
  date?: string
  type?: PostType
}

export type PostType = "post" | "cook" | "photo"

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

export interface NavItem {
  label: string
  path: string
  icon: string
}
