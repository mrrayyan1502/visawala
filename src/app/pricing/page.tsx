"use client"

import Link from "next/link"
import { useLang } from "@/lib/language-context"
import { Check, Sparkles, ArrowRight, ChevronRight } from "lucide-react"

const plans = [
  {
    key: "free" as const,
    icon: "🆓",
    price: "0",
    features: [
      { en: "Visa Finder AI (5 questions)", ur: "وائسا فائنڈر AI (5 سوالات)" },
      { en: "Basic document checklist", ur: "بنیادی دستاویز کی فہرست" },
      { en: "Cover letter generator (basic)", ur: "کور لیٹر جنریٹر (بنیادی)" },
      { en: "Compliance score preview", ur: "کمپلائنس سکور پیش نظارہ" },
    ],
    disabledFeatures: [
      { en: "Advanced compliance checker", ur: "ایڈوانسڈ کمپلائنس چیکر" },
      { en: "Interview coach", ur: "انٹرویو کوچ" },
      { en: "Priority support", ur: "ترجیحی سپورٹ" },
    ],
  },
  {
    key: "basic" as const,
    icon: "🌟",
    price: "1,999",
    popular: false,
    features: [
      { en: "Everything in Free", ur: "فری میں شامل تمام فیچرز" },
      { en: "Full document wizard (step-by-step)", ur: "مکمل دستاویز وزرڈ (مرحلہ وار)" },
      { en: "Advanced compliance checker", ur: "ایڈوانسڈ کمپلائنس چیکر" },
      { en: "SOP generator (premium templates)", ur: "SOP جنریٹر (پریمیم ٹیمپلیٹس)" },
      { en: "Application tracking", ur: "ایپلیکیشن ٹریکنگ" },
    ],
    disabledFeatures: [
      { en: "AI Interview coach", ur: "AI انٹرویو کوچ" },
      { en: "Lawyer review", ur: "وکیل کا جائزہ" },
    ],
  },
  {
    key: "premium" as const,
    icon: "🔥",
    price: "4,999",
    popular: true,
    features: [
      { en: "Everything in Basic", ur: "بیسک میں شامل تمام فیچرز" },
      { en: "AI Interview coach (voice)", ur: "AI انٹرویو کوچ (آواز)" },
      { en: "Cover letter + SOP bundle", ur: "کور لیٹر + SOP بنڈل" },
      { en: "Document translation help", ur: "دستاویز ترجمہ کی مدد" },
      { en: "WhatsApp/Email support", ur: "واٹس ایپ/ای میل سپورٹ" },
      { en: "Visa appointment tips", ur: "وائسا اپوائنٹمنٹ ٹپس" },
      { en: "Rejection recovery analysis", ur: "ریجیکشن ریکوری تجزیہ" },
    ],
    disabledFeatures: [
      { en: "Lawyer document review", ur: "وکیل دستاویز کا جائزہ" },
    ],
  },
  {
    key: "ultimate" as const,
    icon: "👑",
    price: "9,999",
    popular: false,
    features: [
      { en: "Everything in Premium", ur: "پریمیم میں شامل تمام فیچرز" },
      { en: "Lawyer document review", ur: "وکیل دستاویز کا جائزہ" },
      { en: "Priority 24/7 support", ur: "24/7 ترجیحی سپورٹ" },
      { en: "Personal Visa Assistant", ur: "ذاتی وائسا اسسٹنٹ" },
      { en: "Multi-country application support", ur: "ملٹی کنٹری ایپلیکیشن سپورٹ" },
      { en: "Money-back if score < 70%", ur: "اگر سکور 70% سے کم تو رقم واپس" },
    ],
    disabledFeatures: [],
  },
]

const faqs = [
  {
    en: "Is the visa guaranteed if I use VisaWala?",
    ur: "کیا VisaWala استعمال کرنے سے ویزا گارنٹیڈ ہے؟",
    answerEn: "No. VisaWala is a preparation tool — we help you build the strongest possible application, but visa approval is at the sole discretion of the embassy. We do not guarantee outcomes.",
    answerUr: "نہیں۔ VisaWala ایک تیاری کا آلہ ہے — ہم آپ کو بہترین ممکنہ ایپلیکیشن بنانے میں مدد کرتے ہیں، لیکن ویزا کی منظوری سفارت خانے کے اختیار میں ہے۔ ہم نتائج کی گارنٹی نہیں دیتے۔",
  },
  {
    en: "How is this different from a visa agent?",
    ur: "یہ ویزا ایجنٹ سے کیسے مختلف ہے؟",
    answerEn: "Agents charge PKR 20,000–150,000 per application. VisaWala costs PKR 0–9,999. Our AI does 80% of the work agents do — document checking, form filling, cover letter writing.",
    answerUr: "ایجنٹ فی ایپلیکیشن 20,000 سے 1,50,000 روپے لیتے ہیں۔ VisaWala کی قیمت 0 سے 9,999 روپے ہے۔ ہمارا AI وہ 80% کام کرتا ہے جو ایجنٹ کرتے ہیں — دستاویز چیکنگ، فارم بھرنا، کور لیٹر لکھنا۔",
  },
  {
    en: "What countries do you support?",
    ur: "آپ کن ممالک کو سپورٹ کرتے ہیں؟",
    answerEn: "We currently support 40+ countries including all Schengen countries (Italy, Spain, Germany, France), UK, USA, Canada, Australia, UAE, Turkey, Malaysia, and more.",
    answerUr: "ہم فی الحال 40+ ممالک کو سپورٹ کرتے ہیں جس میں تمام شینگن ممالک (اٹلی، اسپین، جرمنی، فرانس)، برطانیہ، امریکہ، کینیڈا، آسٹریلیا، متحدہ عرب امارات، ترکی، ملائیشیا اور مزید شامل ہیں۔",
  },
  {
    en: "Can I get a refund if my visa is rejected?",
    ur: "اگر ویزا ریجیکٹ ہو جائے تو کیا ریفنڈ مل سکتا ہے؟",
    answerEn: "Our Ultimate plan includes a satisfaction guarantee — if your compliance score is below 70%, we'll refund your fee. However, we cannot refund based on embassy decisions.",
    answerUr: "ہمارے الٹیمیٹ پلان میں اطمینان کی گارنٹی شامل ہے — اگر آپ کا کمپلائنس سکور 70% سے کم ہے تو ہم فیس واپس کر دیں گے۔ تاہم، ہم سفارت خانے کے فیصلوں کی بنیاد پر ریفنڈ نہیں دے سکتے۔",
  },
]

