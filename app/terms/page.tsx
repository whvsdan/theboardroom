import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main>
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Terms of Service</h1>
            <p className="text-lg opacity-90">Please read these terms carefully</p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-invert space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                <p className="leading-relaxed">
                  By accessing and using this website and services provided by Boardroom, you accept and agree to be
                  bound by and comply with these Terms of Service. If you do not agree to abide by the above, please do
                  not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
                <p className="mb-4 leading-relaxed">
                  Permission is granted to temporarily download one copy of the materials (information or software) on
                  Boardroom's website for personal, non-commercial transitory viewing only. This is the grant of a
                  license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>Modifying or copying the materials</li>
                  <li>Using the materials for any commercial purpose or for any public display</li>
                  <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                  <li>Removing any copyright or other proprietary notations from the materials</li>
                  <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
                <p className="leading-relaxed">
                  The materials on Boardroom's website are provided on an "as is" basis. Boardroom makes no warranties,
                  expressed or implied, and hereby disclaims and negates all other warranties including, without
                  limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation of rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
                <p className="leading-relaxed">
                  In no event shall Boardroom or its suppliers be liable for any damages (including, without limitation,
                  damages for loss of data or profit, or due to business interruption) arising out of the use or
                  inability to use the materials on Boardroom's website, even if Boardroom or an authorized
                  representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
                <p className="leading-relaxed">
                  The materials appearing on Boardroom's website could include technical, typographical, or photographic
                  errors. Boardroom does not warrant that any of the materials on its website are accurate, complete, or
                  current. Boardroom may make changes to the materials contained on its website at any time without
                  notice.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Materials and Content</h2>
                <p className="leading-relaxed">
                  The materials on Boardroom's website are protected by copyright laws. Content includes but is not
                  limited to information, text, graphics, images, data, and software. Unauthorized use of any materials
                  may violate copyright, trademark, and other applicable laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. User Conduct</h2>
                <p className="mb-4 leading-relaxed">You agree not to:</p>
                <ul className="space-y-2 ml-6">
                  <li>Harass, threaten, abuse, or intimidate any person</li>
                  <li>Post obscene or offensive content</li>
                  <li>Spam or send unsolicited messages</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Infringe upon the rights of others</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitation on Time to File Claims</h2>
                <p className="leading-relaxed">
                  Any claim or cause of action arising out of or related to the use of the website must be filed within
                  one (1) year after such claim or cause of action arose; otherwise, such claim or cause of action is
                  permanently barred.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Governing Law</h2>
                <p className="leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of Nigeria, and
                  you irrevocably submit to the exclusive jurisdiction of the courts in Nigeria.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to Terms</h2>
                <p className="leading-relaxed">
                  Boardroom may revise these Terms of Service at any time without notice. By using this website, you are
                  agreeing to be bound by the then current version of these Terms of Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                <p className="leading-relaxed">
                  If you have any questions about these Terms of Service, please contact:
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
