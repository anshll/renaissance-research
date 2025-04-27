"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaperFiltersProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedRating: string
  setSelectedRating: (rating: string) => void
  selectedTimePeriod: string
  setSelectedTimePeriod: (timePeriod: string) => void
  isMobile: boolean
}

export function PaperFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
  selectedTimePeriod,
  setSelectedTimePeriod,
  isMobile,
}: PaperFiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-amber-900 mb-3">Category</h4>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className={`w-full border-amber-900/20 ${isMobile ? "bg-amber-50" : "bg-amber-50/80"}`}>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-amber-50 border-amber-900/20">
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h4 className="text-sm font-medium text-amber-900 mb-3">Minimum Rating</h4>
        <RadioGroup value={selectedRating} onValueChange={setSelectedRating} className="flex flex-col space-y-1">
          {[
            { value: "all", label: "All ratings" },
            { value: "5", label: "5 stars only" },
            { value: "4", label: "4+ stars" },
            { value: "3", label: "3+ stars" },
          ].map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`r-${value}`} className="text-amber-900 border-amber-900/50" />
              <Label htmlFor={`r-${value}`} className="text-amber-800">
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium text-amber-900 mb-3">Time Period</h4>
        <RadioGroup value={selectedTimePeriod} onValueChange={setSelectedTimePeriod} className="flex flex-col space-y-1">
          {[
            { value: "all", label: "All periods" },
            { value: "1979-1989", label: "1979-1989" },
            { value: "1990-1999", label: "1990-1999" },
            { value: "2000-", label: "2000-" },
          ].map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`t-${value}`} className="text-amber-900 border-amber-900/50" />
              <Label htmlFor={`t-${value}`} className="text-amber-800">
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
