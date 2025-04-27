import Nav from "@/components/nav"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Nav/>

      <main className="container px-4 py-12 md:px-6 max-w-3xl mx-auto">
        <div className="bg-[url('/paper-texture.png')] bg-amber-100 p-6 md:p-8 rounded-lg border border-amber-900/20 shadow-md">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-amber-900 mb-6">
            About Renaissance Research
          </h2>

          <div className="prose prose-amber max-w-none text-amber-800">
            <p className="text-lg">
              Renaissance Research is dedicated to rediscovering forgotten knowledge from old niche papers and analyzing
              their relevance to modern challenges.
            </p>

            <h3 className="text-xl font-serif font-semibold text-amber-900 mt-6 mb-3">Our Mission</h3>
            <p>
              We believe that many insights from the past have been overlooked or forgotten, yet remain highly relevant
              today. Our mission is to unearth these valuable ideas, analyze them through a contemporary lens, and make
              them accessible to researchers, practitioners, and curious minds.
            </p>

            <h3 className="text-xl font-serif font-semibold text-amber-900 mt-6 mb-3">Our Methodology</h3>
            <p>Each paper in our collection undergoes a rigorous analysis process:</p>
            <ol className="list-decimal pl-6 space-y-2 mt-2">
              <li>Historical context research to understand the paper's original significance</li>
              <li>Modern relevance assessment to identify applications to contemporary challenges</li>
              <li>Rating assignment based on both historical importance and current applicability</li>
              <li>Detailed justification of our analysis to provide transparency in our evaluation</li>
            </ol>

            <h3 className="text-xl font-serif font-semibold text-amber-900 mt-6 mb-3">Rating System</h3>
            <p>Our rating system is based on a 5-star scale:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <span className="font-semibold">5 stars:</span> Groundbreaking work with significant modern applications
              </li>
              <li>
                <span className="font-semibold">4 stars:</span> Important work with clear relevance to current
                challenges
              </li>
              <li>
                <span className="font-semibold">3 stars:</span> Valuable historical contribution with some modern
                applications
              </li>
              <li>
                <span className="font-semibold">2 stars:</span> Interesting historical perspective with limited current
                relevance
              </li>
              <li>
                <span className="font-semibold">1 star:</span> Primarily of historical interest with minimal modern
                application
              </li>
            </ul>

            <h3 className="text-xl font-serif font-semibold text-amber-900 mt-6 mb-3">Join Our Effort</h3>
            <p>
              Renaissance Research is a collaborative effort. If you have suggestions for papers to include in our
              collection or would like to contribute to our analysis, please reach out to us.
            </p>

            <p className="italic mt-6">"Study the past if you would define the future." — Confucius</p>
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
