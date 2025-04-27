"use client"

import { useState } from "react"
import { BookOpen, Filter, Search, SortAsc } from "lucide-react"
import Link from "next/link"
import {readex} from "../layout"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PaperCard } from "@/components/paper-card"
import { PaperFilters } from "@/components/paper-filters"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { papers } from "./papers"
import Nav from "@/components/nav"

export default function PapersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("all")
  const [sortBy, setSortBy] = useState("year")

  const inTimePeriod = (year: number, period: string) => {
    if (period === "all") return true
    const [start, end] = period.split("-")
    const s = parseInt(start, 10)
    const e = end ? parseInt(end, 10) : new Date().getFullYear()
    return year >= s && year <= e
  }

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      [...paper.optimist_justification,
         ...paper.devils_advocate_justification,
         ...paper.synthesizer_justification]
        .some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || paper.category === selectedCategory

    // scale to 0–5
    const starRating = paper.scores.total / 35 * 5
    const matchesRating = selectedRating === "all"
      ? true
      : starRating >= Number(selectedRating)

    const matchesPeriod = inTimePeriod(paper.year, selectedTimePeriod)

    return matchesSearch && matchesCategory && matchesRating && matchesPeriod
  })

  const sortedPapers = [...filteredPapers].sort((a, b) => {
    if (sortBy === "year") return a.year - b.year
    if (sortBy === "yearDesc") return b.year - a.year
    if (sortBy === "rating") {
      const ra = a.scores.total / 35 * 5
      const rb = b.scores.total / 35 * 5
      return rb - ra
    }
    if (sortBy === "title") return a.title.localeCompare(b.title)
    return 0
  })

  const categories = ["all", ...new Set(papers.map((p) => p.category))]

  return (
    <div className="min-h-screen bg-amber-50">
      <Nav/>

      <main className="container px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* mobile filters sheet */}
          <Sheet></Sheet>

          {/* desktop filters */}
          <div className="hidden md:block w-64 …">
            <PaperFilters
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              selectedTimePeriod={selectedTimePeriod}
              setSelectedTimePeriod={setSelectedTimePeriod}
              isMobile={false}
            />
          </div>

          {/* content */}
          <div className="flex-1">
            {/* ─── search + sort row ───────────────────────────── */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h2 className={`${readex.className} text-2xl font-serif tracking-tight text-amber-900`}>Research Papers</h2>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-amber-900/50"/>
                  <Input
                    type="search"
                    placeholder="Search papers…"
                    className="pl-8 border-amber-900/20 bg-amber-100"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 border-amber-900/20 bg-amber-100">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4"/>
                      <SelectValue placeholder="Sort by"/>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-amber-900/20">
                    <SelectItem value="year">Year (Oldest first)</SelectItem>
                    <SelectItem value="yearDesc">Year (Newest first)</SelectItem>
                    <SelectItem value="rating">Rating (Highest first)</SelectItem>
                    <SelectItem value="title">Title (A–Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {sortedPapers.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {sortedPapers.map(paper => (
                  <PaperCard
                    key={paper.id}
                    id={paper.id}
                    title={paper.title}
                    author={paper.author}
                    year={paper.year}
                    category={paper.category}
                    rating={Number((paper.scores.total/35*5).toFixed(1))}
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
                    setSelectedTimePeriod("all")
                    setSortBy("year")
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
