import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Us</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Learn about Rajput Fitness Club's journey, mission, and the team behind our success.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2015 by fitness enthusiast Vikram Rajput, Rajput Fitness Club began with a simple mission:
                  to create a fitness community that empowers individuals to achieve their health and wellness goals.
                </p>
                <p>
                  What started as a small gym with basic equipment has now grown into a premier fitness destination with
                  state-of-the-art facilities, expert trainers, and a thriving community of fitness enthusiasts.
                </p>
                <p>
                  Throughout our journey, we've remained committed to our core values of excellence, integrity, and
                  community. We believe that fitness is not just about physical strength but also about mental wellbeing
                  and building lasting relationships.
                </p>
              </div>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Gym interior"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-12 md:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Mission & Values</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Rajput Fitness Club.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To empower individuals to transform their lives through fitness, providing a supportive community and
                  expert guidance for everyone, regardless of their fitness level.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the leading fitness destination in India, known for our exceptional facilities, expert trainers,
                  and inclusive community that inspires and supports every member's fitness journey.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <strong>Excellence:</strong> We strive for excellence in everything we do.
                  </li>
                  <li>
                    <strong>Integrity:</strong> We operate with honesty and transparency.
                  </li>
                  <li>
                    <strong>Community:</strong> We foster a supportive and inclusive environment.
                  </li>
                  <li>
                    <strong>Innovation:</strong> We continuously evolve and improve our offerings.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Our expert trainers and staff are dedicated to helping you achieve your fitness goals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Vikram Rajput",
                role: "Founder & Head Trainer",
                bio: "With over 15 years of experience in fitness training, Vikram is passionate about helping members achieve their fitness goals.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Priya Sharma",
                role: "Yoga Instructor",
                bio: "Certified yoga instructor with expertise in various yoga styles including Hatha, Vinyasa, and Ashtanga.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Rahul Singh",
                role: "Strength & Conditioning Coach",
                bio: "Former national-level athlete specializing in strength training and sports performance enhancement.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Ananya Patel",
                role: "Nutrition Specialist",
                bio: "Certified nutritionist helping members optimize their diet for better fitness results and overall health.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12 md:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Facilities</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Explore our state-of-the-art facilities designed to enhance your fitness experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Cardio Zone",
                description: "Equipped with the latest treadmills, ellipticals, stationary bikes, and rowing machines.",
                image: "/placeholder.svg?height=400&width=600",
              },
              {
                title: "Strength Training Area",
                description: "Comprehensive range of free weights, weight machines, and functional training equipment.",
                image: "/placeholder.svg?height=400&width=600",
              },
              {
                title: "Group Exercise Studios",
                description: "Spacious studios for yoga, aerobics, Zumba, and other group fitness classes.",
                image: "/placeholder.svg?height=400&width=600",
              },
              {
                title: "Recovery Zone",
                description: "Featuring sauna, steam room, and dedicated stretching areas for post-workout recovery.",
                image: "/placeholder.svg?height=400&width=600",
              },
            ].map((facility, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{facility.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">Join Our Fitness Community</h2>
              <p className="text-lg opacity-90">
                Experience the Rajput Fitness Club difference and start your fitness journey today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/membership">View Membership Plans</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="/contact#book">Book a Free Trial</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
