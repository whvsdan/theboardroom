"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Mail, CheckCircle2, XCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { updateAwardStatus } from "@/app/actions/admin"

interface AwardNomination {
  id: string
  nominee_name: string
  nominee_email: string
  nominator_name: string
  nominator_email: string
  category: string
  reason: string
  status: string
  created_at: string
}

export default function AwardNominationsView() {
  const [nominations, setNominations] = useState<AwardNomination[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchNominations()
  }, [])

  async function fetchNominations() {
    try {
      const { data, error } = await supabase
        .from("award_nominations")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setNominations(data || [])
    } catch (error) {
      console.error("Error fetching nominations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    setUpdatingId(id)
    try {
      await updateAwardStatus(id, newStatus)
      setNominations(nominations.map((nom) => (nom.id === id ? { ...nom, status: newStatus } : nom)))
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update status")
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredNominations = nominations.filter((nom) => {
    if (filter === "all") return true
    return nom.status === filter
  })

  const stats = {
    total: nominations.length,
    pending: nominations.filter((n) => n.status === "pending").length,
    approved: nominations.filter((n) => n.status === "approved").length,
    rejected: nominations.filter((n) => n.status === "rejected").length,
  }

  const categories = Array.from(new Set(nominations.map((n) => n.category)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Award Nominations</h1>
            <p className="text-muted-foreground">Review and approve award nominations</p>
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
              <Trophy className="w-10 h-10 text-accent/50" />
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
              <Trophy className="w-10 h-10 text-amber-500/50" />
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

      {/* Nominations List */}
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredNominations.length === 0 ? (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-muted-foreground">No nominations found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredNominations.map((nom) => (
            <Card key={nom.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-accent" />
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent">
                        {nom.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">{nom.nominee_name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail size={14} />
                      {nom.nominee_email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        nom.status === "pending"
                          ? "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200"
                          : nom.status === "approved"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      }`}
                    >
                      {nom.status.charAt(0).toUpperCase() + nom.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Nomination Reason</p>
                  <p className="text-sm">{nom.reason}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm py-4 border-y border-border">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Nominated By</p>
                    <p className="font-medium">{nom.nominator_name}</p>
                    <p className="text-xs text-muted-foreground">{nom.nominator_email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Submitted</p>
                    <p className="font-medium">{new Date(nom.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handleStatusChange(nom.id, "approved")}
                    disabled={updatingId === nom.id || nom.status === "approved"}
                    className="gap-2 flex-1 bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <CheckCircle2 size={16} />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(nom.id, "rejected")}
                    disabled={updatingId === nom.id || nom.status === "rejected"}
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
