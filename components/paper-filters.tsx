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
  isMobile: boolean
}

export function PaperFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
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
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" className="text-amber-900 border-amber-900/50" />
            <Label htmlFor="all" className="text-amber-800">
              All ratings
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5" id="r5" className="text-amber-900 border-amber-900/50" />
            <Label htmlFor="r5" className="text-amber-800">
              5 stars only
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="r4" className="text-amber-900 border-amber-900/50" />
            <Label htmlFor="r4" className="text-amber-800">
              4+ stars
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="r3" className="text-amber-900 border-amber-900/50" />
            <Label htmlFor="r3" className="text-amber-800">
              3+ stars
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium text-amber-900 mb-3">Time Period</h4>
        <RadioGroup defaultValue="all" className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="t-all" className="text-amber-900 border-amber-900/50" />
            <Label htmlFor="t-all" className="text-amber-800">
              All periods
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pre-1900" id="t-pre1900" className="text-amber-900 border-amber-900/50" />
            <Label htmlFor="t-pre1900" className="text-amber-800">
              Pre-1900
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1900-1950" id="t-1900-1950" className="text-amber-900 border-amber-900/50" />
            <Label htmlFor="t-1900-1950" className="text-amber-800">
              1900-1950
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1950-2000" id="t-1950-2000" className="text-amber-900 border-amber-900/50" />
            <Label htmlFor="t-1950-2000" className="text-amber-800">
              1950-2000
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
