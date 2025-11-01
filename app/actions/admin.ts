"use server"

import { createClient } from "@/lib/supabase/server"

export async function updateMentorshipStatus(id: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("mentorship_applications").update({ status }).eq("id", id)

  if (error) throw new Error(error.message)
  return { success: true }
}

export async function updateAwardStatus(id: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("award_nominations").update({ status }).eq("id", id)

  if (error) throw new Error(error.message)
  return { success: true }
}

export async function uploadBlogImage(formData: FormData) {
  const supabase = await createClient()
  const file = formData.get("file") as File

  if (!file) throw new Error("No file provided")

  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage.from("blog-images").upload(fileName, file)

  if (error) throw new Error(error.message)

  const {
    data: { publicUrl },
  } = supabase.storage.from("blog-images").getPublicUrl(fileName)

  return { url: publicUrl }
}
