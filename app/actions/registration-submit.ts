"use server"

import { createClient } from "@/lib/supabase/server"

export async function submitRegistration(formData: {
  full_name: string
  email: string
  phone: string
  company: string
  occupation: string
  age: string
  gender: string
  participant_type: string
  workshops: string[]
}) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("registrations")
      .insert([
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || null,
          job_title: formData.occupation,
          age: formData.age ? Number.parseInt(formData.age) : null,
          gender: formData.gender || null,
          participant_type: formData.participant_type,
          workshops: formData.workshops.join(", "),
          ticket_type: "free",
          status: "completed",
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("[v0] Supabase error:", error.message, error.code)
      throw new Error(error.message || "Failed to submit registration")
    }

    if (!data || data.length === 0) {
      throw new Error("Registration submitted but no data returned")
    }

    return {
      success: true,
      data: data[0],
      message: "Registration successful! Check your email for your ticket.",
    }
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred during registration",
    }
  }
}
