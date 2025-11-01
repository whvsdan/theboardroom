"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"

interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  image_url: string
}

export default function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSpeakers = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("speakers").select("*").order("name")

      if (!error && data) {
        setSpeakers(data)
      }
      setLoading(false)
    }

    fetchSpeakers()
  }, [])

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Speakers</h1>
            <p className="text-xl opacity-90">Learn from industry leaders and visionary entrepreneurs</p>
          </div>
        </section>

        {/* Speakers Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="w-full h-64 rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : speakers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {speakers.map((speaker) => (
                  <div
                    key={speaker.id}
                    className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="w-full h-64 bg-muted flex items-center justify-center">
                      {speaker.image_url ? (
                        <img
                          src={speaker.image_url || "/placeholder.svg"}
                          alt={speaker.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-muted-foreground">No image</div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-1">{speaker.name}</h3>
                      <p className="text-accent font-semibold text-sm mb-2">{speaker.title}</p>
                      <p className="text-muted-foreground text-sm mb-3">{speaker.company}</p>
                      <p className="text-sm text-foreground line-clamp-3">{speaker.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Speakers will be announced soon. Check back later!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
