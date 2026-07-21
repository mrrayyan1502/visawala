"use client"

import { useState } from "react"
import { useLang } from "@/lib/language-context"
import { FileText, Download, RefreshCw, Copy, Check, Sparkles, ChevronRight, ArrowRight } from "lucide-react"

const visaTypes = [
  { id: "tourist", en: "Tourist Visa", ur: "ٹورسٹ ویزا", icon: "🏖️" },
  { id: "business", en: "Business Visa", ur: "بزنس ویزا", icon: "💼" },
  { id: "student", en: "Student Visa", ur: "سٹوڈنٹ ویزا", icon: "🎓" },
  { id: "family", en: "Family Visit Visa", ur: "فیملی وزٹ ویزا", icon: "👨‍👩‍👧‍👦" },
  { id: "medical", en: "Medical Visa", ur: "میڈیکل ویزا", icon: "🏥" },
  { id: "work", en: "Work Visa", ur: "ورک ویزا", icon: "💪" },
]

const countries = [
  { id: "italy", en: "Italy", ur: "اٹلی", flag: "🇮🇹" },
  { id: "spain", en: "Spain", ur: "اسپین", flag: "🇪🇸" },
  { id: "germany", en: "Germany", ur: "جرمنی", flag: "🇩🇪" },
  { id: "france", en: "France", ur: "فرانس", flag: "🇫🇷" },
  { id: "uk", en: "United Kingdom", ur: "برطانیہ", flag: "🇬🇧" },
  { id: "usa", en: "United States", ur: "امریکہ", flag: "🇺🇸" },
  { id: "canada", en: "Canada", ur: "کینیڈا", flag: "🇨🇦" },
  { id: "uae", en: "UAE", ur: "متحدہ عرب امارات", flag: "🇦🇪" },
  { id: "turkey", en: "Turkey", ur: "ترکی", flag: "🇹🇷" },
  { id: "netherlands", en: "Netherlands", ur: "نیدرلینڈز", flag: "🇳🇱" },
  { id: "switzerland", en: "Switzerland", ur: "سوئٹزرلینڈ", flag: "🇨🇭" },
  { id: "austria", en: "Austria", ur: "آسٹریا", flag: "🇦🇹" },
  { id: "sweden", en: "Sweden", ur: "سویڈن", flag: "🇸🇪" },
  { id: "poland", en: "Poland", ur: "پولینڈ", flag: "🇵🇱" },
  { id: "greece", en: "Greece", ur: "یونان", flag: "🇬🇷" },
]

// ====== AI PURPOSE SUGGESTIONS ======
// Visa-officer approved purpose points per visa type + country

type PurposeSuggestion = {
  id: string
  en: string
  ur: string
  detailEn: string
  detailUr: string
  strength: "high" | "medium" | "low"
}

