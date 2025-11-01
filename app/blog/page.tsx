"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Calendar } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string
  created_at: string
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })

      if (!error && data) {
        setPosts(data)
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">News & Insights</h1>
            <p className="text-xl opacity-90">Latest updates and articles from the Boardroom community</p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            {loading ? (
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="w-full h-64 rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {post.featured_image_url && (
                        <div className="md:col-span-1 h-48 md:h-auto bg-muted overflow-hidden">
                          <img
                            src={post.featured_image_url || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`p-6 flex flex-col justify-between ${post.featured_image_url ? "md:col-span-2" : "md:col-span-3"}`}
                      >
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Calendar size={16} />
                            <time>{formatDate(post.created_at)}</time>
                          </div>
                          <h2 className="text-2xl font-bold mb-3 hover:text-accent transition-colors">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h2>
                          <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-accent font-semibold hover:underline inline-block"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Blog posts coming soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
