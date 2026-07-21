"use client"

import { useState } from "react"
import { useLang } from "@/lib/language-context"
import { ArrowRight, ArrowLeft, RefreshCw, CheckCircle, AlertCircle, Info, ChevronRight } from "lucide-react"

const destinations = [
  { id: "italy", flag: "🇮🇹", en: "Italy", ur: "اٹلی" },
  { id: "spain", flag: "🇪🇸", en: "Spain", ur: "اسپین" },
  { id: "germany", flag: "🇩🇪", en: "Germany", ur: "جرمنی" },
  { id: "france", flag: "🇫🇷", en: "France", ur: "فرانس" },
  { id: "uk", flag: "🇬🇧", en: "United Kingdom", ur: "برطانیہ" },
  { id: "usa", flag: "🇺🇸", en: "United States", ur: "امریکہ" },
  { id: "canada", flag: "🇨🇦", en: "Canada", ur: "کینیڈا" },
  { id: "australia", flag: "🇦🇺", en: "Australia", ur: "آسٹریلیا" },
  { id: "uae", flag: "🇦🇪", en: "UAE", ur: "متحدہ عرب امارات" },
  { id: "turkey", flag: "🇹🇷", en: "Turkey", ur: "ترکی" },
  { id: "china", flag: "🇨🇳", en: "China", ur: "چین" },
  { id: "malaysia", flag: "🇲🇾", en: "Malaysia", ur: "ملائیشیا" },
]

const purposes = [
  { id: "tourism", emoji: "🏖️", en: "Tourism & Sightseeing", ur: "سیاحت و سیر سپاٹا" },
  { id: "business", emoji: "💼", en: "Business & Conference", ur: "کاروبار و کانفرنس" },
  { id: "study", emoji: "🎓", en: "Study & Education", ur: "تعلیم و مطالعہ" },
  { id: "work", emoji: "💪", en: "Work & Skilled Visa", ur: "نوکری / سکلڈ ویزا" },
  { id: "medical", emoji: "🏥", en: "Medical Treatment", ur: "علاج معالجہ" },
  { id: "family", emoji: "👨‍👩‍👧‍👦", en: "Family Visit", ur: "خاندان کی ملاقات" },
  { id: "transit", emoji: "✈️", en: "Transit / Layover", ur: "ٹرانزٹ" },
  { id: "migration", emoji: "🌍", en: "Migration / PR", ur: "ہجرت / مستقل رہائش" },
]

const incomeLevels = [
  { id: "low", rangeEn: "Under PKR 50,000/month", rangeUr: "50,000 روپے سے کم ماہانہ" },
  { id: "mid", rangeEn: "PKR 50,000 – 2,00,000/month", rangeUr: "50,000 – 2,00,000 روپے ماہانہ" },
  { id: "high", rangeEn: "PKR 2,00,000 – 10,00,000/month", rangeUr: "2,00,000 – 10,00,000 روپے ماہانہ" },
  { id: "very-high", rangeEn: "PKR 10,00,000+/month", rangeUr: "10,00,000+ روپے ماہانہ" },
]

const educationLevels = [
  { id: "school", en: "High School / Matric", ur: "ہائی سکول / میٹرک" },
  { id: "college", en: "College / Intermediate", ur: "کالج / انٹرمیڈیٹ" },
  { id: "bachelors", en: "Bachelor's Degree", ur: "بیچلرز ڈگری" },
  { id: "masters", en: "Master's Degree", ur: "ماسٹرز ڈگری" },
  { id: "phd", en: "PhD / Doctorate", ur: "پی ایچ ڈی" },
  { id: "vocational", en: "Vocational / Diploma", ur: "ووکیشنل / ڈپلوما" },
]

type Answers = {
  destination: string
  purpose: string
  income: string
  education: string
  travelHistory: string
}

type Result = {
  visaType: string
  visaTypeUr: string
  probability: number
  description: string
  descriptionUr: string
  documents: { en: string; ur: string }[]
  tips: { en: string; ur: string }[]
  fee: string
  feeUr: string
  timeline: string
  timelineUr: string
}

