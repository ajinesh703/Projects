"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProgressWheel } from "@/components/progress-wheel"

export function Calculator() {
  const [principal, setPrincipal] = useState<number>(1000)
  const [rate, setRate] = useState<number>(5)
  const [time, setTime] = useState<number>(5)
  const [compound, setCompound] = useState<number>(12)
  const [result, setResult] = useState<number | null>(null)

  const calculateCompoundInterest = () => {
    const amount = principal * Math.pow(1 + rate / (100 * compound), compound * time)
    setResult(Number(amount.toFixed(2)))
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Calculate Your Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="principal">Principal Amount</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input id="rate" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Time (years)</Label>
            <Input id="time" type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="compound">Compound Frequency</Label>
            <Select onValueChange={(value) => setCompound(Number(value))}>
              <SelectTrigger id="compound">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Annually</SelectItem>
                <SelectItem value="2">Semi-Annually</SelectItem>
                <SelectItem value="4">Quarterly</SelectItem>
                <SelectItem value="12">Monthly</SelectItem>
                <SelectItem value="365">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculateCompoundInterest}>Calculate</Button>
          {result && (
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold">Final Amount: ${result.toLocaleString()}</p>
              <ProgressWheel initialValue={principal} finalValue={result} duration={1500} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

