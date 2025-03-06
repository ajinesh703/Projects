"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { searchRecipes } from "@/lib/api"
import RecipeCard from "@/components/recipe-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""

  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    async function fetchRecipes() {
      if (!query) return

      setLoading(true)
      setPage(1)

      const results = await searchRecipes(query)
      setRecipes(results)
      setHasMore(results.length >= 12)
      setLoading(false)
    }

    fetchRecipes()
  }, [query])

  const loadMore = async () => {
    if (!query) return

    const nextPage = page + 1
    const results = await searchRecipes(query, 12)

    if (results.length < 12) {
      setHasMore(false)
    }

    setRecipes((prev) => [...prev, ...results])
    setPage(nextPage)
  }

  if (!query) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Search Recipes</h1>
        <p className="text-muted-foreground">Please enter a search term to find recipes</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-muted-foreground mb-8">Showing results for "{query}"</p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
        </div>
      ) : recipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
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

          {hasMore && (
            <div className="mt-10 text-center">
              <Button onClick={loadMore} variant="outline" size="lg">
                Load More Recipes
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-medium mb-2">No recipes found</h2>
          <p className="text-muted-foreground">Try searching for something else or check your spelling</p>
        </div>
      )}
    </div>
  )
}

