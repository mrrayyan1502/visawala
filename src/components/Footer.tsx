"use client"

import { useLang } from "@/lib/language-context"
import { Heart } from "lucide-react"

export default function Footer() {
  const { t, lang } = useLang()

  return (
    <footer className="border-t border-white/10 bg-[#0a0f1e] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                V
              </div>
              <span className="text-lg font-bold text-white">
                Visa<span className="text-blue-400">Wala</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md" dir={lang === "ur" ? "rtl" : "ltr"} style={{ lineHeight: 1.8 }}>
              {lang === "ur"
                ? "ہم AI کی مدد سے پاکستان اور انڈیا کے لوگوں کو ویزا ایپلیکیشن تیار کرنے میں مدد کرتے ہیں۔ ہمارا مشن ہے کہ ہر شخص بغیر ایجنٹ کے خود ویزا حاصل کر سکے۔"
                : "We help people from Pakistan and India prepare visa applications using AI. Our mission is to make visa processes accessible to everyone without expensive agents."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">{lang === "ur" ? "فوری لنکس" : "Quick Links"}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/visa-finder" className="hover:text-blue-400 transition-colors">{t.nav.visaFinder}</a></li>
              <li><a href="/sop-generator" className="hover:text-blue-400 transition-colors">{t.nav.sopGenerator}</a></li>
              <li><a href="/document-checker" className="hover:text-blue-400 transition-colors">{t.nav.docChecker}</a></li>
              <li><a href="/pricing" className="hover:text-blue-400 transition-colors">{t.nav.pricing}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3">{lang === "ur" ? "قانونی" : "Legal"}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-blue-400 transition-colors">{t.nav.about}</a></li>
              <li><span className="text-gray-500 cursor-not-allowed">Privacy Policy</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">Terms of Service</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">Disclaimer</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} VisaWala. {lang === "ur" ? "جملہ حقوق محفوظ ہیں۔" : "All rights reserved."}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            {lang === "ur" ? "پاکستان سے محبت کے ساتھ" : "Made with"} <Heart size={12} className="text-red-500 fill-red-500" /> {lang === "ur" ? "" : "for Pakistan & India"}
          </p>
          <p className="text-xs text-gray-600">
            <strong>Disclaimer:</strong> {lang === "ur" ? "ہم ویزا کی گارنٹی نہیں دیتے۔ یہ ایک تیاری کا آلہ ہے۔" : "We do not guarantee visa approval. This is a preparation tool."}
          </p>
        </div>
      </div>
    </footer>
  )
}
