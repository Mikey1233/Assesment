"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

interface GitHubEvent {
  type: string
  created_at: string
  repo?: {
    name: string
  }
}

interface ActivityCanvasProps {
  username: any
}


export function GitHubActivityCanvas({ username }: ActivityCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`)
        if (response.ok) {
          const data = await response.json()
          setEvents(data)
        }
      } catch (error) {
        console.error("Failed to fetch GitHub activity:", error)
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchActivity()
    }
  }, [username])

  useEffect(() => {
    if (!events.length || !canvasRef.current || loading) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--background")
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Process events into daily activity
    const now = new Date()
    const daysAgo = 365
    const dailyActivity: { [key: string]: number } = {}

    // Initialize all days with 0
    for (let i = 0; i < daysAgo; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]
      dailyActivity[dateStr] = 0
    }

    // Count events per day
    events.forEach((event) => {
      const date = new Date(event.created_at).toISOString().split("T")[0]
      if (dailyActivity.hasOwnProperty(date)) {
        dailyActivity[date]++
      }
    })

    // Draw activity grid (similar to GitHub's contribution graph)
    const cellSize = 12
    const cellGap = 2
    const cols = 53 // weeks in a year
    const rows = 7 // days in a week

    const maxActivity = Math.max(...Object.values(dailyActivity))

    // Color scheme for activity levels
    const getActivityColor = (count: number) => {
      if (count === 0) return "#161b22"
      const intensity = Math.min(count / Math.max(maxActivity, 1), 1)
      const green = Math.floor(intensity * 255)
      return `rgb(0, ${green}, 0)`
    }

    // Draw grid
    let dayIndex = 0
    for (let col = cols - 1; col >= 0; col--) {
      for (let row = 0; row < rows; row++) {
        if (dayIndex >= daysAgo) break

        const date = new Date(now)
        date.setDate(date.getDate() - dayIndex)
        const dateStr = date.toISOString().split("T")[0]
        const activity = dailyActivity[dateStr] || 0

        const x = col * (cellSize + cellGap)
        const y = row * (cellSize + cellGap)

        ctx.fillStyle = getActivityColor(activity)
        ctx.fillRect(x, y, cellSize, cellSize)

        dayIndex++
      }
    }

    // Draw legend
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground")
    ctx.font = "12px system-ui"
    ctx.fillText("Less", 10, rect.height - 10)
    ctx.fillText("More", rect.width - 40, rect.height - 10)

    // Draw legend squares
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = getActivityColor(i * (maxActivity / 4))
      ctx.fillRect(50 + i * 15, rect.height - 20, 10, 10)
    }
  }, [events, loading])

  if (loading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            GitHub Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          GitHub Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full h-32 border rounded" style={{ imageRendering: "pixelated" }} />
        <p className="text-sm text-muted-foreground mt-2">{events.length} public events in the last year</p>
      </CardContent>
    </Card>
  )
}
