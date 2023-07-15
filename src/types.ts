export interface Post {
  path: string;
  title: string;
  date: string;
}

export interface Game {
  desc: string;
  logo?: string;
  link: string;
  name: string;
}

export interface Project {
  desc: string;
  logo?: string;
  link: string;
  name: string;
}

export interface Frontmatter {
  title: string;
  display?: string;
  subtitle?: string;
  date?: string;
}
