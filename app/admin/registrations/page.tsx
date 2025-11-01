"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Edit2, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getRegistrations, updateRegistration, deleteRegistration } from "@/app/actions/registrations"

interface Registration {
  id: string
  full_name: string
  email: string
  phone: string
  age?: number
  gender?: string
  company: string
  job_title: string
  participant_type?: string
  workshops?: string
  status: string
  created_at: string
}

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Registration>>({})
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    setLoading(true)
    const data = await getRegistrations()
    setRegistrations(data)
    setLoading(false)
  }

  const handleEdit = (registration: Registration) => {
    setEditingId(registration.id)
    setEditData(registration)
  }

  const handleSaveEdit = async () => {
    if (!editingId) return
    try {
      await updateRegistration(editingId, editData)
      setEditingId(null)
      await fetchRegistrations()
    } catch (error) {
      console.error("Error updating registration:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteRegistration(id)
      setDeleteConfirm(null)
      await fetchRegistrations()
    } catch (error) {
      console.error("Error deleting registration:", error)
    }
  }

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Age",
      "Gender",
      "Company",
      "Job Title",
      "Participant Type",
      "Workshops",
      "Status",
      "Date",
    ]
    const rows = registrations.map((reg) => [
      reg.full_name,
      reg.email,
      reg.phone,
      reg.age || "-",
      reg.gender || "-",
      reg.company || "-",
      reg.job_title || "-",
      reg.participant_type || "-",
      reg.workshops || "-",
      reg.status,
      new Date(reg.created_at).toLocaleDateString(),
    ])

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "registrations.csv"
    a.click()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Registrations</h1>
          </div>
          <Button onClick={exportToCSV} className="gap-2">
            <Download size={18} />
            Export CSV
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-4 text-muted-foreground">
          Total Registrations: <span className="font-bold text-foreground">{registrations.length}</span>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : registrations.length > 0 ? (
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">Company</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3">{reg.full_name}</td>
                    <td className="px-4 py-3 text-sm">{reg.email}</td>
                    <td className="px-4 py-3 text-sm">{reg.company || "-"}</td>
                    <td className="px-4 py-3 text-sm capitalize">{reg.participant_type || "-"}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-accent/20 text-accent">
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{new Date(reg.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(reg)}>
                        <Edit2 size={16} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setDeleteConfirm(reg.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground">No registrations yet.</p>
        )}

        {/* Edit Modal */}
        {editingId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit Registration</h2>
                <button onClick={() => setEditingId(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editData.full_name || ""}
                    onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={editData.email || ""}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editData.phone || ""}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    value={editData.company || ""}
                    onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={editData.status || "pending"}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="attended">Attended</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button onClick={handleSaveEdit} className="flex-1">
                  Save Changes
                </Button>
                <Button onClick={() => setEditingId(null)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg p-6 max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Delete Registration?</h2>
              <p className="text-muted-foreground mb-6">This action cannot be undone.</p>
              <div className="flex gap-2">
                <Button onClick={() => handleDelete(deleteConfirm)} variant="destructive" className="flex-1">
                  Delete
                </Button>
                <Button onClick={() => setDeleteConfirm(null)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
