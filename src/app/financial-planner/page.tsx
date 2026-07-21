"use client"

import { useState } from "react"
import { useLang } from "@/lib/language-context"
import { Calculator, ArrowRight, RefreshCw, DollarSign, Info } from "lucide-react"

const countryRates: Record<string, {
  flag: string, nameEn: string, nameUr: string,
  currency: string, symbol: string,
  dailyMin: number, // minimum per day in local currency
  rateToPkr: number, // approximate rate
  visaFee: string, insuranceMin: string,
  tipsEn: string[], tipsUr: string[]
}> = {
  italy: { flag: "🇮🇹", nameEn: "Italy", nameUr: "اٹلی", currency: "EUR", symbol: "€", dailyMin: 50, rateToPkr: 285, visaFee: "€80", insuranceMin: "€30,000", tipsEn: ["Schengen requires €50/day minimum", "Hotel bookings can reduce daily cash requirement", "Show consistent balance, not last-minute deposits"], tipsUr: ["شینگن کم از کم €50 یومیہ چاہتا ہے", "ہوٹل بکنگ روزانہ نقدی کی ضرورت کو کم کر سکتی ہے", "آخری وقت کی جمع رقم کے بجائے مسلسل بیلنس دکھائیں"] },
  spain: { flag: "🇪🇸", nameEn: "Spain", nameUr: "اسپین", currency: "EUR", symbol: "€", dailyMin: 50, rateToPkr: 285, visaFee: "€80", insuranceMin: "€30,000", tipsEn: ["Spain requires €50-100/day depending on accommodation", "Bank statement must show salary credits"], tipsUr: ["اسپین کو رہائش کے لحاظ سے €50-100 یومیہ درکار ہے", "بینک اسٹیٹمنٹ میں تنخواہ کی جمع رقم دکھنی چاہیے"] },
  germany: { flag: "🇩🇪", nameEn: "Germany", nameUr: "جرمنی", currency: "EUR", symbol: "€", dailyMin: 45, rateToPkr: 285, visaFee: "€80", insuranceMin: "€30,000", tipsEn: ["Germany is strict — €45/day minimum is strictly enforced", "Blocked account for students: €11,208/year"], tipsUr: ["جرمنی سخت ہے — €45 یومیہ کم از کم سختی سے نافذ ہے", "طلبہ کے لیے بلاکڈ اکاؤنٹ: €11,208/سال"] },
  france: { flag: "🇫🇷", nameEn: "France", nameUr: "فرانس", currency: "EUR", symbol: "€", dailyMin: 65, rateToPkr: 285, visaFee: "€80", insuranceMin: "€30,000", tipsEn: ["France expects €65-120/day for tourists", "Paris is more expensive — budget accordingly"], tipsUr: ["فرانس سیاحوں کے لیے €65-120 یومیہ توقع رکھتا ہے", "پیرس زیادہ مہنگا ہے — اس کے مطابق بجٹ بنائیں"] },
  uk: { flag: "🇬🇧", nameEn: "United Kingdom", nameUr: "برطانیہ", currency: "GBP", symbol: "£", dailyMin: 100, rateToPkr: 350, visaFee: "£115", insuranceMin: "£10,000", tipsEn: ["UK requires minimum £100-150/day", "Funds must be in account for 28 consecutive days"], tipsUr: ["برطانیہ کم از کم £100-150 یومیہ چاہتا ہے", "رقم 28 مسلسل دنوں تک اکاؤنٹ میں ہونی چاہیے"] },
  usa: { flag: "🇺🇸", nameEn: "United States", nameUr: "امریکہ", currency: "USD", symbol: "$", dailyMin: 100, rateToPkr: 278, visaFee: "$185", insuranceMin: "Recommended", tipsEn: ["US B1/B2 visa requires proof of funds for entire trip", "No fixed minimum — show enough for your itinerary"], tipsUr: ["امریکہ B1/B2 ویزا کے لیے پورے سفر کے لیے رقم کا ثبوت چاہیے", "کوئی مقررہ کم از کم نہیں — اپنے پروگرام کے لیے کافی رقم دکھائیں"] },
  canada: { flag: "🇨🇦", nameEn: "Canada", nameUr: "کینیڈا", currency: "CAD", symbol: "C$", dailyMin: 100, rateToPkr: 205, visaFee: "$150", insuranceMin: "C$10,000", tipsEn: ["Canada recommends C$100-150/day for tourists", "Bank statement + employment letter mandatory"], tipsUr: ["کینیڈا سیاحوں کے لیے C$100-150 یومیہ تجویز کرتا ہے", "بینک اسٹیٹمنٹ + روزگار کا سرٹیفکیٹ لازمی ہے"] },
  uae: { flag: "🇦🇪", nameEn: "UAE", nameUr: "متحدہ عرب امارات", currency: "AED", symbol: "د.إ", dailyMin: 300, rateToPkr: 76, visaFee: "Free-300", insuranceMin: "Recommended", tipsEn: ["UAE requires proof of hotel booking and return ticket", "Dubai is expensive — budget AED 500-800/day for comfort"], tipsUr: ["متحدہ عرب امارات میں ہوٹل بکنگ اور واپسی ٹکٹ کا ثبوت درکار ہے", "دبئی مہنگا ہے — آرام کے لیے AED 500-800 یومیہ بجٹ رکھیں"] },
  turkey: { flag: "🇹🇷", nameEn: "Turkey", nameUr: "ترکی", currency: "TRY", symbol: "₺", dailyMin: 100, rateToPkr: 9, visaFee: "$60-90", insuranceMin: "€15,000", tipsEn: ["Turkey e-Visa is easy — just need hotel + flight", "Show at least PKR 100,000 for a week trip"], tipsUr: ["ترکی کا ای-ویزا آسان ہے — صرف ہوٹل + فلائٹ چاہیے", "ایک ہفتے کے سفر کے لیے کم از کم 1 لاکھ روپے دکھائیں"] },
}

