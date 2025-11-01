import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return <div className="min-h-screen bg-background">{children}</div>
}

export default AdminLayout
