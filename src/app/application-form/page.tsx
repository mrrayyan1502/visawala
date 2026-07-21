"use client"

import { useState } from "react"
import { useLang } from "@/lib/language-context"
import { FileText, Copy, Check, Download, Sparkles, ChevronRight, ArrowLeft, Globe } from "lucide-react"

type UserProfile = {
  fullName: string
  fatherName: string
  dob: string
  birthplace: string
  nationality: string
  gender: string
  maritalStatus: string
  passportNo: string
  passportIssueDate: string
  passportExpiryDate: string
  passportIssuePlace: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  country: string
  profession: string
  employer: string
  monthlyIncome: string
  bankName: string
  accountNo: string
  yearsEmployed: string
  education: string
  travelPurpose: string
  destination: string
  duration: string
  accommodation: string
  previousVisas: string
  travelInsurance: string
  emergencyContact: string
  emergencyPhone: string
  emergencyRelation: string
}

type CountryForm = {
  id: string
  flag: string
  nameEn: string
  nameUr: string
  formName: string
  formNameUr: string
  sections: {
    titleEn: string
    titleUr: string
    fields: {
      labelEn: string
      labelUr: string
      value: (profile: UserProfile) => string
    }[]
  }[]
}

const initialProfile: UserProfile = {
  fullName: "", fatherName: "", dob: "", birthplace: "", nationality: "Pakistani",
  gender: "Male", maritalStatus: "Single", passportNo: "", passportIssueDate: "",
  passportExpiryDate: "", passportIssuePlace: "", email: "", phone: "",
  address: "", city: "Lahore", province: "Punjab", country: "Pakistan",
  profession: "", employer: "", monthlyIncome: "", bankName: "", accountNo: "",
  yearsEmployed: "", education: "Bachelor's Degree",
  travelPurpose: "Tourism", destination: "Italy", duration: "15 days",
  accommodation: "Hotel", previousVisas: "No", travelInsurance: "Yes",
  emergencyContact: "", emergencyPhone: "", emergencyRelation: "",
}

