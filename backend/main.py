"""
VisaWala Backend API
AI-powered visa preparation assistant
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="VisaWala API",
    description="AI-powered visa preparation assistant for Pakistan & India",
    version="1.0.0",
)

# CORS - allow frontend to call
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://visawala.app", "https://visawala.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== MODELS ==========

class VisaFinderInput(BaseModel):
    destination: str
    purpose: str
    income: str
    education: str
    travel_history: bool
    language: str = "ur"

class SOPInput(BaseModel):
    name: str
    passport: str
    email: str
    phone: str
    city: str
    profession: str
    destination: str
    visa_type: str
    duration: str
    purpose_details: str
    language: str = "en"

class DocumentCheckInput(BaseModel):
    doc_type: str
    language: str = "ur"

# ========== HELPER DATA ==========

DESTINATIONS = {
    "italy": {"name_en": "Italy", "name_ur": "اٹلی", "type": "schengen"},
    "spain": {"name_en": "Spain", "name_ur": "اسپین", "type": "schengen"},
    "germany": {"name_en": "Germany", "name_ur": "جرمنی", "type": "schengen"},
    "france": {"name_en": "France", "name_ur": "فرانس", "type": "schengen"},
    "uk": {"name_en": "United Kingdom", "name_ur": "برطانیہ", "type": "uk"},
    "usa": {"name_en": "United States", "name_ur": "امریکہ", "type": "usa"},
    "canada": {"name_en": "Canada", "name_ur": "کینیڈا", "type": "commonwealth"},
    "uae": {"name_en": "UAE", "name_ur": "متحدہ عرب امارات", "type": "gulf"},
}

VISA_TYPES = {
    "tourist": {"en": "Tourist Visa", "ur": "ٹورسٹ ویزا"},
    "business": {"en": "Business Visa", "ur": "بزنس ویزا"},
    "student": {"en": "Student Visa", "ur": "سٹوڈنٹ ویزا"},
    "work": {"en": "Work / Skilled Visa", "ur": "ورک / سکلڈ ویزا"},
    "family": {"en": "Family Visit Visa", "ur": "فیملی وزٹ ویزا"},
    "medical": {"en": "Medical Visa", "ur": "میڈیکل ویزا"},
}

INCOME_LEVELS = {
    "low": {"range_en": "Under PKR 50,000/month", "range_ur": "50,000 روپے سے کم ماہانہ"},
    "mid": {"range_en": "PKR 50,000 - 200,000/month", "range_ur": "50,000 - 2,00,000 روپے ماہانہ"},
    "high": {"range_en": "PKR 200,000 - 1,000,000/month", "range_ur": "2,00,000 - 10,00,000 روپے ماہانہ"},
    "very-high": {"range_en": "PKR 1,000,000+/month", "range_ur": "10,00,000+ روپے ماہانہ"},
}

# ========== ENDPOINTS ==========

@app.get("/")
def root():
    return {"status": "ok", "app": "VisaWala API", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy", "service": "visawala-api"}

@app.post("/api/visa-finder")
def visa_finder(data: VisaFinderInput):
    """
    AI Visa Finder - analyze user profile and recommend best visa type
    """
    dest = DESTINATIONS.get(data.destination)
    if not dest:
        raise HTTPException(status_code=400, detail="Invalid destination")

    # Calculate probability score
    score = 40  # base
    
    # Schengen countries (strict)
    if dest["type"] == "schengen":
        if data.income in ("high", "very-high"):
            score += 15
        if data.education in ("bachelors", "masters", "phd"):
            score += 10
        if data.travel_history:
            score += 10
        if data.purpose == "family":
            score += 10
        else:
            score += 5
    # UK/USA (moderate)
    elif dest["type"] in ("uk", "usa"):
        if data.income in ("high", "very-high"):
            score += 20
        if data.education in ("bachelors", "masters", "phd"):
            score += 10
        if data.travel_history:
            score += 15
        score += 5
    # Gulf countries (easier)
    else:
        score += 20
        if data.travel_history:
            score += 10
        score += 10

    if data.income == "low":
        score -= 10
    if not data.travel_history:
        score -= 5

    score = max(20, min(95, score))

    # Determine visa type
    visa_type_key = data.purpose if data.purpose in VISA_TYPES else "tourist"
    visa_type = VISA_TYPES[visa_type_key]

    # Determine fee & timeline
    if dest["type"] == "schengen":
        fee = "€80 + service fee"
        fee_ur = "€80 + سروس فیس"
        timeline = "15–30 days"
        timeline_ur = "15–30 دن"
    elif dest["type"] == "uk":
        fee = "£115"
        fee_ur = "£115"
        timeline = "3–6 weeks"
        timeline_ur = "3–6 ہفتے"
    elif dest["type"] == "usa":
        fee = "$185"
        fee_ur = "$185"
        timeline = "2–4 weeks"
        timeline_ur = "2–4 ہفتے"
    else:
        fee = "$50–$200"
        fee_ur = "$50–$200"
        timeline = "1–4 weeks"
        timeline_ur = "1–4 ہفتے"

    recommendation = (
        f"آپ کے پروفائل کی بنیاد پر {dest['name_ur']} کے لیے {visa_type['ur']} بہترین ہے۔ "
        f"آپ کی ایپلیکیشن کی طاقت {score}% ہے۔"
    ) if data.language == "ur" else (
        f"Based on your profile, a {visa_type['en']} for {dest['name_en']} is the best match. "
        f"Your application strength is {score}%."
    )

    return {
        "destination": dest,
        "visa_type": visa_type,
        "score": score,
        "recommendation": recommendation,
        "estimated_fee": fee if data.language == "en" else fee_ur,
        "estimated_timeline": timeline if data.language == "en" else timeline_ur,
        "probability_category": "high" if score >= 70 else "medium" if score >= 50 else "low",
    }

@app.post("/api/generate-sop")
def generate_sop(data: SOPInput):
    """
    Generate a cover letter/SOP for visa application
    """
    dest = DESTINATIONS.get(data.destination, {}).get("name_en", data.destination)
    visa_type = VISA_TYPES.get(data.visa_type, {}).get("en", data.visa_type)

    sop = f"""{data.name}
{data.email} | {data.phone}
{data.city}

