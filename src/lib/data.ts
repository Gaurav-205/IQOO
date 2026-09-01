// ─────────────────────────────────────────────────────────────
// Visible — mock service layer.
// Every "real" integration (Account Aggregator, on-device NPU
// inference, ML Kit OCR, Office Kit cross-device) sits behind a
// clean async interface so it can be swapped for the real thing
// later without touching the UI.
// ─────────────────────────────────────────────────────────────

export type Lang = "en" | "hi"

export interface Platform {
  id: string
  name: string
  kind: string
  color: string
  glyph: string
  monthly: number // ₹ this month
  txns: number
}

export interface MonthPoint {
  label: string
  labelHi: string
  amount: number
}

export interface Rating {
  key: string
  title: string
  titleHi: string
  level: "STRONG" | "MODERATE" | "BUILDING"
  score: number // 0-100, drives the visual only
  reason: string
  reasonHi: string
}

export interface StatementSample {
  id: string
  company: string
  glyph: string
  cycle: string
  partner: string
  orders: string
  netPayout: number
  utr: string
  date: string
}

export interface LoanOffer {
  id: string
  lender: string
  title: string
  titleHi: string
  amount: number
  tenureMonths: number
  monthlyEmi: number
  interestRate: string
  purpose: string
  purposeHi: string
  tag: string
}

export interface Persona {
  id: string
  name: string
  nameHi: string
  city: string
  cityHi: string
  phone: string
  idCode: string
  role: string
  roleHi: string
  platforms: Platform[]
  history: MonthPoint[]
  avgMonthly: number
  claimed: number
  aa: number
  document: number
  readinessScore: number
  ratings: Rating[]
  statement: StatementSample
}

