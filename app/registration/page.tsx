"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Users, Briefcase, BookOpen, Sparkles } from "lucide-react"
import { SuccessModal } from "@/components/success-modal"
import { submitRegistration } from "@/app/actions/registration-submit"

export default function Registration() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    occupation: "",
    participant_type: "",
    workshops: [] as string[],
    company: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const workshops = [
    "Digital Marketing & Social Media",
    "Financial Management for Startups",
    "Leadership & Team Building",
    "Innovation & Product Development",
    "Scaling Your Business",
  ]

  const participantTypes = [
    { value: "entrepreneur", label: "Entrepreneur", icon: Briefcase },
    { value: "investor", label: "Investor", icon: Users },
    { value: "student", label: "Student", icon: BookOpen },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleWorkshopToggle = (workshop: string) => {
    setFormData((prev) => ({
      ...prev,
      workshops: prev.workshops.includes(workshop)
        ? prev.workshops.filter((w) => w !== workshop)
        : [...prev.workshops, workshop],
    }))
  }

  const handleParticipantType = (type: string) => {
    setFormData((prev) => ({ ...prev, participant_type: type }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!formData.full_name.trim()) {
      setError("Please enter your full name")
      setLoading(false)
      return
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address")
      setLoading(false)
      return
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number")
      setLoading(false)
      return
    }
    if (!formData.participant_type) {
      setError("Please select what describes you best")
      setLoading(false)
      return
    }

    try {
      const result = await submitRegistration({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        occupation: formData.occupation,
        age: formData.age,
        gender: formData.gender,
        participant_type: formData.participant_type,
        workshops: formData.workshops,
      })

      if (!result.success) {
        throw new Error(result.error)
      }

      setSuccess(true)
    } catch (err) {
      console.error("[v0] Form submission error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-black via-black to-black/95 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-[#C8102E]"></div>
            <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full border-2 border-[#C8102E]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-6 bg-[#C8102E]/10 px-4 py-2 rounded-full border border-[#C8102E]/30">
                <Sparkles size={16} className="text-[#C8102E]" />
                <span className="text-sm font-semibold text-[#C8102E]">FREE REGISTRATION</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
                Join the Boardroom 2025
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-4">
                Secure your spot at the Idoma Entrepreneurship Summit
              </p>
              <p className="text-lg opacity-80">
                Connect with industry leaders, investors, and innovators shaping the future of African economies.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            {success ? (
              <SuccessModal
                email={formData.email}
                onClose={() => {
                  router.push("/")
                }}
              />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="full_name" className="text-black font-semibold mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="border-2 border-gray-200 rounded-lg focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-black font-semibold mb-2 block">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="border-2 border-gray-200 rounded-lg focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <Label htmlFor="phone" className="text-black font-semibold mb-2 block">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+234 (0) XXX XXX XXXX"
                        className="border-2 border-gray-200 rounded-lg focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-black font-semibold mb-2 block">
                        Company / Organization
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className="border-2 border-gray-200 rounded-lg focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Demographics Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    Demographics
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="age" className="text-black font-semibold mb-2 block">
                        Age (Optional)
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="25"
                        className="border-2 border-gray-200 rounded-lg focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender" className="text-black font-semibold mb-2 block">
                        Gender (Optional)
                      </Label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-white text-black focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="occupation" className="text-black font-semibold mb-2 block">
                      Occupation / Business Type
                    </Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="e.g., Software Developer, Consultant, etc."
                      className="border-2 border-gray-200 rounded-lg focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20"
                    />
                  </div>
                </div>

                {/* Participant Type Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    What describes you best? *
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {participantTypes.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleParticipantType(value)}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-3 ${
                          formData.participant_type === value
                            ? "border-[#C8102E] bg-[#C8102E]/10 shadow-md"
                            : "border-gray-200 hover:border-[#C8102E]/50 bg-white"
                        }`}
                      >
                        <Icon className="w-8 h-8" color={formData.participant_type === value ? "#C8102E" : "#000000"} />
                        <span className="font-semibold text-black">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Workshop Selection Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    Select Workshops of Interest
                  </h2>

                  <div className="space-y-3">
                    {workshops.map((workshop) => (
                      <label
                        key={workshop}
                        className="flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-[#C8102E]/50 cursor-pointer transition-all duration-200 bg-white hover:bg-[#C8102E]/5"
                      >
                        <input
                          type="checkbox"
                          checked={formData.workshops.includes(workshop)}
                          onChange={() => handleWorkshopToggle(workshop)}
                          className="w-5 h-5 rounded border-2 border-[#C8102E] accent-[#C8102E] cursor-pointer"
                        />
                        <span className="ml-4 font-medium text-black">{workshop}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-900 mb-1">Registration Error</h3>
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 text-lg font-bold bg-[#C8102E] hover:bg-[#C8102E]/90 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {loading ? "Processing Registration..." : "Complete Registration & Get Ticket"}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  By registering, you agree to receive updates about Boardroom 2025
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
