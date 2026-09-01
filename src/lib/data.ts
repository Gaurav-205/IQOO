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
  { id: "kx", name: "KaroStart Microfinance", officer: "R. Nair" },
  { id: "bs", name: "Bharat Small Loans", officer: "S. Kulkarni" },
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
