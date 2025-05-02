import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Dumbbell, Users, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Gym interior"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 container py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
              Transform Your Body, Transform Your Life
            </h1>
            <p className="text-xl text-gray-200">
              Join Rajput Fitness Club and start your fitness journey today with our state-of-the-art facilities and
              expert trainers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/membership">Join Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-background/20 backdrop-blur-sm border-white text-white hover:bg-background/30"
                asChild
              >
                <Link href="/classes">Explore Classes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Rajput Fitness Club?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer a comprehensive fitness experience with top-notch equipment and expert guidance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Dumbbell className="h-10 w-10 text-primary mb-2" />
                <CardTitle>State-of-the-art Equipment</CardTitle>
                <CardDescription>
                  Our gym features the latest fitness equipment for all your workout needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>From cardio machines to free weights, we have everything you need to achieve your fitness goals.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Expert Trainers</CardTitle>
                <CardDescription>Our certified trainers are here to guide you on your fitness journey.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Get personalized workout plans and expert advice from our team of experienced fitness professionals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Diverse Classes</CardTitle>
                <CardDescription>
                  Choose from a wide range of fitness classes to keep your routine exciting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>From yoga to HIIT, our diverse class schedule ensures there's something for everyone.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Popular Classes</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our diverse range of classes led by expert instructors.
            </p>
          </div>

          <Tabs defaultValue="strength" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto mb-8">
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="cardio">Cardio</TabsTrigger>
              <TabsTrigger value="yoga">Yoga</TabsTrigger>
            </TabsList>

            <TabsContent value="strength" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Power Lifting",
                    description: "Build strength with our comprehensive power lifting program.",
                    time: "Mon, Wed, Fri • 6:00 PM",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Bodybuilding",
                    description: "Sculpt your physique with targeted muscle building exercises.",
                    time: "Tue, Thu • 7:00 PM",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                ].map((cls, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={cls.image || "/placeholder.svg"} alt={cls.title} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle>{cls.title}</CardTitle>
                      <CardDescription>{cls.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{cls.time}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cardio" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "HIIT",
                    description: "High-intensity interval training for maximum calorie burn.",
                    time: "Mon, Wed, Fri • 5:30 PM",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Spin Class",
                    description: "Energetic indoor cycling with motivating music.",
                    time: "Tue, Thu, Sat • 6:00 AM",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                ].map((cls, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={cls.image || "/placeholder.svg"} alt={cls.title} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle>{cls.title}</CardTitle>
                      <CardDescription>{cls.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{cls.time}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="yoga" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Vinyasa Flow",
                    description: "Dynamic yoga sequence linking breath with movement.",
                    time: "Mon, Wed, Fri • 7:00 AM",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Power Yoga",
                    description: "Strength-focused yoga practice for building muscle and flexibility.",
                    time: "Tue, Thu • 6:00 PM",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                ].map((cls, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={cls.image || "/placeholder.svg"} alt={cls.title} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle>{cls.title}</CardTitle>
                      <CardDescription>{cls.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{cls.time}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-10 text-center">
            <Button asChild>
              <Link href="/classes" className="flex items-center">
                View All Classes <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Members Say</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our satisfied members about their fitness journey with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Member since 2021",
                quote:
                  "Rajput Fitness Club has completely transformed my fitness journey. The trainers are exceptional and the facilities are top-notch.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Rahul Singh",
                role: "Member since 2020",
                quote:
                  "I've tried many gyms, but none compare to the community and support I've found at Rajput Fitness Club. It's become my second home.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Ananya Patel",
                role: "Member since 2022",
                quote:
                  "The variety of classes and the expertise of the trainers have helped me achieve fitness goals I never thought possible.",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="relative">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Fitness Journey?</h2>
              <p className="text-lg opacity-90">
                Join Rajput Fitness Club today and take the first step towards a healthier, stronger you.
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
