"use server"

import { createClient } from "@/lib/supabase/server"

export async function getRegistrations() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("registrations").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching registrations:", error)
    return []
  }
  return data || []
}

export async function updateRegistration(id: string, updates: Record<string, any>) {
  const supabase = await createClient()
  const { error } = await supabase.from("registrations").update(updates).eq("id", id)

  if (error) {
    console.error("Error updating registration:", error)
    throw error
  }
  return true
}

export async function deleteRegistration(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("registrations").delete().eq("id", id)

  if (error) {
    console.error("Error deleting registration:", error)
    throw error
  }
  return true
}
