import { Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PaperCardProps {
  title: string
  author: string
  year: string
  category: string
  rating: number
  summary: string
  relevance: string
}

export function PaperCard({ title, author, year, category, rating, summary, relevance }: PaperCardProps) {
  return (
    <Card className="overflow-hidden border-amber-900/20 bg-amber-100/80 backdrop-blur-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b border-amber-900/10 bg-amber-100">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-serif text-amber-900">{title}</CardTitle>
            <CardDescription className="text-amber-700">
              {author}, {year}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-amber-50 text-amber-900 border-amber-900/20">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "text-amber-600 fill-amber-600" : "text-amber-300"}`} />
            ))}
          </div>
          <span className="ml-2 text-sm text-amber-800">{rating}/5</span>
        </div>
        <p className="text-amber-800 mb-3 text-sm">{summary}</p>
        <div className="mt-2">
          <h4 className="text-sm font-semibold text-amber-900">Modern Relevance:</h4>
          <p className="text-sm text-amber-800 italic">{relevance}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t border-amber-900/10 bg-amber-50 py-3">
        <button className="text-sm text-amber-900 hover:text-amber-700 font-medium">Read Full Analysis →</button>
      </CardFooter>
    </Card>
  )
}
