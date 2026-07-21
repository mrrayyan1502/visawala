"use client"

import Link from "next/link"
import { useLang } from "@/lib/language-context"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const languages = [
  { code: "en" as const, label: "English", flag: "🇬🇧" },
  { code: "ur" as const, label: "اردو", flag: "🇵🇰" },
]

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/visa-finder", label: t.nav.visaFinder },
    { href: "/sop-generator", label: t.nav.sopGenerator },
    { href: "/document-checker", label: t.nav.docChecker },
    { href: "/interview-coach", label: lang === "ur" ? "انٹرویو کوچ" : "Interview Coach" },
    { href: "/application-form", label: lang === "ur" ? "فارم آٹو فل" : "Form Auto-Fill" },
    { href: "/pricing", label: t.nav.pricing },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0f1e]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">
              V
            </div>
            <span className="text-xl font-bold text-white">
              Visa<span className="text-blue-400">Wala</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex items-center bg-white/5 rounded-lg p-0.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    lang === l.code
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/visa-finder"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-600/25"
            >
              {t.nav.signup}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0f1e]/95 backdrop-blur-xl animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/visa-finder"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-2"
            >
              {t.nav.signup}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
