"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, GitFork, ExternalLink, Calendar } from "lucide-react"
import type { GitHubRepo } from "@/types/github"

interface RepositoryListProps {
  repos: GitHubRepo[]
  loading: boolean
}

export function RepositoryList({ repos, loading }: RepositoryListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground mb-4">Latest Repositories</h3>
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-5 bg-muted rounded w-48" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="flex gap-4">
                  <div className="h-4 bg-muted rounded w-16" />
                  <div className="h-4 bg-muted rounded w-16" />
                  <div className="h-4 bg-muted rounded w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground mb-4">Latest Repositories ({repos.length})</h3>

      <div className="grid gap-4">
        {repos.map((repo) => (
          <Card key={repo.id} className="hover:shadow-lg transition-all hover:border-accent/50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    {repo.name}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </CardTitle>
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <Badge variant="outline" className="text-xs">
                      {repo.language}
                    </Badge>
                  )}
                  {repo.private && (
                    <Badge variant="secondary" className="text-xs">
                      Private
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {repo.description && <p className="text-muted-foreground mb-4 leading-relaxed">{repo.description}</p>}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    {repo.forks_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </div>
                </div>

                <Button variant="outline" size="sm" asChild>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    View Repository
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