const purposeSuggestions: Record<string, PurposeSuggestion[]> = {
  tourist: [
    { id: "t-historical", en: "Historical & Cultural Tourism", ur: "تاریخی اور ثقافتی سیاحت", detailEn: "Visiting famous historical landmarks, museums, and UNESCO World Heritage sites to experience the rich cultural heritage of the country", detailUr: "مشہور تاریخی مقامات، عجائب گھروں اور یونیسکو کے عالمی ورثہ کی جگہوں کا دورہ کرنا تاکہ ملک کے امیر ثقافتی ورثے کا تجربہ کیا جا سکے", strength: "high" },
    { id: "t-nature", en: "Natural Beauty & Scenic Exploration", ur: "قدرتی خوبصورتی اور قدرتی مقامات کی سیر", detailEn: "Exploring natural landscapes, mountains, lakes, national parks, and scenic routes for photography and nature appreciation", detailUr: "قدرتی مناظر، پہاڑوں، جھیلوں، قومی پارکوں اور قدرتی راستوں کی تلاش فوٹوگرافی اور فطرت سے لطف اندوز ہونے کے لیے", strength: "high" },
    { id: "t-culinary", en: "Culinary Tourism & Food Experience", ur: "کھانوں کا تجربہ اور فوڈ ٹورازم", detailEn: "Experiencing authentic local cuisine, visiting famous restaurants, food markets, and attending cooking workshops", detailUr: "مستند مقامی کھانوں کا تجربہ، مشہور ریستورانوں، فوڈ مارکیٹوں اور ککنگ ورکشاپس کا دورہ", strength: "medium" },
    { id: "t-shopping", en: "Shopping & Leisure Activities", ur: "شاپنگ اور تفریحی سرگرمیاں", detailEn: "Visiting shopping districts, local markets, entertainment venues, and leisure activities for a complete travel experience", detailUr: "شاپنگ والے علاقوں، مقامی بازاروں، تفریحی مقامات کا دورہ", strength: "medium" },
    { id: "t-education", en: "Educational & Learning Experience", ur: "تعلیمی اور سیکھنے کا تجربہ", detailEn: "Attending short courses, workshops, seminars, or educational tours to gain international exposure and knowledge", detailUr: "مختصر کورسز، ورکشاپس، سیمینارز یا تعلیمی دوروں میں شرکت تاکہ بین الاقوامی نمائش حاصل کی جا سکے", strength: "high" },
    { id: "t-festival", en: "Festivals & Cultural Events", ur: "تہوار اور ثقافتی تقریبات", detailEn: "Attending renowned local festivals, cultural celebrations, music concerts, or traditional events specific to the season", detailUr: "مشہور مقامی تہواروں، ثقافتی تقریبات، موسیقی کے کنسرٹس یا روایتی پروگراموں میں شرکت", strength: "medium" },
    { id: "t-family", en: "Family Quality Time & Reunion", ur: "خاندانی وقت اور reunion", detailEn: "Spending quality time with family members living abroad, creating memories, and celebrating special occasions together", detailUr: "بیرون ملک رہنے والے خاندان کے افراد کے ساتھ وقت گزارنا، یادیں بنانا اور خاص مواقع منانا", strength: "high" },
    { id: "t-religious", en: "Religious & Spiritual Visit", ur: "مذہبی اور روحانی دورہ", detailEn: "Visiting religious sites, churches, mosques, temples, or attending spiritual retreats for personal peace and enlightenment", detailUr: "مذہبی مقامات، گرجا گھروں، مساجد، مندروں کا دورہ یا روحانی retreats میں شرکت", strength: "medium" },
  ],
  business: [
    { id: "b-meeting", en: "Client Meetings & Business Negotiations", ur: "کلائنٹ میٹنگز اور کاروباری مذاکرات", detailEn: "Attending scheduled meetings with international clients, partners, and stakeholders to discuss ongoing projects and future collaborations", detailUr: "بین الاقوامی کلائنٹس، پارٹنرز کے ساتھ طے شدہ میٹنگز میں شرکت تاکہ جاری منصوبوں اور مستقبل کے تعاون پر بات کی جا سکے", strength: "high" },
    { id: "b-conference", en: "Industry Conference & Trade Fair", ur: "صنعتی کانفرنس اور تجارتی میلہ", detailEn: "Attending international industry conferences, exhibitions, and trade fairs to network, learn about market trends, and showcase products", detailUr: "بین الاقوامی صنعتی کانفرنسوں، نمائشوں اور تجارتی میلوں میں شرکت تاکہ نیٹ ورکنگ اور مارکیٹ کے رجحانات سیکھے جا سکیں", strength: "high" },
    { id: "b-partnership", en: "Business Partnership Exploration", ur: "کاروباری شراکت کی تلاش", detailEn: "Exploring potential business partnerships, joint ventures, and investment opportunities with foreign companies to expand operations", detailUr: "غیر ملکی کمپنیوں کے ساتھ ممکنہ کاروباری شراکت، مشترکہ منصوبوں اور سرمایہ کاری کے مواقع تلاش کرنا", strength: "high" },
    { id: "b-training", en: "Professional Training & Skill Development", ur: "پیشہ ورانہ تربیت اور مہارت کی ترقی", detailEn: "Attending specialized training programs, workshops, and skill development courses to enhance professional capabilities", detailUr: "خصوصی تربیتی پروگراموں، ورکشاپس اور مہارت کی ترقی کے کورسز میں شرکت تاکہ پیشہ ورانہ صلاحیتوں کو بہتر بنایا جا سکے", strength: "high" },
    { id: "b-investment", en: "Investment & Market Research", ur: "سرمایہ کاری اور مارکیٹ ریسرچ", detailEn: "Conducting market research, analyzing investment opportunities, and meeting with potential investors for business expansion", detailUr: "مارکیٹ ریسرچ کرنا، سرمایہ کاری کے مواقع کا تجزیہ کرنا اور ممکنہ سرمایہ کاروں سے ملاقات", strength: "medium" },
    { id: "b-supplier", en: "Supplier & Vendor Meetings", ur: "سپلائر اور وینڈر میٹنگز", detailEn: "Meeting with suppliers, vendors, and manufacturers to establish supply chain relationships and negotiate contracts", detailUr: "سپلائرز، وینڈرز اور مینوفیکچررز سے ملاقاتیں تاکہ سپلائی چین تعلقات قائم کیے جا سکیں", strength: "medium" },
  ],
  student: [
    { id: "s-university", en: "University Enrollment & Academic Program", ur: "یونیورسٹی میں داخلہ اور تعلیمی پروگرام", detailEn: "Enrolling in a recognized university for a degree program. The university has issued a formal admission letter confirming enrollment", detailUr: "ایک تسلیم شدہ یونیورسٹی میں ڈگری پروگرام کے لیے داخلہ۔ یونیورسٹی نے باضابطہ داخلہ خط جاری کیا ہے", strength: "high" },
    { id: "s-research", en: "Academic Research & Study", ur: "تعلیمی تحقیق اور مطالعہ", detailEn: "Conducting academic research, studying under renowned professors, and utilizing university resources including libraries and laboratories", detailUr: "تعلیمی تحقیق کرنا، مشہور پروفیسرز کے تحت مطالعہ کرنا اور یونیورسٹی کے وسائل بشمول لائبریریوں اور لیبارٹریوں کا استعمال", strength: "high" },
    { id: "s-language", en: "Language Course & Cultural Immersion", ur: "زبان کا کورس اور ثقافتی انضمام", detailEn: "Enrolling in a language course to achieve proficiency, combined with cultural immersion for better understanding of the host country", detailUr: "زبان کی مہارت حاصل کرنے کے لیے کورس میں داخلہ، میزبان ملک کی بہتر تفہیم کے لیے ثقافتی انضمام کے ساتھ", strength: "high" },
    { id: "s-exchange", en: "Student Exchange Program", ur: "طالب علم ایکسچینج پروگرام", detailEn: "Participating in a student exchange program between home and host university to gain international academic exposure", detailUr: "ہوم اور ہوسٹ یونیورسٹی کے درمیان طالب علم ایکسچینج پروگرام میں شرکت تاکہ بین الاقوامی تعلیمی نمائش حاصل کی جا سکے", strength: "high" },
    { id: "s-conference", en: "Academic Conference & Seminar Attendance", ur: "تعلیمی کانفرنس اور سیمینار میں شرکت", detailEn: "Attending and presenting at international academic conferences and seminars to share research and learn from global experts", detailUr: "بین الاقوامی تعلیمی کانفرنسوں اور سیمینارز میں شرکت اور پیشکش تاکہ تحقیق شیئر کی جا سکے", strength: "medium" },
  ],
  family: [
    { id: "f-reunion", en: "Family Reunion & Quality Time", ur: "خاندانی reunion اور معیاری وقت", detailEn: "Visiting immediate family members (parents/siblings/children) residing abroad for a long-awaited family reunion after a significant period apart", detailUr: "بیرون ملک رہنے والے قریبی خاندان کے افراد (والدین/بہن بھائی/بچوں) سے طویل مدت کے بعد خاندانی reunion کے لیے ملاقات", strength: "high" },
    { id: "f-celebration", en: "Special Occasion & Family Celebration", ur: "خاص موقع اور خاندانی تقریب", detailEn: "Attending a family wedding, birthday milestone, anniversary celebration, or religious ceremony where the applicant's presence is essential", detailUr: "خاندانی شادی، سالگرہ، شادی کی سالگرہ یا مذہبی تقریب میں شرکت جہاں درخواست دہندہ کی موجودگی ضروری ہے", strength: "high" },
    { id: "f-support", en: "Family Support & Caregiving", ur: "خاندانی مدد اور دیکھ بھال", detailEn: "Providing support to family members during times of need including post-surgery recovery, pregnancy, or emotional support after a loss", detailUr: "ضرورت کے وقت خاندان کے افراد کو مدد فراہم کرنا بشمول سرجری کے بعد صحت یابی، حمل، یا کسی نقصان کے بعد جذباتی مدد", strength: "high" },
    { id: "f-health", en: "Accompanying Family Member for Medical Treatment", ur: "خاندان کے کسی فرد کے ساتھ علاج کے لیے", detailEn: "Accompanying a family member who requires medical treatment or health consultation at a specialized hospital abroad", detailUr: "خاندان کے کسی فرد کے ساتھ جو بیرون ملک کسی خصوصی ہسپتال میں علاج یا صحت کے مشورے کی ضرورت ہے", strength: "high" },
    { id: "f-festival", en: "Religious & Cultural Festival Celebration", ur: "مذہبی اور ثقافتی تہوار منانا", detailEn: "Celebrating important religious or cultural festivals together with family members such as Eid, Diwali, Christmas, or other significant occasions", detailUr: "خاندان کے ساتھ اہم مذہبی یا ثقافتی تہوار منانا جیسے عید، دیوالی، کرسمس یا دیگر اہم مواقع", strength: "medium" },
    { id: "f-education", en: "Children's Education & School Visit", ur: "بچوں کی تعلیم اور سکول کا دورہ", detailEn: "Visiting children studying abroad for parent-teacher meetings, graduation ceremonies, or academic progress review", detailUr: "بیرون ملک تعلیم حاصل کرنے والے بچوں سے ملاقات، والدین-اساتذہ میٹنگ، گریجویشن تقریبات یا تعلیمی پیشرفت کا جائزہ", strength: "medium" },
  ],
  medical: [
    { id: "m-treatment", en: "Specialized Medical Treatment", ur: "خصوصی طبی علاج", detailEn: "Seeking advanced medical treatment not available in the home country at a recognized hospital with specialist doctors", detailUr: "وطن میں دستیاب نہ ہونے والے جدید طبی علاج کے لیے کسی تسلیم شدہ ہسپتال میں ماہر ڈاکٹروں سے علاج", strength: "high" },
    { id: "m-surgery", en: "Surgical Procedure & Post-Operative Care", ur: "سرجری اور آپریشن کے بعد کی دیکھ بھال", detailEn: "Undergoing a scheduled surgical procedure at a specialized medical facility with comprehensive pre and post-operative care", detailUr: "ایک خصوصی طبی سہولت میں طے شدہ سرجری کرانا جس میں قبل از آپریشن اور بعد از آپریشن مکمل دیکھ بھال شامل ہے", strength: "high" },
    { id: "m-consultation", en: "Specialist Medical Consultation", ur: "ماہر ڈاکٹر سے مشاورت", detailEn: "Obtaining expert medical consultation from internationally recognized specialists for a complex health condition requiring second opinion", detailUr: "ایک پیچیدہ طبی حالت کے لیے بین الاقوامی شہرت یافتہ ماہرین سے طبی مشاورت حاصل کرنا", strength: "high" },
    { id: "m-checkup", en: "Comprehensive Health Checkup", ur: "مکمل طبی معائنہ", detailEn: "Undergoing a comprehensive medical examination and diagnostic tests at a world-class healthcare facility", detailUr: "عالمی معیار کی صحت کی سہولت میں مکمل طبی معائنہ اور تشخیصی ٹیسٹ کروانا", strength: "medium" },
  ],
  work: [
    { id: "w-employment", en: "Skilled Employment & Career Opportunity", ur: "ہنر مند ملازمت اور کیریئر کا موقع", detailEn: "Taking up a skilled employment position with a registered company that has offered a formal job contract with competitive compensation", detailUr: "ایک رجسٹرڈ کمپنی میں ہنر مند ملازمت کا موقع جس نے باضابطہ ملازمت کا معاہدہ پیش کیا ہے", strength: "high" },
    { id: "w-intracompany", en: "Intra-Company Transfer", ur: "انٹرا کمپنی ٹرانسفر", detailEn: "Being transferred to the international branch of the same company to utilize specialized skills and maintain business continuity", detailUr: "خصوصی مہارتوں کے استعمال اور کاروباری تسلسل کے لیے اسی کمپنی کی بین الاقوامی شاخ میں منتقلی", strength: "high" },
    { id: "w-project", en: "Project-Based Work Assignment", ur: "پروجیکٹ پر مبنی کام کی تفویض", detailEn: "Working on a specific project assignment for a limited duration requiring specialized expertise not available locally", detailUr: "مخصوص مدت کے لیے ایک خاص پروجیکٹ پر کام کرنا جس کے لیے خصوصی مہارت درکار ہے جو مقامی طور پر دستیاب نہیں", strength: "high" },
    { id: "w-research", en: "Research & Development Collaboration", ur: "تحقیق اور ترقی میں تعاون", detailEn: "Collaborating with international research institutions on joint R&D projects, knowledge exchange, and innovation initiatives", detailUr: "بین الاقوامی تحقیقی اداروں کے ساتھ مشترکہ R&D منصوبوں، علم کے تبادلے اور جدت کے اقدامات پر تعاون", strength: "high" },
  ],
}

