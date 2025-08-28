"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, LinkIcon, Users, BookOpen, Calendar } from "lucide-react"
import type { GitHubUser } from "@/types/github"

interface UserProfileProps {
  user: GitHubUser
  loading: boolean
}

export function UserProfile({ user, loading }: UserProfileProps) {
  if (loading) {
    return (
      <Card className="mb-8    animate-pulse">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-muted rounded-full" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-muted rounded w-48" />
              <div className="h-4 bg-muted rounded w-32" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="flex gap-4">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-4 bg-muted rounded w-20" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
console.log(user)
  return (
    <div>
        <Card className="mb-8 hover:shadow-lg w-full h-fit text-wrap   transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start flex-col md:flex-row gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.name || user.login} />
            <AvatarFallback className="text-2xl">{(user.name || user.login).charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-foreground">{user.name || user.login}</h2>
              {user.name && (
                <Badge variant="secondary" className="text-sm">
                  @{user.login}
                </Badge>
              )}
            </div>

            {user.bio && <p className="text-muted-foreground mb-4 leading-relaxed text-wrap">{user.bio}</p>}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </div>
              )}
              {user.blog && (
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <a
                    href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {user.blog}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined{" "}
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="flex md:gap-6 text-wrap flex-col gap-3 md:flex-row">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-foreground">{user.public_repos}</span>
                <span className="text-muted-foreground">repositories</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-foreground">{user.followers}</span>
                <span className="text-muted-foreground">followers</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-foreground">{user.following}</span>
                <span className="text-muted-foreground">following</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
       {/* <GitHubActivityCanvas username={user.login} /> */}
    </div>
  
  )
}
