"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, CheckCircle } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function AppointmentBooking() {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    doctor: "",
    reason: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Generate time slots between 10am and 2pm
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 10; hour < 14; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        slots.push(`${formattedHour}:${formattedMinute}`)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // In a real app, you would send this data to your backend
    console.log({
      ...formData,
      date: date ? format(date, "PPP") : "",
      timeSlot,
    })
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Appointment Confirmed!</CardTitle>
          <CardDescription className="text-center">Your appointment has been successfully booked</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
          <CheckCircle className="h-16 w-16 text-primary" />
          <div className="text-center">
            <p className="font-medium">{formData.name}, your appointment is scheduled for:</p>
            <p className="text-xl font-bold mt-2">
              {date ? format(date, "PPP") : ""} at {timeSlot}
            </p>
            <p className="mt-4 text-muted-foreground">
              Please arrive 15 minutes before your appointment at your selected CHS location: {formData.location}
            </p>
            <p className="mt-2 text-muted-foreground">A confirmation has been sent to your email: {formData.email}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              setIsSubmitted(false)
              setStep(1)
              setDate(undefined)
              setTimeSlot("")
              setFormData({
                name: "",
                phone: "",
                email: "",
                location: "",
                doctor: "",
                reason: "",
              })
            }}
          >
            Book Another Appointment
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Book Your Doctor Appointment</CardTitle>
        <CardDescription>Schedule a free appointment at your nearest Community Health Service</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Nearest CHS Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => handleSelectChange("location", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="central">Central CHS</SelectItem>
                    <SelectItem value="north">North CHS</SelectItem>
                    <SelectItem value="south">South CHS</SelectItem>
                    <SelectItem value="east">East CHS</SelectItem>
                    <SelectItem value="west">West CHS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => {
                        // Disable past dates and weekends
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const day = date.getDay()
                        return date < today || day === 0 || day === 6
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Select Time (10:00 AM - 2:00 PM)</Label>
                <RadioGroup
                  value={timeSlot}
                  onValueChange={setTimeSlot}
                  className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                >
                  {timeSlots.map((slot) => (
                    <div key={slot} className="flex items-center space-x-2">
                      <RadioGroupItem value={slot} id={slot} />
                      <Label htmlFor={slot}>{slot}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctor">Preferred Doctor (Optional)</Label>
                <Select value={formData.doctor} onValueChange={(value) => handleSelectChange("doctor", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any available doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any available doctor</SelectItem>
                    <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                    <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="dr-patel">Dr. Patel</SelectItem>
                    <SelectItem value="dr-wong">Dr. Wong</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Input
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your symptoms or reason"
                  required
                />
              </div>

              <div className="rounded-lg border p-4 mt-6">
                <h3 className="font-medium mb-2">Appointment Summary</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Name:</span> {formData.name}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {formData.location
                      ? `${formData.location.charAt(0).toUpperCase() + formData.location.slice(1)} CHS`
                      : ""}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span> {date ? format(date, "PPP") : ""}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {timeSlot}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={
                  (step === 1 && (!formData.name || !formData.phone || !formData.email || !formData.location)) ||
                  (step === 2 && (!date || !timeSlot))
                }
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button type="submit" className="ml-auto" disabled={!formData.reason}>
                Confirm Booking
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