// Selected purpose suggestions for a specific visa type
function getSuggestionsForVisaType(visaType: string): PurposeSuggestion[] {
  return purposeSuggestions[visaType] || purposeSuggestions.tourist
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
  selectedPurposes: string[]
}

function generateCoverLetter(form: FormData, lang: "en" | "ur"): string {
  const dest = countries.find(c => c.id === form.destination)
  const visaType = visaTypes.find(v => v.id === form.visaType)
  const destName = lang === "ur" ? dest?.ur || "" : dest?.en || ""
  const visaName = lang === "ur" ? visaType?.ur || "" : visaType?.en || "Tourist Visa"

  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  })

  // Get selected purpose details
  const suggestions = getSuggestionsForVisaType(form.visaType)
  const selectedPurposes = suggestions.filter(s => form.selectedPurposes.includes(s.id))

  // Generate purpose paragraph
  let purposeParagraph = ""
  if (selectedPurposes.length > 0) {
    if (lang === "ur") {
      const purposeTexts = selectedPurposes.map(s => s.detailUr)
      purposeParagraph = "میرے سفر کے مقاصد درج ذیل ہیں:\n" + purposeTexts.map((t, i) => `${i + 1}. ${t}`).join("\n")
    } else {
      const purposeTexts = selectedPurposes.map(s => s.detailEn)
      purposeParagraph = "The purpose of my visit is as follows:\n" + purposeTexts.map((t, i) => `${i + 1}. ${t}`).join("\n")
    }
  } else {
    purposeParagraph = lang === "ur"
      ? "میرے سفر کا مقصد ${form.duration} کے لیے ${visaName} حاصل کرنا ہے۔"
      : `The purpose of my visit is to obtain a ${visaName} for ${form.duration}.`
  }

  // Strength indicator
  const strongPurposes = selectedPurposes.filter(s => s.strength === "high").length
  const strengthNote = strongPurposes >= 2
    ? (lang === "ur"
        ? "میرے پاس اپنے سفر کے تمام اخراجات پورے کرنے کے لیے کافی مالی وسائل موجود ہیں۔"
        : "I have sufficient financial resources to cover all expenses during my stay.")
    : (lang === "ur"
        ? "میرے پاس اپنے سفر کے اخراجات کے لیے مناسب مالی وسائل موجود ہیں جس کا ثبوت میرے بینک اسٹیٹمنٹ میں دیکھا جا سکتا ہے۔"
        : "I have adequate financial resources for this trip as evidenced by my bank statements.")

  if (lang === "ur") {
    return `${date}

محترم ویزا افسر

موضوع: ${form.name} کے لیے ${destName} کا ${visaName}

میرا نام ${form.name} ہے۔ میرا پاسپورٹ نمبر ${form.passport} ہے اور میری تاریخ پیدائش ${form.dob} ہے۔

${purposeParagraph}

${strengthNote}

میں ${form.city} میں ${form.profession} کے طور پر کام کرتا/کرتی ہوں اور پاکستان میں اپنی ملازمت/کاروبار اور خاندانی ذمہ داریوں کی وجہ سے واپس آؤں گا/گی۔

براہ کرم میری درخواست پر غور کریں۔

شکریہ

${form.name}
${form.email} | ${form.phone}
پاسپورٹ: ${form.passport}`
  }

  return `${date}

The Visa Officer
Embassy of ${destName}

Subject: Application for ${visaName} — ${form.name}

Dear Sir/Madam,

I, ${form.name}, am writing to apply for a ${visaName} to ${destName}. My passport number is ${form.passport} and my date of birth is ${form.dob}.

Purpose of Visit:
${purposeParagraph}

${strengthNote}

I reside in ${form.city} and work as a ${form.profession}. I have strong ties to Pakistan including my employment and family responsibilities, which ensure my return after the visit.

I have enclosed all required documents for your kind consideration.

Thank you for your time and consideration.

Yours sincerely,

${form.name}
Email: ${form.email} | Phone: ${form.phone}
Passport: ${form.passport}`
}

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
const labelClass = "block text-sm font-medium text-gray-300 mb-1.5"

