import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Boardroom</h3>
            <p className="text-sm opacity-90">
              Shaping Leaders, Transforming Economies. The Idoma Entrepreneurship Summit 2025.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="hover:underline">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:underline">
                  Program
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="hover:underline">
                  Sponsors
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-bold mb-4">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/registration" className="hover:underline">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="hover:underline">
                  Mentorship
                </Link>
              </li>
              <li>
                <Link href="/awards" className="hover:underline">
                  Awards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <span>info@boardroom.ng</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+2347061923254" className="hover:underline">
                    +234 706 192 3254
                  </a>
                  <a href="tel:+2348037177066" className="hover:underline">
                    +234 803 717 7066
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>
                  Flat 1, Block 6, Mani Close,
                  <br />
                  Area 1, Abuja, Nigeria
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-90">
          <p>&copy; 2025 Boardroom Summit. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
