"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function Awards() {
  const [formData, setFormData] = useState({
    nominee_name: "",
    nominee_email: "",
    nominator_name: "",
    nominator_email: "",
    category: "entrepreneur",
    reason: "",
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

    try {
      const supabase = createClient()
      const { error: submitError } = await supabase.from("award_nominations").insert([
        {
          nominee_name: formData.nominee_name,
          nominee_email: formData.nominee_email,
          nominator_name: formData.nominator_name,
          nominator_email: formData.nominator_email,
          category: formData.category,
          reason: formData.reason,
          status: "pending",
        },
      ])

      if (submitError) throw submitError

      setSuccess(true)
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Boardroom Awards</h1>
            <p className="text-xl opacity-90">Nominate outstanding entrepreneurs and business leaders</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-green-900 mb-2">Nomination Submitted!</h2>
                <p className="text-green-700">
                  Thank you for nominating an outstanding entrepreneur. We'll review the nomination and announce winners
                  at the summit.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8 p-6 bg-accent/10 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Award Categories</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">🏆</span>
                      <div>
                        <p className="font-semibold">Young Entrepreneur of the Year</p>
                        <p className="text-sm">For entrepreneurs under 35 making significant impact</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">🏆</span>
                      <div>
                        <p className="font-semibold">Business Innovation Award</p>
                        <p className="text-sm">For innovative business solutions and models</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">🏆</span>
                      <div>
                        <p className="font-semibold">Social Impact Award</p>
                        <p className="text-sm">For businesses creating positive social change</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">🏆</span>
                      <div>
                        <p className="font-semibold">Business Leader of the Year</p>
                        <p className="text-sm">For established leaders driving economic growth</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Nominee Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="nominee_name">Nominee Name *</Label>
                        <Input
                          id="nominee_name"
                          name="nominee_name"
                          value={formData.nominee_name}
                          onChange={handleChange}
                          required
                          placeholder="Full Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nominee_email">Nominee Email</Label>
                        <Input
                          id="nominee_email"
                          name="nominee_email"
                          type="email"
                          value={formData.nominee_email}
                          onChange={handleChange}
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Your Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="nominator_name">Your Name *</Label>
                        <Input
                          id="nominator_name"
                          name="nominator_name"
                          value={formData.nominator_name}
                          onChange={handleChange}
                          required
                          placeholder="Full Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nominator_email">Your Email *</Label>
                        <Input
                          id="nominator_email"
                          name="nominator_email"
                          type="email"
                          value={formData.nominator_email}
                          onChange={handleChange}
                          required
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Award Category *</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="young_entrepreneur">Young Entrepreneur of the Year</option>
                      <option value="innovation">Business Innovation Award</option>
                      <option value="social_impact">Social Impact Award</option>
                      <option value="business_leader">Business Leader of the Year</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="reason">Why are you nominating this person? *</Label>
                    <textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about their achievements and impact..."
                      rows={5}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    />
                  </div>

                  {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">{error}</div>}

                  <Button type="submit" size="lg" disabled={loading} className="w-full">
                    {loading ? "Submitting..." : "Submit Nomination"}
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
