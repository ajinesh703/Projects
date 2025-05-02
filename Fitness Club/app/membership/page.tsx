import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function MembershipPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Membership Plans</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the perfect membership plan that fits your fitness goals and lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Basic</CardTitle>
                <CardDescription>Perfect for beginners</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹1,999</span>
                  <span className="text-muted-foreground ml-2">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {[
                    "Access to gym equipment",
                    "Basic fitness assessment",
                    "2 group classes per week",
                    "Locker access",
                    "Access during standard hours",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/contact#book">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="flex flex-col relative overflow-hidden border-primary">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Premium</CardTitle>
                <CardDescription>For dedicated fitness enthusiasts</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹3,499</span>
                  <span className="text-muted-foreground ml-2">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {[
                    "All Basic features",
                    "Unlimited group classes",
                    "1 personal training session per month",
                    "Nutrition consultation",
                    "Extended hours access",
                    "Towel service",
                    "Access to sauna",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/contact#book">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Elite Plan */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Elite</CardTitle>
                <CardDescription>The ultimate fitness experience</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹5,999</span>
                  <span className="text-muted-foreground ml-2">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {[
                    "All Premium features",
                    "4 personal training sessions per month",
                    "Customized workout plan",
                    "Customized nutrition plan",
                    "Priority class booking",
                    "24/7 gym access",
                    "Guest passes (2 per month)",
                    "Exclusive events access",
                    "Complimentary protein shakes",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/contact#book">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Options */}
      <section className="py-12 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Additional Options</h2>
            <p className="mt-2 text-muted-foreground">Customize your membership with these add-ons</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Personal Training",
                price: "₹1,500",
                description: "Per session with certified trainer",
              },
              {
                title: "Nutrition Consultation",
                price: "₹2,000",
                description: "Personalized nutrition plan",
              },
              {
                title: "Group Classes Pack",
                price: "₹3,000",
                description: "10 classes of your choice",
              },
              {
                title: "Family Add-on",
                price: "₹1,000",
                description: "Per additional family member",
              },
            ].map((option, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{option.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-2 text-muted-foreground">Find answers to common questions about our membership plans</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Is there a joining fee?",
                answer:
                  "Yes, there is a one-time joining fee of ₹1,000 for all membership plans. This fee is waived during promotional periods.",
              },
              {
                question: "Can I freeze my membership?",
                answer:
                  "Yes, members can freeze their membership for up to 30 days per year with a valid reason such as travel, illness, or injury.",
              },
              {
                question: "What is your cancellation policy?",
                answer:
                  "Members can cancel their membership with a 30-day notice. A cancellation form must be filled out at the reception.",
              },
              {
                question: "Are there any discounts available?",
                answer:
                  "We offer discounts for students, senior citizens, and corporate partnerships. Please inquire at the reception for more details.",
              },
              {
                question: "Can I try before I join?",
                answer:
                  "We offer a free one-day trial pass. You can book your trial through our website or by calling us.",
              },
            ].map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
            <h2 className="text-3xl font-bold">Ready to Transform Your Fitness Journey?</h2>
            <p className="text-lg opacity-90">
              Join Rajput Fitness Club today and take the first step towards a healthier, stronger you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact#book">Book a Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