export const personas: Record<string, Persona> = {
  anjali: {
    id: "anjali",
    name: "Anjali Verma",
    nameHi: "अंजली वर्मा",
    city: "Pune, Maharashtra",
    cityHi: "पुणे, महाराष्ट्र",
    phone: "+91 98•• ••• 214",
    idCode: "VIS-2K9F-A14",
    role: "Delivery & Transit Courier",
    roleHi: "डिलीवरी व ट्रांजिट कूरियर",
    platforms: [
      {
        id: "swiggy",
        name: "Swiggy",
        kind: "Food delivery",
        color: "#fc8019",
        glyph: "🛵",
        monthly: 18400,
        txns: 212,
      },
      {
        id: "ola",
        name: "Ola",
        kind: "Ride-hailing",
        color: "#4fd1a1",
        glyph: "🚗",
        monthly: 7200,
        txns: 96,
      },
      {
        id: "rapido",
        name: "Rapido",
        kind: "Bike taxi",
        color: "#f5c518",
        glyph: "🏍️",
        monthly: 4800,
        txns: 141,
      },
      {
        id: "urban",
        name: "Urban Company",
        kind: "Home services",
        color: "#6fa8ff",
        glyph: "🔧",
        monthly: 0,
        txns: 0,
      },
    ],
    history: [
      { label: "Apr", labelHi: "अप्रैल", amount: 26800 },
      { label: "May", labelHi: "मई", amount: 24100 },
      { label: "Jun", labelHi: "जून", amount: 29800 },
      { label: "Jul", labelHi: "जुलाई", amount: 27300 },
      { label: "Aug", labelHi: "अगस्त", amount: 22900 },
      { label: "Sep", labelHi: "सितंबर", amount: 30400 },
    ],
    avgMonthly: 26883,
    claimed: 30000,
    aa: 29700,
    document: 29800,
    readinessScore: 78,
    ratings: [
      {
        key: "consistency",
        title: "Income Consistency",
        titleHi: "आय की निरंतरता",
        level: "STRONG",
        score: 82,
        reason:
          "Your income stayed relatively stable across the last 6 months, with no month falling sharply below average.",
        reasonHi:
          "पिछले 6 महीने में आपकी income relatively stable रही — कोई भी महीना औसत से बहुत नीचे नहीं गया।",
      },
      {
        key: "diversity",
        title: "Platform Diversity",
        titleHi: "प्लेटफ़ॉर्म विविधता",
        level: "STRONG",
        score: 78,
        reason:
          "Your income arrives from 3 different platforms, so a slow week on one does not stop your earnings.",
        reasonHi:
          "आपकी income 3 platforms से आ रही है, इसलिए एक जगह काम कम हो तो भी कमाई रुकती नहीं।",
      },
      {
        key: "reliability",
        title: "Payment Reliability",
        titleHi: "भुगतान विश्वसनीयता",
        level: "MODERATE",
        score: 74,
        reason:
          "Your recurring payouts show consistent behaviour, with occasional minor gaps between settlement cycles.",
        reasonHi:
          "आपके recurring payouts काफ़ी हद तक consistent हैं, बीच-बीच में settlement में थोड़ा अंतर आता है।",
      },
    ],
    statement: {
      id: "swiggy-sep",
      company: "Swiggy Delivery Partner",
      glyph: "🛵",
      cycle: "Sep 2026 (Monthly)",
      partner: "Anjali Verma",
      orders: "212 completed orders",
      netPayout: 29800,
      utr: "SWG-49219401",
      date: "30 Sep 2026",
    },
  },
  ramesh: {
    id: "ramesh",
    name: "Ramesh Kumar",
    nameHi: "रमेश कुमार",
    city: "New Delhi, NCR",
    cityHi: "नई दिल्ली, एनसीआर",
    phone: "+91 97•• ••• 882",
    idCode: "VIS-88R2-D11",
    role: "Full-Time Fleet Captain",
    roleHi: "फुल-टाइम फ्लीट कैप्टन",
    platforms: [
      {
        id: "swiggy",
        name: "Uber Fleet",
        kind: "Cab Services",
        color: "#ffffff",
        glyph: "🚕",
        monthly: 25400,
        txns: 180,
      },
      {
        id: "ola",
        name: "Ola Prime",
        kind: "Ride-hailing",
        color: "#4fd1a1",
        glyph: "🚗",
        monthly: 16600,
        txns: 120,
      },
      {
        id: "rapido",
        name: "Rapido Auto",
        kind: "Auto Rickshaw",
        color: "#f5c518",
        glyph: "🛺",
        monthly: 0,
        txns: 0,
      },
      {
        id: "urban",
        name: "Urban Company",
        kind: "Home services",
        color: "#6fa8ff",
        glyph: "🔧",
        monthly: 0,
        txns: 0,
      },
    ],
    history: [
      { label: "Apr", labelHi: "अप्रैल", amount: 38400 },
      { label: "May", labelHi: "मई", amount: 41200 },
      { label: "Jun", labelHi: "जून", amount: 39500 },
      { label: "Jul", labelHi: "जुलाई", amount: 43100 },
      { label: "Aug", labelHi: "अगस्त", amount: 40800 },
      { label: "Sep", labelHi: "सितंबर", amount: 42000 },
    ],
    avgMonthly: 40833,
    claimed: 42000,
    aa: 41800,
    document: 42000,
    readinessScore: 86,
    ratings: [
      {
        key: "consistency",
        title: "Income Consistency",
        titleHi: "आय की निरंतरता",
        level: "STRONG",
        score: 92,
        reason:
          "Rock-solid earnings exceeding ₹38,000 every single month for 6 consecutive months.",
        reasonHi:
          "पिछले 6 महीनों में हर महीने ₹38,000 से अधिक की ठोस और नियमित कमाई।",
      },
      {
        key: "diversity",
        title: "Platform Diversity",
        titleHi: "प्लेटफ़ॉर्म विविधता",
        level: "STRONG",
        score: 84,
        reason: "Well-balanced distribution between Uber (60%) and Ola (40%).",
        reasonHi: "Uber और Ola के बीच संतुलित और सुरक्षित आय वितरण।",
      },
      {
        key: "reliability",
        title: "Payment Reliability",
        titleHi: "भुगतान विश्वसनीयता",
        level: "STRONG",
        score: 83,
        reason:
          "Flawless daily direct bank deposits with 100% settlement uptime.",
        reasonHi: "100% समय पर दैनिक बैंक जमा और शून्य विफलता।",
      },
    ],
    statement: {
      id: "ola-sep",
      company: "Ola Fleet Partner",
      glyph: "🚗",
      cycle: "Sep 2026 (Weekly Settled)",
      partner: "Ramesh Kumar",
      orders: "120 trips completed",
      netPayout: 42000,
      utr: "OLA-98120344",
      date: "30 Sep 2026",
    },
  },
  pooja: {
    id: "pooja",
    name: "Pooja Sharma",
    nameHi: "पूजा शर्मा",
    city: "Bengaluru, Karnataka",
    cityHi: "बेंगलुरु, कर्नाटक",
    phone: "+91 96•• ••• 419",
    idCode: "VIS-41P9-K08",
    role: "Home Salon & Delivery",
    roleHi: "होम सैलून व डिलीवरी",
    platforms: [
      {
        id: "swiggy",
        name: "Swiggy Instamart",
        kind: "Grocery delivery",
        color: "#fc8019",
        glyph: "🛍️",
        monthly: 8500,
        txns: 110,
      },
      {
        id: "ola",
        name: "Urban Company",
        kind: "Home Salon",
        color: "#6fa8ff",
        glyph: "💅",
        monthly: 14000,
        txns: 48,
      },
      {
        id: "rapido",
        name: "Rapido",
        kind: "Bike taxi",
        color: "#f5c518",
        glyph: "🏍️",
        monthly: 0,
        txns: 0,
      },
      {
        id: "urban",
        name: "Zomato",
        kind: "Food delivery",
        color: "#e23744",
        glyph: "🍲",
        monthly: 0,
        txns: 0,
      },
    ],
    history: [
      { label: "Apr", labelHi: "अप्रैल", amount: 18200 },
      { label: "May", labelHi: "मई", amount: 19500 },
      { label: "Jun", labelHi: "जून", amount: 21000 },
      { label: "Jul", labelHi: "जुलाई", amount: 23400 },
      { label: "Aug", labelHi: "अगस्त", amount: 20100 },
      { label: "Sep", labelHi: "सितंबर", amount: 22500 },
    ],
    avgMonthly: 20783,
    claimed: 22000,
    aa: 21900,
    document: 22500,
    readinessScore: 68,
    ratings: [
      {
        key: "consistency",
        title: "Income Consistency",
        titleHi: "आय की निरंतरता",
        level: "MODERATE",
        score: 72,
        reason:
          "Gradually increasing income with slight seasonal variance during monsoon periods.",
        reasonHi: "लगातार बढ़ती आय, मानसूनी महीनों में मामूली उतार-चढ़ाव।",
      },
      {
        key: "diversity",
        title: "Platform Diversity",
        titleHi: "प्लेटफ़ॉर्म विविधता",
        level: "MODERATE",
        score: 68,
        reason:
          "Heavy reliance on home services (62%) with grocery deliveries as secondary.",
        reasonHi: "मुख्य रूप से होम सर्विसेज (62%) और ग्रॉसरी डिलीवरी पर निर्भर।",
      },
      {
        key: "reliability",
        title: "Payment Reliability",
        titleHi: "भुगतान विश्वसनीयता",
        level: "MODERATE",
        score: 65,
        reason: "Payouts arrive within standard 3-day batch cycles.",
        reasonHi: "भुगतान सामान्य 3-दिवसीय बैच चक्र में प्राप्त होते हैं।",
      },
    ],
    statement: {
      id: "urban-sep",
      company: "Urban Company Partner",
      glyph: "💅",
      cycle: "Sep 2026 (Bi-Weekly)",
      partner: "Pooja Sharma",
      orders: "48 appointments",
      netPayout: 22500,
      utr: "UC-55194021",
      date: "30 Sep 2026",
    },
  },
}

