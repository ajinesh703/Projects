import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Rajput Fitness Club</h3>
          <p className="text-muted-foreground">Your premier fitness destination for health and wellness.</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/classes" className="text-muted-foreground hover:text-primary">
                Classes
              </Link>
            </li>
            <li>
              <Link href="/membership" className="text-muted-foreground hover:text-primary">
                Membership
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Hours</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>Monday - Friday: 5:00 AM - 10:00 PM</li>
            <li>Saturday: 6:00 AM - 8:00 PM</li>
            <li>Sunday: 7:00 AM - 6:00 PM</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Contact</h3>
          <address className="not-italic text-muted-foreground space-y-2">
            <p>123 Fitness Avenue</p>
            <p>New Delhi, India 110001</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: info@rajputfitness.com</p>
          </address>
        </div>
      </div>
      <div className="container mt-8 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rajput Fitness Club. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
