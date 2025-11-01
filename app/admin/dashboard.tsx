"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Mic, Award, TrendingUp } from "lucide-react"
import { useMemo } from "react"

interface DashboardMetrics {
  totalRegistrations: number
  totalMentorshipApps: number
  totalSpeakers: number
  totalAwards: number
  pendingApplications: number
}

interface MetricCardProps {
  title: string
  value: number
  description: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

function MetricCard({ title, value, description, icon, trend }: MetricCardProps) {
  return (
    <Card className="bg-card hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-accent/10 rounded-lg">{icon}</div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
              <TrendingUp size={16} />
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
        <h3 className="text-3xl font-bold mb-1">{value.toLocaleString()}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-xs text-muted-foreground/70 mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}

export function DashboardMetrics({ metrics }: { metrics: DashboardMetrics }) {
  const cards = useMemo(
    () => [
      {
        title: "Total Registrations",
        value: metrics.totalRegistrations,
        description: "Confirmed event attendees",
        icon: <Users className="w-5 h-5 text-accent" />,
        trend: { value: 12, isPositive: true },
      },
      {
        title: "Mentorship Applications",
        value: metrics.totalMentorshipApps,
        description: `${metrics.pendingApplications} pending review`,
        icon: <Users className="w-5 h-5 text-accent" />,
      },
      {
        title: "Speakers",
        value: metrics.totalSpeakers,
        description: "Confirmed speakers",
        icon: <Mic className="w-5 h-5 text-accent" />,
      },
      {
        title: "Award Nominations",
        value: metrics.totalAwards,
        description: "Active nominations",
        icon: <Award className="w-5 h-5 text-accent" />,
      },
    ],
    [metrics],
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <MetricCard key={index} {...card} />
      ))}
    </div>
  )
}
