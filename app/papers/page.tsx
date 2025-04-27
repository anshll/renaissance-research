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
const papers = [
  {
    id: 1,
    title: "On the Electrodynamics of Moving Bodies",
    author: "Albert Einstein",
    year: "1905",
    category: "Physics",
    rating: 5,
    summary: "A groundbreaking paper that introduced the special theory of relativity.",
    relevance: "High relevance to modern physics and our understanding of spacetime.",
  },
  {
    id: 2,
    title: "A Mathematical Theory of Communication",
    author: "Claude Shannon",
    year: "1948",
    category: "Information Theory",
    rating: 5,
    summary: "Established the field of information theory and introduced the concept of bits.",
    relevance: "Foundational to all modern digital communication and computing.",
  },
  {
    id: 3,
    title: "The Cathedral and the Bazaar",
    author: "Eric S. Raymond",
    year: "1997",
    category: "Computer Science",
    rating: 4,
    summary: "Analysis of open-source development models contrasting traditional corporate development.",
    relevance: "Shaped modern software development practices and open-source communities.",
  },
  {
    id: 4,
    title: "On Computable Numbers",
    author: "Alan Turing",
    year: "1936",
    category: "Computer Science",
    rating: 5,
    summary: "Introduced the concept of the Turing machine and computability.",
    relevance: "Foundational to theoretical computer science and artificial intelligence.",
  },
  {
    id: 5,
    title: "A Study in Scarlet",
    author: "Arthur Conan Doyle",
    year: "1887",
    category: "Literature",
    rating: 3,
    summary: "The first appearance of Sherlock Holmes, introducing deductive reasoning methods.",
    relevance: "Influenced forensic science and logical problem-solving approaches.",
  },
  {
    id: 6,
    title: "The Tragedy of the Commons",
    author: "Garrett Hardin",
    year: "1968",
    category: "Economics",
    rating: 4,
    summary: "Analysis of how individual interests can work against the common good with shared resources.",
    relevance: "Highly relevant to modern environmental and resource management challenges.",
  },
  {
    id: 7,
    title: "The Strength of Weak Ties",
    author: "Mark Granovetter",
    year: "1973",
    category: "Sociology",
    rating: 4,
    summary: "Explores how weak social connections can be more valuable than strong ties in certain contexts.",
    relevance: "Foundational to understanding modern social networks and information diffusion.",
  },
  {
    id: 8,
    title: "Silent Spring",
    author: "Rachel Carson",
    year: "1962",
    category: "Environmental Science",
    rating: 5,
    summary: "Documented the detrimental effects of pesticides on the environment.",
    relevance: "Sparked the modern environmental movement and influenced policy changes.",
  },
  {
    id: 9,
    title: "The Structure of Scientific Revolutions",
    author: "Thomas Kuhn",
    year: "1962",
    category: "Philosophy of Science",
    rating: 5,
    summary: "Introduced the concept of paradigm shifts in scientific progress.",
    relevance: "Changed how we understand scientific advancement and knowledge evolution.",
  },
]

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
      paper.summary.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || paper.category === selectedCategory
    const matchesRating = selectedRating === "all" || paper.rating >= Number.parseInt(selectedRating)

    return matchesSearch && matchesCategory && matchesRating
  })

  // Sort papers
  const sortedPapers = [...filteredPapers].sort((a, b) => {
    if (sortBy === "year") {
      return Number.parseInt(a.year) - Number.parseInt(b.year)
    } else if (sortBy === "yearDesc") {
      return Number.parseInt(b.year) - Number.parseInt(a.year)
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  // Get unique categories for filter
  const categories = ["all", ...new Set(papers.map((paper) => paper.category))]

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="border-b border-amber-900/20 bg-amber-100">
        <div className="container px-4 py-6 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-amber-900" />
              <Link href="/">
                <h1 className="text-2xl font-serif font-bold tracking-tight text-amber-900">Renaissance Research</h1>
              </Link>
            </div>
            <nav className="flex gap-4">
              <Link href="/" className="text-amber-900 font-medium hover:text-amber-700 transition-colors">
                Home
              </Link>
              <Link
                href="/papers"
                className="text-amber-900 font-medium hover:text-amber-700 transition-colors font-bold"
              >
                Papers
              </Link>
              <Link href="/about" className="text-amber-900 font-medium hover:text-amber-700 transition-colors">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

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
                    key={paper.id}
                    title={paper.title}
                    author={paper.author}
                    year={paper.year}
                    category={paper.category}
                    rating={paper.rating}
                    summary={paper.summary}
                    relevance={paper.relevance}
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
