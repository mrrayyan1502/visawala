"use client"

import { useState } from "react"
import { useLang } from "@/lib/language-context"
import { Upload, CheckCircle, AlertCircle, XCircle, ChevronRight, FileText, Search } from "lucide-react"

type Issue = {
  severity: "error" | "warning" | "info"
  en: string
  ur: string
  fixEn: string
  fixUr: string
}

type DocCheckResult = {
  score: number
  issues: Issue[]
  passed: string[]
}

function simulateCheck(docType: string): DocCheckResult {
  // Simulated AI document check for the MVP
  const commonChecks: Record<string, DocCheckResult> = {
    passport: {
      score: 75,
      issues: [
        { severity: "warning", en: "Passport validity is less than 6 months from travel date", ur: "پاسپورٹ کی میعاد سفر کی تاریخ سے 6 ماہ سے کم ہے", fixEn: "Renew your passport before applying. Most Schengen countries require 6+ months validity.", fixUr: "درخواست دینے سے پہلے پاسپورٹ تجدید کروائیں۔ زیادہ تر شینگن ممالک کو 6+ ماہ کی میعاد درکار ہے۔" },
        { severity: "info", en: "Check if you have at least 2 blank pages", ur: "چیک کریں کہ کم از کم 2 خالی صفحات ہیں", fixEn: "Most visas require 2 blank facing pages in your passport.", fixUr: "زیادہ تر ویزوں کے لیے پاسپورٹ میں 2 خالی صفحات درکار ہوتے ہیں۔" },
      ],
      passed: ["Passport is valid", "Biometric page is clear and readable"],
    },
    bank: {
      score: 45,
      issues: [
        { severity: "error", en: "Large deposit detected 3 days ago without explanation", ur: "3 دن پہلے بغیر وضاحت کے بڑی رقم جمع ہوئی", fixEn: "Add a letter explaining the source of this deposit (sale of property, gift from family, etc.)", fixUr: "اس رقم کے ذریعہ کی وضاحت کرتے ہوئے خط شامل کریں (جائیداد کی فروخت، خاندان سے تحفہ، وغیرہ)" },
        { severity: "warning", en: "Average monthly balance is lower than recommended", ur: "اوسط ماہانہ بیلنس تجویز کردہ سے کم ہے", fixEn: "Maintain consistent balance for at least 3 more months before applying", fixUr: "درخواست دینے سے پہلے کم از کم 3 ماہ تک مسلسل بیلنس برقرار رکھیں" },
        { severity: "warning", en: "Statement is only 3 months — 6 months recommended", ur: "سٹیٹمنٹ صرف 3 ماہ کا ہے — 6 ماہ تجویز کردہ", fixEn: "Request 6 months of bank statements from your bank", fixUr: "اپنے بینک سے 6 ماہ کا بینک سٹیٹمنٹ حاصل کریں" },
      ],
      passed: ["Bank is a recognized institution", "Statement is in English"],
    },
    insurance: {
      score: 60,
      issues: [
        { severity: "error", en: "Medical coverage is €20,000 — Schengen requires minimum €30,000", ur: "میڈیکل کوریج €20,000 ہے — شینگن کے لیے کم از کم €30,000 درکار ہے", fixEn: "Purchase travel insurance with minimum €30,000 medical coverage from an approved provider", fixUr: "ایک منظور شدہ فراہم کنندہ سے کم از کم €30,000 میڈیکل کوریج والا ٹریول انشورنس خریدیں" },
      ],
      passed: ["Insurance is valid for entire Schengen area", "Policy covers emergency medical evacuation"],
    },
    employment: {
      score: 80,
      issues: [
        { severity: "info", en: "Letter should be on company letterhead with stamp", ur: "خط کمپنی کے لیٹر ہیڈ پر مہر کے ساتھ ہونا چاہیے", fixEn: "Ask HR to reissue on official letterhead with company stamp and signatory details", fixUr: "HR سے درخواست کریں کہ سرکاری لیٹر ہیڈ پر کمپنی کی مہر اور دستخط کنندہ کی تفصیلات کے ساتھ جاری کریں" },
      ],
      passed: ["Employment letter includes salary details", "NOC (No Objection Certificate) is included", "Leave approval is documented"],
    },
  }

  return commonChecks[docType] || {
    score: 70,
    issues: [
      { severity: "info", en: "Document format could be improved", ur: "دستاویز کا فارمیٹ بہتر ہو سکتا ہے", fixEn: "Ensure documents are in PDF or JPG format, under 5MB each", fixUr: "یقینی بنائیں کہ دستاویزات PDF یا JPG فارمیٹ میں ہیں، ہر ایک 5MB سے کم ہے" },
    ],
    passed: ["Document uploaded successfully"],
  }
}

