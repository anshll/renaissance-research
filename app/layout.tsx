import type React from "react"
import "@/app/globals.css"
import { Inter, Playfair_Display, Readex_Pro } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
export const readex = Readex_Pro({ subsets: ["latin"], variable: "--font-sans-serif" })

const metadata = {
  title: "Renaissance Research",
  description: "Rediscovering forgotten knowledge from old niche papers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
