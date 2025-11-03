import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Sponsors() {
  const sponsorshipTiers = [
    {
      name: "Platinum",
      price: "₦5,000,000",
      benefits: [
        "Logo on all marketing materials",
        "Speaking slot at summit",
        "Booth at event",
        "10 VIP tickets",
        "Social media promotion",
        "Exclusive networking dinner",
      ],
    },
    {
      name: "Gold",
      price: "₦2,500,000",
      benefits: [
        "Logo on marketing materials",
        "Booth at event",
        "6 VIP tickets",
        "Social media mentions",
        "Networking opportunities",
      ],
    },
    {
      name: "Silver",
      price: "₦1,000,000",
      benefits: ["Logo on website", "Booth at event", "4 standard tickets", "Event program mention"],
    },
    {
      name: "Bronze",
      price: "₦500,000",
      benefits: ["Logo on website", "2 standard tickets", "Event program mention"],
    },
  ]

  const currentSponsors = [
    {
      name: "Teqbox Properties Ltd",
      logo: "/sponsors/teqbox-logo.png",
      description: "Real estate and property development solutions",
    },
    {
      name: "Double Grace Properties Ltd",
      logo: "/sponsors/double-grace-logo.png",
      description: "Building trust and credibility in real estate",
    },
    {
      name: "Afigitis Studio O Energy and Engineering",
      logo: "/logo.png",
      description: "Energy and engineering solutions",
    },
    {
      name: "Fun Capitol Night Club",
      logo: "/sponsors/fun-capitol-logo.png",
      description: "",
    },
    {
      name: "Graacious Esteem Shelters Ltd.",
      logo: "/sponsors/graacious-esteem-logo.png",
      description: "Building trust and credibility in real estate",
    },
  ]

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Sponsorship Opportunities</h1>
            <p className="text-xl opacity-90">Partner with us to shape the future of entrepreneurship</p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Sponsors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentSponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-lg border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="w-full h-40 mb-4 flex items-center justify-center bg-background rounded-lg">
                    <img
                      src={sponsor.logo || "/placeholder.svg"}
                      alt={sponsor.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{sponsor.name}</h3>
                  <p className="text-muted-foreground text-sm">{sponsor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Sponsor Boardroom?</h2>
              <p className="text-muted-foreground mb-6">
                The Boardroom Summit brings together hundreds of entrepreneurs, business leaders, and innovators. As a
                sponsor, you'll gain visibility, build relationships, and demonstrate your commitment to supporting
                entrepreneurship in the Idoma region.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Reach hundreds of entrepreneurs and business leaders</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Build brand awareness and credibility</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Network with potential clients and partners</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Demonstrate corporate social responsibility</span>
                </li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
              <div className="max-w-2xl mx-auto bg-accent/5 rounded-lg p-8 border border-border">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <a href="mailto:info@boardroom.ng" className="text-accent hover:underline">
                        info@boardroom.ng
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2">Phone</h3>
                      <div className="space-y-1">
                        <a href="tel:+2347061923254" className="block text-accent hover:underline">
                          +234 706 192 3254
                        </a>
                        <a href="tel:+2348037177066" className="block text-accent hover:underline">
                          +234 803 717 7066
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        Flat 1, Block 6, Mani Close,
                        <br />
                        Area 1, Abuja, Nigeria
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-accent/10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Become a Sponsor?</h2>
              <p className="text-muted-foreground mb-6">
                Contact us to discuss custom sponsorship packages tailored to your needs.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
