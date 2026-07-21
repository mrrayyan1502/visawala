"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { getTranslation, type Language } from "@/lib/translations"

type LangContextType = {
  lang: Language
  setLang: (l: Language) => void
  t: ReturnType<typeof getTranslation>
  dir: "ltr" | "rtl"
}

const LangContext = createContext<LangContextType>({
  lang: "ur",
  setLang: () => {},
  t: getTranslation("ur"),
  dir: "rtl",
})

export function useLang() {
  return useContext(LangContext)
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("ur")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("visawala-lang") as Language | null
    if (saved === "en" || saved === "ur") setLang(saved)
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem("visawala-lang", lang)
  }, [lang, mounted])

  const t = getTranslation(lang)
  const dir = lang === "ur" ? "rtl" : "ltr"

  if (!mounted) {
    return (
      <div dir="rtl" lang="ur">
        {children}
      </div>
    )
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir }}>
      <div dir={dir} lang={lang}>
        {children}
      </div>
    </LangContext.Provider>
  )
}
