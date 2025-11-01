"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"

interface GalleryImage {
  id: string
  title: string
  image_url: string
  description: string
  event_year: string
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setImages(data)
      }
      setLoading(false)
    }

    fetchImages()
  }, [])

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Gallery</h1>
            <p className="text-xl opacity-90">Moments from past Boardroom summits</p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="w-full h-64 rounded-lg" />
                ))}
              </div>
            ) : images.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="group cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative h-64 bg-muted overflow-hidden">
                        <img
                          src={image.image_url || "/placeholder.svg"}
                          alt={image.title || "Gallery image"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                          <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                            <p className="font-semibold">{image.title}</p>
                            {image.event_year && <p className="text-sm opacity-90">{image.event_year}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal */}
                {selectedImage && (
                  <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                  >
                    <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                      <img
                        src={selectedImage.image_url || "/placeholder.svg"}
                        alt={selectedImage.title || "Gallery image"}
                        className="w-full h-auto rounded-lg"
                      />
                      <div className="mt-4 text-white">
                        {selectedImage.title && <h3 className="text-xl font-bold">{selectedImage.title}</h3>}
                        {selectedImage.description && <p className="mt-2 text-gray-300">{selectedImage.description}</p>}
                        {selectedImage.event_year && (
                          <p className="mt-2 text-sm text-gray-400">{selectedImage.event_year}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Gallery images coming soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
