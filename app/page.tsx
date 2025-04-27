import Link from "next/link"
import Nav from "@/components/nav"

import { Button } from "@/components/ui/button"
import { PaperCard } from "@/components/paper-card"
import paper_evals from "./papers/paper_evals.json"
import {readex} from "./layout"

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Nav/>
      <main>
        <section className="py-12 md:py-16 lg:py-20 bg-[url('/paper-texture.png')] bg-amber-100">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-amber-900 md:text-4xl/tight">
              Rediscovering Forgotten Knowledge
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-amber-800 md:text-xl">
              Exploring underappreciated research with modern analysis to reveal insights applicable to today's challenges.
            </p>
            <div className="mt-8">
              <Link href="/papers">
                <Button className="bg-amber-900 hover:bg-amber-800 text-amber-50 border border-amber-700">
                  Browse Papers
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 container px-4 md:px-6">
          <h2 className={`${readex.className} text-2xl font-serif tracking-tight text-amber-900 mb-6`}>Featured Papers</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paper_evals.sort((a, b) => b.scores.total - a.scores.total).slice(0, 3).map((paper) => (
              <PaperCard
                key={paper.id}
                id={paper.id}
                title={paper.title}
                author={paper.author}
                year={paper.year}
                category={paper.category}
                rating={Number((paper.scores.total / 35 * 5).toFixed(1))} // Calculate rating based on total score
                summary={paper.synthesizer_justification.join("\n")}
                relevance={paper.takeaway}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/papers">
              <Button variant="outline" className="border-amber-900 text-amber-900 hover:bg-amber-100">
                View All Papers
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-amber-900/20 bg-amber-100 py-6">
        <div className="container px-4 md:px-6 text-center text-amber-800">
          <p>© {new Date().getFullYear()} Renaissance Research. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
