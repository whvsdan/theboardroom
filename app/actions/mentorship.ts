"use server"

import { createClient } from "@/lib/supabase/server"

export async function submitMentorshipApplication(formData: {
  full_name: string
  email: string
  company: string
  experience_level: string
  mentorship_focus: string
  bio: string
}) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("mentorship_applications").insert([
      {
        full_name: formData.full_name,
        email: formData.email,
        company: formData.company,
        experience_level: formData.experience_level,
        mentorship_focus: formData.mentorship_focus,
        bio: formData.bio,
        status: "pending",
      },
    ])

    if (error) {
      console.error("[v0] Mentorship submission error:", error)
      throw new Error(error.message || "Failed to submit application")
    }

    return { success: true, message: "Application submitted successfully!" }
  } catch (err) {
    console.error("[v0] Mentorship submission exception:", err)
    const errorMessage = err instanceof Error ? err.message : "An error occurred while submitting your application"
    return { success: false, message: errorMessage }
  }
}

export async function getMentorshipApplications() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("mentorship_applications")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching mentorship applications:", error)
    return []
  }
  return data || []
}

export async function updateMentorshipApplication(id: string, updates: Record<string, any>) {
  const supabase = await createClient()
  const { error } = await supabase.from("mentorship_applications").update(updates).eq("id", id)

  if (error) {
    console.error("Error updating mentorship application:", error)
    throw error
  }
  return true
}

export async function deleteMentorshipApplication(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("mentorship_applications").delete().eq("id", id)

  if (error) {
    console.error("Error deleting mentorship application:", error)
    throw error
  }
  return true
}
