"use client"

import { useState, useEffect } from "react"
import { getRandomRecipes } from "@/lib/api"
import RecipeCard from "@/components/recipe-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRecipes() {
      setLoading(true)
      const data = await getRandomRecipes(6)
      setRecipes(data)
      setLoading(false)
    }

    loadRecipes()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? Array(6)
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
  )
}