function generateResult(answers: Answers, lang: "en" | "ur"): Result {
  const dest = destinations.find(d => d.id === answers.destination)
  const isSchengen = ["italy", "spain", "germany", "france"].includes(answers.destination)
  const isEnglishWest = ["uk", "usa", "canada", "australia"].includes(answers.destination)
  const isNearby = ["uae", "turkey", "china", "malaysia"].includes(answers.destination)
  const isStudent = answers.purpose === "study"
  const isWork = answers.purpose === "work" || answers.purpose === "migration"
  const highIncome = answers.income === "high" || answers.income === "very-high"
  const hasDegree = ["bachelors", "masters", "phd"].includes(answers.education)
  const hasTravel = answers.travelHistory === "yes"

  // Calculate probability based on factors
  let probability = 40 // Base
  if (isNearby) probability += 20
  if (isSchengen && highIncome && hasDegree) probability += 20
  if (isEnglishWest && hasDegree && highIncome) probability += 15
  if (hasTravel) probability += 15
  if (answers.purpose === "tourism" && isNearby) probability += 15
  if (answers.purpose === "family") probability += 10
  if (isWork && hasDegree) probability += 10
  if (answers.income === "low") probability -= 10
  if (!hasTravel) probability -= 5
  probability = Math.min(95, Math.max(20, probability))

  // Determine visa type
  let visaType = "Tourist Visa"
  let visaTypeUr = "ٹورسٹ ویزا"
  if (isStudent) { visaType = "Student Visa"; visaTypeUr = "سٹوڈنٹ ویزا" }
  else if (isWork) { visaType = "Work / Skilled Visa"; visaTypeUr = "ورک / سکلڈ ویزا" }
  else if (answers.purpose === "medical") { visaType = "Medical Visa"; visaTypeUr = "میڈیکل ویزا" }
  else if (answers.purpose === "family") { visaType = "Family Visit Visa"; visaTypeUr = "فیملی وزٹ ویزا" }

  const destName = dest ? (lang === "ur" ? dest.ur : dest.en) : ""
  const isUK = answers.destination === "uk"
  const isUS = answers.destination === "usa"

  return {
    visaType,
    visaTypeUr,
    probability,
    description: lang === "en"
      ? `Based on your profile, a ${visaType} for ${destName} is the best match. Your application strength is ${probability}% — we can improve this significantly with proper document preparation.`
      : `آپ کے پروفائل کی بنیاد پر ${destName} کے لیے ${visaTypeUr} بہترین ہے۔ آپ کی ایپلیکیشن کی طاقت ${probability}% ہے — مناسب دستاویزات کی تیاری سے اسے بہتر بنا سکتے ہیں۔`,
    descriptionUr: `آپ کے پروفائل کی بنیاد پر ${destName} کے لیے ${visaTypeUr} بہترین ہے۔ آپ کی ایپلیکیشن کی طاقت ${probability}% ہے — مناسب دستاویزات کی تیاری سے اسے بہتر بنا سکتے ہیں۔`,
    documents: isSchengen ? [
      { en: "Valid passport (6+ months validity)", ur: "درست پاسپورٹ (6 ماہ سے زیادہ میعاد)" },
      { en: "Completed visa application form", ur: "مکمل ویزا اپلیکیشن فارم" },
      { en: "2 recent passport-sized photos (35x45mm)", ur: "2 حالیہ پاسپورٹ سائز تصویریں (35x45mm)" },
      { en: "Travel itinerary & flight bookings", ur: "سفر کا پروگرام اور فلائٹ بکنگ" },
      { en: "Hotel reservations", ur: "ہوٹل ریزرویشن" },
      { en: "Travel insurance (min €30,000 coverage)", ur: "ٹریول انشورنس (کم از کم €30,000 کوریج)" },
      { en: "Bank statement (last 6 months)", ur: "بینک سٹیٹمنٹ (گزشتہ 6 ماہ)" },
      { en: "Employment letter / No Objection Certificate", ur: "روزگار کا سرٹیفکیٹ / این او سی" },
    ] : isUK ? [
      { en: "Valid passport", ur: "درست پاسپورٹ" },
      { en: "Online application form (UKVI)", ur: "آن لائن اپلیکیشن فارم (UKVI)" },
      { en: "Bank statement (6 months, min PKR 1,000,000)", ur: "بینک سٹیٹمنٹ (6 ماہ، کم از کم 10 لاکھ روپے)" },
      { en: "Employment evidence & payslips", ur: "روزگار کا ثبوت اور تنخواہ کی سلیپ" },
      { en: "Accommodation proof", ur: "رہائش کا ثبوت" },
      { en: "Travel itinerary", ur: "سفر کا پروگرام" },
      { en: "TB test certificate (if applicable)", ur: "ٹی بی ٹیسٹ سرٹیفکیٹ (اگر ضروری ہو)" },
    ] : isUS ? [
      { en: "Valid passport", ur: "درست پاسپورٹ" },
      { en: "DS-160 confirmation page", ur: "DS-160 کنفرمیشن پیج" },
      { en: "Visa appointment confirmation", ur: "وائسا اپوائنٹمنٹ کنفرمیشن" },
      { en: "Bank statement (6+ months)", ur: "بینک سٹیٹمنٹ (6+ ماہ)" },
      { en: "Employment letter", ur: "روزگار کا سرٹیفکیٹ" },
      { en: "Travel itinerary", ur: "سفر کا پروگرام" },
      { en: "Previous US visas (if any)", ur: "پچھلے امریکی ویزے (اگر ہوں)" },
    ] : [
      { en: "Valid passport", ur: "درست پاسپورٹ" },
      { en: "Visa application form", ur: "ویزا اپلیکیشن فارم" },
      { en: "Passport-size photos", ur: "پاسپورٹ سائز تصویریں" },
      { en: "Bank statement", ur: "بینک سٹیٹمنٹ" },
      { en: "Travel insurance", ur: "ٹریول انشورنس" },
      { en: "Flight & hotel bookings", ur: "فلائٹ اور ہوٹل بکنگ" },
    ],
    tips: [
      { en: "Submit bank statements showing consistent balance for 6+ months — avoid large last-minute deposits", ur: "6 ماہ سے زیادہ مسلسل بیلنس دکھانے والے بینک سٹیٹمنٹ جمع کروائیں — آخری وقت میں بڑی جمع رقم سے بچیں" },
      { en: "Write a detailed cover letter explaining your travel purpose and ties to home country", ur: "اپنے سفر کے مقصد اور وطن سے تعلقات کی وضاحت کرتے ہوئے تفصیلی کور لیٹر لکھیں" },
      { en: "Ensure travel insurance covers minimum €30,000 for Schengen countries", ur: "شینگن ممالک کے لیے ٹریول انشورنس کم از کم €30,000 کوریج کو یقینی بنائیں" },
      { en: "Provide proof of employment, property, or family ties to show you'll return", ur: "روزگار، جائیداد، یا خاندانی تعلقات کا ثبوت دیں کہ آپ واپس آئیں گے" },
    ],
    fee: isSchengen ? "€80 + service fee" : isUK ? "£115" : isUS ? "$185" : "$50–$200",
    feeUr: isSchengen ? "€80 + سروس فیس" : isUK ? "£115" : isUS ? "$185" : "$50–$200",
    timeline: isSchengen ? "15–30 days" : isUK ? "3–6 weeks" : isUS ? "2–4 weeks" : "1–4 weeks",
    timelineUr: isSchengen ? "15–30 دن" : isUK ? "3–6 ہفتے" : isUS ? "2–4 ہفتے" : "1–4 ہفتے",
  }
}

