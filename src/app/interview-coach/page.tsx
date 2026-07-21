"use client"

import { useState, useEffect } from "react"
import { useLang } from "@/lib/language-context"
import questions, { type Question, type CountryInterview } from "@/lib/interview-questions"
import { Sparkles, ChevronRight, Mic, Volume2, CheckCircle, AlertCircle, Brain, ArrowLeft, Award } from "lucide-react"

const visaTypeIcons: Record<string, string> = {
  tourist: "🏖️", business: "💼", student: "🎓", work: "💪", family: "👨‍👩‍👧‍👦", medical: "🏥",
}
const visaTypeNames: Record<string, { en: string; ur: string }> = {
  tourist: { en: "Tourist Visa", ur: "ٹورسٹ ویزا" },
  business: { en: "Business Visa", ur: "بزنس ویزا" },
  student: { en: "Student Visa", ur: "سٹوڈنٹ ویزا" },
  work: { en: "Work Visa", ur: "ورک ویزا" },
  family: { en: "Family Visit", ur: "فیملی وزٹ" },
  medical: { en: "Medical Visa", ur: "میڈیکل ویزا" },
}

const categoryColors: Record<string, string> = {
  basic: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  financial: "bg-green-500/10 text-green-400 border-green-500/20",
  travel: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ties: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  purpose: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  redflag: "bg-red-500/10 text-red-400 border-red-500/20",
}
const categoryNames: Record<string, { en: string; ur: string }> = {
  basic: { en: "Basic", ur: "بنیادی" },
  financial: { en: "Financial", ur: "مالی" },
  travel: { en: "Travel History", ur: "سفر کی تاریخ" },
  ties: { en: "Home Ties", ur: "وطن سے تعلقات" },
  purpose: { en: "Purpose", ur: "مقصد" },
  redflag: { en: "⚠️ Red Flag", ur: "⚠️ اہم سوال" },
}

