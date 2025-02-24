"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "./cart-provider"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

export default function CartSheet({ onClose }: { onClose: () => void }) {
  const { items, removeItem, updateQuantity, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-lg font-medium">Your cart is empty</p>
        <Button onClick={onClose}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto py-6">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <div className="flex gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-md">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="text-base font-medium">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <motion.span
                      key={item.quantity}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="w-8 text-center"
                    >
                      {item.quantity}
                    </motion.span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border-t pt-4">
        <div className="flex justify-between text-base font-medium">
          <p>Total</p>
          <motion.p key={total} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            {formatPrice(total)}
          </motion.p>
        </div>
        <Button className="mt-6 w-full" size="lg">
          Checkout
        </Button>
      </motion.div>
    </div>
  )
}