export default function FinancialPlanner() {
  const { lang } = useLang()
  const [selectedCountry, setSelectedCountry] = useState("italy")
  const [days, setDays] = useState(10)
  const [monthlyIncome, setMonthlyIncome] = useState("100000")
  const [savings, setSavings] = useState("300000")

  const country = countryRates[selectedCountry]
  if (!country) return null

  const dailyCost = country.dailyMin
  const totalTripCost = dailyCost * days
  const totalTripCostPkr = totalTripCost * country.rateToPkr
  const savingsNum = parseInt(savings) || 0
  const incomeNum = parseInt(monthlyIncome) || 0

  const isSufficient = savingsNum >= totalTripCostPkr
  const gap = totalTripCostPkr - savingsNum
  const incomeRatio = totalTripCostPkr / Math.max(incomeNum, 1)
  const monthsToSave = Math.ceil(gap / Math.max(incomeNum, 1))

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl shadow-green-600/30">
            💰
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {lang === "ur" ? "مالی منصوبہ ساز" : "Financial Planner"}
          </h1>
          <p className="text-gray-400">
            {lang === "ur"
              ? "جانیں کہ آپ کے سفر کے لیے کتنی رقم درکار ہے — ملک کے لحاظ سے"
              : "Know exactly how much money you need for your visa — country-specific"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="p-6 rounded-2xl bg-gradient-card border border-white/10">
            <h2 className="font-semibold mb-4">
              {lang === "ur" ? "اپنی معلومات درج کریں" : "Enter Your Details"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  {lang === "ur" ? "منزل کا ملک" : "Destination Country"}
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  value={selectedCountry}
                  onChange={e => setSelectedCountry(e.target.value)}
                >
                  {Object.entries(countryRates).map(([id, c]) => (
                    <option key={id} value={id} className="bg-gray-900">
                      {c.flag} {lang === "ur" ? c.nameUr : c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  {lang === "ur" ? "قیام کی مدت (دن)" : "Duration (days)"}
                </label>
                <input type="number" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  value={days} onChange={e => setDays(parseInt(e.target.value) || 1)} min={1} max={90} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  {lang === "ur" ? "ماہانہ تنخواہ (PKR)" : "Monthly Income (PKR)"}
                </label>
                <input type="number" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  value={monthlyIncome} onChange={e => setMonthlyIncome(e.target.value)} min={0} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  {lang === "ur" ? "موجودہ بچت (PKR)" : "Current Savings (PKR)"}
                </label>
                <input type="number" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  value={savings} onChange={e => setSavings(e.target.value)} min={0} />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="p-6 rounded-2xl bg-gradient-card border border-white/10">
            <h2 className="font-semibold mb-4">
              {country.flag} {lang === "ur" ? country.nameUr : country.nameEn}
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-xs text-gray-500 mb-1">{lang === "ur" ? "یومیہ لاگت" : "Daily Cost"}</div>
                <div className="text-xl font-bold">{country.symbol}{dailyCost} / {lang === "ur" ? "دن" : "day"}</div>
                <div className="text-xs text-gray-500">≈ PKR {(dailyCost * country.rateToPkr).toLocaleString()} / {lang === "ur" ? "دن" : "day"}</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-xs text-gray-500 mb-1">{lang === "ur" ? "کل سفر کی لاگت" : "Total Trip Cost"}</div>
                <div className="text-xl font-bold">{country.symbol}{totalTripCost.toLocaleString()}</div>
                <div className="text-xs text-gray-500">≈ PKR {totalTripCostPkr.toLocaleString()}</div>
              </div>

              <div className={`p-4 rounded-xl ${isSufficient ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                <div className="flex items-center gap-2 mb-1">
                  {isSufficient ? <span className="text-green-400">✅</span> : <span className="text-red-400">❌</span>}
                  <div className="text-xs text-gray-500">{lang === "ur" ? "آپ کی بچت" : "Your Savings"}</div>
                </div>
                <div className="text-xl font-bold">{isSufficient ? "✅ " : "❌ "} PKR {savingsNum.toLocaleString()}</div>
                {!isSufficient && (
                  <div className="text-xs text-red-400 mt-1">
                    {lang === "ur"
                      ? `کمی: PKR ${gap.toLocaleString()}۔ ${monthsToSave} مہینے اور بچت کریں`
                      : `Shortfall: PKR ${gap.toLocaleString()}. Save for ${monthsToSave} more months`}
                  </div>
                )}
                {isSufficient && (
                  <div className="text-xs text-green-400 mt-1">
                    {lang === "ur" ? "✅ آپ کے پاس کافی رقم ہے!" : "✅ You have sufficient funds!"}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <DollarSign size={12} />
                {lang === "ur" ? "شرح: 1 " : "Rate: 1 "}{country.currency} = PKR {country.rateToPkr}
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="p-6 rounded-2xl bg-gradient-card border border-white/10 mt-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Info size={16} className="text-blue-400" />
            {lang === "ur" ? "اہم نکات" : "Important Tips"}
          </h3>
          <ul className="space-y-2">
            {(lang === "ur" ? country.tipsUr : country.tipsEn).map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-400">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
