"use client"

import { useState } from "react"
import { useLang } from "@/lib/language-context"
import { Upload, AlertCircle, CheckCircle, ArrowRight, Sparkles, FileText, Download, RefreshCw, Search } from "lucide-react"

// ===== REJECTION REASONS DATABASE =====
// Real rejection reasons used by embassies + analysis

type RejectionReason = {
  code: string
  titleEn: string
  titleUr: string
  meaningEn: string
  meaningUr: string
  severity: "critical" | "major" | "minor"
  fixStepsEn: string[]
  fixStepsUr: string[]
  documentsNeededEn: string[]
  documentsNeededUr: string[]
  successRate: number // % chance of success after fixing
  countries: string[] // which countries use this reason most
}

const rejectionDatabase: RejectionReason[] = [
  {
    code: "5-1-A", titleEn: "Purpose of visit not justified", titleUr: "سفر کا مقصد واضح نہیں",
    meaningEn: "The visa officer was not convinced about why you want to visit. Your cover letter or itinerary was too vague or generic.",
    meaningUr: "ویزا افسر کو آپ کے سفر کے مقصد کے بارے میں یقین نہیں ہوا۔ آپ کا کور لیٹر یا سفر کا پروگرام بہت عام تھا۔",
    severity: "major",
    fixStepsEn: [
      "Write a DETAILED cover letter with specific places, dates, and activities",
      "Add day-by-day itinerary with hotel names and booking references",
      "Include purpose-specific documents (e.g., conference registration, museum tickets)",
      "Mention why THIS country specifically — not just 'tourism'",
    ],
    fixStepsUr: [
      "مخصوص مقامات، تاریخوں اور سرگرمیوں کے ساتھ تفصیلی کور لیٹر لکھیں",
      "ہوٹل کے ناموں اور بکنگ ریفرنس کے ساتھ دن بہ دن پروگرام شامل کریں",
      "مقصد سے متعلقہ دستاویزات شامل کریں (کانفرنس رجسٹریشن، میوزیم ٹکٹ)",
      "واضح کریں کہ یہ ملک کیوں — صرف 'سیاحت' نہیں",
    ],
    documentsNeededEn: ["Detailed cover letter", "Day-by-day itinerary", "Hotel bookings", "Flight reservations", "Purpose proof"],
    documentsNeededUr: ["تفصیلی کور لیٹر", "دن بہ دن پروگرام", "ہوٹل بکنگ", "فلائٹ ریزرویشن", "مقصد کا ثبوت"],
    successRate: 85, countries: ["italy", "spain", "france", "germany", "netherlands", "switzerland"],
  },
  {
    code: "5-1-B", titleEn: "Financial means insufficient", titleUr: "مالی وسائل ناکافی",
    meaningEn: "The officer found your bank balance or income insufficient for the trip. Large unexplained deposits are a common issue for Pakistani applicants.",
    meaningUr: "افسر نے آپ کے بینک بیلنس یا آمدنی کو سفر کے لیے ناکافی پایا۔ پاکستانی درخواست دہندگان کے لیے بغیر وضاحت کے بڑی رقم جمع کرنا ایک عام مسئلہ ہے۔",
    severity: "critical",
    fixStepsEn: [
      "Maintain consistent bank balance for 6 months — NO large last-minute deposits",
      "Add a letter explaining any large deposits (property sale, gift, etc.)",
      "Show salary credits matching your employment letter",
      "Include sponsor documents if someone else is funding the trip",
    ],
    fixStepsUr: [
      "6 ماہ تک مسلسل بینک بیلنس رکھیں — آخری وقت میں کوئی بڑی رقم جمع نہ کریں",
      "کسی بھی بڑی رقم کے ذریعہ کی وضاحت کریں (جائیداد کی فروخت، تحفہ، وغیرہ)",
      "روزگار کے سرٹیفکیٹ سے مماثل تنخواہ کی جمع رقم دکھائیں",
      "اگر کوئی اور سفر کی فیس دے رہا ہے تو اسپانسر کے دستاویزات شامل کریں",
    ],
    documentsNeededEn: ["6 months bank statement", "Salary slips (3-6 months)", "Sponsor letter + bank statement", "Explanation for deposits"],
    documentsNeededUr: ["6 ماہ کا بینک اسٹیٹمنٹ", "3-6 ماہ کی تنخواہ کی سلیپ", "اسپانسر خط + بینک اسٹیٹمنٹ", "رقم جمع کرنے کی وضاحت"],
    successRate: 70, countries: ["italy", "spain", "uk", "germany", "france", "usa", "canada"],
  },
  {
    code: "5-1-C", titleEn: "Risk of illegal immigration", titleUr: "غیر قانونی امیگریشن کا خطرہ",
    meaningEn: "The officer believes you may not return to your home country. This is the MOST COMMON reason for Pakistani applicants — weak ties to home country.",
    meaningUr: "افسر کا خیال ہے کہ آپ اپنے وطن واپس نہیں آ سکتے۔ یہ پاکستانی درخواست دہندگان کے لیے سب سے عام وجہ ہے — وطن سے کمزور تعلقات۔",
    severity: "critical",
    fixStepsEn: [
      "STRONG employment proof — letter with salary, position, joining date, approved leave",
      "Property documents — title deed, valuation certificate",
      "Family proof — marriage certificate, children's school documents, family registration certificate (CRC)",
      "Business ownership documents if applicable",
    ],
    fixStepsUr: [
      "مضبوط روزگار کا ثبوت — تنخواہ، عہدہ، شمولیت کی تاریخ، منظور شدہ چھٹی کے ساتھ خط",
      "جائیداد کے دستاویزات — ٹائٹل ڈیڈ، قیمت کا سرٹیفکیٹ",
      "خاندانی ثبوت — نکاح نامہ، بچوں کے سکول کے دستاویزات، فیملی رجسٹریشن سرٹیفکیٹ",
      "اگر قابل اطلاق ہو تو کاروباری ملکیت کے دستاویزات",
    ],
    documentsNeededEn: ["Employment letter with NOC", "Property documents", "Family registration", "Business proof", "Previous visas"],
    documentsNeededUr: ["روزگار کا سرٹیفکیٹ + NOC", "جائیداد کے دستاویزات", "فیملی رجسٹریشن", "کاروباری ثبوت", "پچھلے ویزے"],
    successRate: 65, countries: ["all"],
  },
  {
    code: "5-1-D", titleEn: "Travel history insufficient", titleUr: "سفر کی تاریخ ناکافی",
    meaningEn: "You have not traveled to similar countries before. First-time travelers face higher scrutiny.",
    meaningUr: "آپ پہلے اسی طرح کے ممالک میں نہیں گئے۔ پہلی بار سفر کرنے والوں کی زیادہ جانچ پڑتال ہوتی ہے۔",
    severity: "major",
    fixStepsEn: [
      "If you have traveled to other countries, HIGHLIGHT this in cover letter",
      "If first-time, strengthen other areas — finances, job, property",
      "Consider applying to an easier country first (Turkey, UAE, Malaysia) to build travel history",
    ],
    fixStepsUr: [
      "اگر آپ دوسرے ممالک گئے ہیں تو کور لیٹر میں اسے نمایاں کریں",
      "اگر پہلی بار ہے تو دوسرے شعبوں کو مضبوط کریں — مالیات، نوکری، جائیداد",
      "پہلے کسی آسان ملک کے لیے درخواست دیں (ترکی، یو اے ای، ملائیشیا) تاکہ سفر کی تاریخ بن سکے",
    ],
    documentsNeededEn: ["Previous visas copies", "Old passport (if applicable)", "Travel history letter"],
    documentsNeededUr: ["پچھلے ویزوں کی کاپیاں", "پرانا پاسپورٹ (اگر قابل اطلاق ہو)", "سفر کی تاریخ کا خط"],
    successRate: 75, countries: ["italy", "spain", "uk", "usa", "canada"],
  },
  {
    code: "5-1-E", titleEn: "Accommodation not confirmed", titleUr: "رہائش کی تصدیق نہیں",
    meaningEn: "Your hotel bookings were not verifiable or were from non-refundable/unknown platforms.",
    meaningUr: "آپ کے ہوٹل کی بکنگ قابل تصدیق نہیں تھی یا غیر معروف پلیٹ فارمز سے تھی۔",
    severity: "minor",
    fixStepsEn: [
      "Book hotels ONLY on Booking.com or official hotel websites",
      "Use FREE CANCELLATION option — cancel after visa approval",
      "Ensure all booking confirmations have your FULL NAME as in passport",
    ],
    fixStepsUr: [
      "صرف Booking.com یا سرکاری ہوٹل ویب سائٹس پر ہوٹل بک کروائیں",
      "مفت منسوخی کا اختیار استعمال کریں — ویزا ملنے کے بعد منسوخ کریں",
      "یقینی بنائیں کہ تمام بکنگ کنفرمیشن پر آپ کا پورا نام پاسپورٹ کے مطابق ہے",
    ],
    documentsNeededEn: ["Confirmed hotel bookings (full name)", "Booking.com confirmation"],
    documentsNeededUr: ["مکمل نام کے ساتھ تصدیق شدہ ہوٹل بکنگ", "Booking.com کنفرمیشن"],
    successRate: 90, countries: ["all"],
  },
  {
    code: "5-1-F", titleEn: "Travel insurance invalid", titleUr: "ٹریول انشورنس غلط",
    meaningEn: "Your insurance did not meet minimum requirements — coverage amount, validity period, or territorial scope.",
    meaningUr: "آپ کا انشورنس کم از کم ضروریات پورا نہیں کرتا تھا — کوریج کی رقم، مدت، یا علاقائی دائرہ کار۔",
    severity: "minor",
    fixStepsEn: [
      "Purchase insurance with minimum €30,000 medical coverage",
      "Ensure validity covers ENTIRE stay from departure to return",
      "Insurance must be valid in ALL Schengen countries (not just one)",
    ],
    fixStepsUr: [
      "کم از کم €30,000 میڈیکل کوریج کے ساتھ انشورنس خریدیں",
      "یقینی بنائیں کہ میعاد روانگی سے واپسی تک پورے قیام کا احاطہ کرتی ہے",
      "انشورنس تمام شینگن ممالک میں درست ہونا چاہیے (صرف ایک نہیں)",
    ],
    documentsNeededEn: ["Valid travel insurance (€30,000)", "Insurance certificate"],
    documentsNeededUr: ["درست ٹریول انشورنس (€30,000)", "انشورنس سرٹیفکیٹ"],
    successRate: 95, countries: ["schengen"],
  },
  {
    code: "5-1-G", titleEn: "Previous visa violation", titleUr: "پچھلے ویزا کی خلاف ورزی",
    meaningEn: "You have overstayed or violated terms of a previous visa. This is a SERIOUS issue.",
    meaningUr: "آپ نے پچھلے ویزا کی میعاد سے زیادہ قیام کیا یا شرائط کی خلاف ورزی کی۔ یہ ایک سنگین مسئلہ ہے۔",
    severity: "critical",
    fixStepsEn: [
      "Be HONEST — declare previous overstay or violation",
      "Write an explanation letter detailing what happened and why it won't happen again",
      "Provide evidence that you complied in all other ways",
      "Consider consulting an immigration lawyer for serious violations",
    ],
    fixStepsUr: [
      "ایماندار رہیں — پچھلے قیام سے زیادہ یا خلاف ورزی کا اعلان کریں",
      "وضاحتی خط لکھیں جس میں بتائیں کہ کیا ہوا اور یہ دوبارہ کیوں نہیں ہو گا",
      "ثبوت فراہم کریں کہ آپ نے دوسرے تمام طریقوں سے تعمیل کی",
      "سنگین خلاف ورزیوں کے لیے امیگریشن وکیل سے مشورہ کریں",
    ],
    documentsNeededEn: ["Explanation letter", "Previous visa copy", "Evidence of good conduct since"],
    documentsNeededUr: ["وضاحتی خط", "پچھلے ویزے کی کاپی", "اس کے بعد اچھے طرز عمل کا ثبوت"],
    successRate: 40, countries: ["all"],
  },
  {
    code: "5-1-H", titleEn: "Documents falsified/suspicious", titleUr: "دستاویزات جعلی/مشکوک",
    meaningEn: "The embassy found or suspects fake documents. This is the MOST SERIOUS reason — can lead to a ban.",
    meaningUr: "سفارت خانے نے جعلی دستاویزات پائیں یا ان کا شبہ ہے۔ یہ سب سے سنگین وجہ ہے — پابندی لگ سکتی ہے۔",
    severity: "critical",
    fixStepsEn: [
      "NEVER submit fake documents — embassies verify with original sources",
      "If the rejection is due to suspicion, provide ORIGINAL documents for verification",
      "Get documents attested/notarized properly",
      "Consider professional legal help",
    ],
    fixStepsUr: [
      "کبھی جعلی دستاویزات جمع نہ کروائیں — سفارتیں اصل ذرائع سے تصدیق کرتی ہیں",
      "اگر شبہ کی وجہ سے انکار ہوا ہے تو تصدیق کے لیے اصل دستاویزات فراہم کریں",
      "دستاویزات کو مناسب طریقے سے تصدیق کروائیں",
      "پیشہ ورانہ قانونی مدد حاصل کریں",
    ],
    documentsNeededEn: ["Original documents", "Attestation certificates", "Legal consultation"],
    documentsNeededUr: ["اصل دستاویزات", "تصدیق کے سرٹیفکیٹ", "قانونی مشاورت"],
    successRate: 25, countries: ["all"],
  },
]

