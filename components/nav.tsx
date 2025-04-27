import { BookOpen, Filter, Search, SortAsc } from "lucide-react"
import Link from "next/link"
import { Readex_Pro } from "next/font/google"
const readex = Readex_Pro({ subsets: ["latin"], variable: "--font-sans-serif" })


export default function Nav() {
   return (
    <header className="border-b border-amber-900/20 bg-amber-100">
        <div className="container px-4 py-6 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <img src="/logo.png" className="h-16 w-16 text-amber-900"/>
              {/*<BookOpen className="h-8 w-8 text-amber-900" />*/}
              <Link href="/">
                <h1 className={`${readex.className} text-2xl font-serif tracking-tight text-amber-900`}>Renaissance Research</h1>
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
) 
}
