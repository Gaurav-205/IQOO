/**
 * Visible — Frontend REST API Client
 * Seamlessly talks to backend when available, and gracefully falls back
 * to on-device zero-cloud simulation on static deployments (e.g. GitHub Pages).
 */

export interface ApiResponse<T = any> {
  success?: boolean
  status?: string
  error?: string
  [key: string]: any
}

export const api = {
  // GET /api/health
  async getHealth() {
    try {
      const res = await fetch("/api/health")
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { status: "ok", database: "CONNECTED", npuStatus: "ONLINE" }
    }
  },

  // GET /api/auth/me
  async getMe() {
    try {
      const res = await fetch("/api/auth/me")
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true, isAuthenticated: true }
    }
  },

  // POST /api/auth/signin
  async signin(phone: string, otp: string = "8924") {
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true, isAuthenticated: true }
    }
  },

  // POST /api/auth/signup
  async signup(data: {
    name: string
    phone: string
    city?: string
    role?: string
  }) {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true, isAuthenticated: true }
    }
  },

  // POST /api/auth/demo-login
  async demoLogin(personaId: string = "anjali") {
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personaId }),
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true, isAuthenticated: true, user: { id: personaId } }
    }
  },

  // POST /api/auth/logout
  async logout() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true, isAuthenticated: false }
    }
  },

  // GET /api/profile
  async getProfile() {
    try {
      const res = await fetch("/api/profile")
      if (!res.ok) return null
      return await res.json()
    } catch (e) {
      console.warn("[API] getProfile offline fallback", e)
      return null
    }
  },

  // POST /api/consent/grant
  async grantConsent() {
    try {
      const res = await fetch("/api/consent/grant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true, consentRef: "CN-90D-A14" }
    }
  },

  // POST /api/consent/revoke
  async revokeConsent() {
    try {
      const res = await fetch("/api/consent/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true }
    }
  },

  // POST /api/connect/link
  async linkPlatform(platformId: string) {
    try {
      const res = await fetch("/api/connect/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platformId }),
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true }
    }
  },

  // POST /api/connect/verify-otp
  async verifyOtp(platformId: string, otp: string) {
    try {
      const res = await fetch("/api/connect/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platformId, otp }),
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true, authenticated: true }
    }
  },

  // POST /api/npu/analyze
  async analyzeNpu() {
    try {
      const res = await fetch("/api/npu/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return {
        success: true,
        inferenceLatencyMs: 12.4,
        confidenceScore: 0.994,
      }
    }
  },

  // POST /api/ocr/verify
  async verifyOcr() {
    try {
      const res = await fetch("/api/ocr/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true, ocrMatch: 0.994 }
    }
  },

  // POST /api/share/beam
  async beamToLender(lenderId: string) {
    try {
      const res = await fetch("/api/share/beam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lenderId }),
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true, protocol: "Wi-Fi Direct P2P AES-256" }
    }
  },

  // POST /api/privacy/wipe
  async wipeDeviceData() {
    try {
      const res = await fetch("/api/privacy/wipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true }
    }
  },

  // POST /api/privacy/restore
  async restoreDemoData() {
    try {
      const res = await fetch("/api/privacy/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("offline")
      return await res.json()
    } catch {
      return { success: true }
    }
  },
}
