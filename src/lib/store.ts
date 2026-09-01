import type { Lang } from "./data"

export type Step = "welcome" | "consent" | "connect" | "analysis" | "verify" | "profile" | "offline" | "share" | "privacy"

export interface Store {
  lang: Lang
  setLang: (l: Lang) => void
  step: Step
  go: (s: Step) => void
  next: () => void

  connected: string[] // platform ids
  connect: (id: string) => void
  disconnect: (id: string) => void

  analysed: boolean
  setAnalysed: (b: boolean) => void
  verified: boolean
  setVerified: (b: boolean) => void
  profileReady: boolean
  setProfileReady: (b: boolean) => void

  offline: boolean
  setOffline: (b: boolean) => void

  consentActive: boolean
  revokeConsent: () => void
  reactivateConsent: () => void
  dataDeleted: boolean
  deleteData: () => void
  restoreData: () => void

  narrate: boolean
  setNarrate: (b: boolean) => void

  beamedLender: string | null
  setBeamedLender: (id: string | null) => void
}