const countryForms: CountryForm[] = [
  {
    id: "schengen", flag: "🇪🇺", nameEn: "Schengen Area", nameUr: "شینگن ممالک",
    formName: "Schengen Visa Application Form",
    formNameUr: "شینگن ویزا اپلیکیشن فارم",
    sections: [
      {
        titleEn: "Personal Information", titleUr: "ذاتی معلومات",
        fields: [
          { labelEn: "Surname (Family Name)", labelUr: "خاندانی نام", value: (p) => p.fullName.split(" ").slice(-1)[0] || p.fullName },
          { labelEn: "First Name (Given Name)", labelUr: "پہلا نام", value: (p) => p.fullName.split(" ")[0] || "" },
          { labelEn: "Former Surnames (if any)", labelUr: "پچھلے خاندانی نام (اگر ہوں)", value: () => "N/A" },
          { labelEn: "Date of Birth", labelUr: "تاریخ پیدائش", value: (p) => p.dob },
          { labelEn: "Place of Birth", labelUr: "جائے پیدائش", value: (p) => p.birthplace || p.city },
          { labelEn: "Country of Birth", labelUr: "پیدائش کا ملک", value: () => "Pakistan" },
          { labelEn: "Nationality", labelUr: "قومیت", value: (p) => p.nationality },
          { labelEn: "Sex", labelUr: "جنس", value: (p) => p.gender },
          { labelEn: "Marital Status", labelUr: "ازدواجی حیثیت", value: (p) => p.maritalStatus },
          { labelEn: "Father's Name", labelUr: "والد کا نام", value: (p) => p.fatherName },
        ],
      },
      {
        titleEn: "Passport Information", titleUr: "پاسپورٹ کی معلومات",
        fields: [
          { labelEn: "Passport Number", labelUr: "پاسپورٹ نمبر", value: (p) => p.passportNo },
          { labelEn: "Date of Issue", labelUr: "تاریخ اجرا", value: (p) => p.passportIssueDate },
          { labelEn: "Valid Until", labelUr: "میزاد تک", value: (p) => p.passportExpiryDate },
          { labelEn: "Issued By", labelUr: "جاری کردہ", value: () => "Government of Pakistan" },
          { labelEn: "Place of Issue", labelUr: "جاری کرنے کی جگہ", value: (p) => p.passportIssuePlace },
        ],
      },
      {
        titleEn: "Travel Information", titleUr: "سفر کی معلومات",
        fields: [
          { labelEn: "Destination Member State(s)", labelUr: "منزل کے ممالک", value: (p) => p.destination },
          { labelEn: "Purpose of Journey", labelUr: "سفر کا مقصد", value: (p) => p.travelPurpose },
          { labelEn: "Duration of Stay (days)", labelUr: "قیام کی مدت (دن)", value: (p) => p.duration },
          { labelEn: "Intended Date of Arrival", labelUr: "آمد کی متوقع تاریخ", value: () => "See travel itinerary" },
          { labelEn: "Intended Date of Departure", labelUr: "روانگی کی متوقع تاریخ", value: () => "See travel itinerary" },
          { labelEn: "Accommodation", labelUr: "رہائش", value: (p) => p.accommodation },
        ],
      },
      {
        titleEn: "Contact & Employment", titleUr: "رابطہ اور روزگار",
        fields: [
          { labelEn: "Email Address", labelUr: "ای میل پتہ", value: (p) => p.email },
          { labelEn: "Phone Number", labelUr: "فون نمبر", value: (p) => p.phone },
          { labelEn: "Residential Address", labelUr: "رہائشی پتہ", value: (p) => `${p.address}, ${p.city}, ${p.province}, ${p.country}` },
          { labelEn: "Current Occupation", labelUr: "موجودہ پیشہ", value: (p) => p.profession },
          { labelEn: "Employer / Company", labelUr: "آجر / کمپنی", value: (p) => p.employer },
          { labelEn: "Monthly Income", labelUr: "ماہانہ آمدنی", value: (p) => p.monthlyIncome },
        ],
      },
    ],
  },
  {
    id: "uk", flag: "🇬🇧", nameEn: "United Kingdom", nameUr: "برطانیہ",
    formName: "UK Standard Visitor Visa (UKVI)",
    formNameUr: "برطانیہ سٹینڈرڈ وزٹر ویزا",
    sections: [
      {
        titleEn: "Personal Details", titleUr: "ذاتی تفصیلات",
        fields: [
          { labelEn: "Full Name as in Passport", labelUr: "پاسپورٹ کے مطابق مکمل نام", value: (p) => p.fullName },
          { labelEn: "Other Names (if any)", labelUr: "دوسرے نام (اگر ہوں)", value: () => "N/A" },
          { labelEn: "Date of Birth", labelUr: "تاریخ پیدائش", value: (p) => p.dob },
          { labelEn: "Place of Birth", labelUr: "جائے پیدائش", value: (p) => p.birthplace || p.city },
          { labelEn: "Nationality", labelUr: "قومیت", value: (p) => p.nationality },
          { labelEn: "Gender", labelUr: "جنس", value: (p) => p.gender },
          { labelEn: "Marital Status", labelUr: "ازدواجی حیثیت", value: (p) => p.maritalStatus },
        ],
      },
      {
        titleEn: "Travel & Accommodation", titleUr: "سفر اور رہائش",
        fields: [
          { labelEn: "Main Purpose of Visit", labelUr: "سفر کا بنیادی مقصد", value: (p) => p.travelPurpose },
          { labelEn: "Intended Length of Stay", labelUr: "قیام کی متوقع مدت", value: (p) => p.duration },
          { labelEn: "Planned Accommodation", labelUr: "منصوبہ بند رہائش", value: (p) => p.accommodation },
        ],
      },
      {
        titleEn: "Finances & Employment", titleUr: "مالیات اور روزگار",
        fields: [
          { labelEn: "Employment Status", labelUr: "ملازمت کی حیثیت", value: (p) => p.profession ? "Employed" : "Unemployed" },
          { labelEn: "Employer Name", labelUr: "آجر کا نام", value: (p) => p.employer },
          { labelEn: "Monthly Income (PKR)", labelUr: "ماہانہ آمدنی (روپے)", value: (p) => p.monthlyIncome },
          { labelEn: "Total Savings (PKR)", labelUr: "کل بچت (روپے)", value: () => "See bank statement" },
          { labelEn: "Who is paying for your trip?", labelUr: "آپ کے سفر کے اخراجات کون ادا کر رہا ہے؟", value: (p) => p.monthlyIncome ? "Self" : "Sponsor" },
        ],
      },
    ],
  },
  {
    id: "usa", flag: "🇺🇸", nameEn: "United States", nameUr: "امریکہ",
    formName: "DS-160 (Online Nonimmigrant Visa Application)",
    formNameUr: "DS-160 (آن لائن نان امیگرنٹ ویزا اپلیکیشن)",
    sections: [
      {
        titleEn: "Personal Information 1", titleUr: "ذاتی معلومات 1",
        fields: [
          { labelEn: "Full Name (As in Passport)", labelUr: "مکمل نام (پاسپورٹ کے مطابق)", value: (p) => p.fullName },
          { labelEn: "Date of Birth", labelUr: "تاریخ پیدائش", value: (p) => p.dob },
          { labelEn: "Place of Birth", labelUr: "جائے پیدائش", value: (p) => p.birthplace || p.city },
          { labelEn: "Nationality", labelUr: "قومیت", value: (p) => p.nationality },
          { labelEn: "Gender", labelUr: "جنس", value: (p) => p.gender },
          { labelEn: "Marital Status", labelUr: "ازدواجی حیثیت", value: (p) => p.maritalStatus },
        ],
      },
      {
        titleEn: "Passport Information", titleUr: "پاسپورٹ کی معلومات",
        fields: [
          { labelEn: "Passport Type", labelUr: "پاسپورٹ کی قسم", value: () => "Regular" },
          { labelEn: "Passport Number", labelUr: "پاسپورٹ نمبر", value: (p) => p.passportNo },
          { labelEn: "Passport Book Number", labelUr: "پاسپورٹ بک نمبر", value: () => "See passport" },
          { labelEn: "Date of Issue", labelUr: "تاریخ اجرا", value: (p) => p.passportIssueDate },
          { labelEn: "Date of Expiry", labelUr: "میزاد کی تاریخ", value: (p) => p.passportExpiryDate },
        ],
      },
      {
        titleEn: "Travel & Contact", titleUr: "سفر اور رابطہ",
        fields: [
          { labelEn: "Purpose of Trip", labelUr: "سفر کا مقصد", value: (p) => p.travelPurpose },
          { labelEn: "Specify", labelUr: "وضاحت کریں", value: (p) => `Tourism - ${p.destination}` },
          { labelEn: "Intended Length of Stay", labelUr: "قیام کی متوقع مدت", value: (p) => p.duration },
          { labelEn: "Home Address", labelUr: "گھر کا پتہ", value: (p) => `${p.address}, ${p.city}, ${p.country}` },
          { labelEn: "Phone Number", labelUr: "فون نمبر", value: (p) => p.phone },
          { labelEn: "Email Address", labelUr: "ای میل پتہ", value: (p) => p.email },
        ],
      },
    ],
  },
]

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
const labelClass = "block text-sm font-medium text-gray-300 mb-1.5"

