"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

interface SuccessModalProps {
  email: string
  onClose: () => void
}

export function SuccessModal({ email, onClose }: SuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#C8102E] rounded-full animate-pulse"
              style={{
                left: Math.random() * 100 + "%",
                top: -10 + "px",
                animation: `fall ${2 + Math.random() * 1}s linear forwards`,
                animationDelay: Math.random() * 0.5 + "s",
              }}
            />
          ))}
          <style>{`
            @keyframes fall {
              to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      <div className="bg-white rounded-2xl p-8 md:p-12 max-w-md w-full shadow-2xl text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#C8102E]/20 rounded-full blur-xl animate-pulse" />
            <CheckCircle2 className="w-20 h-20 text-[#C8102E] relative" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-black mb-3">Registration Successful!</h2>

        <p className="text-lg text-gray-700 mb-2">Welcome to Boardroom 2025</p>

        <p className="text-gray-600 mb-6">
          A confirmation email with your QR code ticket has been sent to{" "}
          <span className="font-semibold text-black">{email}</span>
        </p>

        <div className="bg-[#C8102E]/10 border border-[#C8102E]/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            Check your email for your unique QR code ticket. You'll need it to check in at the event.
          </p>
        </div>

        <p className="text-sm text-gray-500">Redirecting you to the home page in 3 seconds...</p>
      </div>
    </div>
  )
}
