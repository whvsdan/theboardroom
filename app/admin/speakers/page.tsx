"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Trash2 } from "lucide-react"

interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  image_url: string
}

export default function AdminSpeakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    bio: "",
    image_url: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchSpeakers()
  }, [])

  const fetchSpeakers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("speakers").select("*").order("name")

    if (!error && data) {
      setSpeakers(data)
    }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("speakers").insert([formData])

      if (error) throw error

      setFormData({
        name: "",
        title: "",
        company: "",
        bio: "",
        image_url: "",
      })
      await fetchSpeakers()
    } catch (error) {
      console.error("Error adding speaker:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this speaker?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("speakers").delete().eq("id", id)

      if (error) throw error
      await fetchSpeakers()
    } catch (error) {
      console.error("Error deleting speaker:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Manage Speakers</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Add Speaker</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Speaker name"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Speaker bio"
                    rows={4}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Speaker"}
                </Button>
              </form>
            </div>
          </div>

          {/* Speakers List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Speakers ({speakers.length})</h2>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : speakers.length > 0 ? (
              <div className="space-y-4">
                {speakers.map((speaker) => (
                  <div
                    key={speaker.id}
                    className="border border-border rounded-lg p-4 flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold">{speaker.name}</h3>
                      <p className="text-sm text-accent">{speaker.title}</p>
                      {speaker.company && <p className="text-sm text-muted-foreground">{speaker.company}</p>}
                      {speaker.bio && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{speaker.bio}</p>}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(speaker.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No speakers yet. Add one to get started.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
