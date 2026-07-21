"use client"

import { useLang } from "@/lib/language-context"
import { Shield, Globe, Heart, Target, Users, Lightbulb } from "lucide-react"

const teamValues = [
  { icon: Lightbulb, en: "AI-Powered", ur: "AI سے چلنے والا", descEn: "We use cutting-edge AI to make visa preparation accessible", descUr: "ہم جدید AI استعمال کر کے ویزا کی تیاری کو آسان بناتے ہیں" },
  { icon: Shield, en: "Transparency", ur: "شفافیت", descEn: "No hidden fees, no fake guarantees. We're honest about what we can and cannot do", descUr: "کوئی چھپی ہوئی فیس نہیں، کوئی جھوٹی گارنٹی نہیں۔ ہم ایماندار ہیں" },
  { icon: Users, en: "For the People", ur: "عوام کے لیے", descEn: "Built specifically for Pakistan, India, and developing countries", descUr: "خاص طور پر پاکستان، انڈیا اور ترقی پذیر ممالک کے لیے بنایا گیا" },
  { icon: Heart, en: "Affordable", ur: "سستی", descEn: "Visa assistance should not cost lakhs of rupees. Everyone deserves a fair chance", descUr: "ویزا کی مدد کی قیمت لاکھوں نہیں ہونی چاہیے۔ ہر کوئی منصفانہ موقع کا حقدار ہے" },
]

export default function AboutPage() {
  const { lang } = useLang()

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl shadow-blue-600/30">
            🎯
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {lang === "ur" ? "VisaWala کے بارے میں" : "About VisaWala"}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {lang === "ur"
              ? "VisaWala ایک AI سے چلنے والا ویزا تیاری کا پلیٹ فارم ہے جو پاکستان اور انڈیا جیسے ممالک کے لوگوں کو بغیر مہنگے ایجنٹوں کے ویزا حاصل کرنے میں مدد کرتا ہے۔"
              : "VisaWala is an AI-powered visa preparation platform that helps people from Pakistan, India, and developing countries get visas without expensive agents."}
          </p>
        </div>

        {/* Mission */}
        <div className="p-8 rounded-2xl bg-gradient-card border border-white/10 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">{lang === "ur" ? "ہمارا مشن" : "Our Mission"}</h2>
          </div>
          <p className="text-gray-400 leading-relaxed" style={{ lineHeight: 1.8 }}>
            {lang === "ur"
              ? "ہمارا مشن ہے کہ پاکستان اور انڈیا جیسے ممالک کے ہر فرد کو بغیر کسی مہنگے ایجنٹ کے ویزا کی درخواست تیار کرنے کے قابل بنایا جائے۔ ہم AI کی طاقت استعمال کر کے وہ تمام کام کرتے ہیں جس کے لیے لوگ لاکھوں روپے ایجنٹوں کو دیتے ہیں — دستاویزات کی تیاری، فارم بھرنا، کور لیٹر لکھنا، اور کمپلائنس چیک کرنا۔"
              : "Our mission is to make visa preparation accessible to everyone in Pakistan, India, and similar countries — without expensive agents. We use AI to do everything people pay agents lakhs for: document preparation, form filling, cover letter writing, and compliance checking."}
          </p>
        </div>

        {/* The Problem */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
            <h3 className="text-lg font-semibold text-red-400 mb-3">
              {lang === "ur" ? "مسئلہ" : "The Problem"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• {lang === "ur" ? "45-52% Pakistani Schengen ویزا ریجیکٹ ہوتے ہیں" : "45-52% of Pakistani Schengen visas are rejected"}</li>
              <li>• {lang === "ur" ? "ایجنٹ 20,000 سے 1,50,000 روپے فی ایپلیکیشن لیتے ہیں" : "Agents charge PKR 20,000-150,000 per application"}</li>
              <li>• {lang === "ur" ? "زیادہ تر ریجیکشن غلط دستاویزات کی وجہ سے ہوتی ہے" : "Most rejections are due to incorrect documentation"}</li>
              <li>• {lang === "ur" ? "لوگ نہیں جانتے کہ ان کی ایپلیکیشن میں کیا کمی ہے" : "People don't know what's missing in their application"}</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10">
            <h3 className="text-lg font-semibold text-green-400 mb-3">
              {lang === "ur" ? "ہمارا حل" : "Our Solution"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✅ {lang === "ur" ? "AI ہر دستاویز چیک کر کے سکور دیتا ہے" : "AI checks every document and gives a score"}</li>
              <li>✅ {lang === "ur" ? "مکمل ویزا تیاری مفت سے 9,999 روپے تک" : "Complete visa preparation: Free to PKR 9,999"}</li>
              <li>✅ {lang === "ur" ? "کمزوریاں پہلے سے پکڑتا ہے — ریجیکشن کم" : "Catches weaknesses early — fewer rejections"}</li>
              <li>✅ {lang === "ur" ? "اردو/ہندی میں رہنمائی — ہر کوئی سمجھ سکتا ہے" : "Urdu/Hindi guidance — everyone understands"}</li>
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-center">{lang === "ur" ? "ہماری اقدار" : "Our Values"}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {teamValues.map((v, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <v.icon className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold">{lang === "ur" ? v.ur : v.en}</h3>
                </div>
                <p className="text-sm text-gray-400">{lang === "ur" ? v.descUr : v.descEn}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/10">
          <h3 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
            <Shield size={16} />
            {lang === "ur" ? "قانونی ڈس کلیمر" : "Legal Disclaimer"}
          </h3>
          <p className="text-xs text-yellow-400/70 leading-relaxed">
            {lang === "ur"
              ? "VisaWala ایک ویزا تیاری کا آلہ ہے، قانونی فرم نہیں۔ ہم ویزا کی منظوری کی گارنٹی نہیں دیتے۔ ویزا کے حتمی فیصلے متعلقہ سفارت خانے یا قونصل خانے کے اختیار میں ہیں۔ ہماری خدمات قانونی مشورے پر مشتمل نہیں ہیں۔ براہ کرم کسی بھی اہم فیصلے سے پہلے کسی مستند امیگریشن وکیل سے مشورہ کریں۔"
              : "VisaWala is a visa preparation tool, not a law firm. We do not guarantee visa approval. Final visa decisions are at the sole discretion of the respective embassy or consulate. Our services do not constitute legal advice. Please consult a qualified immigration attorney for any legal decisions."}
          </p>
        </div>
      </div>
    </div>
  )
}
