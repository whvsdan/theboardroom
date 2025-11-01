"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit2, Trash2, Clock, ArrowLeft } from "lucide-react"
import ProgramSessionForm from "./program-form"
import Link from "next/link"

interface ProgramSession {
  id: string
  title: string
  session_type: string
  start_time: string
  end_time: string
  location: string
  description: string
}

export default function ProgramManagement() {
  const [sessions, setSessions] = useState<ProgramSession[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSession, setEditingSession] = useState<ProgramSession | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchSessions()
  }, [])

  async function fetchSessions() {
    try {
      const { data, error } = await supabase
        .from("program_sessions")
        .select("*")
        .order("start_time", { ascending: true })

      if (error) throw error
      setSessions(data || [])
    } catch (error) {
      console.error("Error fetching sessions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this session?")) return

    try {
      const { error } = await supabase.from("program_sessions").delete().eq("id", id)
      if (error) throw error
      setSessions(sessions.filter((s) => s.id !== id))
    } catch (error) {
      console.error("Error deleting session:", error)
      alert("Error deleting session")
    }
  }

  const groupedSessions = sessions.reduce(
    (acc, session) => {
      const date = new Date(session.start_time).toLocaleDateString()
      if (!acc[date]) acc[date] = []
      acc[date].push(session)
      return acc
    },
    {} as Record<string, ProgramSession[]>,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Program Schedule</h1>
            <p className="text-muted-foreground">Manage event sessions and schedule</p>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus size={16} />
          Add Session
        </Button>
      </div>

      {showForm && (
        <div className="mb-8">
          <ProgramSessionForm
            session={editingSession}
            onSuccess={() => {
              setShowForm(false)
              setEditingSession(null)
              fetchSessions()
            }}
          />
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : sessions.length === 0 ? (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-muted-foreground mb-4">No program sessions yet</p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus size={16} />
              Add First Session
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSessions).map(([date, daySessions]) => (
            <div key={date}>
              <h2 className="font-semibold text-lg mb-3">{date}</h2>
              <div className="grid gap-3">
                {daySessions.map((session) => {
                  const startTime = new Date(session.start_time).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  const endTime = new Date(session.end_time).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })

                  return (
                    <Card key={session.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg">{session.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Clock size={14} />
                              {startTime} - {endTime}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">📍 {session.location}</p>
                            {session.description && <p className="text-sm mt-2">{session.description}</p>}
                            <div className="mt-2">
                              <span className="inline-block bg-accent/10 px-2 py-1 rounded text-xs font-semibold text-accent capitalize">
                                {session.session_type}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingSession(session)
                                setShowForm(true)
                              }}
                              className="gap-2"
                            >
                              <Edit2 size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(session.id)}
                              className="gap-2 text-destructive"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
