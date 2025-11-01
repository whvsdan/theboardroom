"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText, CheckCircle2, XCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { updateMentorshipStatus } from "@/app/actions/admin"

interface MentorshipApplication {
  id: string
  full_name: string
  email: string
  company: string
  experience_level: string
  mentorship_focus: string
  bio: string
  status: string
  created_at: string
}

export default function MentorshipViewOnly() {
  const [applications, setApplications] = useState<MentorshipApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchApplications()
  }, [])

  async function fetchApplications() {
    try {
      const { data, error } = await supabase
        .from("mentorship_applications")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setApplications(data || [])
    } catch (error) {
      console.error("Error fetching applications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    setUpdatingId(id)
    try {
      await updateMentorshipStatus(id, newStatus)
      setApplications(applications.map((app) => (app.id === id ? { ...app, status: newStatus } : app)))
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update status")
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true
    return app.status === filter
  })

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Mentorship Applications</h1>
            <p className="text-muted-foreground">Review and approve mentorship applications</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-10 h-10 text-accent/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold">{stats.pending}</p>
              </div>
              <FileText className="w-10 h-10 text-amber-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-3xl font-bold">{stats.approved}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-3xl font-bold">{stats.rejected}</p>
              </div>
              <XCircle className="w-10 h-10 text-destructive/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-border">
        {(["all", "pending", "approved", "rejected"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              filter === tab
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredApplications.length === 0 ? (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-muted-foreground">No applications found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map((app) => (
            <Card key={app.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{app.full_name}</h3>
                    <p className="text-sm text-muted-foreground">{app.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        app.status === "pending"
                          ? "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200"
                          : app.status === "approved"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Company</p>
                    <p className="font-medium">{app.company || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Experience</p>
                    <p className="font-medium capitalize">{app.experience_level}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Focus Areas</p>
                    <p className="font-medium line-clamp-1">{app.mentorship_focus}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Applied On</p>
                    <p className="font-medium">{new Date(app.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {app.bio && (
                  <div className="p-3 bg-muted rounded-lg mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Bio</p>
                    <p className="text-sm">{app.bio}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    onClick={() => handleStatusChange(app.id, "approved")}
                    disabled={updatingId === app.id || app.status === "approved"}
                    className="gap-2 flex-1 bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <CheckCircle2 size={16} />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(app.id, "rejected")}
                    disabled={updatingId === app.id || app.status === "rejected"}
                    variant="destructive"
                    className="gap-2 flex-1"
                    size="sm"
                  >
                    <XCircle size={16} />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
