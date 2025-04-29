"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { zodiacSigns } from "@/lib/zodiac-data"

export default function ZodiacSearch() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSelect = (value: string) => {
    router.push(`/zodiac/${value}`)
    setOpen(false)
  }

  return (
    <div className="max-w-md mx-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            <span className="text-muted-foreground">{searchQuery || "Search for your zodiac sign..."}</span>
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search zodiac signs..." value={searchQuery} onValueChange={setSearchQuery} />
            <CommandList>
              <CommandEmpty>No zodiac sign found.</CommandEmpty>
              <CommandGroup>
                {zodiacSigns.map((sign) => (
                  <CommandItem
                    key={sign.slug}
                    value={sign.slug}
                    onSelect={handleSelect}
                    className="flex items-center gap-2"
                  >
                    <div className="w-6 h-6">
                      <img src={`/images/${sign.slug}.svg`} alt={sign.name} className="w-full h-full" />
                    </div>
                    <span>{sign.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{sign.date}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
