import { useEffect, useMemo, useState } from "react"
import { Button, Card, Icon, Pill } from "./components/ui"
import {
  Analysis,
  Connect,
  Consent,
  Offline,
  Privacy,
  Profile,
  Share,
  Verify,
  Welcome,
} from "./components/screens"
import { AuthScreen } from "./components/AuthScreen"
import { LiveSystemInspector } from "./components/LiveSystemInspector"
import {
  createCustomPersona,
  inr,
  Lang,
  Persona,
  personas,
  playTone,
  stopSpeaking,
} from "./lib/data"
import { api } from "./lib/api"
import type { Step, Store } from "./lib/store"

const MAIN: Step[] = [
  "welcome",
  "consent",
  "connect",
  "analysis",
  "verify",
  "profile",
]

const ALL_STEPS: { id: Step label: string tag: string }[] = [
  { id: "welcome", label: "1. Welcome", tag: "Hero" },
  { id: "consent", label: "2. Consent", tag: "RBI AA" },
  { id: "connect", label: "3. Connect", tag: "Streams" },
  { id: "analysis", label: "4. Analysis", tag: "NPU AI" },
  { id: "verify", label: "5. Verify", tag: "ML OCR" },
  { id: "profile", label: "6. Profile", tag: "Dossier" },
  { id: "offline", label: "7. Offline", tag: "Airplane" },
  { id: "share", label: "8. Share", tag: "P2P Beam" },
  { id: "privacy", label: "9. Privacy", tag: "Zero-Cloud" },
]

