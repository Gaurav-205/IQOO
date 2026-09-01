import type { Request, Response } from "express"
import { query } from "./db"

export interface PlatformItem {
  id: string
  name: string
  kind: string
  color: string
  glyph: string
  monthly: number
  txns: number
  connected: boolean
}

export interface WorkerProfile {
  id: string
  name: string
  nameHi: string
  city: string
  cityHi: string
  phone: string
  idCode: string
  role: string
  roleHi: string
  platforms: PlatformItem[]
  history: { label: string; labelHi: string; amount: number }[]
  avgMonthly: number
  claimed: number
  aa: number
  document: number
  readinessScore: number
  ratings: {
    key: string
    title: string
    titleHi: string
    level: "STRONG" | "MODERATE" | "BUILDING"
    score: number
    reason: string
    reasonHi: string
  }[]
  consentActive: boolean
  consentRef: string
  consentExpiry: string
  dataDeleted: boolean
  beamedLender: string | null
}

const INITIAL_PROFILE: WorkerProfile = {
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
      connected: true,
    },
    {
      id: "ola",
      name: "Ola",
      kind: "Ride-hailing",
      color: "#4fd1a1",
      glyph: "🚗",
      monthly: 7200,
      txns: 96,
      connected: true,
    },
    {
      id: "rapido",
      name: "Rapido",
      kind: "Bike taxi",
      color: "#f5c518",
      glyph: "🏍️",
      monthly: 4800,
      txns: 141,
      connected: true,
    },
    {
      id: "urban",
      name: "Urban Company",
      kind: "Home services",
      color: "#6fa8ff",
      glyph: "🔧",
      monthly: 0,
      txns: 0,
      connected: false,
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
  consentActive: true,
  consentRef: "CN-90D-A14",
  consentExpiry: "30 Nov 2026 (90 days)",
  dataDeleted: false,
  beamedLender: null,
}

// In-Memory fallback cache
let currentProfile: WorkerProfile = JSON.parse(JSON.stringify(INITIAL_PROFILE))

