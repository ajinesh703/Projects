"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "./cart-provider"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart } from "lucide-react"

type Product = {
  id: string
  name: string
  price: number
  image: string
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const { addItem } = useCart()

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="group overflow-hidden">
            <CardContent className="p-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </CardContent>
            <CardHeader className="p-4 pt-0">
              <CardTitle className="line-clamp-1">{product.name}</CardTitle>
              <CardDescription>{formatPrice(product.price)}</CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full gap-2 transition-transform duration-300 hover:scale-105"
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
                }
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

