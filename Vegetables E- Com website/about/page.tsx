"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold lg:text-4xl">Fresh Vegetables, Delivered Fresh</h1>
            <p className="text-lg text-muted-foreground">
              We're passionate about delivering the freshest, highest-quality vegetables straight from local farms to
              your table.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-video overflow-hidden rounded-xl lg:aspect-square"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Peas.jpg-JLEaHi0fs9kLwz6RWzv8kdbbmruzA0.jpeg"
              alt="Fresh vegetables"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-8 lg:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="rounded-xl border bg-card p-8 text-center">
              <div className="text-4xl font-bold text-primary">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">Why Choose Us?</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-none">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const stats = [
  {
    value: "5K+",
    label: "Happy Customers",
  },
  {
    value: "100+",
    label: "Products Available",
  },
  {
    value: "24/7",
    label: "Customer Support",
  },
]

const features = [
  {
    title: "Fresh from Farm",
    description: "We source our vegetables directly from local farmers.",
    icon: ArrowRight,
  },
  {
    title: "Quality Guaranteed",
    description: "All our products go through strict quality checks.",
    icon: ArrowRight,
  },
  {
    title: "Fast Delivery",
    description: "Get your orders delivered within 24 hours.",
    icon: ArrowRight,
  },
  {
    title: "Best Prices",
    description: "We offer competitive prices for all our products.",
    icon: ArrowRight,
  },
]

