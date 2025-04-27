import { Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
interface PaperCardProps {
  id: number
  title: string
  author: string
  year: number
  category: string
  rating: number
  summary: string
  relevance: string
}

export function PaperCard({ id, title, author, year, category, rating, summary, relevance }: PaperCardProps) {
  let link = `/papers/${id}`

  // Handle missing author/year for display
  const authorYearDisplay = [author, year > 0 ? year : null]
    .filter(Boolean) // Remove null/empty values
    .join(", "); // Join with a comma and space

  return (
    <Card className="overflow-hidden border-amber-900/20 bg-amber-100/80 backdrop-blur-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="border-b border-amber-900/10 bg-amber-100">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-serif text-amber-900">{title || "Untitled"}</CardTitle>
            {authorYearDisplay && (
              <CardDescription className="text-amber-700">
                {authorYearDisplay}
              </CardDescription>
            )}
          </div>
          <Badge variant="outline" className="bg-amber-50 text-amber-900 border-amber-900/20">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "text-amber-600 fill-amber-600" : "text-amber-300"}`} />
            ))}
          </div>
          <span className="ml-2 text-sm text-amber-800">{rating}/5</span>
        </div>
        {/* Use ReactMarkdown for summary */}
        <div className="text-amber-800 mb-3 text-sm">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
        <div className="mt-2">
          <h4 className="text-sm font-semibold text-amber-900">Modern Relevance:</h4>
          {/* Use ReactMarkdown for relevance */}
          <div className="text-sm text-amber-800 italic">
             <ReactMarkdown>{relevance}</ReactMarkdown>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-amber-900/10 bg-amber-50 py-3">
        <a className="text-sm text-amber-900 hover:text-amber-700 font-medium" href={link}>Read Full Analysis →</a>
      </CardFooter>
    </Card>
  )
}
