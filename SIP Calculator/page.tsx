"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"

export default function SIPCalculator() {
  const [amount, setAmount] = useState(5000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const [result, setResult] = useState({ totalInvestment: 0, totalReturns: 0, maturityValue: 0 })
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    calculateSIP()
  }, [amount, rate, years])

  const calculateSIP = () => {
    const monthlyRate = rate / 12 / 100
    const months = years * 12
    const totalInvestment = amount * months
    const maturityValue = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
    const totalReturns = maturityValue - totalInvestment

    setResult({
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
      maturityValue: Math.round(maturityValue),
    })
  }

  const chartData = [
    { name: "Total Investment", value: result.totalInvestment },
    { name: "Total Returns", value: result.totalReturns },
  ]

  const COLORS = ["#4338ca", "#f59e0b"]

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="container mx-auto p-8 transition-colors duration-300 dark:bg-gray-900 dark:text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">SIP Calculator</h1>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
            <Moon className="h-4 w-4" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="amount">Monthly Investment (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Expected Return Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years">Time Period (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="dark:bg-gray-800"
              />
            </div>
            <Button onClick={calculateSIP} className="w-full">
              Calculate
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">Maturity Value: ₹{result.maturityValue.toLocaleString()}</p>
              <div className="flex justify-center space-x-4 mt-2">
                <p className="text-sm">
                  <span className="inline-block w-3 h-3 rounded-full bg-indigo-700 mr-1"></span>
                  Investment: ₹{result.totalInvestment.toLocaleString()}
                </p>
                <p className="text-sm">
                  <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
                  Returns: ₹{result.totalReturns.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