export default function VisaFinderPage() {
  const { t, lang } = useLang()
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    destination: "",
    purpose: "",
    income: "",
    education: "",
    travelHistory: "",
  })
  const [result, setResult] = useState<Result | null>(null)

  const questions = [
    {
      id: "destination",
      title: t.finder.questions.q1,
      desc: t.finder.questions.q1_desc,
      component: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {destinations.map(d => (
            <button
              key={d.id}
              onClick={() => { setAnswers(a => ({ ...a, destination: d.id })); setStep(1) }}
              className={`p-4 rounded-xl border text-center transition-all ${
                answers.destination === d.id
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <span className="text-2xl block mb-1">{d.flag}</span>
              <span className="text-sm font-medium">{lang === "ur" ? d.ur : d.en}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "purpose",
      title: t.finder.questions.q2,
      desc: t.finder.questions.q2_desc,
      component: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {purposes.map(p => (
            <button
              key={p.id}
              onClick={() => { setAnswers(a => ({ ...a, purpose: p.id })); setStep(2) }}
              className={`p-4 rounded-xl border text-left transition-all ${
                answers.purpose === p.id
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <span className="text-xl mr-2">{p.emoji}</span>
              <span className="text-sm font-medium">{lang === "ur" ? p.ur : p.en}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "income",
      title: t.finder.questions.q3,
      desc: t.finder.questions.q3_desc,
      component: (
        <div className="space-y-3">
          {incomeLevels.map(il => (
            <button
              key={il.id}
              onClick={() => { setAnswers(a => ({ ...a, income: il.id })); setStep(3) }}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                answers.income === il.id
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <span className="text-sm">{lang === "ur" ? il.rangeUr : il.rangeEn}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "education",
      title: t.finder.questions.q4,
      desc: t.finder.questions.q4_desc,
      component: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {educationLevels.map(el => (
            <button
              key={el.id}
              onClick={() => { setAnswers(a => ({ ...a, education: el.id })); setStep(4) }}
              className={`p-4 rounded-xl border text-center transition-all ${
                answers.education === el.id
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <span className="text-sm font-medium">{lang === "ur" ? el.ur : el.en}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "travelHistory",
      title: t.finder.questions.q5,
      desc: t.finder.questions.q5_desc,
      component: (
        <div className="flex gap-4">
          {[
            { id: "yes", en: "✅ Yes, I have traveled abroad", ur: "✅ ہاں، بیرون ملک جا چکا ہوں" },
            { id: "no", en: "❌ No, this would be my first time", ur: "❌ نہیں، یہ پہلی بار ہو گا" },
          ].map(th => (
            <button
              key={th.id}
              onClick={() => {
                setAnswers(a => ({ ...a, travelHistory: th.id }))
                const finalAnswers = { ...answers, travelHistory: th.id }
                setResult(generateResult(finalAnswers, lang))
              }}
              className={`flex-1 p-6 rounded-xl border text-center transition-all ${
                answers.travelHistory === th.id
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <span className="text-sm font-medium">{lang === "ur" ? th.ur : th.en}</span>
            </button>
          ))}
        </div>
      ),
    },
  ]

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-hero">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl mx-auto mb-6 shadow-xl shadow-blue-600/30">
            🔍
          </div>
          <h1 className="text-4xl font-bold mb-4">{t.finder.title}</h1>
          <p className="text-gray-400 text-lg mb-8">{t.finder.subtitle}</p>

          {/* Preview benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-sm font-medium">{lang === "ur" ? "صحیح ویزا تلاش" : "Right Visa Match"}</div>
              <div className="text-xs text-gray-500">{lang === "ur" ? "آپ کے پروفائل کے مطابق" : "Based on your profile"}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl mb-1">📋</div>
              <div className="text-sm font-medium">{lang === "ur" ? "مکمل دستاویزات" : "Full Document List"}</div>
              <div className="text-xs text-gray-500">{lang === "ur" ? "ہر ویزے کے لیے الگ" : "Tailored per visa type"}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-sm font-medium">{lang === "ur" ? "کامیابی کا سکور" : "Success Score"}</div>
              <div className="text-xs text-gray-500">{lang === "ur" ? "اپنی طاقت جانیں" : "Know your chances"}</div>
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-600/30 inline-flex items-center gap-2"
          >
            {t.finder.start}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    )
  }

  if (result) {
    const scoreColor = result.probability >= 70 ? "text-green-400" : result.probability >= 50 ? "text-yellow-400" : "text-red-400"
    const scoreBg = result.probability >= 70 ? "from-green-500" : result.probability >= 50 ? "from-yellow-500" : "from-red-500"

    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">{t.finder.results}</h1>
            <p className="text-gray-400">{lang === "ur" ? "آپ کے لیے بہترین ویزا" : "Best visa for you"}</p>
          </div>

          {/* Main Result Card */}
          <div className="p-8 rounded-2xl bg-gradient-card border border-white/10 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              {/* Score Circle */}
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/10" />
                  <circle
                    cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none"
                    className={`${scoreColor}`}
                    strokeDasharray={`${(result.probability / 100) * 264}`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${scoreColor}`}>{result.probability}%</div>
                    <div className="text-xs text-gray-500">{lang === "ur" ? "اسکور" : "Score"}</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs mb-3">
                  {lang === "ur" ? "تجویز کردہ ویزا" : "Recommended Visa"}
                </div>
                <h2 className="text-2xl font-bold mb-1">{lang === "ur" ? result.visaTypeUr : result.visaType}</h2>
                <p className="text-gray-400 text-sm mb-3">
                  {destinations.find(d => d.id === answers.destination) && (
                    <>{destinations.find(d => d.id === answers.destination)!.flag} {lang === "ur" ? destinations.find(d => d.id === answers.destination)!.ur : destinations.find(d => d.id === answers.destination)!.en}</>
                  )}
                </p>
                <p className="text-sm text-gray-400">{result.probability >= 70
                  ? (lang === "ur" ? "آپ کا پروفائل مضبوط ہے! صحیح تیاری سے کامیابی کے امکانات بہت زیادہ ہیں۔" : "Your profile is strong! With proper preparation, success chances are high.")
                  : (lang === "ur" ? "آپ کا پروفائل بہتر ہو سکتا ہے۔ نیچے دی گئی تجاویز پر عمل کریں۔" : "Your profile can be improved. Follow the tips below.")
                }</p>
              </div>
            </div>

            {/* Fee & Timeline Row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-xs text-gray-500 mb-1">{lang === "ur" ? "فیس" : "Fee"}</div>
                <div className="text-lg font-semibold">{lang === "ur" ? result.feeUr : result.fee}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-xs text-gray-500 mb-1">{lang === "ur" ? "مدت" : "Timeline"}</div>
                <div className="text-lg font-semibold">{lang === "ur" ? result.timelineUr : result.timeline}</div>
              </div>
            </div>

            {/* Tips */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Info size={16} className="text-blue-400" />
                {lang === "ur" ? "کامیابی کے ٹپس" : "Success Tips"}
              </h3>
              <div className="space-y-2">
                {result.tips.map((tip, i) => (
                  <div key={i} className="flex gap-2 text-sm text-gray-400">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>{lang === "ur" ? tip.ur : tip.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="p-8 rounded-2xl bg-gradient-card border border-white/10 mb-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-400" />
              {lang === "ur" ? "ضروری دستاویزات" : "Required Documents"}
            </h3>
            <div className="space-y-3">
              {result.documents.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 text-xs">✓</span>
                  </div>
                  <span className="text-sm text-gray-300">{lang === "ur" ? doc.ur : doc.en}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <div className="flex gap-2">
                <AlertCircle size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-300 mb-1">
                    {lang === "ur" ? "اہم نوٹ" : "Important Note"}
                  </p>
                  <p className="text-xs text-yellow-400/70">
                    {lang === "ur"
                      ? "یہ سفارشات عمومی ہیں اور ویزا کی گارنٹی نہیں ہیں۔ براہ کرم متعلقہ سفارت خانے کی ویب سائٹ سے تازہ ترین معلومات ضرور چیک کریں۔"
                      : "These recommendations are general and do not guarantee visa approval. Please verify the latest requirements with the respective embassy website."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => { setResult(null); setStarted(false); setStep(0); setAnswers({ destination: "", purpose: "", income: "", education: "", travelHistory: "" }) }}
              className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all inline-flex items-center gap-2"
            >
              <RefreshCw size={16} />
              {t.finder.restart}
            </button>
            <a
              href="/sop-generator"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg inline-flex items-center gap-2"
            >
              {lang === "ur" ? "کور لیٹر بنائیں" : "Generate Cover Letter"}
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Quiz view
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">{t.finder.step} {step + 1} {t.finder.of} 5</span>
            <span className="text-sm text-blue-400">{Math.round(((step) / 5) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${((step) / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="p-8 rounded-2xl bg-gradient-card border border-white/10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-1">{questions[step].title}</h2>
            <p className="text-sm text-gray-400">{questions[step].desc}</p>
          </div>
          {questions[step].component}
        </div>
      </div>
    </div>
  )
}
