import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main>
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Privacy Policy</h1>
            <p className="text-lg opacity-90">Your privacy is important to us</p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-invert space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
                <p className="leading-relaxed">
                  Boardroom ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                  website and engage with our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
                <p className="mb-4 leading-relaxed">We may collect information about you in a variety of ways:</p>
                <ul className="space-y-3 ml-6">
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Personal Information:</strong> Name, email address, phone
                    number, company information, and other details you voluntarily provide through forms, registrations,
                    or inquiries.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Usage Data:</strong> Information about how you interact with our
                    website, including pages visited, time spent, and referring URLs.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Device Information:</strong> Device type, IP address, browser
                    type, and operating system.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Cookies:</strong> We use cookies and similar tracking
                    technologies to enhance your experience.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Use of Information</h2>
                <p className="mb-4 leading-relaxed">We use collected information for:</p>
                <ul className="space-y-2 ml-6">
                  <li>Processing registrations and applications</li>
                  <li>Sending event updates, newsletters, and communications</li>
                  <li>Improving our website and services</li>
                  <li>Analyzing usage patterns and user behavior</li>
                  <li>Responding to inquiries and providing customer support</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of
                  transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to
                  protect your personal information, we cannot guarantee its absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
                <p className="mb-4 leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>Right to access your personal data</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to request deletion of your data</li>
                  <li>Right to withdraw consent</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Sharing</h2>
                <p className="leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share information
                  only with trusted service providers who assist us in operating our website and conducting our
                  business, under strict confidentiality agreements.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
                <p className="leading-relaxed">
                  We reserve the right to update this Privacy Policy at any time. Changes will be effective immediately
                  upon posting to the website. Your continued use of our website constitutes your acceptance of the
                  revised Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-card rounded-lg border border-border">
                  <p className="font-medium text-foreground">Boardroom</p>
                  <p>Email: info@boardroom.ng</p>
                  <p>Phone: +234 706 192 3254</p>
                </div>
              </div>

              <p className="text-sm pt-8 border-t border-border">Last updated: November 1, 2025</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
