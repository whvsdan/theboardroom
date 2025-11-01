"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, MapPin } from "lucide-react"

interface Session {
  id: string
  title: string
  description: string
  start_time: string
  end_time: string
  location: string
  session_type: string
  speaker_id: string
}

export default function Program() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSessions = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("program_sessions").select("*").order("start_time")

      if (!error && data) {
        setSessions(data)
      }
      setLoading(false)
    }

    fetchSessions()
  }, [])

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Program Schedule</h1>
            <p className="text-xl opacity-90">A full day of inspiring sessions and networking opportunities</p>
          </div>
        </section>

        {/* Schedule */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
              </div>
            ) : sessions.length > 0 ? (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{session.title}</h3>
                        <p className="text-accent font-semibold text-sm">{session.session_type}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                        <Clock size={16} />
                        <span>
                          {formatTime(session.start_time)} - {formatTime(session.end_time)}
                        </span>
                      </div>
                    </div>
                    {session.description && <p className="text-muted-foreground text-sm mb-3">{session.description}</p>}
                    {session.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={16} />
                        <span>{session.location}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Program schedule will be announced soon. Check back later!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
