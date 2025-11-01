"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"
import { Star } from "lucide-react"

interface Testimonial {
  id: string
  author_name: string
  author_title: string
  author_company: string
  author_image_url: string
  content: string
  rating: number
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

      if (!error && data) {
        setTestimonials(data)
      }
      setLoading(false)
    }

    fetchTestimonials()
  }, [])

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Testimonials</h1>
            <p className="text-xl opacity-90">What attendees say about Boardroom</p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-lg" />
                ))}
              </div>
            ) : testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    {/* Rating */}
                    {testimonial.rating && (
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < testimonial.rating ? "fill-accent text-accent" : "text-muted"}
                          />
                        ))}
                      </div>
                    )}

                    {/* Quote */}
                    <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {testimonial.author_image_url && (
                        <img
                          src={testimonial.author_image_url || "/placeholder.svg"}
                          alt={testimonial.author_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-bold">{testimonial.author_name}</p>
                        {testimonial.author_title && (
                          <p className="text-sm text-muted-foreground">{testimonial.author_title}</p>
                        )}
                        {testimonial.author_company && (
                          <p className="text-sm text-muted-foreground">{testimonial.author_company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Testimonials coming soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
