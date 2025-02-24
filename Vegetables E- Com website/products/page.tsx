"use client"

import { motion } from "framer-motion"
import ProductGrid from "@/components/product-grid"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const products = [
  {
    id: "1",
    name: "Fresh Cauliflower",
    price: 2.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/91EdPVzD99L._AC_UF1000,1000_QL80_.jpg-JZ7wSdEgbNU6Msut9IOx8fT4xC50H9.jpeg",
    category: "vegetables",
  },
  {
    id: "2",
    name: "Green Jackfruit",
    price: 5.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jackfruit-for-babies-scaled.jpg-RIGDL9YVU715JMwaYd0ZP33F0XGzBa.jpeg",
    category: "fruits",
  },
  {
    id: "3",
    name: "Green Peas",
    price: 3.49,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Peas.jpg-JLEaHi0fs9kLwz6RWzv8kdbbmruzA0.jpeg",
    category: "vegetables",
  },
  {
    id: "4",
    name: "Green Bell Peppers",
    price: 1.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2116_1.jpg-ZSIidB1xwCXnKCPg9J08JbdTQYfWjs.jpeg",
    category: "vegetables",
  },
]

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState("name-asc")

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
    .filter((product) => category === "all" || product.category === category)
    .sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Our Products</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort">Sort By</Label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>
      <ProductGrid products={filteredProducts} />
    </div>
  )
}

