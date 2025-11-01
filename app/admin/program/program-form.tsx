"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProgramSession {
  id: string
  title: string
  session_type: string
  start_time: string
  end_time: string
  location: string
  description: string
}

interface ProgramSessionFormProps {
  session?: ProgramSession | null
  onSuccess: () => void
}

export default function ProgramSessionForm({ session, onSuccess }: ProgramSessionFormProps) {
  const [title, setTitle] = useState(session?.title || "")
  const [sessionType, setSessionType] = useState(session?.session_type || "keynote")
  const [startTime, setStartTime] = useState(
    session?.start_time ? new Date(session.start_time).toISOString().slice(0, 16) : "",
  )
  const [endTime, setEndTime] = useState(session?.end_time ? new Date(session.end_time).toISOString().slice(0, 16) : "")
  const [location, setLocation] = useState(session?.location || "")
  const [description, setDescription] = useState(session?.description || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (session?.id) {
        const { error: updateError } = await supabase
          .from("program_sessions")
          .update({
            title,
            session_type: sessionType,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            location,
            description,
            updated_at: new Date().toISOString(),
          })
          .eq("id", session.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("program_sessions").insert([
          {
            title,
            session_type: sessionType,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            location,
            description,
            created_at: new Date().toISOString(),
          },
        ])
        if (insertError) throw insertError
      }
      onSuccess()
    } catch (err) {
      console.error("Error saving session:", err)
      setError(err instanceof Error ? err.message : "Error saving session")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{session?.id ? "Edit Session" : "Add New Session"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Session title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Session Type</label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="keynote">Keynote</option>
                <option value="workshop">Workshop</option>
                <option value="panel">Panel Discussion</option>
                <option value="networking">Networking</option>
                <option value="break">Break</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Venue/Room"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Session description"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : session?.id ? "Update Session" : "Add Session"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