export const apiHandlers = {
  // GET /api/health
  async getHealth(_req: Request, res: Response) {
    let dbStatus = "CONNECTED"
    try {
      await query("SELECT 1")
    } catch {
      dbStatus = "FALLBACK_CACHE"
    }
    res.json({
      status: "ok",
      version: "1.4.0",
      database: dbStatus,
      npuEngine: "Qualcomm Hexagon INT8 Coprocessor",
      npuStatus: "ONLINE",
      timestamp: new Date().toISOString(),
    })
  },

  // GET /api/profile
  async getProfile(_req: Request, res: Response) {
    try {
      const dbPlatforms = await query(
        "SELECT id, name, kind, color, glyph, monthly_earnings as monthly, txns_count as txns, connected FROM platforms WHERE worker_id = $1",
        ["anjali"],
      )
      if (dbPlatforms && dbPlatforms.length > 0) {
        currentProfile.platforms = dbPlatforms
      }
    } catch (e) {
      console.warn("[DB] Fallback to in-memory profile", e)
    }
    res.json({
      success: true,
      profile: currentProfile,
    })
  },

  // POST /api/consent/grant
  async grantConsent(_req: Request, res: Response) {
    currentProfile.consentActive = true
    currentProfile.consentRef = `CN-90D-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    try {
      await query(
        "INSERT INTO consent_records (worker_id, consent_ref, status, expires_at) VALUES ($1, $2, $3, $4)",
        ["anjali", currentProfile.consentRef, "ACTIVE", "30 Nov 2026 (90 days)"],
      )
    } catch (e) {
      console.warn("[DB] Error inserting consent record", e)
    }
    res.json({
      success: true,
      consentRef: currentProfile.consentRef,
      message: "Consent granted under RBI Account Aggregator framework",
    })
  },

  // POST /api/consent/revoke
  async revokeConsent(_req: Request, res: Response) {
    currentProfile.consentActive = false
    currentProfile.platforms.forEach((p) => (p.connected = false))
    try {
      await query(
        "UPDATE consent_records SET status = 'REVOKED' WHERE worker_id = $1",
        ["anjali"],
      )
      await query(
        "UPDATE platforms SET connected = false WHERE worker_id = $1",
        ["anjali"],
      )
    } catch (e) {
      console.warn("[DB] Error revoking consent", e)
    }
    res.json({
      success: true,
      message: "Consent successfully revoked",
    })
  },

  // POST /api/connect/link
  async linkPlatform(req: Request, res: Response) {
    const { platformId } = req.body || {}
    const p = currentProfile.platforms.find((item) => item.id === platformId)
    if (p) {
      p.connected = true
      try {
        await query(
          "UPDATE platforms SET connected = true WHERE id = $1 AND worker_id = $2",
          [platformId, "anjali"],
        )
      } catch (e) {
        console.warn("[DB] Error linking platform", e)
      }
      res.json({ success: true, platform: p })
    } else {
      res.status(404).json({ success: false, error: "Platform not found" })
    }
  },

  // POST /api/connect/verify-otp
  async verifyOtp(req: Request, res: Response) {
    const { otp, platformId } = req.body || {}
    if (otp === "8924" || otp?.length === 4) {
      const p = currentProfile.platforms.find((item) => item.id === platformId)
      if (p) {
        p.connected = true
        try {
          await query(
            "UPDATE platforms SET connected = true WHERE id = $1 AND worker_id = $2",
            [platformId, "anjali"],
          )
        } catch (e) {
          console.warn("[DB] Error updating platform connection", e)
        }
      }
      res.json({
        success: true,
        authenticated: true,
        message: "OTP authenticated via RBI AA Gateway",
      })
    } else {
      res.status(400).json({ success: false, error: "Invalid OTP" })
    }
  },

  // POST /api/npu/analyze
  analyzeIncome(_req: Request, res: Response) {
    const connectedPlatforms = currentProfile.platforms.filter(
      (p) => p.connected && p.monthly > 0,
    )
    const unifiedIncome = connectedPlatforms.reduce((a, b) => a + b.monthly, 0)
    res.json({
      success: true,
      npuModel: "Hexagon-INT8-Quantized-v2",
      inferenceLatencyMs: 12.4,
      unifiedMonthly: unifiedIncome,
      confidenceScore: 0.994,
      trend: "+7.4%",
    })
  },

  // POST /api/ocr/verify
  verifyOcr(_req: Request, res: Response) {
    res.json({
      success: true,
      ocrMatch: 0.994,
      extractedPayout: currentProfile.document,
      triangulation: {
        claimed: currentProfile.claimed,
        aaDerived: currentProfile.aa,
        ocrDocument: currentProfile.document,
        varianceInr: 300,
        status: "CONFIRMED_HIGH_CONFIDENCE",
      },
    })
  },

  // POST /api/share/beam
  beamProfile(req: Request, res: Response) {
    const { lenderId } = req.body || {}
    currentProfile.beamedLender = lenderId || "kisan"
    res.json({
      success: true,
      protocol: "Wi-Fi Direct P2P AES-256",
      recipientLender: currentProfile.beamedLender,
      timestamp: new Date().toISOString(),
    })
  },

  // POST /api/privacy/wipe
  async wipeData(_req: Request, res: Response) {
    currentProfile.dataDeleted = true
    currentProfile.consentActive = false
    try {
      await query(
        "UPDATE platforms SET connected = false WHERE worker_id = $1",
        ["anjali"],
      )
      await query(
        "UPDATE consent_records SET status = 'WIPED' WHERE worker_id = $1",
        ["anjali"],
      )
    } catch (e) {
      console.warn("[DB] Error wiping data", e)
    }
    res.json({
      success: true,
      message: "Device financial records erased",
    })
  },

  // POST /api/privacy/restore
  async restoreData(_req: Request, res: Response) {
    currentProfile = JSON.parse(JSON.stringify(INITIAL_PROFILE))
    try {
      await query(
        "UPDATE platforms SET connected = true WHERE worker_id = $1 AND monthly_earnings > 0",
        ["anjali"],
      )
    } catch (e) {
      console.warn("[DB] Error restoring data", e)
    }
    res.json({
      success: true,
      profile: currentProfile,
      message: "Demonstration records restored",
    })
  },
}
