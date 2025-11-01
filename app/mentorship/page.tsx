"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { submitMentorshipApplication } from "@/app/actions/mentorship"

export default function Mentorship() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company: "",
    experience_level: "intermediate",
    mentorship_focus: "",
    bio: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await submitMentorshipApplication(formData)

    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } else {
      setError(result.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Mentorship Program</h1>
            <p className="text-xl opacity-90">Connect with experienced leaders and grow your business</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-green-900 mb-2">Application Submitted!</h2>
                <p className="text-green-700">
                  Thank you for your interest. We'll review your application and get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8 p-6 bg-accent/10 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">About Our Mentorship Program</h2>
                  <p className="text-muted-foreground mb-4">
                    Our mentorship program connects aspiring entrepreneurs with experienced business leaders. Whether
                    you're looking to start a business, scale your operations, or navigate challenges, our mentors are
                    here to guide you.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>One-on-one guidance from industry experts</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Strategic business advice and insights</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Network expansion opportunities</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Ongoing support and accountability</span>
                    </li>
                  </ul>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="full_name">Full Name *</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company">Company/Business Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Business"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience_level">Experience Level *</Label>
                      <select
                        id="experience_level"
                        name="experience_level"
                        value={formData.experience_level}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mentorship_focus">What areas would you like mentorship in? *</Label>
                    <textarea
                      id="mentorship_focus"
                      name="mentorship_focus"
                      value={formData.mentorship_focus}
                      onChange={handleChange}
                      required
                      placeholder="E.g., Business strategy, marketing, finance, operations..."
                      rows={3}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Tell us about yourself and your business *</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      required
                      placeholder="Share your background, business idea, and goals..."
                      rows={4}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    />
                  </div>

                  {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">{error}</div>}

                  <Button type="submit" size="lg" disabled={loading} className="w-full">
                    {loading ? "Submitting..." : "Apply for Mentorship"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
