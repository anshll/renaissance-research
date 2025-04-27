"use client"

import { useState } from "react"
import { BookOpen, Filter, Search, SortAsc } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PaperCard } from "@/components/paper-card"
import { PaperFilters } from "@/components/paper-filters"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data - replace with your actual data
import { papers } from "./papers"
import Nav from "@/components/nav"

export default function PapersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [sortBy, setSortBy] = useState("year")

  // Filter papers based on search, category, and rating
  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.optimist_justification.map(s => s.toLowerCase()).includes(searchTerm.toLowerCase()) ||
      paper.devils_advocate_justification.map(s => s.toLowerCase()).includes(searchTerm.toLowerCase()) ||
      paper.synthesizer_justification.map(s => s.toLowerCase()).includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || paper.category === selectedCategory
    const matchesRating = selectedRating === "all" || paper.scores.total >= Number.parseInt(selectedRating)

    return matchesSearch && matchesCategory && matchesRating
  })

  // Sort papers
  const sortedPapers = [...filteredPapers].sort((a, b) => {
    if (sortBy === "year") {
      return a.year - b.year
    } else if (sortBy === "yearDesc") {
      return b.year - a.year
    } else if (sortBy === "rating") {
      return b.scores.total - a.scores.total
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  // Get unique categories for filter
  const categories = ["all", ...new Set(papers.map((paper) => paper.category))]

  return (
    <div className="min-h-screen bg-amber-50">
      <Nav/>

      <main className="container px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Mobile filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden flex items-center gap-2 border-amber-900 text-amber-900">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-amber-50 border-amber-900/20">
              <SheetHeader>
                <SheetTitle className="text-amber-900 font-serif">Filters</SheetTitle>
                <SheetDescription className="text-amber-800">Refine your paper search</SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <PaperFilters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedRating={selectedRating}
                  setSelectedRating={setSelectedRating}
                  isMobile={true}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop filters */}
          <div className="hidden md:block w-64 bg-amber-100 p-4 rounded-lg border border-amber-900/20">
            <h3 className="text-lg font-serif font-semibold text-amber-900 mb-4">Filters</h3>
            <PaperFilters
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              isMobile={false}
            />
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-2xl font-serif font-bold tracking-tight text-amber-900">Research Papers</h2>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-amber-900/50" />
                  <Input
                    type="search"
                    placeholder="Search papers..."
                    className="pl-8 border-amber-900/20 bg-amber-100 focus:border-amber-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 border-amber-900/20 bg-amber-100">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-amber-900/20">
                    <SelectItem value="year">Year (Oldest first)</SelectItem>
                    <SelectItem value="yearDesc">Year (Newest first)</SelectItem>
                    <SelectItem value="rating">Rating (Highest first)</SelectItem>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {sortedPapers.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {sortedPapers.map((paper) => (
                  <PaperCard
                    id={paper.id}
                    key={paper.id}
                    title={paper.title}
                    author={paper.author}
                    year={paper.year}
                    category={paper.category}
                    rating={paper.scores.total}
                    summary={paper.synthesizer_justification.join("\n")}
                    relevance={paper.takeaway}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-amber-100/50 rounded-lg border border-amber-900/10">
                <p className="text-amber-800">No papers match your search criteria.</p>
                <Button
                  variant="link"
                  className="text-amber-900 mt-2"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setSelectedRating("all")
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-amber-900/20 bg-amber-100 py-6 mt-12">
        <div className="container px-4 md:px-6 text-center text-amber-800">
          <p>© {new Date().getFullYear()} Renaissance Research. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