// Country-specific fee & refusal rate data
const countryData: Record<string, { flag: string; rejectionRate: string; avgFee: string; commonReasons: string[] }> = {
  italy: { flag: "🇮🇹", rejectionRate: "52%", avgFee: "€80", commonReasons: ["5-1-A", "5-1-B", "5-1-C"] },
  spain: { flag: "🇪🇸", rejectionRate: "52%", avgFee: "€80", commonReasons: ["5-1-B", "5-1-C", "5-1-D"] },
  germany: { flag: "🇩🇪", rejectionRate: "35%", avgFee: "€80", commonReasons: ["5-1-A", "5-1-C", "5-1-F"] },
  france: { flag: "🇫🇷", rejectionRate: "25%", avgFee: "€80", commonReasons: ["5-1-A", "5-1-B"] },
  uk: { flag: "🇬🇧", rejectionRate: "44%", avgFee: "£115", commonReasons: ["5-1-C", "5-1-B", "5-1-D"] },
  usa: { flag: "🇺🇸", rejectionRate: "70%", avgFee: "$185", commonReasons: ["5-1-C", "5-1-D", "5-1-H"] },
  canada: { flag: "🇨🇦", rejectionRate: "40%", avgFee: "$150", commonReasons: ["5-1-C", "5-1-B"] },
}

