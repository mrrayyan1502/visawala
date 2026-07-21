"use client"

import Link from "next/link"
import { useLang } from "@/lib/language-context"
import { ArrowRight, Shield, FileCheck, Sparkles, Brain, Globe, Users, Star, ChevronRight } from "lucide-react"

const features = [
  {
    icon: Brain,
    titleKey: "en" as const,
    title: "Visa Finder AI",
    titleUr: "وائسا فائنڈر AI",
    desc: "Answer 5 questions and AI finds the best visa for you — tourist, student, work, or visit",
    descUr: "5 سوالات جواب دیں اور AI آپ کے لیے بہترین ویزا تلاش کرے — سیاحت، تعلیم، نوکری یا خاندان",
  },
  {
    icon: FileCheck,
    titleKey: "en" as const,
    title: "Document Wizard",
    titleUr: "دستاویز وزرڈ",
    desc: "Step-by-step guidance for every document. No more confusion about what to submit",
    descUr: "ہر دستاویز کے لیے مرحلہ وار رہنمائی۔ اب کنفیوژن نہیں کہ کیا جمع کرانا ہے",
  },
  {
    icon: Sparkles,
    titleKey: "en" as const,
    title: "Cover Letter Generator",
    titleUr: "کور لیٹر جنریٹر",
    desc: "AI writes professional cover letters in perfect English. Just fill in your details in Urdu",
    descUr: "AI پرفیکٹ انگلش میں پروفیشنل کور لیٹر لکھتا ہے۔ آپ صرف اردو میں ڈیٹیل بھریں",
  },
  {
    icon: Shield,
    titleKey: "en" as const,
    title: "Compliance Checker",
    titleUr: "کمپلائنس چیکر",
    desc: "AI checks all your documents and gives a score. Know your weak spots before submitting",
    descUr: "AI آپ کی تمام دستاویزات چیک کر کے سکور دیتا ہے۔ سبمٹ کرنے سے پہلے کمزوریاں جانیں",
  },
  {
    icon: Globe,
    titleKey: "en" as const,
    title: "Visa Coach",
    titleUr: "وائسا کوچ",
    desc: "Mock interview practice with AI in Urdu/English. Get ready for embassy questions",
    descUr: "AI کے ساتھ اردو/انگلش میں انٹرویو پریکٹس۔ ایمبیسی کے سوالوں کے لیے تیار ہوں",
  },
]

const stats = [
  { value: "10K+", labelEn: "Applications Prepared", labelUr: "ایپلیکیشنز تیار" },
  { value: "40+", labelEn: "Countries Supported", labelUr: "ممالک سپورٹڈ" },
  { value: "85%", labelEn: "Average Quality Score", labelUr: "اوسط کوالٹی سکور" },
  { value: "₹0", labelEn: "Start Free", labelUr: "مفت شروع کریں" },
]

const testimonials = [
  {
    name: "Ahmed R.",
    nameUr: "احمد آر",
    from: "Lahore, Pakistan",
    fromUr: "لاہور، پاکستان",
    text: "I applied for Italy Schengen visa 3 times and got rejected each time. VisaWala's compliance checker found issues in my bank statement I never knew about. 4th time, visa approved!",
    textUr: "میں نے 3 بار اٹلی کا ویزا اپلائی کیا اور ہر بار ریجیکٹ ہوا۔ VisaWala کے کمپلائنس چیکر نے میرے بینک سٹیٹمنٹ میں ایسی کمزوریاں نکالیں جو مجھے معلوم بھی نہ تھیں۔ چوتھی بار ویزا مل گیا!",
    rating: 5,
  },
  {
    name: "Priya S.",
    nameUr: "پریا ایس",
    from: "Mumbai, India",
    fromUr: "ممبئی، انڈیا",
    text: "The cover letter generator saved me so much money. Agents were charging ₹15,000 just for a cover letter. VisaWala did it perfectly for free!",
    textUr: "کور لیٹر جنریٹر نے میرے بہت پیسے بچائے۔ ایجنٹ صرف کور لیٹر کے ₹15,000 لے رہے تھے۔ VisaWala نے فری میں پرفیکٹ بنا دیا!",
    rating: 5,
  },
  {
    name: "Usman K.",
    nameUr: "عثمان کے",
    from: "Karachi, Pakistan",
    fromUr: "کراچی، پاکستان",
    text: "Student visa for Germany seemed impossible. VisaWala guided me step by step and even the interview coach helped me prepare. Now I'm in Berlin! 🇩🇪",
    textUr: "جرمنی کا سٹوڈنٹ ویزا ناممکن لگ رہا تھا۔ VisaWala نے قدم بہ قدم رہنمائی کی اور انٹرویو کوچ نے مجھے تیار کیا۔ اب میں برلن میں ہوں! 🇩🇪",
    rating: 5,
  },
]