const docTypes = [
  { id: "passport", icon: "🛂", en: "Passport", ur: "پاسپورٹ" },
  { id: "bank", icon: "🏦", en: "Bank Statement", ur: "بینک سٹیٹمنٹ" },
  { id: "insurance", icon: "🛡️", en: "Travel Insurance", ur: "ٹریول انشورنس" },
  { id: "employment", icon: "💼", en: "Employment Letter", ur: "روزگار کا سرٹیفکیٹ" },
]

export default function DocumentChecker() {
  const { t, lang } = useLang()
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [result, setResult] = useState<DocCheckResult | null>(null)
  const [checked, setChecked] = useState(false)

  function handleCheck(docId: string) {
    setSelectedDoc(docId)
    setResult(simulateCheck(docId))
    setChecked(true)
  }

  function reset() {
    setSelectedDoc(null)
    setResult(null)
    setChecked(false)
  }

  const scoreColor = result
    ? result.score >= 70
      ? "text-green-400"
      : result.score >= 50
        ? "text-yellow-400"
        : "text-red-400"
    : ""

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl shadow-blue-600/30">
            🔍
          </div>
          <h1 className="text-3xl font-bold mb-2">{t.checker.title}</h1>
          <p className="text-gray-400">{t.checker.subtitle}</p>
        </div>

        {/* Document Type Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {docTypes.map(dt => (
            <button
              key={dt.id}
              onClick={() => handleCheck(dt.id)}
              className={`p-4 rounded-xl border text-center transition-all ${
                selectedDoc === dt.id
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="text-2xl mb-1">{dt.icon}</div>
              <div className="text-sm font-medium">{lang === "ur" ? dt.ur : dt.en}</div>
            </button>
          ))}
        </div>

        {!checked && (
          <div className="p-12 rounded-2xl bg-gradient-card border border-white/5 text-center">
            <Upload size={40} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400">{lang === "ur" ? "اوپر سے دستاویز کی قسم منتخب کریں" : "Select a document type above to check"}</p>
            <p className="text-xs text-gray-600 mt-2">
              {lang === "ur"
                ? "AI آپ کی دستاویزات کو عام مسائل کے لیے چیک کرے گا اور کمپلائنس سکور دے گا"
                : "AI will check your documents for common issues and give a compliance score"}
            </p>
          </div>
        )}

        {result && (
          <>
            {/* Score Card */}
            <div className="p-8 rounded-2xl bg-gradient-card border border-white/10 mb-6 animate-fade-in">
              <div className="flex items-center gap-6 mb-6">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/10" />
                    <circle
                      cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none"
                      className={scoreColor}
                      strokeDasharray={`${(result.score / 100) * 264}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-2xl font-bold ${scoreColor}`}>{result.score}%</div>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-semibold mb-1">{t.checker.score}</div>
                  <p className="text-sm text-gray-400">
                    {result.score >= 70
                      ? (lang === "ur" ? "اچھی! لیکن بہتر ہو سکتی ہے" : "Good! But can be improved")
                      : result.score >= 50
                        ? (lang === "ur" ? "درمیانی — کچھ مسائل ہیں" : "Average — some issues found")
                        : (lang === "ur" ? "کمزور — بہتری کی ضرورت ہے" : "Weak — needs improvement")}
                  </p>
                </div>
              </div>

              {/* Issues */}
              {result.issues.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle size={16} className="text-yellow-400" />
                    {lang === "ur" ? "مسائل ملے" : "Issues Found"} ({result.issues.length})
                  </h3>
                  <div className="space-y-3">
                    {result.issues.map((issue, i) => (
                      <div key={i} className={`p-4 rounded-xl border ${
                        issue.severity === "error" ? "border-red-500/20 bg-red-500/5" :
                        issue.severity === "warning" ? "border-yellow-500/20 bg-yellow-500/5" :
                        "border-blue-500/20 bg-blue-500/5"
                      }`}>
                        <div className="flex gap-3">
                          {issue.severity === "error" ? <XCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" /> :
                           issue.severity === "warning" ? <AlertCircle size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" /> :
                           <AlertCircle size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />}
                          <div>
                            <p className="text-sm font-medium mb-1">{lang === "ur" ? issue.ur : issue.en}</p>
                            <p className="text-xs text-gray-400">{t.checker.fix}: {lang === "ur" ? issue.fixUr : issue.fixEn}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Passed */}
              {result.passed.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">{lang === "ur" ? "پاس ہیں" : "Passed Checks"}</h3>
                  <div className="space-y-2">
                    {result.passed.map((p, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-green-400">
                        <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all"
              >
                {lang === "ur" ? "دوسری دستاویز چیک کریں" : "Check Another Document"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