export default function App() {
  const [currentUser, setCurrentUser] = useState<Persona>(() => {
    try {
      const cached = localStorage.getItem("visible_active_user")
      if (cached) {
        const parsed = JSON.parse(cached)
        if (parsed && Array.isArray(parsed.platforms) && parsed.name) {
          return parsed
        }
      }
    } catch {}
    return personas.anjali
  })
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem("visible_is_logged_in") === "true"
    } catch {}
    return false
  })
  const [lang, setLangRaw] = useState<Lang>("en")
  const [step, setStep] = useState<Step>("welcome")
  const [connected, setConnected] = useState<string[]>(() =>
    currentUser.platforms.filter((p) => p.monthly > 0).map((p) => p.id),
  )
  const [analysed, setAnalysed] = useState(false)
  const [verified, setVerified] = useState(false)
  const [profileReady, setProfileReady] = useState(false)
  const [offline, setOffline] = useState(false)
  const [consentActive, setConsentActive] = useState(true)
  const [dataDeleted, setDataDeleted] = useState(false)
  const [narrate, setNarrate] = useState(false)
  const [beamedLender, setBeamedLender] = useState<string | null>(null)
  const [showTourDrawer, setShowTourDrawer] = useState(false)
  const [showInspector, setShowInspector] = useState(false)

  // Sync profile from backend on mount
  useEffect(() => {
    api.getProfile().then((data) => {
      if (data?.profile) {
        setConsentActive(data.profile.consentActive)
        setDataDeleted(data.profile.dataDeleted)
        setBeamedLender(data.profile.beamedLender)
      }
    })
  }, [])

  const handleUserAuthenticated = (user: any) => {
    let fullPersona: Persona
    if (user.id in personas) {
      fullPersona = personas[user.id]
    } else if (user.platforms && user.history) {
      fullPersona = (user as Persona)
    } else {
      fullPersona = createCustomPersona({
        name: user.name || "Gig Courier",
        phone: user.phone || "+91 98000 00000",
        city: user.city || "Pune, Maharashtra",
        role: user.role || "Delivery Courier",
      })
    }
    setCurrentUser(fullPersona)
    try {
      localStorage.setItem("visible_active_user", JSON.stringify(fullPersona))
      localStorage.setItem("visible_is_logged_in", "true")
    } catch {}
    setIsLoggedIn(true)
    setStep("welcome")
    setConnected(
      fullPersona.platforms.filter((p) => p.monthly > 0).map((p) => p.id),
    )
  }

  const handleLogout = () => {
    playTone("tap")
    api.logout()
    try {
      localStorage.removeItem("visible_is_logged_in")
      localStorage.removeItem("visible_active_user")
    } catch {}
    setIsLoggedIn(false)
  }

  const store: Store = useMemo(
    () => ({
      user: currentUser,
      setUser: (p: Persona) => {
        setCurrentUser(p)
        try {
          localStorage.setItem("visible_active_user", JSON.stringify(p))
        } catch {}
      },
      personaId: currentUser.id,
      setPersonaId: () => {},
      lang,
      setLang: (l) => setLangRaw(l),
      step,
      go: (target) => {
        stopSpeaking()
        setStep(target)
      },
      next: () => {
        stopSpeaking()
        const i = MAIN.indexOf(step)
        if (i >= 0 && i < MAIN.length - 1) setStep(MAIN[i + 1])
      },
      connected,
      connect: (id) => {
        setConnected((c) => (c.includes(id) ? c : [...c, id]))
        api.linkPlatform(id)
      },
      disconnect: (id) => setConnected((c) => c.filter((x) => x !== id)),
      analysed,
      setAnalysed: (val) => {
        setAnalysed(val)
        if (val) api.analyzeNpu()
      },
      verified,
      setVerified: (val) => {
        setVerified(val)
        if (val) api.verifyOcr()
      },
      profileReady,
      setProfileReady,
      offline,
      setOffline,
      consentActive,
      revokeConsent: () => {
        setConsentActive(false)
        setConnected([])
        api.revokeConsent()
      },
      reactivateConsent: () => {
        setConsentActive(true)
        setConnected(["swiggy", "ola", "rapido"])
        api.grantConsent()
      },
      dataDeleted,
      deleteData: () => {
        setDataDeleted(true)
        api.wipeDeviceData()
      },
      restoreData: () => {
        setDataDeleted(false)
        setConnected(["swiggy", "ola", "rapido"])
        setAnalysed(true)
        setVerified(true)
        setProfileReady(true)
        api.restoreDemoData()
      },
      narrate,
      setNarrate,
      beamedLender,
      setBeamedLender: (lenderId) => {
        setBeamedLender(lenderId)
        if (lenderId) api.beamToLender(lenderId)
      },
    }),
    [
      currentUser,
      lang,
      step,
      connected,
      analysed,
      verified,
      profileReady,
      offline,
      consentActive,
      dataDeleted,
      narrate,
      beamedLender,
    ],
  )

  const mainIdx = MAIN.indexOf(step)
  const showChrome = step !== "welcome"
  const canOpenPrivacy =
    profileReady || step === "profile" || step === "share" || step === "offline"

  const handleBack = () => {
    playTone("tap")
    stopSpeaking()
    if (step === "offline" || step === "share" || step === "privacy") {
      setStep("profile")
    } else if (mainIdx > 0) {
      setStep(MAIN[mainIdx - 1])
    }
  }

  const screen = {
    welcome: <Welcome s={store} />,
    consent: <Consent s={store} />,
    connect: <Connect s={store} />,
    analysis: <Analysis s={store} />,
    verify: <Verify s={store} />,
    profile: <Profile s={store} />,
    offline: <Offline s={store} />,
    share: <Share s={store} />,
    privacy: <Privacy s={store} />,
  }[step]

  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center bg-[#f0eee9] text-[#212121] p-0 md:py-6 overflow-x-hidden">
      {/* Real-World Production Live Telemetry Inspector */}
      <LiveSystemInspector
        isOpen={showInspector}
        onClose={() => setShowInspector(false)}
      />

      {/* Clean, Modern Mobile Application Frame */}
      <div className="relative z-10 flex h-dvh md:h-[92vh] md:max-h-[900px] w-full max-w-none md:max-w-[460px] flex-col bg-[#ffffff] md:rounded-[32px] md:border md:border-[#d9d9dd] md:shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Mobile Status Bar (Clean, Minimal, Non-AI) */}
        <header className="relative flex shrink-0 items-center justify-between px-5 py-3 text-[12px] text-[#616161] select-none border-b border-[#f2f2f2] bg-[#ffffff]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[12px] font-semibold text-[#17171c]">
              14:20
            </span>
            {/* Live Indicator */}
            <button
              onClick={() => {
                playTone("tap")
                setShowInspector(true)
              }}
              className="flex items-center gap-1.5 rounded-full bg-[#edfce9] text-[#00875a] border border-[#bbf7d0] px-2 py-0.5 text-[10px] font-mono font-medium cursor-pointer hover:bg-[#dcfce7] transition-colors"
              title="Open Infrastructure Inspector"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00875a]" />
              <span>LIVE</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            {isLoggedIn && (
              <>
                {/* Account / Switch Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 rounded-full bg-[#eeece7] text-[#17171c] border border-[#d9d9dd] px-2 py-0.5 text-[10px] font-bold cursor-pointer hover:bg-[#e5e7eb] transition-colors"
                  title="Switch User / Sign Out"
                >
                  <Icon.user size={10} />{" "}
                  {currentUser?.name?.split(" ")[0] || "User"}
                </button>

                {/* Quick Tour Jumper Pill */}
                <button
                  onClick={() => {
                    playTone("tap")
                    setShowTourDrawer(!showTourDrawer)
                  }}
                  className="flex items-center gap-1 rounded-full bg-[#17171c] text-[#ffffff] px-2 py-0.5 text-[10px] font-bold tracking-tight cursor-pointer hover:bg-black transition-colors"
                  title="Quick Tour Navigator"
                >
                  Tour{" "}
                  <Icon.chevron
                    size={10}
                    className={showTourDrawer ? "rotate-180" : ""}
                  />
                </button>
              </>
            )}

            {offline ? (
              <span className="flex items-center gap-1 text-[#e28a00] font-semibold text-[10px]">
                <Icon.wifiOff size={11} />
                OFF
              </span>
            ) : (
              <span className="text-[#00875a] font-semibold text-[10.5px]">
                5G
              </span>
            )}
            <span className="text-[#75758a] text-[10.5px]">86%</span>
          </div>
        </header>

        {!isLoggedIn ? (
          <AuthScreen lang={lang} onAuthenticated={handleUserAuthenticated} />
        ) : (
          <>
            {/* Quick Tour Drawer Dropdown */}
            {showTourDrawer && (
              <div className="absolute inset-x-0 top-[45px] z-50 border-b border-[#e5e7eb] bg-[#ffffff]/98 p-4 shadow-xl backdrop-blur-md animate-fade-up">
                <div className="flex items-center justify-between pb-2 border-b border-[#f2f2f2]">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#17171c]">
                    Quick Screen Navigator
                  </span>
                  <button
                    onClick={() => setShowTourDrawer(false)}
                    className="text-[12px] font-bold text-[#75758a] hover:text-[#17171c] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {ALL_STEPS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        playTone("tap")
                        store.go(s.id)
                        setShowTourDrawer(false)
                      }}
                      className={`flex flex-col items-start rounded-xl border p-2 text-left transition-all cursor-pointer ${
                        step === s.id
                          ? "border-[#17171c] bg-[#17171c] text-[#ffffff]"
                          : "border-[#e5e7eb] bg-[#f7f6f3] text-[#17171c] hover:border-[#d9d9dd]"
                      }`}
                    >
                      <span className="text-[11.5px] font-bold">{s.label}</span>
                      <span
                        className={`font-mono text-[9px] ${
                          step === s.id ? "text-white/70" : "text-[#75758a]"
                        }`}
                      >
                        {s.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Chrome Bar */}
            {showChrome && (
              <div className="flex shrink-0 items-center justify-between px-4 py-3 border-b border-[#e5e7eb] bg-[#ffffff]/95 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleBack}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d9d9dd] text-[#616161] transition-colors hover:border-[#17171c] hover:text-[#17171c] cursor-pointer"
                    aria-label="Go back"
                  >
                    <Icon.arrowLeft size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    <VisibleMark size={20} />
                    <span className="font-display text-[16px] font-bold tracking-tight text-[#17171c]">
                      Visible
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {offline && (
                    <span className="flex items-center gap-1 rounded-full bg-[#fef3c7] border border-[#fde68a] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#b45309]">
                      <Icon.wifiOff size={10} /> OFFLINE
                    </span>
                  )}
                  <LangToggle lang={lang} onChange={(l) => store.setLang(l)} />
                  {canOpenPrivacy && (
                    <button
                      onClick={() => {
                        playTone("tap")
                        store.go("privacy")
                      }}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                        step === "privacy"
                          ? "border-[#17171c] bg-[#17171c] text-[#ffffff]"
                          : "border-[#d9d9dd] text-[#616161] hover:border-[#17171c] hover:text-[#17171c]"
                      }`}
                      aria-label="Privacy Settings"
                    >
                      <Icon.lock size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Progress Rail (Cohere Near-Black Pill Track) */}
            {mainIdx >= 0 && step !== "welcome" && (
              <div className="flex shrink-0 gap-1.5 px-5 pt-2.5 pb-1.5 bg-[#ffffff]">
                {MAIN.slice(1).map((st, i) => {
                  const isCompleted = i <= mainIdx - 1
                  const isCurrent = i === mainIdx - 1
                  return (
                    <button
                      key={st}
                      onClick={() => {
                        if (isCompleted || isCurrent) {
                          playTone("tap")
                          store.go(st)
                        }
                      }}
                      disabled={!isCompleted && !isCurrent}
                      className="h-1 flex-1 rounded-full transition-all duration-300 cursor-pointer disabled:cursor-default"
                      style={{
                        background: isCompleted
                          ? "#17171c"
                          : isCurrent
                            ? "#75758a"
                            : "#e5e7eb",
                      }}
                      title={`Step: ${st}`}
                    />
                  )
                })}
              </div>
            )}

            {/* Active Mobile Screen Viewport */}
            <main className="relative flex-1 overflow-hidden bg-[#ffffff] text-[#212121]">
              {screen}
            </main>

            {/* Home Indicator */}
            <div className="hidden md:block w-32 h-1 rounded-full bg-[#17171c]/20 mx-auto my-1.5 shrink-0 select-none pointer-events-none" />
          </>
        )}
      </div>

      {/* Desktop Executive Companion Station (Fills Widescreen Space Seamlessly) */}
      <DesktopCompanionPanel
        store={store}
        currentUser={currentUser}
        step={step}
        onSwitchPersona={(pId) => {
          if (pId in personas) {
            handleUserAuthenticated(personas[pId])
          }
        }}
      />
    </div>
  )
}

function DesktopCompanionPanel({
  store,
  currentUser,
  step,
  onSwitchPersona,
}: {
  store: Store
  currentUser: Persona
  step: Step
  onSwitchPersona: (id: string) => void
}) {
  const [sanctioned, setSanctioned] = useState(false)
  const worker = currentUser?.platforms ? currentUser : personas.anjali
  const connectedPlats = (worker.platforms || []).filter((p) =>
    (store.connected || []).includes(p.id),
  )
  const total =
    connectedPlats.reduce((a, b) => a + (b.monthly || 0), 0) ||
    worker.document ||
    30400

  const handleSanction = () => {
    playTone("success")
    setSanctioned(true)
    setTimeout(() => setSanctioned(false), 5000)
  }

  return (
    <aside className="hidden xl:flex flex-col w-[480px] h-[92vh] max-h-[900px] rounded-[32px] bg-[#14171f] text-white p-6 border border-white/10 shadow-2xl overflow-y-auto space-y-4 shrink-0 animate-fade">
      {/* Station Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#ff9a3c]">
            <span className="h-2 w-2 rounded-full bg-[#00875a] animate-ping" />
            <span>Companion Workstation</span>
          </div>
          <h2 className="text-base font-bold text-white font-display mt-0.5">
            Lender Underwriting Live Console
          </h2>
        </div>
        <Pill tone="pale-green">
          <Icon.shield size={11} /> Bank Portal
        </Pill>
      </div>

      {/* Live Ingested Profile Dossier */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white font-bold text-sm">
              {(worker.name || "U").charAt(0)}
            </div>
            <div>
              <div className="text-[13px] font-bold text-white">
                {worker.name || "Gig Worker"}
              </div>
              <div className="text-[11px] text-white/60 font-mono">
                {worker.idCode || "VIS-2K9F"} ·{" "}
                {(worker.city || "Pune").split(",")[0]}
              </div>
            </div>
          </div>
          <span className="rounded-full bg-[#00875a]/20 border border-[#00875a]/40 text-[#4fd1a1] px-2.5 py-0.5 text-[10px] font-mono font-semibold">
            VERIFIED PASSPORT
          </span>
        </div>

        {/* Financial Aggregation Metrics */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
          <div className="rounded-xl bg-black/30 p-2.5 border border-white/5">
            <div className="text-[10px] font-mono text-white/50 uppercase">
              Unified Monthly Income
            </div>
            <div className="text-lg font-bold text-white font-display mt-0.5">
              {inr(total)}
            </div>
            <div className="text-[10px] text-[#4fd1a1] font-mono mt-0.5">
              ✓ {connectedPlats.length} streams verified
            </div>
          </div>
          <div className="rounded-xl bg-black/30 p-2.5 border border-white/5">
            <div className="text-[10px] font-mono text-white/50 uppercase">
              Credit Readiness Score
            </div>
            <div className="text-lg font-bold text-[#ff9a3c] font-display mt-0.5">
              {worker.readinessScore || 78}/100
            </div>
            <div className="text-[10px] text-white/60 font-mono mt-0.5">
              Low Default Risk
            </div>
          </div>
        </div>

        {/* 3-Source Reconciliation Status */}
        <div className="rounded-xl bg-black/20 p-2.5 border border-white/5 space-y-1.5 text-[11px] font-mono">
          <div className="text-white/50 uppercase text-[9.5px]">
            Triangulated Consistency
          </div>
          <div className="flex justify-between text-white/80">
            <span>• Worker Declared:</span>
            <span className="text-white font-semibold">
              {inr(worker.claimed || total)}
            </span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>• Bank AA Stream:</span>
            <span className="text-[#4fd1a1] font-semibold">
              {inr(worker.aa || total)}
            </span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>• OCR Statement:</span>
            <span className="text-[#4fd1a1] font-semibold">
              {inr(worker.document || total)}
            </span>
          </div>
        </div>

        {/* 1-Click Loan Sanction Action */}
        <button
          onClick={handleSanction}
          className={`w-full py-2.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer shadow-md ${
            sanctioned
              ? "bg-[#00875a] text-white"
              : "bg-[#ff7759] text-white hover:bg-[#ff6240]"
          }`}
        >
          {sanctioned
            ? "✓ Instant Loan Sanctioned (₹1,50,000 @ 11.2% p.a.)"
            : "Issue Instant Pre-Approved Sanction Letter"}
        </button>
      </div>

      {/* Live System & Hardware Telemetry */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
          <span className="flex items-center gap-1.5">
            <Icon.cpu size={13} className="text-[#4fd1a1]" /> Qualcomm NPU INT8
          </span>
          <span className="text-[#4fd1a1] font-semibold">12.4ms · ACTIVE</span>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
          <span className="flex items-center gap-1.5">
            <Icon.database size={13} className="text-[#6fa8ff]" /> Neon
            PostgreSQL
          </span>
          <span className="text-[#6fa8ff] font-semibold">CONNECTED</span>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
          <span className="flex items-center gap-1.5">
            <Icon.send size={13} className="text-[#ff9a3c]" /> P2P Wi-Fi Direct
          </span>
          <span className="text-white/60 font-semibold">AES-256 MESH</span>
        </div>
      </div>

      {/* Evaluator Quick Persona Switcher */}
      <div className="border-t border-white/10 pt-3">
        <div className="text-[10.5px] font-mono text-white/50 uppercase mb-2">
          Switch Demo Persona
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "anjali", name: "Anjali", role: "🛵 Pune", amount: "₹30.4k" },
            {
              id: "ramesh",
              name: "Ramesh",
              role: "🚕 Delhi",
              amount: "₹42.0k",
            },
            {
              id: "sunita",
              name: "Sunita",
              role: "🔧 Mumbai",
              amount: "₹24.5k",
            },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => {
                playTone("tap")
                onSwitchPersona(p.id)
              }}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                worker.id === p.id
                  ? "bg-white/15 border-[#ff7759] text-white font-bold"
                  : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              <div className="text-[11.5px] font-semibold truncate">
                {p.name}
              </div>
              <div className="text-[9.5px] text-white/50">{p.role}</div>
              <div className="text-[10.5px] font-mono text-[#ff9a3c] mt-0.5">
                {p.amount}
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

function LangToggle({
  lang,
  onChange,
}: {
  lang: Lang
  onChange: (l: Lang) => void
}) {
  return (
    <div className="flex overflow-hidden rounded-full border border-[#d9d9dd] text-[11px] font-medium bg-[#ffffff]">
      {(["en", "hi"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => {
            playTone("tap")
            onChange(l)
          }}
          className={`px-2.5 py-1 transition-colors cursor-pointer ${
            lang === l
              ? "bg-[#17171c] text-[#ffffff] font-semibold"
              : "text-[#616161] hover:text-[#17171c]"
          } ${l === "hi" ? "font-hindi" : ""}`}
        >
          {l === "en" ? "EN" : "हिं"}
        </button>
      ))}
    </div>
  )
}

function VisibleMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className="shrink-0"
    >
      <circle cx="16" cy="16" r="14" stroke="#17171c" strokeWidth="1.5" />
      <path
        d="M4 16c3-6 21-6 24 0-3 6-21 6-24 0z"
        stroke="#ff7759"
        strokeWidth="1.8"
      />
      <circle cx="16" cy="16" r="3.4" fill="#003c33" />
    </svg>
  )
}