export const worker = personas.anjali
export const platforms: Platform[] = personas.anjali.platforms
export const history: MonthPoint[] = personas.anjali.history

export const analysis = {
  monthsAnalysed: 6,
  avgMonthly: personas.anjali.avgMonthly,
  bestMonth: { label: "September", labelHi: "सितंबर", amount: 30400 },
  worstMonth: { label: "August", labelHi: "अगस्त", amount: 22900 },
  trend: "+7.4%",
  consistency: 82,
  reliability: 74,
  diversity: 3,
}

export const verification = {
  claimed: personas.anjali.claimed,
  aa: personas.anjali.aa,
  document: personas.anjali.document,
}

export const ratings: Rating[] = personas.anjali.ratings

export const lenders = [
  {
    id: "kx",
    name: "KaroStart Microfinance",
    officer: "R. Nair",
    branch: "Pune South",
  },
  {
    id: "bs",
    name: "Bharat Small Loans",
    officer: "S. Kulkarni",
    branch: "Shivaji Nagar",
  },
]

export const statementPresets: StatementSample[] = [
  personas.anjali.statement,
  personas.ramesh.statement,
  personas.pooja.statement,
]

export const loanOffers: LoanOffer[] = [
  {
    id: "offer-1",
    lender: "KaroStart Microfinance",
    title: "Instant Gig Credit Line",
    titleHi: "तत्काल गिग क्रेडिट लाइन",
    amount: 30000,
    tenureMonths: 6,
    monthlyEmi: 5240,
    interestRate: "1.1%/mo",
    purpose: "Working capital, vehicle maintenance, or family emergencies",
    purposeHi: "कार्यशील पूंजी, वाहन रखरखाव, या पारिवारिक आपात स्थिति",
    tag: "Recommended",
  },
  {
    id: "offer-2",
    lender: "Bharat Small Loans",
    title: "EV Scooter Upgrade Loan",
    titleHi: "ईवी स्कूटर अपग्रेड लोन",
    amount: 60000,
    tenureMonths: 12,
    monthlyEmi: 5490,
    interestRate: "0.95%/mo",
    purpose: "Upgrade to electric vehicle to cut daily fuel costs by 70%",
    purposeHi: "दैनिक ईंधन लागत 70% कम करने के लिए इलेक्ट्रिक वाहन में अपग्रेड करें",
    tag: "Low EMI",
  },
]