export default function HomePage() {
  const { t, lang } = useLang()

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="bg-gradient-hero relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl animate-float" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              <Sparkles size={14} />
              {lang === "ur" ? "AI سے چلنے والا ویزا اسسٹنٹ" : "AI-Powered Visa Assistant"}
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              {lang === "ur" ? (
                <>
                  آپ کا اپنا{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AI ویزا اسسٹنٹ
                  </span>
                  <br />
                  ایجنٹ نہیں، انٹیلیجنس
                </>
              ) : (
                <>
                  Your Personal{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AI Visa Assistant
                  </span>
                  <br />
                  No Agent. Just Intelligence.
                </>
              )}
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
              {lang === "ur"
                ? "VisaWala AI کی مدد سے آپ کو بہترین ویزا ایپلیکیشن تیار کرنے میں مدد کرتا ہے۔ دستاویزات سے لے کر کور لیٹر تک، انٹرویو سے لے کر کمپلائنس چیک تک — سب کچھ ایک جگہ۔ اب ایجنٹوں کو لاکھوں نہ دیں۔"
                : "VisaWala helps you prepare bulletproof visa applications with AI. From documents to cover letters, from interviews to compliance checks — everything in one place. Stop paying agents lakhs of rupees."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/visa-finder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40"
              >
                {t.hero.cta1}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/sop-generator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all"
              >
                {t.hero.cta2}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {lang === "ur" ? stat.labelUr : stat.labelEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {lang === "ur" ? "AI کے ساتھ ویزا بنانا اب آسان" : "Visa Made Easy with AI"}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {lang === "ur"
                ? "ہر وہ کام جو ایجنٹ 20,000 سے 1,50,000 میں کرتا ہے — اب AI آپ کے لیے مفت یا بہت کم قیمت میں کرے گا"
                : "Everything an agent does for PKR 20,000–150,000 — now AI does for you free or at minimal cost"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-gradient-card border border-white/5 hover:border-blue-500/30 transition-all duration-300 glow-blue hover:glow-blue"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {lang === "ur" ? feature.titleUr : feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {lang === "ur" ? feature.descUr : feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {lang === "ur" ? "یہ کیسے کام کرتا ہے" : "How It Works"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", en: "Tell us about your travel plans", ur: "اپنے سفر کے منصوبے بتائیں" },
              { num: "02", en: "AI prepares your complete application", ur: "AI آپ کی مکمل ایپلیکیشن تیار کرتا ہے" },
              { num: "03", en: "Submit with confidence — visa approved! 🎉", ur: "اعتماد کے ساتھ جمع کروائیں — ویزا منظور! 🎉" },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-blue-600/30">
                  {step.num}
                </div>
                <p className="text-lg font-medium">
                  {lang === "ur" ? step.ur : step.en}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/visa-finder"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg"
            >
              {t.finder.start}
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {lang === "ur" ? "کامیابیاں" : "Success Stories"}
            </h2>
            <p className="text-gray-400">
              {lang === "ur" ? "ہمارے صارفین کے تجربات" : "Real experiences from our users"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-card border border-white/5">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  &ldquo;{lang === "ur" ? t.textUr : t.text}&rdquo;
                </p>
                <div>
                  <p className="font-medium text-sm">{lang === "ur" ? t.nameUr : t.name}</p>
                  <p className="text-xs text-gray-500">{lang === "ur" ? t.fromUr : t.from}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {lang === "ur" ? "آج ہی شروع کریں — مفت" : "Start Today — Free"}
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            {lang === "ur"
              ? "اب ایجنٹوں کو لاکھوں نہ دیں۔ AI کے ساتھ خود ویزا بنائیں۔"
              : "Stop paying agents lakhs. Build your own visa application with AI."}
          </p>
          <Link
            href="/visa-finder"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-600/30"
          >
            {t.finder.start}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
