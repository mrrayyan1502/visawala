"use client"

import { useState } from "react"
import { useLang } from "@/lib/language-context"
import { FileText, Download, RefreshCw, Copy, Check } from "lucide-react"

const visaTypes = [
  { id: "tourist", en: "Tourist Visa", ur: "ٹورسٹ ویزا" },
  { id: "business", en: "Business Visa", ur: "بزنس ویزا" },
  { id: "student", en: "Student Visa", ur: "سٹوڈنٹ ویزا" },
  { id: "family", en: "Family Visit Visa", ur: "فیملی وزٹ ویزا" },
  { id: "medical", en: "Medical Visa", ur: "میڈیکل ویزا" },
  { id: "work", en: "Work Visa", ur: "ورک ویزا" },
]

const countries = [
  { id: "italy", en: "Italy", ur: "اٹلی" },
  { id: "spain", en: "Spain", ur: "اسپین" },
  { id: "germany", en: "Germany", ur: "جرمنی" },
  { id: "france", en: "France", ur: "فرانس" },
  { id: "uk", en: "United Kingdom", ur: "برطانیہ" },
  { id: "usa", en: "United States", ur: "امریکہ" },
  { id: "canada", en: "Canada", ur: "کینیڈا" },
  { id: "uae", en: "UAE", ur: "متحدہ عرب امارات" },
  { id: "turkey", en: "Turkey", ur: "ترکی" },
]

