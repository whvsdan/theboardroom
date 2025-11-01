import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LogOut, BarChart3, Activity, MessageSquare, Users, CheckCircle } from "lucide-react"
import Image from "next/image"
import { DashboardMetrics } from "./dashboard"

async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const [registrations, mentorshipApps, speakers, awards, blogPosts, programSessions] = await Promise.all([
    supabase.from("registrations").select("id", { count: "exact" }),
    supabase.from("mentorship_applications").select("id, status", { count: "exact" }),
    supabase.from("speakers").select("id", { count: "exact" }),
    supabase.from("award_nominations").select("id, status", { count: "exact" }),
    supabase
      .from("blog_posts")
      .select("id, title, published", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(3),
    supabase.from("program_sessions").select("id", { count: "exact" }),
  ])

  const pendingMentorships = mentorshipApps.data?.filter((app: any) => app.status === "pending").length || 0
  const pendingAwards = awards.data?.filter((a: any) => a.status === "pending").length || 0

  const metrics = {
    totalRegistrations: registrations.count || 0,
    totalMentorshipApps: mentorshipApps.count || 0,
    totalSpeakers: speakers.count || 0,
    totalAwards: awards.count || 0,
    totalSessions: programSessions.count || 0,
    pendingMentorships,
    pendingAwards,
  }

  const recentBlogPosts = blogPosts.data || []

  const dashboardItems = [
    {
      title: "Blog Posts",
      description: "Create and manage blog posts",
      icon: MessageSquare,
      href: "/admin/blog",
    },
    {
      title: "Program Schedule",
      description: "Manage event sessions",
      icon: Activity,
      href: "/admin/program",
      count: metrics.totalSessions,
    },
    {
      title: "Mentorship",
      description: "Review applications",
      icon: Users,
      href: "/admin/mentorship",
      count: metrics.totalMentorshipApps,
      pending: metrics.pendingMentorships,
    },
    {
      title: "Award Nominations",
      description: "Review nominations",
      icon: CheckCircle,
      href: "/admin/awards",
      count: metrics.totalAwards,
      pending: metrics.pendingAwards,
    },
    {
      title: "Speakers",
      description: "Manage speakers",
      icon: Users,
      href: "/admin/speakers",
      count: metrics.totalSpeakers,
    },
    {
      title: "Registrations",
      description: "View registrations",
      icon: CheckCircle,
      href: "/admin/registrations",
      count: metrics.totalRegistrations,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image
                src="/logo.png"
                alt="Boardroom Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Boardroom Admin</h1>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server"
              const supabase = await createClient()
              await supabase.auth.signOut()
              redirect("/")
            }}
          >
            <Button variant="outline" type="submit" className="gap-2 bg-transparent">
              <LogOut size={16} />
              Logout
            </Button>
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="py-8 space-y-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div>
            <h2 className="text-4xl font-bold mb-2 text-balance">Welcome back, Admin</h2>
            <p className="text-muted-foreground">
              Monitor your event in real-time with live metrics and quick access to management tools
            </p>
          </div>

          {/* Metrics Dashboard */}
          <DashboardMetrics metrics={metrics} />

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Access */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 size={20} />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {dashboardItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group relative overflow-hidden rounded-lg border border-border p-4 hover:border-accent hover:bg-accent/5 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                            </div>
                            {item.count !== undefined && (
                              <div className="flex gap-1">
                                {item.pending !== undefined && item.pending > 0 && (
                                  <div className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded text-xs font-semibold">
                                    {item.pending} pending
                                  </div>
                                )}
                                <div className="bg-accent/10 px-2 py-1 rounded text-xs font-semibold text-accent">
                                  {item.count}
                                </div>
                              </div>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Blog Posts */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentBlogPosts.length > 0 ? (
                      recentBlogPosts.map((post: any) => (
                        <div key={post.id} className="pb-3 border-b border-border last:border-0">
                          <Link href={`/admin/blog`} className="text-sm font-medium hover:text-accent line-clamp-2">
                            {post.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className={`w-2 h-2 rounded-full ${post.published ? "bg-green-500" : "bg-gray-400"}`}
                            />
                            <span className="text-xs text-muted-foreground">
                              {post.published ? "Published" : "Draft"}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No blog posts yet</p>
                    )}
                  </div>
                  <Link
                    href="/admin/blog"
                    className="mt-4 w-full inline-block text-center text-sm font-medium text-accent hover:underline"
                  >
                    View all posts →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
