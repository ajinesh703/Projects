"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalculatorIcon, Ruler, Zap, Droplets, Building, Atom, History, Sun, Moon } from "lucide-react"

export function Calculator() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [display, setDisplay] = useState("0")
  const [memory, setMemory] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [unitFrom, setUnitFrom] = useState("m")
  const [unitTo, setUnitTo] = useState("ft")
  const [unitValue, setUnitValue] = useState("1")
  const [unitResult, setUnitResult] = useState("")

  // Electrical calculator state
  const [voltage, setVoltage] = useState("220")
  const [current, setCurrent] = useState("10")
  const [resistance, setResistance] = useState("22")
  const [power, setPower] = useState("2200")
  const [electricalMode, setElectricalMode] = useState("ohms")

  // Structural calculator state
  const [beamLength, setBeamLength] = useState("5")
  const [beamLoad, setBeamLoad] = useState("1000")
  const [beamType, setBeamType] = useState("simply-supported")
  const [beamResult, setBeamResult] = useState("")

  // Fluid dynamics state
  const [fluidDensity, setFluidDensity] = useState("1000")
  const [fluidVelocity, setFluidVelocity] = useState("2")
  const [fluidPipeDiameter, setFluidPipeDiameter] = useState("0.1")
  const [fluidResult, setFluidResult] = useState("")

  // Chemical engineering state
  const [reactionRate, setReactionRate] = useState("0.05")
  const [concentration, setConcentration] = useState("2")
  const [reactionOrder, setReactionOrder] = useState("1")
  const [chemicalResult, setChemicalResult] = useState("")

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Basic calculator functions
  const clearDisplay = () => {
    setDisplay("0")
    setWaitingForOperand(false)
  }

  const clearAll = () => {
    clearDisplay()
    setOperation(null)
    setMemory(null)
  }

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (memory === null) {
      setMemory(inputValue)
    } else if (operation) {
      const currentValue = memory || 0
      let newValue = 0

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue
          break
        case "-":
          newValue = currentValue - inputValue
          break
        case "×":
          newValue = currentValue * inputValue
          break
        case "÷":
          newValue = currentValue / inputValue
          break
        case "^":
          newValue = Math.pow(currentValue, inputValue)
          break
        default:
          newValue = inputValue
      }

      setMemory(newValue)
      setDisplay(String(newValue))
      setHistory([...history, `${currentValue} ${operation} ${inputValue} = ${newValue}`])
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculateResult = () => {
    if (!memory || !operation) return

    const inputValue = Number.parseFloat(display)
    let newValue = 0

    switch (operation) {
      case "+":
        newValue = memory + inputValue
        break
      case "-":
        newValue = memory - inputValue
        break
      case "×":
        newValue = memory * inputValue
        break
      case "÷":
        newValue = memory / inputValue
        break
      case "^":
        newValue = Math.pow(memory, inputValue)
        break
      default:
        newValue = inputValue
    }

    setHistory([...history, `${memory} ${operation} ${inputValue} = ${newValue}`])
    setDisplay(String(newValue))
    setMemory(null)
    setOperation(null)
    setWaitingForOperand(true)
  }

  const performScientificOperation = (op: string) => {
    const inputValue = Number.parseFloat(display)
    let result = 0

    switch (op) {
      case "sin":
        result = Math.sin(inputValue * (Math.PI / 180)) // Convert to radians
        break
      case "cos":
        result = Math.cos(inputValue * (Math.PI / 180))
        break
      case "tan":
        result = Math.tan(inputValue * (Math.PI / 180))
        break
      case "log":
        result = Math.log10(inputValue)
        break
      case "ln":
        result = Math.log(inputValue)
        break
      case "sqrt":
        result = Math.sqrt(inputValue)
        break
      case "square":
        result = Math.pow(inputValue, 2)
        break
      case "1/x":
        result = 1 / inputValue
        break
      case "e^x":
        result = Math.exp(inputValue)
        break
      case "pi":
        result = Math.PI
        break
    }

    setHistory([...history, `${op}(${inputValue}) = ${result}`])
    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  // Unit conversion function
  const convertUnit = () => {
    const value = Number.parseFloat(unitValue)
    let result = 0

    // Length conversions
    const lengthConversions: Record<string, Record<string, number>> = {
      m: { ft: 3.28084, in: 39.3701, cm: 100, km: 0.001, mi: 0.000621371 },
      ft: { m: 0.3048, in: 12, cm: 30.48, km: 0.0003048, mi: 0.000189394 },
      in: { m: 0.0254, ft: 0.0833333, cm: 2.54, km: 0.0000254, mi: 0.0000157828 },
      cm: { m: 0.01, ft: 0.0328084, in: 0.393701, km: 0.00001, mi: 0.00000621371 },
      km: { m: 1000, ft: 3280.84, in: 39370.1, cm: 100000, mi: 0.621371 },
      mi: { m: 1609.34, ft: 5280, in: 63360, cm: 160934, km: 1.60934 },
    }

    // Weight conversions
    const weightConversions: Record<string, Record<string, number>> = {
      kg: { lb: 2.20462, g: 1000, oz: 35.274, ton: 0.001 },
      lb: { kg: 0.453592, g: 453.592, oz: 16, ton: 0.0005 },
      g: { kg: 0.001, lb: 0.00220462, oz: 0.035274, ton: 0.000001 },
      oz: { kg: 0.0283495, lb: 0.0625, g: 28.3495, ton: 0.00003125 },
      ton: { kg: 1000, lb: 2204.62, g: 1000000, oz: 35274 },
    }

    // Temperature conversions
    const tempConversions: Record<string, Record<string, (v: number) => number>> = {
      C: {
        F: (c) => (c * 9) / 5 + 32,
        K: (c) => c + 273.15,
      },
      F: {
        C: (f) => ((f - 32) * 5) / 9,
        K: (f) => ((f - 32) * 5) / 9 + 273.15,
      },
      K: {
        C: (k) => k - 273.15,
        F: (k) => ((k - 273.15) * 9) / 5 + 32,
      },
    }

    // Pressure conversions
    const pressureConversions: Record<string, Record<string, number>> = {
      Pa: { kPa: 0.001, MPa: 0.000001, bar: 0.00001, psi: 0.000145038 },
      kPa: { Pa: 1000, MPa: 0.001, bar: 0.01, psi: 0.145038 },
      MPa: { Pa: 1000000, kPa: 1000, bar: 10, psi: 145.038 },
      bar: { Pa: 100000, kPa: 100, MPa: 0.1, psi: 14.5038 },
      psi: { Pa: 6894.76, kPa: 6.89476, MPa: 0.00689476, bar: 0.0689476 },
    }

    // Perform conversion based on unit types
    if (lengthConversions[unitFrom] && lengthConversions[unitFrom][unitTo]) {
      result = value * lengthConversions[unitFrom][unitTo]
    } else if (weightConversions[unitFrom] && weightConversions[unitFrom][unitTo]) {
      result = value * weightConversions[unitFrom][unitTo]
    } else if (tempConversions[unitFrom] && tempConversions[unitFrom][unitTo]) {
      result = tempConversions[unitFrom][unitTo](value)
    } else if (pressureConversions[unitFrom] && pressureConversions[unitFrom][unitTo]) {
      result = value * pressureConversions[unitFrom][unitTo]
    } else {
      setUnitResult("Conversion not supported")
      return
    }

    setUnitResult(`${value} ${unitFrom} = ${result.toFixed(6)} ${unitTo}`)
  }

  // Electrical calculations
  const calculateElectrical = () => {
    const v = Number.parseFloat(voltage)
    const i = Number.parseFloat(current)
    const r = Number.parseFloat(resistance)
    const p = Number.parseFloat(power)

    switch (electricalMode) {
      case "ohms":
        // Calculate using Ohm's Law: V = I * R
        if (!isNaN(v) && !isNaN(i)) {
          setResistance((v / i).toFixed(2))
          setPower((v * i).toFixed(2))
        } else if (!isNaN(v) && !isNaN(r)) {
          setCurrent((v / r).toFixed(2))
          setPower(((v * v) / r).toFixed(2))
        } else if (!isNaN(i) && !isNaN(r)) {
          setVoltage((i * r).toFixed(2))
          setPower((i * i * r).toFixed(2))
        }
        break
      case "power":
        // Calculate using Power: P = V * I = I² * R = V² / R
        if (!isNaN(p) && !isNaN(i)) {
          setVoltage((p / i).toFixed(2))
          setResistance((p / (i * i)).toFixed(2))
        } else if (!isNaN(p) && !isNaN(v)) {
          setCurrent((p / v).toFixed(2))
          setResistance(((v * v) / p).toFixed(2))
        } else if (!isNaN(p) && !isNaN(r)) {
          setCurrent(Math.sqrt(p / r).toFixed(2))
          setVoltage(Math.sqrt(p * r).toFixed(2))
        }
        break
    }
  }

  // Structural beam calculations
  const calculateBeam = () => {
    const length = Number.parseFloat(beamLength)
    const load = Number.parseFloat(beamLoad)

    if (isNaN(length) || isNaN(load)) {
      setBeamResult("Please enter valid numbers")
      return
    }

    let maxDeflection = 0
    let maxMoment = 0

    switch (beamType) {
      case "simply-supported":
        // For uniformly distributed load
        maxDeflection = (5 * load * Math.pow(length, 4)) / (384 * 200e9 * 1e-4) // Assuming E*I = 200e9 * 1e-4
        maxMoment = (load * Math.pow(length, 2)) / 8
        break
      case "cantilever":
        // For point load at end
        maxDeflection = (load * Math.pow(length, 3)) / (3 * 200e9 * 1e-4)
        maxMoment = load * length
        break
      case "fixed-ends":
        // For uniformly distributed load
        maxDeflection = (load * Math.pow(length, 4)) / (384 * 200e9 * 1e-4)
        maxMoment = (load * Math.pow(length, 2)) / 12
        break
    }

    setBeamResult(`Max Deflection: ${maxDeflection.toFixed(4)} m\nMax Moment: ${maxMoment.toFixed(2)} N·m`)
  }

  // Fluid dynamics calculations
  const calculateFluid = () => {
    const density = Number.parseFloat(fluidDensity)
    const velocity = Number.parseFloat(fluidVelocity)
    const diameter = Number.parseFloat(fluidPipeDiameter)

    if (isNaN(density) || isNaN(velocity) || isNaN(diameter)) {
      setFluidResult("Please enter valid numbers")
      return
    }

    // Calculate Reynolds number (Re = ρvD/μ), assuming water viscosity
    const viscosity = 0.001 // Pa·s for water at 20°C
    const reynolds = (density * velocity * diameter) / viscosity

    // Calculate pressure drop using Darcy-Weisbach equation
    // Δp = f * (L/D) * (ρv²/2)
    // Assuming pipe length of 10m and friction factor based on Reynolds number
    const length = 10 // m

    // Simplified friction factor calculation
    let frictionFactor = 0
    if (reynolds < 2000) {
      frictionFactor = 64 / reynolds // Laminar flow
    } else {
      // Simplified Colebrook equation for turbulent flow
      frictionFactor = 0.316 * Math.pow(reynolds, -0.25)
    }

    const pressureDrop = frictionFactor * (length / diameter) * ((density * Math.pow(velocity, 2)) / 2)

    // Calculate flow rate Q = v * A
    const area = Math.PI * Math.pow(diameter / 2, 2)
    const flowRate = velocity * area

    setFluidResult(
      `Reynolds Number: ${reynolds.toFixed(0)}\n` +
        `Flow Regime: ${reynolds < 2000 ? "Laminar" : reynolds < 4000 ? "Transitional" : "Turbulent"}\n` +
        `Pressure Drop: ${pressureDrop.toFixed(2)} Pa\n` +
        `Flow Rate: ${flowRate.toFixed(4)} m³/s`,
    )
  }

  // Chemical engineering calculations
  const calculateChemical = () => {
    const k = Number.parseFloat(reactionRate)
    const c = Number.parseFloat(concentration)
    const n = Number.parseFloat(reactionOrder)

    if (isNaN(k) || isNaN(c) || isNaN(n)) {
      setChemicalResult("Please enter valid numbers")
      return
    }

    // Calculate reaction rate using rate = k * [A]^n
    const rate = k * Math.pow(c, n)

    // Calculate half-life for different reaction orders
    let halfLife = 0
    if (n === 1) {
      // First-order: t1/2 = ln(2)/k
      halfLife = Math.log(2) / k
    } else if (n === 2) {
      // Second-order: t1/2 = 1/(k*[A]0)
      halfLife = 1 / (k * c)
    } else if (n === 0) {
      // Zero-order: t1/2 = [A]0/(2*k)
      halfLife = c / (2 * k)
    } else {
      halfLife = Number.NaN // Not easily calculated for other orders
    }

    setChemicalResult(
      `Reaction Rate: ${rate.toFixed(6)} mol/(L·s)\n` +
        `Half-life: ${!isNaN(halfLife) ? halfLife.toFixed(4) + " s" : "Not applicable for this order"}`,
    )
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Engineering Calculator</h1>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} aria-label="Toggle dark mode" />
          <Moon className="h-4 w-4" />
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
          <TabsTrigger value="basic" className="flex items-center gap-1">
            <CalculatorIcon className="h-4 w-4" />
            <span className="hidden md:inline">Basic</span>
          </TabsTrigger>
          <TabsTrigger value="scientific" className="flex items-center gap-1">
            <Atom className="h-4 w-4" />
            <span className="hidden md:inline">Scientific</span>
          </TabsTrigger>
          <TabsTrigger value="units" className="flex items-center gap-1">
            <Ruler className="h-4 w-4" />
            <span className="hidden md:inline">Units</span>
          </TabsTrigger>
          <TabsTrigger value="electrical" className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span className="hidden md:inline">Electrical</span>
          </TabsTrigger>
          <TabsTrigger value="structural" className="flex items-center gap-1">
            <Building className="h-4 w-4" />
            <span className="hidden md:inline">Structural</span>
          </TabsTrigger>
          <TabsTrigger value="fluid" className="flex items-center gap-1">
            <Droplets className="h-4 w-4" />
            <span className="hidden md:inline">Fluid/Chemical</span>
          </TabsTrigger>
        </TabsList>

        {/* Basic Calculator */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Calculator</CardTitle>
              <CardDescription>Perform basic arithmetic operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between">
                  <Input value={display} readOnly className="text-right text-2xl font-mono" />
                  <Button variant="outline" size="icon" onClick={() => setHistory([])} title="Clear history">
                    <History className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" onClick={clearAll}>
                    AC
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setDisplay(display.charAt(0) === "-" ? display.substring(1) : "-" + display)}
                  >
                    +/-
                  </Button>
                  <Button variant="outline" onClick={() => performOperation("%")}>
                    %
                  </Button>
                  <Button variant="secondary" onClick={() => performOperation("÷")}>
                    ÷
                  </Button>

                  <Button variant="outline" onClick={() => inputDigit("7")}>
                    7
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("8")}>
                    8
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("9")}>
                    9
                  </Button>
                  <Button variant="secondary" onClick={() => performOperation("×")}>
                    ×
                  </Button>

                  <Button variant="outline" onClick={() => inputDigit("4")}>
                    4
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("5")}>
                    5
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("6")}>
                    6
                  </Button>
                  <Button variant="secondary" onClick={() => performOperation("-")}>
                    -
                  </Button>

                  <Button variant="outline" onClick={() => inputDigit("1")}>
                    1
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("2")}>
                    2
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("3")}>
                    3
                  </Button>
                  <Button variant="secondary" onClick={() => performOperation("+")}>
                    +
                  </Button>

                  <Button variant="outline" onClick={() => inputDigit("0")} className="col-span-2">
                    0
                  </Button>
                  <Button variant="outline" onClick={inputDecimal}>
                    .
                  </Button>
                  <Button variant="primary" onClick={calculateResult}>
                    =
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <History className="h-4 w-4" /> Calculation History
                </h3>
                <ScrollArea className="h-24 w-full rounded-md border p-2">
                  {history.length > 0 ? (
                    <ul className="space-y-1">
                      {history.map((item, index) => (
                        <li key={index} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No calculations yet</p>
                  )}
                </ScrollArea>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Scientific Calculator */}
        <TabsContent value="scientific">
          <Card>
            <CardHeader>
              <CardTitle>Scientific Calculator</CardTitle>
              <CardDescription>Advanced mathematical functions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Input value={display} readOnly className="text-right text-2xl font-mono" />

                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" onClick={clearAll}>
                    AC
                  </Button>
                  <Button variant="outline" onClick={() => performScientificOperation("pi")}>
                    π
                  </Button>
                  <Button variant="outline" onClick={() => performOperation("^")}>
                    x^y
                  </Button>
                  <Button variant="secondary" onClick={() => performOperation("÷")}>
                    ÷
                  </Button>

                  <Button variant="outline" onClick={() => performScientificOperation("sin")}>
                    sin
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("7")}>
                    7
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("8")}>
                    8
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("9")}>
                    9
                  </Button>

                  <Button variant="outline" onClick={() => performScientificOperation("cos")}>
                    cos
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("4")}>
                    4
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("5")}>
                    5
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("6")}>
                    6
                  </Button>

                  <Button variant="outline" onClick={() => performScientificOperation("tan")}>
                    tan
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("1")}>
                    1
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("2")}>
                    2
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("3")}>
                    3
                  </Button>

                  <Button variant="outline" onClick={() => performScientificOperation("log")}>
                    log
                  </Button>
                  <Button variant="outline" onClick={() => inputDigit("0")}>
                    0
                  </Button>
                  <Button variant="outline" onClick={inputDecimal}>
                    .
                  </Button>
                  <Button variant="primary" onClick={calculateResult}>
                    =
                  </Button>

                  <Button variant="outline" onClick={() => performScientificOperation("ln")}>
                    ln
                  </Button>
                  <Button variant="outline" onClick={() => performScientificOperation("sqrt")}>
                    √
                  </Button>
                  <Button variant="outline" onClick={() => performScientificOperation("square")}>
                    x²
                  </Button>
                  <Button variant="outline" onClick={() => performScientificOperation("1/x")}>
                    1/x
                  </Button>

                  <Button variant="outline" onClick={() => performScientificOperation("e^x")}>
                    e^x
                  </Button>
                  <Button variant="secondary" onClick={() => performOperation("×")}>
                    ×
                  </Button>
                  <Button variant="secondary" onClick={() => performOperation("-")}>
                    -
                  </Button>
                  <Button variant="secondary" onClick={() => performOperation("+")}>
                    +
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Unit Converter */}
        <TabsContent value="units">
          <Card>
            <CardHeader>
              <CardTitle>Unit Converter</CardTitle>
              <CardDescription>Convert between different units of measurement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unit-type">Unit Type</Label>
                    <Select defaultValue="length">
                      <SelectTrigger id="unit-type">
                        <SelectValue placeholder="Select unit type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="length">Length</SelectItem>
                        <SelectItem value="weight">Weight</SelectItem>
                        <SelectItem value="temperature">Temperature</SelectItem>
                        <SelectItem value="pressure">Pressure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit-from">From</Label>
                    <Select value={unitFrom} onValueChange={setUnitFrom}>
                      <SelectTrigger id="unit-from">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="m">Meter (m)</SelectItem>
                        <SelectItem value="cm">Centimeter (cm)</SelectItem>
                        <SelectItem value="km">Kilometer (km)</SelectItem>
                        <SelectItem value="in">Inch (in)</SelectItem>
                        <SelectItem value="ft">Foot (ft)</SelectItem>
                        <SelectItem value="mi">Mile (mi)</SelectItem>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="g">Gram (g)</SelectItem>
                        <SelectItem value="lb">Pound (lb)</SelectItem>
                        <SelectItem value="oz">Ounce (oz)</SelectItem>
                        <SelectItem value="ton">Metric Ton (t)</SelectItem>
                        <SelectItem value="C">Celsius (°C)</SelectItem>
                        <SelectItem value="F">Fahrenheit (°F)</SelectItem>
                        <SelectItem value="K">Kelvin (K)</SelectItem>
                        <SelectItem value="Pa">Pascal (Pa)</SelectItem>
                        <SelectItem value="kPa">Kilopascal (kPa)</SelectItem>
                        <SelectItem value="MPa">Megapascal (MPa)</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="psi">PSI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit-to">To</Label>
                    <Select value={unitTo} onValueChange={setUnitTo}>
                      <SelectTrigger id="unit-to">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="m">Meter (m)</SelectItem>
                        <SelectItem value="cm">Centimeter (cm)</SelectItem>
                        <SelectItem value="km">Kilometer (km)</SelectItem>
                        <SelectItem value="in">Inch (in)</SelectItem>
                        <SelectItem value="ft">Foot (ft)</SelectItem>
                        <SelectItem value="mi">Mile (mi)</SelectItem>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="g">Gram (g)</SelectItem>
                        <SelectItem value="lb">Pound (lb)</SelectItem>
                        <SelectItem value="oz">Ounce (oz)</SelectItem>
                        <SelectItem value="ton">Metric Ton (t)</SelectItem>
                        <SelectItem value="C">Celsius (°C)</SelectItem>
                        <SelectItem value="F">Fahrenheit (°F)</SelectItem>
                        <SelectItem value="K">Kelvin (K)</SelectItem>
                        <SelectItem value="Pa">Pascal (Pa)</SelectItem>
                        <SelectItem value="kPa">Kilopascal (kPa)</SelectItem>
                        <SelectItem value="MPa">Megapascal (MPa)</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="psi">PSI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="unit-value">Value</Label>
                    <Input
                      id="unit-value"
                      type="number"
                      value={unitValue}
                      onChange={(e) => setUnitValue(e.target.value)}
                    />
                  </div>
                  <Button onClick={convertUnit} className="md:col-span-2">
                    Convert
                  </Button>
                </div>

                <div className="p-4 border rounded-md bg-muted">
                  <p className="font-mono">{unitResult || "Result will appear here"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Electrical Engineering */}
        <TabsContent value="electrical">
          <Card>
            <CardHeader>
              <CardTitle>Electrical Engineering</CardTitle>
              <CardDescription>Calculate electrical parameters using Ohm's Law and Power equations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="electrical-mode">Calculation Mode</Label>
                    <Select value={electricalMode} onValueChange={setElectricalMode}>
                      <SelectTrigger id="electrical-mode">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ohms">Ohm's Law (V=IR)</SelectItem>
                        <SelectItem value="power">Power (P=VI)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Button onClick={calculateElectrical} className="w-full mt-6">
                      Calculate
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="voltage">Voltage (V)</Label>
                    <Input id="voltage" type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current">Current (A)</Label>
                    <Input id="current" type="number" value={current} onChange={(e) => setCurrent(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resistance">Resistance (Ω)</Label>
                    <Input
                      id="resistance"
                      type="number"
                      value={resistance}
                      onChange={(e) => setResistance(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="power">Power (W)</Label>
                    <Input id="power" type="number" value={power} onChange={(e) => setPower(e.target.value)} />
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Formulas:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Ohm's Law: V = I × R</li>
                    <li>Power: P = V × I = I² × R = V² ÷ R</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Structural Engineering */}
        <TabsContent value="structural">
          <Card>
            <CardHeader>
              <CardTitle>Structural Engineering</CardTitle>
              <CardDescription>Beam deflection and moment calculations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beam-type">Beam Type</Label>
                    <Select value={beamType} onValueChange={setBeamType}>
                      <SelectTrigger id="beam-type">
                        <SelectValue placeholder="Select beam type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simply-supported">Simply Supported</SelectItem>
                        <SelectItem value="cantilever">Cantilever</SelectItem>
                        <SelectItem value="fixed-ends">Fixed Ends</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="beam-length">Beam Length (m)</Label>
                    <Input
                      id="beam-length"
                      type="number"
                      value={beamLength}
                      onChange={(e) => setBeamLength(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="beam-load">Load (N)</Label>
                    <Input
                      id="beam-load"
                      type="number"
                      value={beamLoad}
                      onChange={(e) => setBeamLoad(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={calculateBeam}>Calculate</Button>

                <div className="p-4 border rounded-md bg-muted">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {beamResult || "Results will appear here"}
                  </pre>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Beam Deflection Formulas:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Simply Supported (UDL): δ = 5wL⁴/(384EI)</li>
                    <li>Cantilever (Point Load): δ = PL³/(3EI)</li>
                    <li>Fixed Ends (UDL): δ = wL⁴/(384EI)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fluid Dynamics and Chemical Engineering */}
        <TabsContent value="fluid">
          <Tabs defaultValue="fluid" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="fluid">Fluid Dynamics</TabsTrigger>
              <TabsTrigger value="chemical">Chemical Engineering</TabsTrigger>
            </TabsList>

            <TabsContent value="fluid">
              <Card>
                <CardHeader>
                  <CardTitle>Fluid Dynamics</CardTitle>
                  <CardDescription>Calculate flow parameters and pressure drops</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fluid-density">Fluid Density (kg/m³)</Label>
                        <Input
                          id="fluid-density"
                          type="number"
                          value={fluidDensity}
                          onChange={(e) => setFluidDensity(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fluid-velocity">Flow Velocity (m/s)</Label>
                        <Input
                          id="fluid-velocity"
                          type="number"
                          value={fluidVelocity}
                          onChange={(e) => setFluidVelocity(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fluid-diameter">Pipe Diameter (m)</Label>
                        <Input
                          id="fluid-diameter"
                          type="number"
                          value={fluidPipeDiameter}
                          onChange={(e) => setFluidPipeDiameter(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button onClick={calculateFluid}>Calculate</Button>

                    <div className="p-4 border rounded-md bg-muted">
                      <pre className="whitespace-pre-wrap font-mono text-sm">
                        {fluidResult || "Results will appear here"}
                      </pre>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">Key Formulas:</h3>
                      <ul className="space-y-1 text-sm">
                        <li>Reynolds Number: Re = ρvD/μ</li>
                        <li>Pressure Drop: Δp = f(L/D)(ρv²/2)</li>
                        <li>Flow Rate: Q = vA</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chemical">
              <Card>
                <CardHeader>
                  <CardTitle>Chemical Engineering</CardTitle>
                  <CardDescription>Reaction kinetics calculations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="reaction-rate">Rate Constant k</Label>
                        <Input
                          id="reaction-rate"
                          type="number"
                          value={reactionRate}
                          onChange={(e) => setReactionRate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="concentration">Initial Concentration [A]₀ (mol/L)</Label>
                        <Input
                          id="concentration"
                          type="number"
                          value={concentration}
                          onChange={(e) => setConcentration(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reaction-order">Reaction Order</Label>
                        <Select value={reactionOrder} onValueChange={setReactionOrder}>
                          <SelectTrigger id="reaction-order">
                            <SelectValue placeholder="Select order" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Zero Order</SelectItem>
                            <SelectItem value="1">First Order</SelectItem>
                            <SelectItem value="2">Second Order</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={calculateChemical}>Calculate</Button>

                    <div className="p-4 border rounded-md bg-muted">
                      <pre className="whitespace-pre-wrap font-mono text-sm">
                        {chemicalResult || "Results will appear here"}
                      </pre>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">Reaction Kinetics Formulas:</h3>
                      <ul className="space-y-1 text-sm">
                        <li>Rate Law: rate = k[A]ⁿ</li>
                        <li>First-order Half-life: t₁/₂ = ln(2)/k</li>
                        <li>Second-order Half-life: t₁/₂ = 1/(k[A]₀)</li>
                        <li>Zero-order Half-life: t₁/₂ = [A]₀/(2k)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}

