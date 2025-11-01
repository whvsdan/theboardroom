"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { uploadBlogImage } from "@/app/actions/admin"
import Image from "next/image"
import { Upload, X, LinkIcon } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  published: boolean
  featured_image_url: string
  content: string
  created_at: string
}

interface BlogPostFormProps {
  post?: BlogPost | null
  onSuccess: () => void
}

export default function BlogPostForm({ post, onSuccess }: BlogPostFormProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [content, setContent] = useState(post?.content || "")
  const [published, setPublished] = useState(post?.published || false)
  const [featuredImage, setFeaturedImage] = useState<string>(post?.featured_image_url || "")
  const [imageUrl, setImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload")
  const supabase = createClient()

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadBlogImage(formData)
      setFeaturedImage(result.url)
      setImageUrl("")
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image")
    } finally {
      setIsUploadingImage(false)
    }
  }

  function handleAddImageUrl() {
    if (imageUrl.trim()) {
      setFeaturedImage(imageUrl)
      setImageUrl("")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const slug = title.toLowerCase().replace(/\s+/g, "-")

      if (post?.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title,
            excerpt,
            content,
            published,
            featured_image_url: featuredImage,
            updated_at: new Date().toISOString(),
          })
          .eq("id", post.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("blog_posts").insert([
          {
            title,
            slug,
            excerpt,
            content,
            published,
            featured_image_url: featuredImage,
            created_at: new Date().toISOString(),
          },
        ])
        if (error) throw error
      }
      onSuccess()
    } catch (error) {
      console.error("Error saving post:", error)
      alert("Error saving post")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post?.id ? "Edit Post" : "Create New Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Featured Image</label>
            <div className="flex gap-4">
              {featuredImage && (
                <div className="relative w-48 h-32 rounded-lg border border-border overflow-hidden">
                  <Image src={featuredImage || "/placeholder.svg"} alt="Featured" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setFeaturedImage("")}
                    className="absolute top-1 right-1 bg-destructive text-white p-1 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <div className="flex-1 space-y-3">
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setImageInputMode("upload")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      imageInputMode === "upload"
                        ? "bg-accent text-accent-foreground"
                        : "bg-border text-muted-foreground hover:bg-border"
                    }`}
                  >
                    <Upload size={14} className="inline mr-1" />
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMode("url")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      imageInputMode === "url"
                        ? "bg-accent text-accent-foreground"
                        : "bg-border text-muted-foreground hover:bg-border"
                    }`}
                  >
                    <LinkIcon size={14} className="inline mr-1" />
                    URL
                  </button>
                </div>

                {imageInputMode === "upload" ? (
                  <>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-accent transition-colors">
                      <Upload size={24} className="text-muted-foreground mb-2" />
                      <span className="text-sm font-medium text-muted-foreground">Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>
                    {isUploadingImage && <p className="text-sm text-muted-foreground">Uploading...</p>}
                  </>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    />
                    <Button
                      type="button"
                      onClick={handleAddImageUrl}
                      disabled={!imageUrl.trim()}
                      size="sm"
                      variant="outline"
                    >
                      Add Image
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Brief excerpt"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
              placeholder="Post content"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="published" className="text-sm font-medium">
              Publish immediately
            </label>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting || isUploadingImage}>
              {isSubmitting ? "Saving..." : post?.id ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
