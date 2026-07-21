// ============================================
// VISA INTERVIEW QUESTIONS DATABASE
// Country-wise + Visa-type-wise Q&A in Roman Urdu & English
// Visa Officer Approved Questions
// ============================================

export type Question = {
  id: string
  en: string
  ur: string
  modelAnswerEn: string
  modelAnswerUr: string
  tipsEn: string
  tipsUr: string
  category: "basic" | "financial" | "travel" | "ties" | "purpose" | "redflag"
  difficulty: "easy" | "medium" | "hard"
}

export type CountryInterview = {
  id: string
  nameEn: string
  nameUr: string
  flag: string
  visaTypes: Record<string, Question[]>
}

const questions: CountryInterview[] = [
  // ===== ITALY =====
  {
    id: "italy", nameEn: "Italy", nameUr: "اٹلی", flag: "🇮🇹",
    visaTypes: {
      tourist: [
        {
          id: "it-t-1", category: "purpose", difficulty: "easy",
          en: "Why do you want to visit Italy?",
          ur: "آپ اٹلی کیوں جانا چاہتے ہیں؟",
          modelAnswerEn: "I want to visit Italy for its rich history and culture. I plan to see the Colosseum in Rome, the canals of Venice, and the artworks in Florence. Italy has been on my travel list for many years.",
          modelAnswerUr: "میں اٹلی کی تاریخی اور ثقافتی ورثہ دیکھنے جانا چاہتا ہوں۔ روم کا کولوزیم، وینس کی نہریں اور فلورنس کے فن پارے دیکھنے کا ارادہ ہے۔ اٹلی کئی سالوں سے میرے سفری فہرست میں تھا۔",
          tipsEn: "Be specific about places you want to visit. Mention famous landmarks.",
          tipsUr: "ان مقامات کا نام لیں جو آپ دیکھنا چاہتے ہیں۔ مشہور تاریخی مقامات کا ذکر کریں۔",
        },
        {
          id: "it-t-2", category: "travel", difficulty: "easy",
          en: "Which cities will you visit in Italy?",
          ur: "آپ اٹلی میں کن شہروں کا دورہ کریں گے؟",
          modelAnswerEn: "I will visit Rome for 4 days, Florence for 3 days, and Venice for 2 days. I have already booked hotels and created a detailed itinerary.",
          modelAnswerUr: "میں 4 دن روم، 3 دن فلورنس اور 2 دن وینس میں گزاروں گا۔ میں نے ہوٹل بک کر لیے ہیں اور ایک تفصیلی پروگرام بنا لیا ہے۔",
          tipsEn: "Give a clear day-by-day plan. Show you've planned well.",
          tipsUr: "دن بہ دن پروگرام بتائیں۔ منصوبہ بندی کو ظاہر کریں۔",
        },
        {
          id: "it-t-3", category: "financial", difficulty: "medium",
          en: "How will you finance your trip to Italy?",
          ur: "آپ اٹلی کے سفر کے اخراجات کیسے پورے کریں گے؟",
          modelAnswerEn: "I have sufficient savings in my bank account. My monthly salary is PKR XXX and I have saved PKR XXX specifically for this trip. My bank statement shows consistent balance for the last 6 months.",
          modelAnswerUr: "میرے بینک اکاؤنٹ میں کافی بچت ہے۔ میری ماہانہ تنخواہ XXX روپے ہے اور میں نے اس سفر کے لیے XXX روپے جمع کیے ہیں۔ میرے بینک اسٹیٹمنٹ میں گزشتہ 6 ماہ کا مسلسل بیلنس دکھائی دیتا ہے۔",
          tipsEn: "Show you have enough money. Mention your salary AND savings.",
          tipsUr: "ظاہر کریں کہ آپ کے پاس کافی پیسے ہیں۔ تنخواہ اور بچت دونوں کا ذکر کریں۔",
        },
        {
          id: "it-t-4", category: "ties", difficulty: "hard",
          en: "Will you return to Pakistan after your trip?",
          ur: "کیا آپ سفر کے بعد پاکستان واپس آئیں گے؟",
          modelAnswerEn: "Yes, I will definitely return. I have a stable job in Pakistan, my family lives here, and I own property. I have strong reasons to come back.",
          modelAnswerUr: "جی ہاں، میں یقیناً واپس آؤں گا۔ میری پاکستان میں مستقل نوکری ہے، میرا خاندان یہاں رہتا ہے، اور میرے پاس جائیداد ہے۔ میرے پاس واپس آنے کی مضبوط وجوہات ہیں۔",
          tipsEn: "Mention job, family, property — any ties to home country.",
          tipsUr: "نوکری، خاندان، جائیداد — وطن سے وابستگی کی کوئی بھی وجہ بتائیں۔",
        },
        {
          id: "it-t-5", category: "travel", difficulty: "medium",
          en: "Have you traveled abroad before?",
          ur: "کیا آپ پہلے بیرون ملک جا چکے ہیں؟",
          modelAnswerEn: "Yes, I have traveled to UAE and Turkey before. I have attached copies of my previous visas and entry/exit stamps in my passport.",
          modelAnswerUr: "جی ہاں، میں پہلے متحدہ عرب امارات اور ترکی جا چکا ہوں۔ میں نے اپنے پچھلے ویزوں اور پاسپورٹ کے داخلی/خارجی اسٹیمپ کی کاپیاں منسلک کر دی ہیں۔",
          tipsEn: "Always be honest. Previous travel history STRENGTHENS your application.",
          tipsUr: "ہمیشہ سچ بولیں۔ پچھلے سفر کی تاریخ آپ کی درخواست کو مضبوط کرتی ہے۔",
        },
        {
          id: "it-t-6", category: "basic", difficulty: "easy",
          en: "How long do you plan to stay in Italy?",
          ur: "آپ اٹلی میں کتنے دن رہنے کا ارادہ رکھتے ہیں؟",
          modelAnswerEn: "I plan to stay for 9 days, from [start date] to [end date]. I have return flight tickets already booked.",
          modelAnswerUr: "میں 9 دن رہنے کا ارادہ رکھتا ہوں، [تاریخ آغاز] سے [تاریخ اختتام] تک۔ میری واپسی کی فلائٹ پہلے سے بک ہے۔",
          tipsEn: "Your stay duration should match your hotel bookings and insurance.",
          tipsUr: "آپ کے قیام کی مدت آپ کے ہوٹل بکنگ اور انشورنس سے مماثل ہونی چاہیے۔",
        },
        {
          id: "it-t-7", category: "redflag", difficulty: "hard",
          en: "Do you have family members living in Italy?",
          ur: "کیا آپ کے خاندان کے کوئی فرد اٹلی میں رہتا ہے؟",
          modelAnswerEn: "Yes, my cousin lives in Rome. However, I will be staying in a hotel and he will only guide me during the visit. I have my own accommodation and financial arrangements.",
          modelAnswerUr: "جی ہاں، میرے کزن روم میں رہتے ہیں۔ تاہم، میں ہوٹل میں رہوں گا اور وہ صرف رہنمائی کریں گے۔ میرے اپنے رہائش اور مالی انتظامات ہیں۔",
          tipsEn: "If you have family there, mention them but clarify you have independent arrangements.",
          tipsUr: "اگر وہاں خاندان ہے تو بتائیں لیکن واضح کریں کہ آپ کے اپنے انتظامات ہیں۔",
        },
        {
          id: "it-t-8", category: "financial", difficulty: "medium",
          en: "How much money do you have in your bank account?",
          ur: "آپ کے بینک اکاؤنٹ میں کتنی رقم ہے؟",
          modelAnswerEn: "My current balance is PKR XXX. I have been maintaining a consistent balance for the past 6 months, and my salary is credited monthly. This is sufficient for my travel expenses.",
          modelAnswerUr: "میرا موجودہ بیلنس XXX روپے ہے۔ میں گزشتہ 6 ماہ سے مسلسل بیلنس برقرار رکھے ہوئے ہوں، اور میری تنخواہ ماہانہ جمع ہوتی ہے۔ یہ رقم میرے سفری اخراجات کے لیے کافی ہے۔",
          tipsEn: "Know your exact balance. The officer might ask detailed questions.",
          tipsUr: "اپنا صحیح بیلنس یاد رکھیں۔ افسر تفصیلی سوال پوچھ سکتا ہے۔",
        },
      ],
      student: [
        {
          id: "it-s-1", category: "purpose", difficulty: "easy",
          en: "Why did you choose Italy for your studies?",
          ur: "آپ نے تعلیم کے لیے اٹلی کو کیوں چنا؟",
          modelAnswerEn: "I have been accepted at [University Name] for [Program Name]. Italy has world-renowned universities in my field of study, and the tuition fees are more affordable compared to other European countries.",
          modelAnswerUr: "مجھے [یونیورسٹی کا نام] میں [پروگرام کا نام] کے لیے قبول کیا گیا ہے۔ اٹلی میں میرے شعبہ تعلیم میں عالمی شہرت یافتہ یونیورسٹیاں ہیں، اور دیگر یورپی ممالک کے مقابلے میں فیس بھی کم ہے۔",
          tipsEn: "Mention university name and program. Show you did research.",
          tipsUr: "یونیورسٹی اور پروگرام کا نام لیں۔ ظاہر کریں کہ آپ نے تحقیق کی ہے۔",
        },
        {
          id: "it-s-2", category: "financial", difficulty: "hard",
          en: "How will you pay for your tuition and living expenses?",
          ur: "آپ اپنی ٹیوشن فیس اور رہائش کے اخراجات کیسے ادا کریں گے؟",
          modelAnswerEn: "I have a blocked account with €XX,XXX as required by the Italian government. Additionally, my parents will support me, and I have their sponsorship letter and bank statements attached.",
          modelAnswerUr: "میرے پاس اطالوی حکومت کی ضرورت کے مطابق €XX,XXX کا بلاکڈ اکاؤنٹ ہے۔ اس کے علاوہ، میرے والدین میری مدد کریں گے، اور ان کے سپانسرشپ خط اور بینک اسٹیٹمنٹ منسلک ہیں۔",
          tipsEn: "Show blocked account proof. Mention sponsor if applicable.",
          tipsUr: "بلاکڈ اکاؤنٹ کا ثبوت دکھائیں۔ اگر کوئی سپانسر ہے تو اس کا ذکر کریں۔",
        },
        {
          id: "it-s-3", category: "purpose", difficulty: "medium",
          en: "What will you do after completing your studies?",
          ur: "تعلیم مکمل کرنے کے بعد آپ کیا کریں گے؟",
          modelAnswerEn: "After completing my studies, I will return to Pakistan and apply my knowledge in my home country. Italy offers good post-study work options, but my long-term plan is to return and contribute to my country's development.",
          modelAnswerUr: "تعلیم مکمل کرنے کے بعد، میں پاکستان واپس آ کر اپنے علم کو اپنے وطن میں استعمال کروں گا۔ اٹلی میں تعلیم کے بعد کام کرنے کے اچھے مواقع ہیں، لیکن میرا طویل مدتی منصوبہ واپس آ کر اپنے ملک کی ترقی میں حصہ ڈالنا ہے۔",
          tipsEn: "Show intention to return. Mention how your degree helps Pakistan.",
          tipsUr: "واپسی کا ارادہ ظاہر کریں۔ بتائیں کہ آپ کی ڈگری پاکستان کی مدد کیسے کرے گی۔",
        },
      ],
      business: [
        {
          id: "it-b-1", category: "purpose", difficulty: "easy",
          en: "What is the purpose of your business visit to Italy?",
          ur: "آپ کے اٹلی کے کاروباری دورے کا مقصد کیا ہے؟",
          modelAnswerEn: "I am visiting to attend a trade fair in Milan and meet with potential Italian business partners. My company is looking to import Italian machinery and we have scheduled meetings with 3 suppliers.",
          modelAnswerUr: "میں میلان میں ایک تجارتی میلے میں شرکت اور ممکنہ اطالوی کاروباری شراکت داروں سے ملاقات کے لیے جا رہا ہوں۔ میری کمپنی اطالوی مشینری درآمد کرنا چاہتی ہے اور ہم نے 3 سپلائرز کے ساتھ ملاقاتیں طے کی ہیں۔",
          tipsEn: "Be specific about the business purpose. Mention company names if possible.",
          tipsUr: "کاروباری مقصد کے بارے میں مخصوص ہوں۔ اگر ممکن ہو تو کمپنیوں کے نام لیں۔",
        },
        {
          id: "it-b-2", category: "financial", difficulty: "medium",
          en: "Who is sponsoring your business trip?",
          ur: "آپ کے کاروباری سفر کی سپانسرشپ کون کر رہا ہے؟",
          modelAnswerEn: "My company is sponsoring the entire trip. They have provided a sponsorship letter, my employment letter, and company bank statements. I have also attached my company's registration documents.",
          modelAnswerUr: "میری کمپنی پورے سفر کی سپانسرشپ کر رہی ہے۔ انہوں نے سپانسرشپ خط، میرا روزگار کا سرٹیفکیٹ، اور کمپنی کے بینک اسٹیٹمنٹ فراہم کیے ہیں۔ میں نے کمپنی کے رجسٹریشن دستاویزات بھی منسلک کی ہیں۔",
          tipsEn: "Company sponsorship is strong. Show all company documents.",
          tipsUr: "کمپنی کی سپانسرشپ مضبوط ہے۔ کمپنی کے تمام دستاویزات دکھائیں۔",
        },
      ],
    },
  },

  // ===== SPAIN =====
  {
    id: "spain", nameEn: "Spain", nameUr: "اسپین", flag: "🇪🇸",
    visaTypes: {
      tourist: [
        {
          id: "es-t-1", category: "purpose", difficulty: "easy",
          en: "Why do you want to visit Spain?",
          ur: "آپ اسپین کیوں جانا چاہتے ہیں؟",
          modelAnswerEn: "I am very interested in Spanish culture, architecture, and cuisine. I want to visit Barcelona's Sagrada Familia, Madrid's Prado Museum, and experience the famous Spanish festivals.",
          modelAnswerUr: "مجھے ہسپانوی ثقافت، فن تعمیر اور کھانوں میں بہت دلچسپی ہے۔ میں بارسلونا کا ساگرا فیملیا، میڈرڈ کا پراڈو میوزیم اور مشہور ہسپانوی تہوار دیکھنا چاہتا ہوں۔",
          tipsEn: "Mention specific landmarks and cultural experiences.",
          tipsUr: "مخصوص تاریخی مقامات اور ثقافتی تجربات کا ذکر کریں۔",
        },
        {
          id: "es-t-2", category: "travel", difficulty: "medium",
          en: "Which cities in Spain will you visit?",
          ur: "آپ اسپین میں کن شہروں کا دورہ کریں گے؟",
          modelAnswerEn: "I will visit Madrid for 3 days, Barcelona for 4 days, and Seville for 2 days. I have already booked accommodation and created a detailed travel plan.",
          modelAnswerUr: "میں 3 دن میڈرڈ، 4 دن بارسلونا اور 2 دن سیویل میں گزاروں گا۔ میں نے رہائش بک کر لی ہے اور ایک تفصیلی سفری منصوبہ بنا لیا ہے۔",
          tipsEn: "A well-planned itinerary shows genuine tourism intent.",
          tipsUr: "اچھی طرح سے منصوبہ بند پروگرام حقیقی سیاحت کے ارادے کو ظاہر کرتا ہے۔",
        },
        {
          id: "es-t-3", category: "ties", difficulty: "hard",
          en: "What ties do you have to Pakistan that ensure your return?",
          ur: "پاکستان سے آپ کے کون سے تعلقات ہیں جو آپ کی واپسی کو یقینی بناتے ہیں؟",
          modelAnswerEn: "I have a permanent job as [profession] at [company] where I have worked for X years. I also own a house and my entire immediate family lives in Pakistan. I have strong professional and family ties.",
          modelAnswerUr: "میرے پاس [کمپنی] میں [پیشہ] کے طور پر مستقل ملازمت ہے جہاں میں X سال سے کام کر رہا ہوں۔ میرے پاس اپنا گھر بھی ہے اور میرا پورا خاندان پاکستان میں رہتا ہے۔ میرے مضبوط پیشہ ورانہ اور خاندانی تعلقات ہیں۔",
          tipsEn: "Strong ties = job, property, family, business. Mention all.",
          tipsUr: "مضبوط تعلقات = نوکری، جائیداد، خاندان، کاروبار۔ سب کا ذکر کریں۔",
        },
      ],
      student: [
        {
          id: "es-s-1", category: "purpose", difficulty: "easy",
          en: "Why Spain for your studies?",
          ur: "تعلیم کے لیے اسپین کیوں؟",
          modelAnswerEn: "Spain has excellent universities for my program. I have been accepted at Universidad de Barcelona for a Master's in [field]. The program is taught in English and Spanish both.",
          modelAnswerUr: "اسپین میں میرے پروگرام کے لیے بہترین یونیورسٹیاں ہیں۔ مجھے یونیورسیڈاڈ ڈی بارسلونا میں [شعبہ] میں ماسٹرز کے لیے قبول کیا گیا ہے۔ یہ پروگرام انگریزی اور ہسپانوی دونوں میں پڑھایا جاتا ہے۔",
          tipsEn: "Mention university name and program details.",
          tipsUr: "یونیورسٹی کا نام اور پروگرام کی تفصیلات بتائیں۔",
        },
        {
          id: "es-s-2", category: "financial", difficulty: "hard",
          en: "Show proof of your financial means for studying in Spain?",
          ur: "اسپین میں تعلیم کے لیے اپنے مالی وسائل کا ثبوت دیں؟",
          modelAnswerEn: "I have a bank account with €XX,XXX as required by Spanish authorities. My parents are also supporting me, and I have their bank statements and sponsorship letter attached.",
          modelAnswerUr: "میرے پاس ہسپانوی حکام کی ضرورت کے مطابق €XX,XXX کا بینک اکاؤنٹ ہے۔ میرے والدین بھی میری مدد کر رہے ہیں، اور ان کے بینک اسٹیٹمنٹ اور سپانسرشپ خط منسلک ہیں۔",
          tipsEn: "Spain requires proof of at least €XXX/month for living expenses.",
          tipsUr: "اسپین کو رہائش کے اخراجات کے لیے کم از کم €XXX ماہانہ کا ثبوت درکار ہے۔",
        },
      ],
      business: [
        {
          id: "es-b-1", category: "purpose", difficulty: "easy",
          en: "Nature of your business in Spain?",
          ur: "اسپین میں آپ کے کاروبار کی نوعیت کیا ہے؟",
          modelAnswerEn: "I am attending a business conference in Madrid focused on [industry]. I have invitations from 3 Spanish companies for meetings about potential collaboration.",
          modelAnswerUr: "میں میڈرڈ میں [صنعت] پر مرکوز ایک کاروباری کانفرنس میں شرکت کر رہا ہوں۔ میرے پاس ممکنہ تعاون کے بارے میں ملاقاتوں کے لیے 3 ہسپانوی کمپنیوں کے دعوت نامے ہیں۔",
          tipsEn: "Conference registration and invitation letters are essential.",
          tipsUr: "کانفرنس رجسٹریشن اور دعوت نامے ضروری ہیں۔",
        },
      ],
    },
  },

  // ===== GERMANY =====
  {
    id: "germany", nameEn: "Germany", nameUr: "جرمنی", flag: "🇩🇪",
    visaTypes: {
      tourist: [
        {
          id: "de-t-1", category: "purpose", difficulty: "easy",
          en: "Why do you want to visit Germany?",
          ur: "آپ جرمنی کیوں جانا چاہتے ہیں؟",
          modelAnswerEn: "I want to experience Germany's rich history and modern culture. I plan to visit Berlin's Brandenburg Gate, Munich's Oktoberfest, and the beautiful castles of Bavaria.",
          modelAnswerUr: "میں جرمنی کی بھرپور تاریخ اور جدید ثقافت کا تجربہ کرنا چاہتا ہوں۔ میں برلن کا برانڈنبرگ گیٹ، میونخ کا اوکٹوبرفیسٹ اور باویریا کے خوبصورت قلعے دیکھنے کا ارادہ رکھتا ہوں۔",
          tipsEn: "Germany is strict about documentation. Be thorough.",
          tipsUr: "جرمنی دستاویزات کے بارے میں سخت ہے۔ مکمل تیاری کریں۔",
        },
        {
          id: "de-t-2", category: "financial", difficulty: "medium",
          en: "How much money will you spend in Germany?",
          ur: "آپ جرمنی میں کتنا خرچ کریں گے؟",
          modelAnswerEn: "I estimate spending around €XXX for the entire trip. I have €XX,XXX in my bank account and I am carrying travel insurance with €30,000 medical coverage as required.",
          modelAnswerUr: "میں پورے سفر پر تقریباً €XXX خرچ کرنے کا اندازہ لگا رہا ہوں۔ میرے بینک اکاؤنٹ میں €XX,XXX ہیں اور میں €30,000 میڈیکل کوریج کے ساتھ ٹریول انشورنس لے کر جا رہا ہوں۔",
          tipsEn: "Calculate daily expenses. Germany requires €45/day minimum.",
          tipsUr: "یومیہ اخراجات کا حساب لگائیں۔ جرمنی کو کم از کم €45 یومیہ درکار ہے۔",
        },
      ],
      student: [
        {
          id: "de-s-1", category: "purpose", difficulty: "easy",
          en: "Why Germany for your higher education?",
          ur: "اعلیٰ تعلیم کے لیے جرمنی کیوں؟",
          modelAnswerEn: "Germany offers world-class education in my field. I have been accepted at TU Berlin for [program]. German engineering and research are globally recognized, and the tuition is very affordable.",
          modelAnswerUr: "جرمنی میرے شعبے میں عالمی معیار کی تعلیم فراہم کرتا ہے۔ مجھے TU برلن میں [پروگرام] کے لیے قبول کیا گیا ہے۔ جرمن انجینئرنگ اور تحقیق عالمی طور پر تسلیم شدہ ہے، اور ٹیوشن بہت سستی ہے۔",
          tipsEn: "APS certificate is mandatory for Pakistani students before applying.",
          tipsUr: "APS سرٹیفکیٹ پاکستانی طلبہ کے لیے درخواست دینے سے پہلے لازمی ہے۔",
        },
        {
          id: "de-s-2", category: "financial", difficulty: "hard",
          en: "Do you have a blocked account for Germany?",
          ur: "کیا آپ کے پاس جرمنی کے لیے بلاکڈ اکاؤنٹ ہے؟",
          modelAnswerEn: "Yes, I have opened a blocked account with Deutsche Bank with €11,208 as required by German authorities for one year. I also have additional savings for any emergency.",
          modelAnswerUr: "جی ہاں، میں نے جرمن حکام کی ضرورت کے مطابق €11,208 کے ساتھ ڈوئچے بینک میں بلاکڈ اکاؤنٹ کھولا ہے۔ میرے پاس کسی بھی ایمرجنسی کے لیے اضافی بچت بھی ہے۔",
          tipsEn: "Blocked account is mandatory. Minimum €934/month for 2024. Use Fintiba or Expatrio.",
          tipsUr: "بلاکڈ اکاؤنٹ لازمی ہے۔ کم از کم €934 ماہانہ 2024 کے لیے۔ Fintiba یا Expatrio استعمال کریں۔",
        },
        {
          id: "de-s-3", category: "purpose", difficulty: "medium",
          en: "What are your future plans after studies in Germany?",
          ur: "جرمنی میں تعلیم کے بعد آپ کے مستقبل کے منصوبے کیا ہیں؟",
          modelAnswerEn: "After my Master's, I plan to gain 1-2 years of work experience in Germany through the 18-month job seeker visa. Eventually, I want to return to Pakistan with international expertise.",
          modelAnswerUr: "ماسٹرز کے بعد، میں 18 ماہ کے جاب سیکر ویزا کے ذریعے جرمنی میں 1-2 سال کا کام کا تجربہ حاصل کرنے کا ارادہ رکھتا ہوں۔ آخرکار، میں بین الاقوامی مہارت کے ساتھ پاکستان واپس آنا چاہتا ہوں۔",
          tipsEn: "Germany allows 18-month job seeker visa after graduation.",
          tipsUr: "جرمنی گریجویشن کے بعد 18 ماہ کا جاب سیکر ویزا دیتا ہے۔",
        },
      ],
      work: [
        {
          id: "de-w-1", category: "purpose", difficulty: "easy",
          en: "What is your qualification for working in Germany?",
          ur: "جرمنی میں کام کرنے کے لیے آپ کی قابلیت کیا ہے؟",
          modelAnswerEn: "I have a Bachelor's/Master's degree in [field] with X years of professional experience. My qualifications are recognized in Germany and I have a job offer from [company].",
          modelAnswerUr: "میرے پاس [شعبہ] میں بیچلرز/ماسٹرز کی ڈگری ہے اور X سال کا پیشہ ورانہ تجربہ ہے۔ میری قابلیت جرمنی میں تسلیم شدہ ہے اور میرے پاس [کمپنی] سے نوکری کی پیشکش ہے۔",
          tipsEn: "EU Blue Card requires specific salary threshold. Check current amount.",
          tipsUr: "EU بلیو کارڈ کے لیے مخصوص تنخواہ کی حد درکار ہے۔ موجودہ رقم چیک کریں۔",
        },
      ],
    },
  },

  // ===== UK =====
  {
    id: "uk", nameEn: "United Kingdom", nameUr: "برطانیہ", flag: "🇬🇧",
    visaTypes: {
      tourist: [
        {
          id: "uk-t-1", category: "purpose", difficulty: "easy",
          en: "Why do you want to visit the UK?",
          ur: "آپ برطانیہ کیوں جانا چاہتے ہیں؟",
          modelAnswerEn: "I want to visit London to see historical landmarks like the Tower of London, Buckingham Palace, and the British Museum. I also plan to visit Manchester and Edinburgh.",
          modelAnswerUr: "میں لندن کے تاریخی مقامات جیسے ٹاور آف لندن، بکنگھم پیلس اور برٹش میوزیم دیکھنا چاہتا ہوں۔ میں مانچسٹر اور ایڈنبرا بھی جانے کا ارادہ رکھتا ہوں۔",
          tipsEn: "UK visa officers check bank statements very carefully. No large deposits.",
          tipsUr: "برطانیہ کے ویزا افسر بینک اسٹیٹمنٹ بہت غور سے چیک کرتے ہیں۔ کوئی بڑی جمع رقم نہ ہو۔",
        },
        {
          id: "uk-t-2", category: "financial", difficulty: "hard",
          en: "Can you show sufficient funds for UK visit?",
          ur: "کیا آپ برطانیہ کے سفر کے لیے کافی رقم دکھا سکتے ہیں؟",
          modelAnswerEn: "I have PKR XXX in my bank account which is more than sufficient for my stay. My bank statement for the last 6 months shows consistent salary credits and no unusual deposits.",
          modelAnswerUr: "میرے بینک اکاؤنٹ میں XXX روپے ہیں جو میرے قیام کے لیے کافی سے زیادہ ہیں۔ گزشتہ 6 ماہ کا میرا بینک اسٹیٹمنٹ مسلسل تنخواہ کی جمع رقم دکھاتا ہے اور کوئی غیر معمولی رقم نہیں ہے۔",
          tipsEn: "UK recommends minimum £100-150 per day. Show you have enough.",
          tipsUr: "برطانیہ کم از کم £100-150 یومیہ تجویز کرتا ہے۔ ظاہر کریں کہ آپ کے پاس کافی ہے۔",
        },
        {
          id: "uk-t-3", category: "ties", difficulty: "hard",
          en: "What guarantees do you have that you will return to Pakistan?",
          ur: "آپ کی پاکستان واپسی کی کیا ضمانت ہے؟",
          modelAnswerEn: "I have a permanent job, own a house, and my entire family is in Pakistan. I have been working at my current company for X years and have approved leave for this trip.",
          modelAnswerUr: "میرے پاس مستقل ملازمت ہے، اپنا گھر ہے، اور میرا پورا خاندان پاکستان میں ہے۔ میں اپنی موجودہ کمپنی میں X سال سے کام کر رہا ہوں اور اس سفر کے لیے چھٹی منظور ہو چکی ہے۔",
          tipsEn: "UK has highest rejection rate for Pakistan. Strong ties documentation is CRITICAL.",
          tipsUr: "پاکستان کے لیے برطانیہ کی ریجیکشن ریٹ سب سے زیادہ ہے۔ مضبوط تعلقات کا ثبوت بہت ضروری ہے۔",
        },
        {
          id: "uk-t-4", category: "travel", difficulty: "medium",
          en: "Have you ever been refused a UK visa before?",
          ur: "کیا آپ کو پہلے کبھی برطانیہ کے ویزا سے انکار کیا گیا ہے؟",
          modelAnswerEn: "No, I have never been refused any visa. / Yes, I was refused once before but I have addressed all the previous concerns in my new application with additional supporting documents.",
          modelAnswerUr: "نہیں، مجھے پہلے کبھی کسی ویزا سے انکار نہیں کیا گیا۔ / جی ہاں، ایک بار پہلے انکار کیا گیا تھا لیکن میں نے اپنی نئی درخواست میں تمام پچھلے خدشات کو اضافی معاون دستاویزات کے ساتھ حل کر دیا ہے۔",
          tipsEn: "Honesty is crucial. Previous refusals must be declared.",
          tipsUr: "ایمانداری بہت ضروری ہے۔ پچھلے انکار کا اعلان کرنا لازمی ہے۔",
        },
      ],
      student: [
        {
          id: "uk-s-1", category: "purpose", difficulty: "easy",
          en: "Why did you choose UK for your studies?",
          ur: "آپ نے تعلیم کے لیے برطانیہ کو کیوں چنا؟",
          modelAnswerEn: "UK has world-leading universities in my field. I have been accepted at [University] for [program]. UK degrees are globally recognized and will enhance my career prospects significantly.",
          modelAnswerUr: "برطانیہ میں میرے شعبے میں عالمی سطح کی یونیورسٹیاں ہیں۔ مجھے [یونیورسٹی] میں [پروگرام] کے لیے قبول کیا گیا ہے۔ برطانیہ کی ڈگریاں عالمی طور پر تسلیم شدہ ہیں اور میرے کیریئر کے امکانات کو بہت بہتر بنائیں گی۔",
          tipsEn: "CAS (Confirmation of Acceptance for Studies) is mandatory for UK student visa.",
          tipsUr: "CAS (کنفرمیشن آف ایکسیپٹنس فار اسٹڈیز) برطانیہ کے طالب علم ویزا کے لیے لازمی ہے۔",
        },
        {
          id: "uk-s-2", category: "financial", difficulty: "hard",
          en: "Do you meet the financial requirement for UK student visa?",
          ur: "کیا آپ برطانیہ کے طالب علم ویزا کی مالی ضرورت پوری کرتے ہیں؟",
          modelAnswerEn: "Yes. I have the required tuition fee of £XX,XXX plus living expenses of £1,334 per month for up to 9 months as stated in my CAS. Total funds of £XX,XXX are available in my bank account for more than 28 consecutive days.",
          modelAnswerUr: "جی ہاں۔ میرے پاس CAS میں بتائے گئے مطابق £XX,XXX ٹیوشن فیس اور 9 ماہ کے لیے £1,334 ماہانہ رہائش کے اخراجات ہیں۔ کل £XX,XXX میرے بینک اکاؤنٹ میں 28 مسلسل دنوں سے موجود ہے۔",
          tipsEn: "Funds must be in account for 28 consecutive days before application.",
          tipsUr: "درخواست سے پہلے رقم 28 مسلسل دنوں تک اکاؤنٹ میں ہونی چاہیے۔",
        },
      ],
    },
  },

  // ===== FRANCE =====
  {
    id: "france", nameEn: "France", nameUr: "فرانس", flag: "🇫🇷",
    visaTypes: {
      tourist: [
        {
          id: "fr-t-1", category: "purpose", difficulty: "easy",
          en: "Why France?",
          ur: "فرانس کیوں؟",
          modelAnswerEn: "France is known for its art, culture, and cuisine. I want to visit the Eiffel Tower, Louvre Museum, enjoy French cuisine, and explore the French Riviera.",
          modelAnswerUr: "فرانس اپنے فن، ثقافت اور کھانوں کے لیے مشہور ہے۔ میں ایفل ٹاور، لوور میوزیم دیکھنا، فرانسیسی کھانے چکھنا اور فرانسیسی رویریا کی سیر کرنا چاہتا ہوں۔",
          tipsEn: "France is the most visited country. Show genuine interest in culture.",
          tipsUr: "فرانس سب سے زیادہ دیکھا جانے والا ملک ہے۔ ثقافت میں حقیقی دلچسپی ظاہر کریں۔",
        },
        {
          id: "fr-t-2", category: "financial", difficulty: "medium",
          en: "Do you have travel insurance for Schengen?",
          ur: "کیا آپ کے پاس شینگن کے لیے ٹریول انشورنس ہے؟",
          modelAnswerEn: "Yes, I have purchased travel insurance with €30,000 medical coverage valid in all Schengen countries. The policy is from [insurance company] and covers the entire duration of my stay.",
          modelAnswerUr: "جی ہاں، میں نے تمام شینگن ممالک میں درست €30,000 میڈیکل کوریج کے ساتھ ٹریول انشورنس خرید لیا ہے۔ یہ پالیسی [انشورنس کمپنی] سے ہے اور میرے قیام کی پوری مدت کا احاطہ کرتی ہے۔",
          tipsEn: "Insurance must show €30,000 minimum, cover all Schengen countries, and be valid for entire stay.",
          tipsUr: "انشورنس €30,000 کم از کم کوریج، تمام شینگن ممالک اور پورے قیام کے لیے ہونی چاہیے۔",
        },
      ],
      student: [
        {
          id: "fr-s-1", category: "purpose", difficulty: "easy",
          en: "Why choose France for your education?",
          ur: "تعلیم کے لیے فرانس کیوں چنا؟",
          modelAnswerEn: "France offers excellent education in my field. I have been accepted at Sorbonne University. French degrees are highly respected globally and tuition is very reasonable.",
          modelAnswerUr: "فرانس میرے شعبے میں بہترین تعلیم فراہم کرتا ہے۔ مجھے سوربون یونیورسٹی میں قبول کیا گیا ہے۔ فرانسیسی ڈگریاں عالمی طور پر بہت قابل احترام ہیں اور ٹیوشن بہت مناسب ہے۔",
          tipsEn: "Etudes en France (EEF) procedure is mandatory for Pakistani students.",
          tipsUr: "پاکستانی طلبہ کے لیے Etudes en France (EEF) کا طریقہ کار لازمی ہے۔",
        },
      ],
    },
  },

  // ===== USA =====
  {
    id: "usa", nameEn: "United States", nameUr: "امریکہ", flag: "🇺🇸",
    visaTypes: {
      tourist: [
        {
          id: "us-t-1", category: "purpose", difficulty: "hard",
          en: "What is the purpose of your visit to the US?",
          ur: "آپ کے امریکہ کے سفر کا مقصد کیا ہے؟",
          modelAnswerEn: "I am traveling for tourism. I plan to visit New York City, Washington DC, and Orlando. This is purely a leisure trip and I have a detailed itinerary with hotel bookings and return flight tickets.",
          modelAnswerUr: "میں سیاحت کے لیے جا رہا ہوں۔ میں نیو یارک سٹی، واشنگٹن ڈی سی اور اورلینڈو دیکھنے کا ارادہ رکھتا ہوں۔ یہ خالصتاً تفریحی سفر ہے اور میرے پاس ہوٹل بکنگ اور واپسی کی فلائٹ کے ساتھ تفصیلی پروگرام ہے۔",
          tipsEn: "US visa interview is the toughest. Be confident and concise. DS-160 form must match your answers.",
          tipsUr: "امریکہ کا ویزا انٹرویو سب سے مشکل ہے۔ پراعتماد اور مختصر جواب دیں۔ DS-160 فارم آپ کے جوابات سے مماثل ہونا چاہیے۔",
        },
        {
          id: "us-t-2", category: "redflag", difficulty: "hard",
          en: "Do you intend to immigrate to the US?",
          ur: "کیا آپ امریکہ میں ہجرت کرنا چاہتے ہیں؟",
          modelAnswerEn: "No, I have no intention to immigrate. I have a well-established career in Pakistan, own property, and my family is here. I am only visiting as a tourist for 2 weeks.",
          modelAnswerUr: "نہیں، میرے ہجرت کا کوئی ارادہ نہیں۔ میرا پاکستان میں ایک مستحکم کیریئر ہے، جائیداد ہے، اور میرا خاندان یہاں ہے۔ میں صرف 2 ہفتوں کے لیے سیاح کے طور پر جا رہا ہوں۔",
          tipsEn: "This is THE most important question. Never show immigration intent on a tourist visa.",
          tipsUr: "یہ سب سے اہم سوال ہے۔ کبھی بھی ٹورسٹ ویزا پر ہجرت کا ارادہ ظاہر نہ کریں۔",
        },
        {
          id: "us-t-3", category: "financial", difficulty: "medium",
          en: "Who will pay for your trip to the US?",
          ur: "آپ کے امریکہ کے سفر کے اخراجات کون ادا کرے گا؟",
          modelAnswerEn: "I will pay for my own trip. I have sufficient funds in my bank account and I have attached my bank statements and employment letter as proof of my financial stability.",
          modelAnswerUr: "میں اپنے سفر کے اخراجات خود ادا کروں گا۔ میرے بینک اکاؤنٹ میں کافی رقم ہے اور میں نے اپنے مالی استحکام کے ثبوت کے طور پر بینک اسٹیٹمنٹ اور روزگار کا سرٹیفکیٹ منسلک کیا ہے۔",
          tipsEn: "Self-sponsorship is stronger than being sponsored by someone else.",
          tipsUr: "خود خرچ کرنا کسی اور کے سپانسر ہونے سے زیادہ مضبوط ہے۔",
        },
      ],
      student: [
        {
          id: "us-s-1", category: "purpose", difficulty: "hard",
          en: "Why this university and why this program?",
          ur: "یہ یونیورسٹی اور یہ پروگرام کیوں؟",
          modelAnswerEn: "I chose [University] because it has one of the best [program] programs in the world. The curriculum, faculty, and research opportunities are excellent and align perfectly with my career goals.",
          modelAnswerUr: "میں نے [یونیورسٹی] اس لیے چنا کیونکہ اس کے پاس دنیا کے بہترین [پروگرام] پروگراموں میں سے ایک ہے۔ نصاب، فیکلٹی اور تحقیق کے مواقع بہترین ہیں اور میرے کیریئر کے اہداف سے بالکل مطابقت رکھتے ہیں۔",
          tipsEn: "F-1 visa requires strong ties to home country. You must prove intent to return.",
          tipsUr: "F-1 ویزا کے لیے وطن سے مضبوط تعلقات ضروری ہیں۔ آپ کو واپسی کا ارادہ ثابت کرنا ہوگا۔",
        },
        {
          id: "us-s-2", category: "financial", difficulty: "hard",
          en: "How will you fund your education in the US?",
          ur: "آپ امریکہ میں اپنی تعلیم کی فیس کیسے ادا کریں گے؟",
          modelAnswerEn: "I have a combination of personal savings, family support, and a scholarship from [source]. Total funds of $XX,XXX are available for the first year as shown in the I-20 form.",
          modelAnswerUr: "میرے پاس ذاتی بچت، خاندانی تعاون اور [ذریعہ] سے اسکالرشپ کا مجموعہ ہے۔ I-20 فارم میں دکھائے گئے مطابق پہلے سال کے لیے $XX,XXX کی کل رقم دستیاب ہے۔",
          tipsEn: "I-20 form shows total cost. You must prove you can pay this amount.",
          tipsUr: "I-20 فارم کل لاگت دکھاتا ہے۔ آپ کو یہ ثابت کرنا ہوگا کہ آپ یہ رقم ادا کر سکتے ہیں۔",
        },
      ],
    },
  },

  // ===== CANADA =====
  {
    id: "canada", nameEn: "Canada", nameUr: "کینیڈا", flag: "🇨🇦",
    visaTypes: {
      tourist: [
        {
          id: "ca-t-1", category: "purpose", difficulty: "easy",
          en: "Why do you want to visit Canada?",
          ur: "آپ کینیڈا کیوں جانا چاہتے ہیں؟",
          modelAnswerEn: "I want to experience Canada's natural beauty — Niagara Falls, Banff National Park, and Toronto city. I also have a cousin in Vancouver whom I plan to visit.",
          modelAnswerUr: "میں کینیڈا کی قدرتی خوبصورتی — نیاگرا فالس، بنف نیشنل پارک اور ٹورنٹو شہر کا تجربہ کرنا چاہتا ہوں۔ میرے کزن وینکوور میں رہتے ہیں جن سے ملنے کا ارادہ ہے۔",
          tipsEn: "Canada values tourism. Show a clear travel plan.",
          tipsUr: "کینیڈا سیاحت کو اہمیت دیتا ہے۔ واضح سفر کا منصوبہ دکھائیں۔",
        },
      ],
      student: [
        {
          id: "ca-s-1", category: "purpose", difficulty: "hard",
          en: "Why Canada over other countries?",
          ur: "دوسرے ممالک کے بجائے کینیڈا کیوں؟",
          modelAnswerEn: "Canada has excellent post-study work opportunities. After my program, I can get a 3-year PGWP (Post-Graduation Work Permit) which will give me valuable international work experience before returning to Pakistan.",
          modelAnswerUr: "کینیڈا میں تعلیم کے بعد کام کے بہترین مواقع ہیں۔ میرے پروگرام کے بعد، میں 3 سالہ PGWP (پوسٹ گریجویشن ورک پرمٹ) حاصل کر سکتا ہوں جو مجھے پاکستان واپس آنے سے پہلے قیمتی بین الاقوامی کام کا تجربہ دے گا۔",
          tipsEn: "SDS (Student Direct Stream) is available for Pakistani students — faster processing.",
          tipsUr: "SDS (سٹوڈنٹ ڈائریکٹ سٹریم) پاکستانی طلبہ کے لیے دستیاب ہے — تیز تر پروسیسنگ۔",
        },
      ],
    },
  },
]

export default questions
