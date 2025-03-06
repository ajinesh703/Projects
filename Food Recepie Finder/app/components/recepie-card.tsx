import Link from "next/link"
import Image from "next/image"
import { Clock, Users } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RecipeCardProps {
  id: number
  title: string
  image: string
  readyInMinutes?: number
  servings?: number
  diets?: string[]
}

export default function RecipeCard({ id, title, image, readyInMinutes, servings, diets }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${id}`} className="recipe-card group">
      <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="recipe-card-image object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-serif font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {diets && diets.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {diets.slice(0, 2).map((diet) => (
                <Badge key={diet} variant="secondary" className="text-xs">
                  {diet}
                </Badge>
              ))}
              {diets.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{diets.length - 2} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        {(readyInMinutes || servings) && (
          <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
            {readyInMinutes && (
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{readyInMinutes} min</span>
              </div>
            )}
            {servings && (
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{servings} servings</span>
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}