export const npuTelemetry = {
  npuCore: "Qualcomm Hexagon NPU v75",
  modelQuant: "1D-CNN TimeSeries · INT8 Quantized",
  inferenceLatency: "12.4 ms",
  memoryUsage: "18.2 MB RAM",
  cloudBandwidth: "0 KB (100% On-Device)",
  energyDraw: "< 0.02% battery / run",
  hashSHA256:
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  tamperSeal: "Ed25519 Hardware Cryptographic Signature",
}

// i18n
export const t: Record<string, { en: string hi: string }> = {
  appTag: { en: "Credit-Readiness Profile", hi: "क्रेडिट-रेडीनेस प्रोफ़ाइल" },
  continue: { en: "Continue", hi: "आगे बढ़ें" },
  back: { en: "Back", hi: "वापस" },
  verifiedIncome: { en: "Verified monthly income", hi: "सत्यापित मासिक आय" },
  platforms: { en: "Platforms", hi: "प्लेटफ़ॉर्म" },
  months: { en: "Months analysed", hi: "विश्लेषित महीने" },
  onDevice: {
    en: "Analysed privately on your device",
    hi: "आपके फ़ोन पर निजी रूप से विश्लेषित",
  },
  strong: { en: "STRONG", hi: "मज़बूत" },
  moderate: { en: "MODERATE", hi: "मध्यम" },
  building: { en: "BUILDING", hi: "निर्माणाधीन" },
}

export function tr(k: string, lang: Lang) {
  return t[k]?.[lang] ?? k
}

export function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN")
}

export function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

// Global AudioContext Singleton for smooth playback
let sharedAudioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!sharedAudioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext })
        .webkitAudioContext
    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass()
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch(() => {})
  }
  return sharedAudioCtx
}

// Synthesized Audio Feedback
export function playTone(type: "tap" | "success" | "beam" | "scan") {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime
    if (type === "tap") {
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05)
      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
      osc.start(now)
      osc.stop(now + 0.05)
    } else if (type === "success") {
      osc.frequency.setValueAtTime(523.25, now) // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08) // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16) // G5
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
      osc.start(now)
      osc.stop(now + 0.35)
    } else if (type === "scan") {
      osc.type = "sine"
      osc.frequency.setValueAtTime(300, now)
      osc.frequency.linearRampToValueAtTime(1200, now + 0.2)
      gain.gain.setValueAtTime(0.05, now)
      gain.gain.linearRampToValueAtTime(0.001, now + 0.2)
      osc.start(now)
      osc.stop(now + 0.2)
    } else if (type === "beam") {
      osc.type = "triangle"
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.3)
      gain.gain.setValueAtTime(0.07, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
      osc.start(now)
      osc.stop(now + 0.3)
    }
  } catch {
    /* web audio not supported/allowed */
  }
}

// Voice narration via Web Speech API
export function speakText(text: string, lang: Lang = "hi") {
  try {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : null
    if (!synth) return
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang === "hi" ? "hi-IN" : "en-IN"
    u.rate = lang === "hi" ? 0.92 : 0.98
    const voices = synth.getVoices()
    const targetVoice = voices.find((v) =>
      lang === "hi"
        ? v.lang?.toLowerCase().startsWith("hi")
        : v.lang?.toLowerCase().startsWith("en-in") ||
          v.lang?.toLowerCase().startsWith("en"),
    )
    if (targetVoice) u.voice = targetVoice
    synth.speak(u)
  } catch {
    /* narration unavailable */
  }
}

export function stopSpeaking() {
  try {
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel()
    }
  } catch {
    /* noop */
  }
}