export default function ApplicationFormFiller() {
  const { t, lang } = useLang()
  const [step, setStep] = useState<"profile" | "forms" | "detail">("profile")
  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [selectedForm, setSelectedForm] = useState<CountryForm | null>(null)
  const [copiedField, setCopiedField] = useState("")

  function fillSampleData() {
    setProfile({
      ...initialProfile,
      fullName: "Ahmed Khan", fatherName: "Muhammad Khan", dob: "1995-06-15",
      birthplace: "Lahore", passportNo: "AB1234567", passportIssueDate: "2020-03-10",
      passportExpiryDate: "2030-03-09", passportIssuePlace: "Lahore",
      email: "ahmed.khan@email.com", phone: "+92 300 1234567",
      address: "123, Main Boulevard", profession: "Software Engineer",
      employer: "Tech Solutions Ltd.", monthlyIncome: "PKR 150,000",
      bankName: "HBL", accountNo: "1234-5678-9012-3456",
      yearsEmployed: "5", travelPurpose: "Tourism",
      destination: "Italy, France, Spain", accommodation: "Hotel",
      emergencyContact: "Muhammad Khan", emergencyPhone: "+92 321 7654321",
      emergencyRelation: "Father",
    })
  }

  function updateField(field: keyof UserProfile, value: string) {
    setProfile(p => ({ ...p, [field]: value }))
  }

  function copyToClipboard(text: string, fieldId: string) {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldId)
    setTimeout(() => setCopiedField(""), 2000)
  }

  const allFilled = profile.fullName && profile.passportNo

  // Form fields for the profile entry
  const profileFields: { key: keyof UserProfile; en: string; ur: string; type?: string; colSpan?: string }[] = [
    { key: "fullName", en: "Full Name (as in Passport)", ur: "مکمل نام (پاسپورٹ کے مطابق)" },
    { key: "fatherName", en: "Father's Name", ur: "والد کا نام" },
    { key: "dob", en: "Date of Birth", ur: "تاریخ پیدائش", type: "date" },
    { key: "passportNo", en: "Passport Number", ur: "پاسپورٹ نمبر" },
    { key: "passportIssueDate", en: "Passport Issue Date", ur: "پاسپورٹ تاریخ اجرا", type: "date" },
    { key: "passportExpiryDate", en: "Passport Expiry Date", ur: "پاسپورٹ میعاد کی تاریخ", type: "date" },
    { key: "email", en: "Email Address", ur: "ای میل پتہ", type: "email" },
    { key: "phone", en: "Phone Number", ur: "فون نمبر" },
    { key: "city", en: "City of Residence", ur: "رہائش کا شہر" },
    { key: "profession", en: "Profession", ur: "پیشہ" },
    { key: "employer", en: "Employer / Company Name", ur: "آجر / کمپنی کا نام" },
    { key: "monthlyIncome", en: "Monthly Salary/Income", ur: "ماہانہ تنخواہ/آمدنی" },
    { key: "travelPurpose", en: "Purpose of Travel", ur: "سفر کا مقصد" },
    { key: "destination", en: "Destination Country", ur: "منزل کا ملک" },
    { key: "duration", en: "Duration of Stay", ur: "قیام کی مدت" },
  ]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl shadow-blue-600/30">
            ✍️
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {lang === "ur" ? "وائسا فارم آٹو فل" : "Visa Form Auto-Fill"}
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            {lang === "ur"
              ? "ایک بار اپنی معلومات بھریں اور ہم خود بخود ہر ملک کے ویزا فارم کو آپ کے ڈیٹا سے بھر دیں گے — کوئی غلطی نہیں ہو گی"
              : "Fill your details once and we auto-fill every country's visa form with your data — no mistakes"}
          </p>
        </div>

        {/* STEP 1: Profile */}
        {step === "profile" && (
          <div className="animate-fade-in">
            <div className="p-8 rounded-2xl bg-gradient-card border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">
                    {lang === "ur" ? "اپنی معلومات درج کریں" : "Enter Your Information"}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {lang === "ur" ? "یہ ڈیٹا تمام ممالک کے فارمز میں استعمال ہو گا" : "This data will be used for all country forms"}
                  </p>
                </div>
                <button
                  onClick={fillSampleData}
                  className="px-3 py-1.5 text-xs rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
                >
                  {lang === "ur" ? "نمونہ ڈیٹا بھریں" : "Fill Sample Data"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileFields.map(field => (
                  <div key={field.key} className={field.colSpan || ""}>
                    <label className={labelClass}>{lang === "ur" ? field.ur : field.en}</label>
                    <input
                      type={field.type || "text"}
                      className={inputClass}
                      value={profile[field.key]}
                      onChange={e => updateField(field.key, e.target.value)}
                      placeholder={lang === "ur" ? field.ur : field.en}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep("forms")}
                disabled={!allFilled}
                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                <Globe size={18} />
                {lang === "ur" ? "فارم منتخب کریں →" : "Select Forms →"}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Select Form */}
        {step === "forms" && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {countryForms.map(form => (
                <button
                  key={form.id}
                  onClick={() => { setSelectedForm(form); setStep("detail") }}
                  className="p-6 rounded-2xl bg-gradient-card border border-white/10 hover:border-blue-500/30 transition-all text-left"
                >
                  <span className="text-3xl block mb-2">{form.flag}</span>
                  <h3 className="font-semibold">{lang === "ur" ? form.nameUr : form.nameEn}</h3>
                  <p className="text-xs text-gray-500">{lang === "ur" ? form.formNameUr : form.formName}</p>
                  <p className="text-xs text-blue-400 mt-2">{form.sections.length} {lang === "ur" ? "سیکشنز" : "sections"}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep("profile")}
              className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              {lang === "ur" ? "پروفائل میں واپس" : "Back to Profile"}
            </button>
          </div>
        )}

        {/* STEP 3: Filled Form */}
        {step === "detail" && selectedForm && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setStep("forms")} className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
                <ArrowLeft size={16} />
              </button>
              <span className="text-2xl">{selectedForm.flag}</span>
              <div>
                <h2 className="font-semibold">{lang === "ur" ? selectedForm.nameUr : selectedForm.nameEn}</h2>
                <p className="text-xs text-gray-500">{lang === "ur" ? selectedForm.formNameUr : selectedForm.formName}</p>
              </div>
            </div>

            <div className="space-y-6">
              {selectedForm.sections.map((section, si) => (
                <div key={si} className="p-6 rounded-2xl bg-gradient-card border border-white/10">
                  <h3 className="font-semibold text-blue-400 mb-4 text-sm uppercase tracking-wider">
                    {lang === "ur" ? section.titleUr : section.titleEn}
                  </h3>
                  <div className="space-y-3">
                    {section.fields.map((field, fi) => {
                      const value = field.value(profile) || "—"
                      const fieldId = `${si}-${fi}`
                      return (
                        <div key={fieldId} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start p-3 rounded-lg bg-white/5">
                          <div className="md:col-span-1">
                            <p className="text-xs text-gray-500">{lang === "ur" ? field.labelUr : field.labelEn}</p>
                          </div>
                          <div className="md:col-span-2 flex items-center gap-2">
                            <div className="flex-1 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                              <p className="text-sm text-green-300 font-medium">{value}</p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(value, fieldId)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 flex-shrink-0"
                              title="Copy"
                            >
                              {copiedField === fieldId
                                ? <Check size={14} className="text-green-400" />
                                : <Copy size={14} className="text-gray-400" />
                              }
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setStep("forms")}
                className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                {lang === "ur" ? "دوسرا فارم دیکھیں" : "View Another Form"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
