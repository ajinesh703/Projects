"use client"

import { useState, useEffect } from "react"
import { getRecipeById } from "@/lib/api"
import Image from "next/image"
import { Clock, Users, ChefHat, Bookmark, Printer, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRecipe() {
      setLoading(true)
      const data = await getRecipeById(Number.parseInt(params.id))
      setRecipe(data)
      setLoading(false)
    }

    loadRecipe()
  }, [params.id])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="h-[300px] md:h-[400px] w-full md:w-1/2 rounded-lg" />
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
          </div>
        </div>
        <Skeleton className="h-8 w-40" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <p className="text-muted-foreground">The recipe you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 relative rounded-lg overflow-hidden">
          <div className="aspect-[4/3] relative">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>

          <div className="flex flex-wrap gap-2">
            {recipe.diets &&
              recipe.diets.map((diet: string) => (
                <Badge key={diet} variant="secondary">
                  {diet}
                </Badge>
              ))}
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            {recipe.readyInMinutes && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-primary" />
                <span>{recipe.readyInMinutes} minutes</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-primary" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
            {recipe.healthScore && (
              <div className="flex items-center gap-1">
                <ChefHat className="h-4 w-4 text-primary" />
                <span>Health score: {recipe.healthScore}</span>
              </div>
            )}
          </div>

          <div className="text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: recipe.summary }} />

          <div className="flex flex-wrap gap-2 pt-4">
            <Button variant="outline" size="sm" className="gap-1">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="ingredients">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="ingredients" className="pt-4">
          <h2 className="text-xl font-bold mb-4">Ingredients</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recipe.extendedIngredients &&
              recipe.extendedIngredients.map((ingredient: any) => (
                <li key={ingredient.id} className="flex items-start gap-2 py-2 border-b">
                  <span className="text-primary font-medium">•</span>
                  <span>{ingredient.original}</span>
                </li>
              ))}
          </ul>
        </TabsContent>
        <TabsContent value="instructions" className="pt-4">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
            <ol className="space-y-4">
              {recipe.analyzedInstructions[0].steps.map((step: any) => (
                <li key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div className="pt-1">
                    <p>{step.step}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: recipe.instructions || "No detailed instructions available." }}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

