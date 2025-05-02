import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock } from "lucide-react"

export default function ClassesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Classes</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover our diverse range of fitness classes designed for all levels and interests.
            </p>
          </div>
        </div>
      </section>

      {/* Classes Categories */}
      <section className="py-12 md:py-24">
        <div className="container">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto mb-12">
              <TabsTrigger value="all">All Classes</TabsTrigger>
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="cardio">Cardio</TabsTrigger>
              <TabsTrigger value="mind-body">Mind & Body</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Power Lifting",
                    category: "Strength",
                    description: "Build strength with our comprehensive power lifting program.",
                    time: "Mon, Wed, Fri • 6:00 PM",
                    duration: "60 min",
                    level: "Intermediate",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "HIIT",
                    category: "Cardio",
                    description: "High-intensity interval training for maximum calorie burn.",
                    time: "Mon, Wed, Fri • 5:30 PM",
                    duration: "45 min",
                    level: "All Levels",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Vinyasa Flow",
                    category: "Mind & Body",
                    description: "Dynamic yoga sequence linking breath with movement.",
                    time: "Mon, Wed, Fri • 7:00 AM",
                    duration: "60 min",
                    level: "All Levels",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Bodybuilding",
                    category: "Strength",
                    description: "Sculpt your physique with targeted muscle building exercises.",
                    time: "Tue, Thu • 7:00 PM",
                    duration: "75 min",
                    level: "Intermediate",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Spin Class",
                    category: "Cardio",
                    description: "Energetic indoor cycling with motivating music.",
                    time: "Tue, Thu, Sat • 6:00 AM",
                    duration: "45 min",
                    level: "All Levels",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Power Yoga",
                    category: "Mind & Body",
                    description: "Strength-focused yoga practice for building muscle and flexibility.",
                    time: "Tue, Thu • 6:00 PM",
                    duration: "60 min",
                    level: "Intermediate",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Functional Training",
                    category: "Strength",
                    description: "Improve everyday movements with functional exercise patterns.",
                    time: "Mon, Wed, Fri • 12:00 PM",
                    duration: "60 min",
                    level: "All Levels",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Zumba",
                    category: "Cardio",
                    description: "Dance-based cardio workout that's fun and effective.",
                    time: "Tue, Thu, Sat • 5:00 PM",
                    duration: "60 min",
                    level: "All Levels",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                ].map((cls, i) => (
                  <Card key={i} className="overflow-hidden flex flex-col">
                    <div className="relative h-48">
                      <Image src={cls.image || "/placeholder.svg"} alt={cls.title} fill className="object-cover" />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                        {cls.category}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{cls.title}</CardTitle>
                      <CardDescription>{cls.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">{cls.time}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Duration:</span>
                          <span className="text-muted-foreground">{cls.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Level:</span>
                          <span className="text-muted-foreground">{cls.level}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/contact#book">Book Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="strength" className="space-y-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Power Lifting",
                    category: "Strength",
                    description: "Build strength with our comprehensive power lifting program.",
                    time: "Mon, Wed, Fri • 6:00 PM",
                    duration: "60 min",
                    level: "Intermediate",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Bodybuilding",
                    category: "Strength",
                    description: "Sculpt your physique with targeted muscle building exercises.",
                    time: "Tue, Thu • 7:00 PM",
                    duration: "75 min",
                    level: "Intermediate",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Functional Training",
                    category: "Strength",
                    description: "Improve everyday movements with functional exercise patterns.",
                    time: "Mon, Wed, Fri • 12:00 PM",
                    duration: "60 min",
                    level: "All Levels",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                ].map((cls, i) => (
                  <Card key={i} className="overflow-hidden flex flex-col">
                    <div className="relative h-48">
                      <Image src={cls.image || "/placeholder.svg"} alt={cls.title} fill className="object-cover" />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                        {cls.category}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{cls.title}</CardTitle>
                      <CardDescription>{cls.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">{cls.time}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Duration:</span>
                          <span className="text-muted-foreground">{cls.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Level:</span>
                          <span className="text-muted-foreground">{cls.level}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/contact#book">Book Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cardio" className="space-y-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "HIIT",
                    category: "Cardio",
                    description: "High-intensity interval training for maximum calorie burn.",
                    time: "Mon, Wed, Fri • 5:30 PM",
                    duration: "45 min",
                    level: "All Levels",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Spin Class",
                    category: "Cardio",
                    description: "Energetic indoor cycling with motivating music.",
                    time: "Tue, Thu, Sat • 6:00 AM",
                    duration: "45 min",
                    level: "All Levels",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Zumba",
                    category: "Cardio",
                    description: "Dance-based cardio workout that's fun and effective.",
                    time: "Tue, Thu, Sat • 5:00 PM",
                    duration: "60 min",
                    level: "All Levels",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                ].map((cls, i) => (
                  <Card key={i} className="overflow-hidden flex flex-col">
                    <div className="relative h-48">
                      <Image src={cls.image || "/placeholder.svg"} alt={cls.title} fill className="object-cover" />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                        {cls.category}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{cls.title}</CardTitle>
                      <CardDescription>{cls.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">{cls.time}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Duration:</span>
                          <span className="text-muted-foreground">{cls.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Level:</span>
                          <span className="text-muted-foreground">{cls.level}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/contact#book">Book Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mind-body" className="space-y-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Vinyasa Flow",
                    category: "Mind & Body",
                    description: "Dynamic yoga sequence linking breath with movement.",
                    time: "Mon, Wed, Fri • 7:00 AM",
                    duration: "60 min",
                    level: "All Levels",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Power Yoga",
                    category: "Mind & Body",
                    description: "Strength-focused yoga practice for building muscle and flexibility.",
                    time: "Tue, Thu • 6:00 PM",
                    duration: "60 min",
                    level: "Intermediate",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                  {
                    title: "Meditation",
                    category: "Mind & Body",
                    description: "Guided meditation sessions for stress relief and mental clarity.",
                    time: "Sat, Sun • 8:00 AM",
                    duration: "30 min",
                    level: "All Levels",
                    image: "/placeholder.svg?height=300&width=500",
                  },
                ].map((cls, i) => (
                  <Card key={i} className="overflow-hidden flex flex-col">
                    <div className="relative h-48">
                      <Image src={cls.image || "/placeholder.svg"} alt={cls.title} fill className="object-cover" />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                        {cls.category}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{cls.title}</CardTitle>
                      <CardDescription>{cls.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">{cls.time}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Duration:</span>
                          <span className="text-muted-foreground">{cls.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Level:</span>
                          <span className="text-muted-foreground">{cls.level}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/contact#book">Book Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Class Schedule */}
      <section className="py-12 md:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Weekly Class Schedule</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Plan your week with our comprehensive class schedule.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-background">
                  <th className="border p-3 text-left">Time</th>
                  <th className="border p-3 text-left">Monday</th>
                  <th className="border p-3 text-left">Tuesday</th>
                  <th className="border p-3 text-left">Wednesday</th>
                  <th className="border p-3 text-left">Thursday</th>
                  <th className="border p-3 text-left">Friday</th>
                  <th className="border p-3 text-left">Saturday</th>
                  <th className="border p-3 text-left">Sunday</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-medium">6:00 AM - 7:00 AM</td>
                  <td className="border p-3">Vinyasa Flow</td>
                  <td className="border p-3">Spin Class</td>
                  <td className="border p-3">Vinyasa Flow</td>
                  <td className="border p-3">Spin Class</td>
                  <td className="border p-3">Vinyasa Flow</td>
                  <td className="border p-3">Spin Class</td>
                  <td className="border p-3">-</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">7:00 AM - 8:00 AM</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">Meditation</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">12:00 PM - 1:00 PM</td>
                  <td className="border p-3">Functional Training</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">Functional Training</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">Functional Training</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">-</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">5:00 PM - 6:00 PM</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">Zumba</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">Zumba</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">Zumba</td>
                  <td className="border p-3">-</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">5:30 PM - 6:15 PM</td>
                  <td className="border p-3">HIIT</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">HIIT</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">HIIT</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">-</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">6:00 PM - 7:00 PM</td>
                  <td className="border p-3">Power Lifting</td>
                  <td className="border p-3">Power Yoga</td>
                  <td className="border p-3">Power Lifting</td>
                  <td className="border p-3">Power Yoga</td>
                  <td className="border p-3">Power Lifting</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">-</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">7:00 PM - 8:15 PM</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">Bodybuilding</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">Bodybuilding</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">-</td>
                  <td className="border p-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Instructors</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Meet our expert instructors who will guide you through your fitness journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Vikram Rajput",
                role: "Strength Training",
                bio: "With over 15 years of experience in fitness training, Vikram specializes in strength and conditioning.",
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
                role: "HIIT & Functional Training",
                bio: "Former national-level athlete specializing in high-intensity workouts and functional training.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Ananya Patel",
                role: "Zumba Instructor",
                bio: "Certified Zumba instructor bringing energy and fun to every class with her dance expertise.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((instructor, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={instructor.image || "/placeholder.svg"}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{instructor.name}</CardTitle>
                  <CardDescription>{instructor.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{instructor.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Join a Class?</h2>
            <p className="text-lg opacity-90">
              Book your spot in one of our exciting classes and start your fitness journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact#book">Book a Class</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/membership">View Membership Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
