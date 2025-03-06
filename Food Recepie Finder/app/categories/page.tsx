"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { getRecipesByCategory } from "@/lib/api"
import RecipeCard from "@/components/recipe-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  { id: "main course", label: "Main Course" },
  { id: "breakfast", label: "Breakfast" },
  { id: "appetizer", label: "Appetizers" },
  { id: "dessert", label: "Desserts" },
  { id: "salad", label: "Salads" },
  { id: "soup", label: "Soups" },
  { id: "snack", label: "Snacks" },
  { id: "drink", label: "Drinks" },
]

export default function CategoriesPage() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get("type") || "main course"

  const [activeCategory, setActiveCategory] = useState(initialType)
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true)
      const results = await getRecipesByCategory(activeCategory, 12)
      setRecipes(results)
      setLoading(false)
    }

    fetchRecipes()
  }, [activeCategory])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Recipe Categories</h1>

      <Tabs defaultValue={initialType} value={activeCategory} onValueChange={setActiveCategory} className="space-y-8">
        <TabsList className="flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <h2 className="text-2xl font-bold">{category.label} Recipes</h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            ) : (
              <div className="text-center py-20">
                <h2 className="text-xl font-medium mb-2">No recipes found</h2>
                <p className="text-muted-foreground">
                  We couldn't find any recipes in this category. Please try another category.
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

