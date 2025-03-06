"use client"

import { useState, useEffect } from "react"
import { getRecipesByCategory } from "@/lib/api"
import RecipeCard from "@/components/recipe-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface CategoryPreviewProps {
  category: string
  title: string
}

export default function CategoryPreview({ category, title }: CategoryPreviewProps) {
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRecipes() {
      setLoading(true)
      const data = await getRecipesByCategory(category, 4)
      setRecipes(data)
      setLoading(false)
    }

    loadRecipes()
  }, [category])

  return (
    <section className="my-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/categories?type=${category}`} className="flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
          : recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
                readyInMinutes={recipe.readyInMinutes}
                servings={recipe.servings}
                diets={recipe.diets}
              />
            ))}
      </div>
    </section>
  )
}

