export interface GitHubUser {
  id: number
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  blog: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  html_url: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  created_at: string
  private: boolean
}