function generateCoverLetter(form: FormData, lang: "en" | "ur"): string {
  const dest = countries.find(c => c.id === form.destination)
  const visaType = visaTypes.find(v => v.id === form.visaType)
  const destName = lang === "ur" ? dest?.ur || "" : dest?.en || ""
  const visaName = lang === "ur" ? visaType?.ur || "" : visaType?.en || ""

  const date = new Date().toLocaleDateString(lang === "ur" ? "en-GB" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const days = form.duration || form.durationUr || "15 days"
  const purpose = form.purpose || form.purposeUr || "tourism"

  if (lang === "ur") {
    return `${date}

محترم ویزا افسر،

موضوع: ${form.name} کے لیے ${destName} کا ${visaName} کی درخواست

میرا نام ${form.name} ہے۔ میرا پاسپورٹ نمبر ${form.passport} ہے اور میری تاریخ پیدائش ${form.dob} ہے۔

میں ${destName} کے لیے ${visaName} کی درخواست دے رہا/رہی ہوں۔ میرے سفر کا مقصد ${purpose} ہے۔ میں ${days} کے لیے ${destName} جانے کا ارادہ رکھتا/رکھتی ہوں۔

میں ${form.city} میں رہتا/رہتی ہوں اور ${form.profession} کے طور پر کام کرتا/کرتی ہوں۔ میرے پاس اپنے سفر کے اخراجات پورے کرنے کے لیے کافی مالی وسائل موجود ہیں۔

میں پاکستان میں اپنی ملازمت/کاروبار اور خاندانی ذمہ داریوں کی وجہ سے واپس آؤں گا/گی۔

براہ کرم میری درخواست پر غور کریں۔

شکریہ

${form.name}
${form.email}
${form.phone}
پاسپورٹ: ${form.passport}`
  }

  return `${date}

The Visa Officer
Embassy of ${destName}

Subject: Application for ${visaName} to ${destName}

Dear Sir/Madam,

I, ${form.name}, am writing to apply for a ${visaName} to ${destName}. My passport number is ${form.passport} and my date of birth is ${form.dob}.

Purpose of Visit:
I intend to travel to ${destName} for ${purpose}. I plan to stay for ${days}.

Personal Details:
I reside in ${form.city} and work as a ${form.profession}. I have sufficient financial resources to cover my expenses during this trip.

Ties to Home Country:
I have strong ties to Pakistan including my employment/business and family responsibilities, which ensure my return after the visit.

I have enclosed all required documents for your kind consideration.

Thank you for your time and consideration.

Yours sincerely,

${form.name}
Email: ${form.email}
Phone: ${form.phone}
Passport: ${form.passport}`
}

type FormData = {
  name: string
  passport: string
  dob: string
  email: string
  phone: string
  city: string
  profession: string
  visaType: string
  destination: string
  duration: string
  purpose: string
  durationUr: string
  purposeUr: string
}

export default function SopGenerator() {
  const { t, lang } = useLang()

  const [showForm, setShowForm] = useState(true)
  const [letter, setLetter] = useState("")
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState<FormData>({
    name: "", passport: "", dob: "", email: "", phone: "",
    city: "", profession: "", visaType: "tourist", destination: "italy",
    duration: "", purpose: "",
    durationUr: "", purposeUr: "",
  })

  function handleGenerate() {
    const generated = generateCoverLetter(form, lang)
    setLetter(generated)
    setShowForm(false)
  }

  function handleCopy() {
    navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    const blob = new Blob([letter], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cover-letter-${form.name.replace(/\s+/g, "-")}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5"

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl shadow-blue-600/30">
            📝
          </div>
          <h1 className="text-3xl font-bold mb-2">{t.sop.title}</h1>
          <p className="text-gray-400">{t.sop.subtitle}</p>
        </div>

        {showForm ? (
          <div className="p-8 rounded-2xl bg-gradient-card border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className={labelClass}>{t.sop.name}</label>
                <input className={inputClass} placeholder="Ahmed Khan" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>

              {/* Passport */}
              <div>
                <label className={labelClass}>{t.sop.passport}</label>
                <input className={inputClass} placeholder="AB1234567" value={form.passport} onChange={e => setForm(f => ({ ...f, passport: e.target.value }))} />
              </div>

              {/* DOB */}
              <div>
                <label className={labelClass}>{lang === "ur" ? "تاریخ پیدائش" : "Date of Birth"}</label>
                <input type="date" className={inputClass} value={form.dob} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))} />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>{t.common.email}</label>
                <input className={inputClass} type="email" placeholder="ahmed@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>{lang === "ur" ? "فون نمبر" : "Phone Number"}</label>
                <input className={inputClass} placeholder="+92 300 1234567" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>

              {/* City */}
              <div>
                <label className={labelClass}>{lang === "ur" ? "شہر" : "City"}</label>
                <input className={inputClass} placeholder="Lahore" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
              </div>

              {/* Profession */}
              <div>
                <label className={labelClass}>{lang === "ur" ? "پیشہ" : "Profession"}</label>
                <input className={inputClass} placeholder="Software Engineer" value={form.profession} onChange={e => setForm(f => ({ ...f, profession: e.target.value }))} />
              </div>

              {/* Visa Type */}
              <div>
                <label className={labelClass}>{t.sop.purpose}</label>
                <select className={inputClass} value={form.visaType} onChange={e => setForm(f => ({ ...f, visaType: e.target.value }))}>
                  {visaTypes.map(vt => (
                    <option key={vt.id} value={vt.id} className="bg-gray-900">{lang === "ur" ? vt.ur : vt.en}</option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div>
                <label className={labelClass}>{t.sop.destination}</label>
                <select className={inputClass} value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}>
                  {countries.map(c => (
                    <option key={c.id} value={c.id} className="bg-gray-900">{lang === "ur" ? c.ur : c.en}</option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className={labelClass}>{lang === "ur" ? "قیام کی مدت" : "Duration of Stay"}</label>
                <input
                  className={inputClass}
                  placeholder={lang === "ur" ? "مثلاً 15 دن" : "e.g., 15 days"}
                  value={lang === "ur" ? form.durationUr : form.duration}
                  onChange={e => {
                    const val = e.target.value
                    if (lang === "ur") setForm(f => ({ ...f, durationUr: val }))
                    else setForm(f => ({ ...f, duration: val }))
                  }}
                />
              </div>

              {/* Purpose Details */}
              <div className="md:col-span-2">
                <label className={labelClass}>{lang === "ur" ? "سفر کی تفصیل" : "Travel Purpose Details"}</label>
                <textarea
                  className={`${inputClass} h-20 resize-none`}
                  placeholder={lang === "ur" ? "مختصراً اپنے سفر کا مقصد بتائیں..." : "Briefly describe your travel purpose..."}
                  value={lang === "ur" ? form.purposeUr : form.purpose}
                  onChange={e => {
                    const val = e.target.value
                    if (lang === "ur") setForm(f => ({ ...f, purposeUr: val }))
                    else setForm(f => ({ ...f, purpose: val }))
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!form.name || !form.passport}
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <FileText size={18} />
              {t.sop.generate}
            </button>
          </div>
        ) : (
          <div>
            {/* Result */}
            <div className="p-8 rounded-2xl bg-gradient-card border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">
                  {lang === "ur" ? "آپ کا کور لیٹر" : "Your Cover Letter"}
                </h2>
                <div className="flex gap-2">
                  <button onClick={handleCopy} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" title={lang === "ur" ? "کاپی کریں" : "Copy"}>
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                  <button onClick={handleDownload} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" title={lang === "ur" ? "ڈاؤن لوڈ" : "Download"}>
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{letter}</pre>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <RefreshCw size={16} />
                {t.sop.new}
              </button>
              <button onClick={handleDownload} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg inline-flex items-center gap-2">
                <Download size={16} />
                {t.sop.download}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
