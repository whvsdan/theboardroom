import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function About() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">About Boardroom</h1>
            <p className="text-xl opacity-90">Shaping Leaders, Transforming Economies</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Boardroom Summit is dedicated to fostering entrepreneurship and business excellence in the Idoma
                  region and beyond. We bring together visionary leaders, innovative entrepreneurs, and business
                  professionals to share knowledge, build networks, and drive economic transformation.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">What We Do</h2>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Host annual summits bringing together industry leaders and entrepreneurs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Provide mentorship programs connecting experienced leaders with emerging entrepreneurs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Recognize and celebrate outstanding achievements through awards</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Facilitate networking opportunities and business partnerships</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Share insights and best practices through expert-led sessions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Attend?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Whether you're an established entrepreneur, a business professional, or someone looking to start your
                  journey, the Boardroom Summit offers invaluable opportunities to:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Learn from successful entrepreneurs and industry experts</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Expand your professional network</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Discover new business opportunities</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Gain practical insights and strategies</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Get recognized for your achievements</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button size="lg" asChild>
                  <Link href="/registration">Join Us Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
