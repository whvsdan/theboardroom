import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Users, Briefcase, Trophy, Calendar } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-black to-black/95 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-72 h-72 bg-[#C8102E] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#C8102E] rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              {/* Logo Display */}
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 relative">
                  <Image
                    src="/logo.png"
                    alt="Boardroom Logo"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Boardroom</h1>
              <p className="text-xl md:text-2xl mb-4 font-semibold text-[#C8102E]">
                The Idoma Entrepreneurship Summit 2025
              </p>
              <p className="text-lg md:text-xl mb-8 opacity-95">Shaping Leaders, Transforming Economies</p>
              <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join us for an extraordinary gathering of entrepreneurs, innovators, and business leaders. Network,
                learn, and grow with industry experts and fellow visionaries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#C8102E] hover:bg-[#C8102E]/90 text-white gap-2" asChild>
                  <Link href="/registration">
                    Register Now <ArrowRight size={20} />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance text-black">What to Expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: "Expert Speakers",
                  description: "Learn from industry leaders and successful entrepreneurs",
                },
                {
                  icon: Briefcase,
                  title: "Networking",
                  description: "Connect with like-minded professionals and potential partners",
                },
                {
                  icon: Trophy,
                  title: "Awards & Recognition",
                  description: "Celebrate outstanding achievements in entrepreneurship",
                },
                {
                  icon: Calendar,
                  title: "Full Day Program",
                  description: "Packed schedule with sessions, workshops, and activities",
                },
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow hover:border-[#C8102E]/50"
                  >
                    <Icon className="w-12 h-12 text-[#C8102E] mb-4" />
                    <h3 className="font-bold text-lg text-black mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-[#C8102E]/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance text-black">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join hundreds of entrepreneurs and business leaders at the Boardroom Summit 2025. Secure your spot today.
            </p>
            <Button size="lg" className="bg-[#C8102E] hover:bg-[#C8102E]/90 text-white" asChild>
              <Link href="/registration">Get Your Ticket</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