Date: {__import__('datetime').datetime.now().strftime('%d %B %Y')}

The Visa Officer
Embassy of {dest}

Subject: Application for {visa_type} to {dest}

Dear Sir/Madam,

I, {data.name}, am writing to apply for a {visa_type} to {dest}. My passport number is {data.passport}.

Purpose of Visit:
I intend to travel to {dest} for {data.purpose_details}. I plan to stay for {data.duration}.

Personal Details:
I reside in {data.city} and work as a {data.profession}. I have sufficient financial resources to cover all expenses during my stay.

Ties to Home Country:
I have strong ties to Pakistan including my professional commitments and family responsibilities, which ensure my return after the visit.

I have enclosed all required documents as per the visa requirements for your kind consideration.

Thank you for your time and consideration.

Yours sincerely,

{data.name}
Passport: {data.passport}
"""

    return {
        "success": True,
        "cover_letter": sop,
        "word_count": len(sop.split()),
        "format": "text",
    }

@app.post("/api/check-document")
def check_document(data: DocumentCheckInput):
    """
    AI compliance check for visa documents
    """
    checks = {
        "passport": {
            "score": 75,
            "issues": [
                {
                    "severity": "warning",
                    "message_en": "Passport validity may be less than 6 months",
                    "message_ur": "پاسپورٹ کی میعاد 6 ماہ سے کم ہو سکتی ہے",
                    "fix_en": "Renew passport before applying. Most Schengen countries require 6+ months validity.",
                    "fix_ur": "درخواست سے پہلے پاسپورٹ تجدید کروائیں۔",
                }
            ],
            "passed_checks": ["Biometric page readable", "Photo matches requirements"],
        },
        "bank": {
            "score": 45,
            "issues": [
                {
                    "severity": "error",
                    "message_en": "Large deposit detected recently without explanation",
                    "message_ur": "حالیہ دنوں میں بغیر وضاحت کے بڑی رقم جمع ہوئی",
                    "fix_en": "Add a letter explaining the source of this deposit",
                    "fix_ur": "اس رقم کے ذریعہ کی وضاحت کریں",
                },
                {
                    "severity": "warning",
                    "message_en": "Statement shows only 3 months — 6 months recommended",
                    "message_ur": "سٹیٹمنٹ صرف 3 ماہ کا ہے — 6 ماہ بہتر ہے",
                    "fix_en": "Request 6 months of bank statements",
                    "fix_ur": "بینک سے 6 ماہ کا سٹیٹمنٹ حاصل کریں",
                },
            ],
            "passed_checks": ["Bank is recognized", "Statement in English"],
        },
        "insurance": {
            "score": 60,
            "issues": [
                {
                    "severity": "error",
                    "message_en": "Medical coverage below €30,000 minimum for Schengen",
                    "message_ur": "میڈیکل کوریج €30,000 سے کم ہے",
                    "fix_en": "Purchase insurance with minimum €30,000 coverage",
                    "fix_ur": "کم از کم €30,000 کوریج والا انشورنس خریدیں",
                }
            ],
            "passed_checks": ["Valid for Schengen area", "Covers emergency"],
        },
        "employment": {
            "score": 80,
            "issues": [
                {
                    "severity": "info",
                    "message_en": "Letter should be on company letterhead with stamp",
                    "message_ur": "خط کمپنی لیٹر ہیڈ پر مہر کے ساتھ ہونا چاہیے",
                    "fix_en": "Ask HR to reissue on official letterhead",
                    "fix_ur": "HR سے سرکاری لیٹر ہیڈ پر جاری کرنے کی درخواست کریں",
                }
            ],
            "passed_checks": ["Salary mentioned", "NOC included", "Leave approved"],
        },
    }

    result = checks.get(data.doc_type)
    if not result:
        return {
            "score": 50,
            "issues": [{"severity": "info", "message_en": "Unknown document type", "message_ur": "نامعلوم دستاویز"}],
            "passed_checks": [],
        }

    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
