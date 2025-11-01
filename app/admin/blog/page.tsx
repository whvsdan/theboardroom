"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react"
import BlogPostForm from "./blog-form"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  published: boolean
  featured_image_url: string
  created_at: string
}

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)
      if (error) throw error
      setPosts(posts.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  async function handleTogglePublish(id: string, published: boolean) {
    try {
      const { error } = await supabase.from("blog_posts").update({ published: !published }).eq("id", id)

      if (error) throw error
      setPosts(posts.map((p) => (p.id === id ? { ...p, published: !published } : p)))
    } catch (error) {
      console.error("Error updating post:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-muted-foreground">Create and manage blog posts</p>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus size={16} />
          New Post
        </Button>
      </div>

      {showForm && (
        <div className="mb-8">
          <BlogPostForm
            post={editingPost}
            onSuccess={() => {
              setShowForm(false)
              setEditingPost(null)
              fetchPosts()
            }}
          />
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-muted-foreground mb-4">No blog posts yet</p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus size={16} />
              Create First Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-0 flex gap-4">
                {post.featured_image_url && (
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={post.featured_image_url || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{post.excerpt}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTogglePublish(post.id, post.published)}
                      className="gap-2"
                    >
                      {post.published ? <Eye size={16} /> : <EyeOff size={16} />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingPost(post)
                        setShowForm(true)
                      }}
                      className="gap-2"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      className="gap-2 text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
