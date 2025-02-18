"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Printer, Trash2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HotelBillApp() {
  const [customerName, setCustomerName] = useState("")
  const [roomNumber, setRoomNumber] = useState("")
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [items, setItems] = useState([
    { description: "Room Charge", amount: 0 },
    { description: "Room Service", amount: 0 },
    { description: "Mini Bar", amount: 0 },
  ])

  const addItem = () => {
    setItems([...items, { description: "", amount: 0 }])
  }

  const updateItem = (index: number, field: "description" | "amount", value: string | number) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const subtotal = items.reduce((sum, item) => sum + Number(item.amount), 0)
  const tax = subtotal * 0.1 // Assuming 10% tax
  const total = subtotal + tax

  const printReceipt = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden print:shadow-none">
        <div className="px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:from-blue-700 dark:to-purple-800 print:bg-none print:text-black relative">
          <h1 className="text-3xl font-bold font-serif">Luxury Hotel</h1>
          <p className="text-sm">123 Elegant Street, Cityville, State 12345</p>
          <p className="text-sm">Phone: (555) 123-4567 | Email: info@luxuryhotel.com</p>
          <div className="absolute top-4 right-4 print:hidden">
            <ThemeToggle />
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 font-serif dark:text-white">Guest Bill</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="customerName" className="dark:text-gray-300">
                Guest Name
              </Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter guest name"
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="roomNumber" className="dark:text-gray-300">
                Room Number
              </Label>
              <Input
                id="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="Enter room number"
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="checkInDate" className="dark:text-gray-300">
                Check-in Date
              </Label>
              <Input
                id="checkInDate"
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="checkOutDate" className="dark:text-gray-300">
                Check-out Date
              </Label>
              <Input
                id="checkOutDate"
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 font-serif dark:text-white">Bill Items</h3>
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  value={item.description}
                  onChange={(e) => updateItem(index, "description", e.target.value)}
                  placeholder="Item description"
                  className="flex-grow dark:bg-gray-700 dark:text-white"
                />
                <Input
                  type="number"
                  value={item.amount}
                  onChange={(e) => updateItem(index, "amount", Number(e.target.value))}
                  placeholder="Amount"
                  className="w-24 dark:bg-gray-700 dark:text-white"
                />
                <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addItem} className="mt-2">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>

          <div className="border-t dark:border-gray-600 pt-4">
            <div className="flex justify-between mb-2 dark:text-gray-300">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 dark:text-gray-300">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg dark:text-white">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50 dark:bg-gray-700 print:bg-white">
          <Button onClick={printReceipt} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" /> Print Receipt
          </Button>
        </div>
      </div>
    </div>
  )
}

