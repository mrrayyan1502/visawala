import type { Metadata } from "next"
import { LanguageProvider } from "@/lib/language-context"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "VisaWala — AI-Powered Visa Assistant for Pakistan & India",
  description: "Get bulletproof visa applications with AI. From document checklists to cover letters — your personal visa assistant.",
  keywords: ["visa", "Pakistan visa", "India visa", "Schengen visa", "UK visa", "AI visa assistant"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ur">
      <body className="bg-[#0a0f1e] text-white min-h-screen">
        <LanguageProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