export default function InterviewCoach() {
  const { t, lang } = useLang()
  const [step, setStep] = useState<"select" | "practice" | "result">("select")
  const [selectedCountry, setSelectedCountry] = useState<CountryInterview | null>(null)
  const [selectedVisaType, setSelectedVisaType] = useState("tourist")
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [showModelAnswer, setShowModelAnswer] = useState(false)
  const [scores, setScores] = useState<number[]>([])

  const filteredCountries = questions.filter(c => {
    const vt = c.visaTypes[selectedVisaType]
    return vt && vt.length > 0
  })

  const currentQuestions = selectedCountry?.visaTypes[selectedVisaType] || []
  const currentQuestion = currentQuestions[currentQIndex]
  const isLastQuestion = currentQIndex >= currentQuestions.length - 1
  const isFirstQuestion = currentQIndex === 0

  function startPractice(country: CountryInterview) {
    setSelectedCountry(country)
    setCurrentQIndex(0)
    setUserAnswers([])
    setCurrentAnswer("")
    setShowModelAnswer(false)
    setScores([])
    setStep("practice")
  }

  function scoreAnswer(answer: string, question: Question): number {
    if (!answer || answer.length < 10) return 2
    if (answer.length > 100) return 8
    const keywords = question.modelAnswerEn.toLowerCase().split(" ").filter(w => w.length > 4)
    const matched = keywords.filter(k => answer.toLowerCase().includes(k))
    const ratio = matched.length / Math.max(keywords.length, 1)
    if (ratio > 0.3) return 8 + Math.min(2, Math.round(ratio * 10))
    if (ratio > 0.15) return 6
    return 4
  }

  function submitAnswer() {
    if (!currentQuestion || !currentAnswer.trim()) return
    const score = scoreAnswer(currentAnswer, currentQuestion)
    setScores(s => [...s, score])
    setUserAnswers(a => [...a, currentAnswer])
    setCurrentAnswer("")
    setShowModelAnswer(true)
  }

  function nextQuestion() {
    if (isLastQuestion) {
      setStep("result")
    } else {
      setCurrentQIndex(i => i + 1)
      setShowModelAnswer(false)
    }
  }

  function restart() {
    setStep("select")
    setSelectedCountry(null)
    setCurrentQIndex(0)
    setUserAnswers([])
    setCurrentAnswer("")
    setShowModelAnswer(false)
    setScores([])
  }

  const totalScore = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10)
    : 0

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl shadow-blue-600/30">
            🎙️
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {lang === "ur" ? "وائسا انٹرویو کوچ" : "Visa Interview Coach"}
          </h1>
          <p className="text-gray-400">
            {lang === "ur"
              ? "ہر ملک اور ہر ویزا ٹائپ کے لیے علیحدہ سوالات — رومن اردو میں جواب دیں"
              : "Country-specific & visa-type-specific questions — practice in Roman Urdu"}
          </p>
        </div>

        {/* STEP 1: Select Country & Visa Type */}
        {step === "select" && (
          <div className="animate-fade-in">
            {/* Visa Type Selector */}
            <div className="p-6 rounded-2xl bg-gradient-card border border-white/10 mb-6">
              <h2 className="font-semibold mb-4">
                {lang === "ur" ? "ویزا کی قسم منتخب کریں" : "Select Visa Type"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(visaTypeNames).map(([key, name]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedVisaType(key)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedVisaType === key
                        ? "border-blue-500 bg-blue-500/10 shadow-lg"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="text-xl mb-1">{visaTypeIcons[key]}</div>
                    <div className="text-xs font-medium">{lang === "ur" ? name.ur : name.en}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Country Selector */}
            <div className="p-6 rounded-2xl bg-gradient-card border border-white/10">
              <h2 className="font-semibold mb-2">
                {lang === "ur" ? "ملک منتخب کریں" : "Select Country"}
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                {lang === "ur"
                  ? `${currentQuestions.length} سوالات دستیاب`
                  : `${currentQuestions.length} questions available`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredCountries.map(country => (
                  <button
                    key={country.id}
                    onClick={() => startPractice(country)}
                    className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/30 transition-all text-left flex items-center gap-3"
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{lang === "ur" ? country.nameUr : country.nameEn}</div>
                      <div className="text-xs text-gray-500">
                        {country.visaTypes[selectedVisaType]?.length || 0} {lang === "ur" ? "سوالات" : "questions"}
                      </div>
                    </div>
                    <ChevronRight size={18} className="ml-auto text-gray-500" />
                  </button>
                ))}
              </div>
              {filteredCountries.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  {lang === "ur" ? "اس ویزا ٹائپ کے لیے ابھی سوالات شامل نہیں ہیں" : "Questions not yet added for this visa type"}
                </p>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Practice */}
        {step === "practice" && selectedCountry && currentQuestion && (
          <div className="animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <button onClick={restart} className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
                <ArrowLeft size={16} />
              </button>
              <span className="text-lg">{selectedCountry.flag}</span>
              <div>
                <span className="text-sm font-medium">{lang === "ur" ? selectedCountry.nameUr : selectedCountry.nameEn}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {visaTypeIcons[selectedVisaType]} {lang === "ur" ? visaTypeNames[selectedVisaType]?.ur : visaTypeNames[selectedVisaType]?.en}
                </span>
              </div>
              <div className="ml-auto text-xs text-gray-500">
                {currentQIndex + 1}/{currentQuestions.length}
              </div>
            </div>

            {/* Progress */}
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-6">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                style={{ width: `${((currentQIndex + 1) / currentQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="p-6 rounded-2xl bg-gradient-card border border-blue-500/30 shadow-lg shadow-blue-500/10 mb-6">
              {/* Category badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[currentQuestion.category] || "bg-gray-500/10 text-gray-400"}`}>
                  {lang === "ur" ? categoryNames[currentQuestion.category]?.ur || currentQuestion.category : categoryNames[currentQuestion.category]?.en || currentQuestion.category}
                </span>
                {currentQuestion.difficulty === "hard" && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                    {lang === "ur" ? "مشکل" : "Hard"}
                  </span>
                )}
              </div>

              <h2 className="text-lg font-semibold leading-relaxed mb-2">
                {lang === "ur" ? currentQuestion.ur : currentQuestion.en}
              </h2>

              {/* Answer Input */}
              <div className="mt-4">
                <textarea
                  value={currentAnswer}
                  onChange={e => setCurrentAnswer(e.target.value)}
                  placeholder={lang === "ur" ? "اپنا جواب یہاں لکھیں (رومن اردو یا انگلش میں)..." : "Type your answer here (Roman Urdu or English)..."}
                  className="w-full h-28 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <button
                onClick={submitAnswer}
                disabled={!currentAnswer.trim()}
                className="mt-3 w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                <Mic size={16} />
                {lang === "ur" ? "جواب جمع کروائیں" : "Submit Answer"}
              </button>
            </div>

            {/* Model Answer (shown after submission) */}
            {showModelAnswer && (
              <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20 mb-6 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <Brain size={18} className="text-green-400" />
                  <h3 className="font-semibold text-green-300">
                    {lang === "ur" ? "ماڈل جواب" : "Model Answer"}
                  </h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  {lang === "ur" ? currentQuestion.modelAnswerUr : currentQuestion.modelAnswerEn}
                </p>

                {/* Tips */}
                <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                  <p className="text-xs text-yellow-300 font-medium mb-1">
                    💡 {lang === "ur" ? "ٹپ:" : "Tip:"}
                  </p>
                  <p className="text-xs text-yellow-400/70">
                    {lang === "ur" ? currentQuestion.tipsUr : currentQuestion.tipsEn}
                  </p>
                </div>

                <button
                  onClick={nextQuestion}
                  className="mt-4 w-full px-4 py-2.5 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
                >
                  {isLastQuestion
                    ? (lang === "ur" ? "نتائج دیکھیں" : "See Results")
                    : (lang === "ur" ? "اگلا سوال" : "Next Question")}
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Results */}
        {step === "result" && (
          <div className="animate-fade-in">
            <div className="p-8 rounded-2xl bg-gradient-card border border-white/10 text-center mb-6">
              <Award size={48} className="mx-auto mb-4 text-yellow-400" />
              <h2 className="text-2xl font-bold mb-2">
                {lang === "ur" ? "انٹرویو مکمل!" : "Interview Complete!"}
              </h2>
              <p className="text-gray-400 mb-6">
                {lang === "ur"
                  ? `آپ نے ${scores.length} میں سے ${scores.length} سوالات کے جواب دیے`
                  : `You answered ${scores.length} out of ${scores.length} questions`}
              </p>

              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/10" />
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none"
                      className={totalScore >= 70 ? "text-green-400" : totalScore >= 50 ? "text-yellow-400" : "text-red-400"}
                      strokeDasharray={`${(totalScore / 100) * 264}`} strokeDashoffset="0" strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold">{totalScore}%</div>
                  </div>
                </div>
              </div>

              <button
                onClick={restart}
                className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all"
              >
                {lang === "ur" ? "دوبارہ مشق کریں" : "Practice Again"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
