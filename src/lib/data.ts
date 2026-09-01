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

export const worker = {
  name: "Anjali Verma",
  nameHi: "अंजली वर्मा",
  city: "Pune, Maharashtra",
  cityHi: "पुणे, महाराष्ट्र",
  phone: "+91 98•• ••• 214",
  id: "VIS-2K9F-A14",
}

// Account Aggregator — discoverable gig platforms
export const platforms: Platform[] = [
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
]

// 6-month unified income history (₹)
export const history: MonthPoint[] = [
  { label: "Apr", labelHi: "अप्रैल", amount: 26800 },
  { label: "May", labelHi: "मई", amount: 24100 },
  { label: "Jun", labelHi: "जून", amount: 29800 },
  { label: "Jul", labelHi: "जुलाई", amount: 27300 },
  { label: "Aug", labelHi: "अगस्त", amount: 22900 },
  { label: "Sep", labelHi: "सितंबर", amount: 30400 },
]

export const analysis = {
  monthsAnalysed: 6,
  avgMonthly: 26883,
  bestMonth: { label: "September", labelHi: "सितंबर", amount: 30400 },
  worstMonth: { label: "August", labelHi: "अगस्त", amount: 22900 },
  trend: "+7.4%",
  consistency: 82,
  reliability: 74,
  diversity: 3,
}

export const verification = {
  claimed: 30000,
  aa: 29700,
  document: 29800,
}

export const ratings: Rating[] = [
  {
    key: "consistency",
    title: "Income Consistency",
    titleHi: "आय की निरंतरता",
    level: "STRONG",
    score: 82,
    reason:
      "Your income stayed relatively stable across the last 6 months, with no month falling sharply below your average.",
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
      "Your recurring payouts show generally consistent behaviour, with occasional gaps between settlement cycles.",
    reasonHi:
      "आपके recurring payouts काफ़ी हद तक consistent हैं, बीच-बीच में settlement में थोड़ा अंतर आता है।",
  },
]

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
  {
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
  {
    id: "ola-sep",
    company: "Ola Fleet Partner",
    glyph: "🚗",
    cycle: "Sep 2026 (Weekly Settled)",
    partner: "Anjali Verma",
    orders: "96 rides",
    netPayout: 7200,
    utr: "OLA-98120344",
    date: "28 Sep 2026",
  },
  {
    id: "rapido-sep",
    company: "Rapido Captain Statement",
    glyph: "🏍️",
    cycle: "Sep 2026 (Bi-Weekly)",
    partner: "Anjali Verma",
    orders: "141 trips",
    netPayout: 4800,
    utr: "RPD-77291038",
    date: "29 Sep 2026",
  },
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

// i18n — only the recurring chrome strings; long copy carries its own *Hi field.
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

// Simulated async — stands in for real SDK calls later.
export function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

// Synthesized Audio Feedback via Web Audio API
export function playTone(type: "tap" | "success" | "beam" | "scan") {
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext })
        .webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
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

// Voice narration via Web Speech API. Best-effort:
// Supports both Hindi and English narration with fallback.
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

export function speakHindi(text: string) {
  speakText(text, "hi")
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