export default function PricingPage() {
  const { t, lang } = useLang()

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl shadow-blue-600/30">
            💎
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">{t.pricing.title}</h1>
          <p className="text-gray-400 text-lg">{t.pricing.subtitle}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            <Sparkles size={14} />
            {lang === "ur" ? "مفت میں شروع کریں — کریڈٹ کارڈ کی ضرورت نہیں" : "Start free — no credit card required"}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {plans.map((plan) => {
            const planT = t.pricing[plan.key]
            return (
              <div
                key={plan.key}
                className={`relative p-6 rounded-2xl border transition-all ${
                  plan.popular
                    ? "border-blue-500 bg-gradient-card glow-blue scale-105"
                    : "border-white/5 bg-gradient-card hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
                    {t.pricing.popular}
                  </div>
                )}

                <div className="text-2xl mb-3">{plan.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{planT.name}</h3>
                <p className="text-xs text-gray-400 mb-4">{planT.desc}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold">{lang === "ur" ? "Rs." : "PKR"} {plan.price}</span>
                  <span className="text-sm text-gray-500">{t.pricing.perApp}</span>
                </div>

                <Link
                  href="/visa-finder"
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center block transition-all mb-6 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-purple-500"
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {t.pricing.cta}
                </Link>

                {/* Features */}
                <div className="space-y-2.5">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-300">{lang === "ur" ? f.ur : f.en}</span>
                    </div>
                  ))}
                  {plan.disabledFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 opacity-40">
                      <Check size={14} className="text-gray-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-500 line-through">{lang === "ur" ? f.ur : f.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Compare vs Agents */}
        <div className="p-8 rounded-2xl bg-gradient-card border border-white/10 mb-20">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {lang === "ur" ? "VisaWala vs Visa Agent" : "VisaWala vs Visa Agent"}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4"></th>
                  <th className="py-3 px-4 text-center font-semibold text-blue-400">VisaWala AI</th>
                  <th className="py-3 px-4 text-center font-semibold text-red-400">{lang === "ur" ? "روایتی ایجنٹ" : "Traditional Agent"}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: lang === "ur" ? "فیس" : "Fee", visawala: lang === "ur" ? "0–9,999 روپے" : "PKR 0–9,999", agent: lang === "ur" ? "20,000–1,50,000 روپے" : "PKR 20,000–150,000" },
                  { feature: lang === "ur" ? "وقت" : "Time", visawala: lang === "ur" ? "فوری (5 منٹ)" : "Instant (5 min)", agent: lang === "ur" ? "دن/ہفتے" : "Days/weeks" },
                  { feature: lang === "ur" ? "دستاویز چیکنگ" : "Document Check", visawala: "✅ AI automated", agent: "✅ Manual" },
                  { feature: lang === "ur" ? "کور لیٹر" : "Cover Letter", visawala: "✅ AI generated", agent: "✅ Written" },
                  { feature: lang === "ur" ? "24/7 دستیابی" : "24/7 Availability", visawala: "✅ Always available", agent: "❌ Office hours only" },
                  { feature: lang === "ur" ? "کمپلائنس سکور" : "Compliance Score", visawala: "✅ AI scoring", agent: "❌ No scoring" },
                  { feature: lang === "ur" ? "انٹرویو پریکٹس" : "Interview Practice", visawala: "✅ Unlimited", agent: "❌ Extra charge" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-green-400">{row.visawala}</td>
                    <td className="py-3 px-4 text-center text-red-400">{row.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {lang === "ur" ? "اکثر پوچھے گئے سوالات" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group p-5 rounded-xl bg-white/5 border border-white/10 open:border-blue-500/30 transition-all">
                <summary className="text-sm font-medium cursor-pointer list-none flex items-center justify-between">
                  <span>{lang === "ur" ? faq.ur : faq.en}</span>
                  <ChevronRight size={16} className="text-gray-500 group-open:rotate-90 transition-transform flex-shrink-0 ml-2" />
                </summary>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  {lang === "ur" ? faq.answerUr : faq.answerEn}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
