"use client"

import HeroSection from "@/components/hero-section"
import FeaturedRecipes from "@/components/featured-recipes"
import CategoryPreview from "@/components/category-preview"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="space-y-10">
      <HeroSection />

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Recipes</h2>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        <FeaturedRecipes key={refreshKey} />
      </section>

      <CategoryPreview category="breakfast" title="Breakfast Ideas" />
      <CategoryPreview category="dessert" title="Sweet Treats" />
    </div>
  )
}