export default function SopGenerator() {
  const { t, lang } = useLang()

  const [step, setStep] = useState<"form" | "purposes" | "result">("form")
  const [letter, setLetter] = useState("")
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState<FormData>({
    name: "", passport: "", dob: "", email: "", phone: "",
    city: "", profession: "", visaType: "tourist", destination: "italy",
    duration: "15 days", selectedPurposes: [],
  })

  const suggestions = getSuggestionsForVisaType(form.visaType)

  function handleProceedToPurposes() {
    if (!form.name || !form.passport) return
    setStep("purposes")
  }

  function togglePurpose(id: string) {
    setForm(f => ({
      ...f,
      selectedPurposes: f.selectedPurposes.includes(id)
        ? f.selectedPurposes.filter(p => p !== id)
        : [...f.selectedPurposes, id]
    }))
  }

  function handleGenerate() {
    const generated = generateCoverLetter(form, lang)
    setLetter(generated)
    setStep("result")
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

  function reset() {
    setStep("form")
    setLetter("")
    setForm(f => ({ ...f, selectedPurposes: [] }))
  }

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

        {/* STEP 1: Personal Info Form */}
        {step === "form" && (
          <div className="p-8 rounded-2xl bg-gradient-card border border-white/10 animate-fade-in">
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">1</div>
              <div className="h-0.5 flex-1 bg-blue-600/50" />
              <div className="w-8 h-8 rounded-full bg-white/10 text-gray-400 flex items-center justify-center text-xs">2</div>
              <div className="h-0.5 flex-1 bg-white/10" />
              <div className="w-8 h-8 rounded-full bg-white/10 text-gray-400 flex items-center justify-center text-xs">3</div>
            </div>

            <h2 className="text-lg font-semibold mb-1">{lang === "ur" ? "اپنی معلومات درج کریں" : "Your Information"}</h2>
            <p className="text-sm text-gray-400 mb-6">{lang === "ur" ? "پہلے اپنی بنیادی معلومات بھریں" : "First, fill in your basic details"}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className={labelClass}>{t.sop.name}</label>
                <input className={inputClass} placeholder="Ahmed Khan" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>{t.sop.passport}</label>
                <input className={inputClass} placeholder="AB1234567" value={form.passport} onChange={e => setForm(f => ({ ...f, passport: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>{lang === "ur" ? "تاریخ پیدائش" : "Date of Birth"}</label>
                <input type="date" className={inputClass} value={form.dob} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>{t.common.email}</label>
                <input className={inputClass} type="email" placeholder="ahmed@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>{lang === "ur" ? "فون نمبر" : "Phone Number"}</label>
                <input className={inputClass} placeholder="+92 300 1234567" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>{lang === "ur" ? "شہر" : "City"}</label>
                <input className={inputClass} placeholder="Lahore" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>{lang === "ur" ? "پیشہ" : "Profession"}</label>
                <input className={inputClass} placeholder="Software Engineer" value={form.profession} onChange={e => setForm(f => ({ ...f, profession: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>{t.sop.purpose}</label>
                <select className={inputClass} value={form.visaType} onChange={e => setForm(f => ({ ...f, visaType: e.target.value }))}>
                  {visaTypes.map(vt => (
                    <option key={vt.id} value={vt.id} className="bg-gray-900">{vt.icon} {lang === "ur" ? vt.ur : vt.en}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{t.sop.destination}</label>
                <select className={inputClass} value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}>
                  {countries.map(c => (
                    <option key={c.id} value={c.id} className="bg-gray-900">{c.flag} {lang === "ur" ? c.ur : c.en}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{lang === "ur" ? "قیام کی مدت" : "Duration of Stay"}</label>
                <input className={inputClass} placeholder={lang === "ur" ? "مثلاً 15 دن" : "e.g., 15 days"} value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
              </div>
            </div>

            <button
              onClick={handleProceedToPurposes}
              disabled={!form.name || !form.passport}
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              {lang === "ur" ? "مقاصد منتخب کریں →" : "Select Purpose →"}
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2: AI Purpose Suggestions */}
        {step === "purposes" && (
          <div className="animate-fade-in">
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">✓</div>
              <div className="h-0.5 flex-1 bg-blue-600/50" />
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">2</div>
              <div className="h-0.5 flex-1 bg-white/10" />
              <div className="w-8 h-8 rounded-full bg-white/10 text-gray-400 flex items-center justify-center text-xs">3</div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-card border border-white/10 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={20} className="text-yellow-400" />
                <h2 className="text-lg font-semibold">
                  {lang === "ur" ? "AI تجویز کردہ مقاصد" : "AI-Recommended Purposes"}
                </h2>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                {lang === "ur"
                  ? `آپ نے ${visaTypes.find(v => v.id === form.visaType)?.ur} ${countries.find(c => c.id === form.destination)?.ur} کے لیے منتخب کیا ہے۔ نیچے دیے گئے مقاصد میں سے 2-4 منتخب کریں — یہ ویزا افسر کے لیے قابل قبول ہیں۔`
                  : `You selected a ${visaTypes.find(v => v.id === form.visaType)?.en} for ${countries.find(c => c.id === form.destination)?.en}. Select 2-4 purposes below — these are visa-officer approved reasons.`}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  {lang === "ur" ? `${form.selectedPurposes.length} منتخب` : `${form.selectedPurposes.length} selected`}
                </span>
                {form.selectedPurposes.length < 2 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    {lang === "ur" ? "کم از کم 2 منتخب کریں" : "Select at least 2"}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {suggestions.map((suggestion) => {
                const isSelected = form.selectedPurposes.includes(suggestion.id)
                const strengthColors = {
                  high: "border-green-500/30 bg-green-500/5",
                  medium: "border-yellow-500/30 bg-yellow-500/5",
                  low: "border-gray-500/30 bg-gray-500/5",
                }
                const strengthLabels = {
                  high: lang === "ur" ? "بہت مضبوط" : "Strong",
                  medium: lang === "ur" ? "اچھا" : "Good",
                  low: lang === "ur" ? "عام" : "Average",
                }
                const selectedBorder = isSelected ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20" : strengthColors[suggestion.strength]

                return (
                  <button
                    key={suggestion.id}
                    onClick={() => togglePurpose(suggestion.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${selectedBorder} hover:border-blue-400/50`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                        isSelected ? "border-blue-500 bg-blue-500" : "border-white/20"
                      }`}>
                        {isSelected && <span className="text-white text-xs">✓</span>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{lang === "ur" ? suggestion.ur : suggestion.en}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            suggestion.strength === "high" ? "bg-green-500/20 text-green-400" :
                            suggestion.strength === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-gray-500/20 text-gray-400"
                          }`}>
                            {strengthLabels[suggestion.strength]}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {lang === "ur" ? suggestion.detailUr : suggestion.detailEn}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("form")}
                className="flex-1 px-6 py-3 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all"
              >
                {lang === "ur" ? "واپس" : "Back"}
              </button>
              <button
                onClick={handleGenerate}
                disabled={form.selectedPurposes.length < 2}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                <FileText size={18} />
                {lang === "ur" ? "کور لیٹر بنائیں" : "Generate Cover Letter"}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Result */}
        {step === "result" && (
          <div className="animate-fade-in">
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">✓</div>
              <div className="h-0.5 flex-1 bg-blue-600/50" />
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">✓</div>
              <div className="h-0.5 flex-1 bg-blue-600/50" />
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">3</div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-card border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-yellow-400" />
                  {lang === "ur" ? "آپ کا AI کور لیٹر" : "Your AI Cover Letter"}
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

              {/* Selected purposes summary */}
              <div className="flex flex-wrap gap-2 mb-4">
                {form.selectedPurposes.map(id => {
                  const s = suggestions.find(s => s.id === id)
                  if (!s) return null
                  return (
                    <span key={id} className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {lang === "ur" ? s.ur : s.en}
                    </span>
                  )
                })}
              </div>

              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{letter}</pre>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={reset}
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
