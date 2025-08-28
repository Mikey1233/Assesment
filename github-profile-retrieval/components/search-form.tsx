"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"

interface SearchFormProps {
  onSearch: (username: string) => void
  loading: boolean
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(username)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="pl-10 h-12 text-base"
          disabled={loading}
        />
      </div>
      <Button type="submit" disabled={loading || !username.trim()} className="h-12 px-6">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Search
          </>
        )}
      </Button>
    </form>
  )
}