export default function RejectionRecovery() {
  const { t, lang } = useLang()
  const [step, setStep] = useState<"select" | "analyze" | "result">("select")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [results, setResults] = useState<RejectionReason[]>([])
  const [customIssue, setCustomIssue] = useState("")

  const countries = [
    { id: "italy", flag: "🇮🇹", en: "Italy", ur: "اٹلی", rate: "52%" },
    { id: "spain", flag: "🇪🇸", en: "Spain", ur: "اسپین", rate: "52%" },
    { id: "germany", flag: "🇩🇪", en: "Germany", ur: "جرمنی", rate: "35%" },
    { id: "france", flag: "🇫🇷", en: "France", ur: "فرانس", rate: "25%" },
    { id: "uk", flag: "🇬🇧", en: "United Kingdom", ur: "برطانیہ", rate: "44%" },
    { id: "usa", flag: "🇺🇸", en: "United States", ur: "امریکہ", rate: "70%" },
    { id: "canada", flag: "🇨🇦", en: "Canada", ur: "کینیڈا", rate: "40%" },
  ]

  const commonRejectionReasons = [
    { id: "5-1-A", en: "Purpose of visit not clear", ur: "سفر کا مقصد واضح نہیں" },
    { id: "5-1-B", en: "Not enough money in bank", ur: "بینک میں کافی رقم نہیں" },
    { id: "5-1-C", en: "Might not return to Pakistan", ur: "واپس نہ آنے کا خطرہ" },
    { id: "5-1-D", en: "No previous travel history", ur: "پچھلے سفر کی تاریخ نہیں" },
    { id: "5-1-E", en: "Hotel bookings not confirmed", ur: "ہوٹل کی بکنگ تصدیق شدہ نہیں" },
    { id: "5-1-F", en: "Travel insurance invalid", ur: "ٹریول انشورنس غلط" },
    { id: "5-1-G", en: "Previous visa overstay", ur: "پچھلے ویزا کی خلاف ورزی" },
    { id: "5-1-H", en: "Documents seem fake", ur: "دستاویزات مشکوک" },
  ]

  function toggleReason(id: string) {
    setSelectedReasons(r =>
      r.includes(id) ? r.filter(x => x !== id) : [...r, id]
    )
  }

  function analyzeRejection() {
    const reasons = rejectionDatabase.filter(r =>
      selectedReasons.includes(r.code)
    )
    // Sort by severity
    reasons.sort((a, b) => {
      const severityOrder = { critical: 0, major: 1, minor: 2 }
      return (severityOrder[a.severity] || 0) - (severityOrder[b.severity] || 0)
    })
    setResults(reasons)
    setStep("result")
  }

  const overallSuccessRate = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.successRate, 0) / results.length)
    : 0

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl shadow-red-600/30">
            🔄
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {lang === "ur" ? "ویزا ریجیکشن ریکوری" : "Visa Rejection Recovery"}
          </h1>
          <p className="text-gray-400">
            {lang === "ur"
              ? "Rejection letter upload karo ya reasons select karo — AI exact analysis + recovery plan de ga"
              : "Upload rejection letter or select reasons — AI gives exact analysis + recovery plan"}
          </p>
        </div>

        {/* STEP 1 */}
        {step === "select" && (
          <div className="animate-fade-in">
            <div className="p-6 rounded-2xl bg-gradient-card border border-white/10 mb-6">
              <h2 className="font-semibold mb-4">{lang === "ur" ? "کس ملک کا ویزا ریجیکٹ ہوا؟" : "Which country rejected you?"}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {countries.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCountry(c.id)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      selectedCountry === c.id
                        ? "border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="text-2xl mb-1">{c.flag}</div>
                    <div className="text-sm font-medium">{lang === "ur" ? c.ur : c.en}</div>
                    <div className="text-xs text-red-400">Rejection: {c.rate}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-card border border-white/10 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={18} className="text-red-400" />
                <h2 className="font-semibold">{lang === "ur" ? "ریجیکشن کی وجوہات منتخب کریں" : "Select Rejection Reasons"}</h2>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                {lang === "ur"
                  ? "Apni rejection letter mein jo reasons likhe hain woh select karo (1 ya zyada)"
                  : "Select the reasons mentioned in your rejection letter (1 or more)"}
              </p>
              <div className="space-y-2">
                {commonRejectionReasons.map(reason => (
                  <button
                    key={reason.id}
                    onClick={() => toggleReason(reason.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      selectedReasons.includes(reason.id)
                        ? "border-red-500 bg-red-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedReasons.includes(reason.id) ? "border-red-500 bg-red-500" : "border-white/20"
                    }`}>
                      {selectedReasons.includes(reason.id) && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className="text-sm">{lang === "ur" ? reason.ur : reason.en}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={analyzeRejection}
              disabled={!selectedCountry || selectedReasons.length === 0}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl font-semibold hover:from-red-500 hover:to-orange-400 transition-all shadow-lg disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              <Search size={18} />
              {lang === "ur" ? "تجزیہ کریں اور ریکوری پلان حاصل کریں" : "Analyze & Get Recovery Plan"}
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2: Results */}
        {step === "result" && (
          <div className="animate-fade-in">
            {/* Overall Score */}
            <div className="p-6 rounded-2xl bg-gradient-card border border-white/10 mb-6 text-center">
              <h2 className="text-xl font-bold mb-2">
                {lang === "ur" ? "ریکوری اسسمنٹ" : "Recovery Assessment"}
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/10" />
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none"
                      className={overallSuccessRate >= 70 ? "text-green-400" : overallSuccessRate >= 50 ? "text-yellow-400" : "text-red-400"}
                      strokeDasharray={`${(overallSuccessRate / 100) * 264}`} strokeDashoffset="0" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold">{overallSuccessRate}%</div>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm text-green-400">
                    {overallSuccessRate >= 70 
                      ? (lang === "ur" ? "✅ اچھی خبر! ان مسائل کو حل کر کے دوبارہ درخواست دے سکتے ہیں" : "✅ Good news! These issues are fixable")
                      : overallSuccessRate >= 50
                        ? (lang === "ur" ? "⚠️ کچھ مسائل سنگین ہیں لیکن حل ممکن ہے" : "⚠️ Some issues are serious but can be fixed")
                        : (lang === "ur" ? "❌ سنگین مسائل — پیشہ ورانہ مدد لیں" : "❌ Serious issues — seek professional help")}
                  </p>
                </div>
              </div>
            </div>

            {/* Each Reason */}
            {results.map((reason, i) => {
              const severityColor = reason.severity === "critical" ? "border-red-500/30 bg-red-500/5" : reason.severity === "major" ? "border-yellow-500/30 bg-yellow-500/5" : "border-blue-500/30 bg-blue-500/5"
              const severityLabel = reason.severity === "critical" 
                ? (lang === "ur" ? "سنگین" : "Critical")
                : reason.severity === "major"
                  ? (lang === "ur" ? "اہم" : "Major")
                  : (lang === "ur" ? "معمولی" : "Minor")

              return (
                <div key={i} className={`p-6 rounded-2xl border ${severityColor} mb-4`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      reason.severity === "critical" ? "bg-red-500/20" : reason.severity === "major" ? "bg-yellow-500/20" : "bg-blue-500/20"
                    }`}>
                      {reason.severity === "critical" ? "🔴" : reason.severity === "major" ? "🟡" : "🔵"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{lang === "ur" ? reason.titleUr : reason.titleEn}</h3>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          reason.severity === "critical" ? "bg-red-500/20 text-red-400" : reason.severity === "major" ? "bg-yellow-500/20 text-yellow-400" : "bg-blue-500/20 text-blue-400"
                        }`}>{severityLabel}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">
                          {reason.successRate}% {lang === "ur" ? "کامیابی" : "recovery"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed mb-3">
                        {lang === "ur" ? reason.meaningUr : reason.meaningEn}
                      </p>
                    </div>
                  </div>

                  {/* Fix Steps */}
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-green-400 mb-2">
                      {lang === "ur" ? "📋 حل کرنے کے اقدامات:" : "📋 Fix Steps:"}
                    </h4>
                    <div className="space-y-1.5">
                      {(lang === "ur" ? reason.fixStepsUr : reason.fixStepsEn).map((step, si) => (
                        <div key={si} className="flex gap-2 text-xs text-gray-300">
                          <span className="text-green-400 mt-0.5">→</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents Needed */}
                  <div>
                    <h4 className="text-xs font-medium text-blue-400 mb-2">
                      {lang === "ur" ? "📄 ضروری دستاویزات:" : "📄 Documents Needed:"}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(lang === "ur" ? reason.documentsNeededUr : reason.documentsNeededEn).map((doc, di) => (
                        <span key={di} className="text-[10px] px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <button
                onClick={() => setStep("select")}
                className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <RefreshCw size={16} />
                {lang === "ur" ? "دوبارہ تجزیہ کریں" : "Analyze Another"}
              </button>
              <a
                href="/sop-generator"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg inline-flex items-center gap-2"
              >
                <FileText size={16} />
                {lang === "ur" ? "نیا کور لیٹر بنائیں" : "Generate New Cover Letter"}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
