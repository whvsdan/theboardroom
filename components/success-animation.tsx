"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

export function SuccessAnimation({ email }: { email: string }) {
  const [isVisible, setIsVisible] = useState(true)
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    // Generate confetti pieces
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
    }))
    setConfetti(pieces)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="fixed w-2 h-2 bg-[#C8102E] rounded-full animate-pulse"
          style={{
            left: `${piece.left}%`,
            top: "-10px",
            animation: `fall 3s linear ${piece.delay}s forwards`,
          }}
        />
      ))}

      {/* Modal */}
      <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-50 duration-300">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#C8102E]/20 rounded-full blur-xl animate-pulse" />
            <CheckCircle2 className="w-20 h-20 text-[#C8102E] relative" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-black text-center mb-3">Registration Successful!</h2>

        <p className="text-lg text-gray-700 text-center mb-2">Welcome to Boardroom 2025</p>

        <p className="text-gray-600 text-center mb-6">
          A confirmation email with your QR code ticket has been sent to{" "}
          <span className="font-semibold text-black">{email}</span>
        </p>

        <div className="bg-[#C8102E]/10 border-2 border-[#C8102E] rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-semibold text-black">Check your email</span> for your digital ticket and event details
          </p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="w-full py-3 bg-[#C8102E] hover:bg-[#C8102E]/90 text-white font-bold rounded-lg transition-all duration-200"
        >
          Continue
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">Redirecting in 3 seconds...</p>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
