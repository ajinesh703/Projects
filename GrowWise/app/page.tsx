import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Video, Users, MessageCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="GrowWise Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-xl font-bold text-primary">GrowWise</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="#guides" className="text-sm font-medium transition-colors hover:text-primary">
              Guides
            </Link>
            <Link href="#videos" className="text-sm font-medium transition-colors hover:text-primary">
              Videos
            </Link>
            <Link href="#forum" className="text-sm font-medium transition-colors hover:text-primary">
              Forum
            </Link>
            <Link href="#experts" className="text-sm font-medium transition-colors hover:text-primary">
              Ask Experts
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-[200px] pl-8" />
            </div>
            <ThemeToggle />
            <Button className="hidden md:flex">Sign In</Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Learn Sustainable Farming Techniques
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Access expert guides, video tutorials, and community support for organic farming, hydroponics, and
                  more.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Join Community
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 relative">
                <Image
                  src="/placeholder.svg?height=550&width=450"
                  alt="Farmer working in a field"
                  width={450}
                  height={550}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need to Grow</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive resources to help you succeed in sustainable farming
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Detailed Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step instructions for various farming techniques
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Video Tutorials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Visual demonstrations of farming practices and techniques
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Community Forum</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect with other farmers to share experiences and advice
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Expert Q&A</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get answers from agricultural experts and professionals
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="guides" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Popular Guides</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our most popular farming guides and tutorials
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Getting Started with Organic Farming",
                  description: "Learn the basics of organic farming practices and certification",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "Organic",
                },
                {
                  title: "Hydroponic Systems for Beginners",
                  description: "Set up your first hydroponic system with minimal investment",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "Hydroponics",
                },
                {
                  title: "Sustainable Pest Management",
                  description: "Natural methods to control pests without harmful chemicals",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "Organic",
                },
                {
                  title: "Soil Health and Regeneration",
                  description: "Techniques to improve and maintain healthy soil",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "Soil",
                },
                {
                  title: "Water Conservation Methods",
                  description: "Efficient irrigation and water management practices",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "Conservation",
                },
                {
                  title: "Seasonal Planting Guide",
                  description: "What to plant and when for maximum yield",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "Planning",
                },
              ].map((guide, index) => (
                <Card key={index} className="overflow-hidden">
                  <Image
                    src={guide.image || "/placeholder.svg"}
                    alt={guide.title}
                    width={300}
                    height={200}
                    className="w-full object-cover h-[200px]"
                  />
                  <CardHeader className="p-4">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs text-primary mb-2">
                      {guide.category}
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="link" className="px-0">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg">
                View All Guides
              </Button>
            </div>
          </div>
        </section>

        <section id="videos" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Video Tutorials</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Watch and learn with our detailed video demonstrations
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              {[
                {
                  title: "Setting Up a Drip Irrigation System",
                  duration: "15:24",
                  image: "/placeholder.svg?height=250&width=450",
                },
                {
                  title: "Composting Techniques for Rich Soil",
                  duration: "12:08",
                  image: "/placeholder.svg?height=250&width=450",
                },
                {
                  title: "Hydroponic Nutrient Management",
                  duration: "18:36",
                  image: "/placeholder.svg?height=250&width=450",
                },
                {
                  title: "Greenhouse Construction Basics",
                  duration: "22:15",
                  image: "/placeholder.svg?height=250&width=450",
                },
              ].map((video, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={video.image || "/placeholder.svg"}
                      alt={video.title}
                      width={450}
                      height={250}
                      className="w-full object-cover h-[200px]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-background/80 p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-primary"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg">
                View All Videos
              </Button>
            </div>
          </div>
        </section>

        <section id="forum" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Community Forum</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join the conversation with fellow farmers and share your experiences
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Best cover crops for winter season?",
                        author: "Maria G.",
                        replies: 24,
                        time: "2 hours ago",
                      },
                      {
                        title: "Troubleshooting nutrient deficiency in tomatoes",
                        author: "James L.",
                        replies: 18,
                        time: "Yesterday",
                      },
                      {
                        title: "DIY hydroponic setup with local materials",
                        author: "Ahmed K.",
                        replies: 32,
                        time: "3 days ago",
                      },
                      {
                        title: "Organic certification process - tips and advice",
                        author: "Sarah M.",
                        replies: 15,
                        time: "1 week ago",
                      },
                      {
                        title: "Dealing with drought conditions this summer",
                        author: "Robert T.",
                        replies: 29,
                        time: "1 week ago",
                      },
                    ].map((discussion, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <h3 className="font-medium">{discussion.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Started by {discussion.author} • {discussion.time}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">{discussion.replies} replies</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Join the Discussion</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="experts" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ask the Experts</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get advice from agricultural professionals and experienced farmers
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Dr. Emily Chen",
                  specialty: "Soil Science",
                  image: "/placeholder.svg?height=150&width=150",
                },
                {
                  name: "Miguel Rodriguez",
                  specialty: "Organic Farming",
                  image: "/placeholder.svg?height=150&width=150",
                },
                {
                  name: "Dr. James Wilson",
                  specialty: "Hydroponics",
                  image: "/placeholder.svg?height=150&width=150",
                },
                {
                  name: "Aisha Patel",
                  specialty: "Sustainable Irrigation",
                  image: "/placeholder.svg?height=150&width=150",
                },
                {
                  name: "Thomas Nguyen",
                  specialty: "Crop Rotation",
                  image: "/placeholder.svg?height=150&width=150",
                },
                {
                  name: "Dr. Sarah Johnson",
                  specialty: "Plant Pathology",
                  image: "/placeholder.svg?height=150&width=150",
                },
              ].map((expert, index) => (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center">
                      <Image
                        src={expert.image || "/placeholder.svg"}
                        alt={expert.name}
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <CardTitle className="mt-4">{expert.name}</CardTitle>
                    <CardDescription>{expert.specialty}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">
                      Ask a Question
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Our Community Today</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with thousands of farmers, access exclusive content, and grow your knowledge
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-primary-foreground text-primary"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button variant="secondary">Subscribe</Button>
                </form>
                <p className="text-xs">By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 GrowWise. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

