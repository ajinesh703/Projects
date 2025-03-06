"use client"

import type React from "react"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <div className="relative py-12 md:py-20 px-4 md:px-6 rounded-xl overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Discover <span className="text-primary">Delicious Recipes</span> for Every Occasion
        </h1>
        <p className="text-lg text-muted-foreground">
          Find and cook amazing meals with our collection of tasty recipes from around the world
        </p>

        <form onSubmit={handleSearch} className="relative max-w-md mx-auto mt-8">
          <Input
            type="search"
            placeholder="Search for recipes..."
            className="pr-10 h-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="icon" className="absolute right-0 top-0 h-full rounded-l-none">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </form>

        <div className="flex flex-wrap justify-center gap-2 pt-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/search?query=pasta")}>
            Pasta
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/search?query=chicken")}>
            Chicken
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/search?query=vegetarian")}>
            Vegetarian
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/search?query=dessert")}>
            Dessert
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/search?query=quick")}>
            Quick Meals
          </Button>
        </div>
      </div>
    </div>
  )
}

