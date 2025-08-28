"use client"

import { useState } from "react"
// import { SearchForm } from "@/components/search-form"
import {SearchForm} from "@/components/search-form"
import { UserProfile } from "@/components/user-profile"
import { RepositoryList } from "@/components/repository-list"
import { ThemeToggle } from "@/components/theme-toggle"
import type { GitHubUser, GitHubRepo } from "@/types/github"

export default function Home() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (username: string) => {
    if (!username.trim()) return

    setLoading(true)
    setError(null)
    setUser(null)
    setRepos([])

    try {
      // Fetch user profile
      const userResponse = await fetch(`https://api.github.com/users/${username}`)
      if (!userResponse.ok) {
        throw new Error("User not found")
      }
      const userData = await userResponse.json()

      // Fetch user repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`)
      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repositories")
      }
      const reposData = await reposResponse.json()

      setUser(userData)
      setRepos(reposData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Mini GitHub Explorer</h1>
            <p className="text-muted-foreground">Discover GitHub users and their repositories</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Search Form */}
        <SearchForm onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive font-medium">Error: {error}</p>
          </div>
        )}

        {/* User Profile */}
        {user && <UserProfile user={user} loading={loading} />}

        {/* Repository List */}
        {repos.length > 0 && <RepositoryList repos={repos} loading={loading} />}
      </div>
    </div>
  )
}
