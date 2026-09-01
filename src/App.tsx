import { useEffect, useMemo, useState } from "react"
import { Icon } from "./components/ui"
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
      if (cached) return JSON.parse(cached)
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
    <div className="relative flex min-h-dvh w-full items-center justify-center bg-[#eeece7] text-[#212121] p-0 md:py-8 overflow-x-hidden">
      {/* Real-World Production Live Telemetry Inspector */}
      <LiveSystemInspector
        isOpen={showInspector}
        onClose={() => setShowInspector(false)}
      />

      {/* Flagship Mobile Device Chassis Frame (Responsive on Desktop) */}
      <div className="relative w-full max-w-none md:max-w-[408px] h-dvh md:h-[854px] md:max-h-[94vh] bg-[#121316] md:p-3 md:rounded-[48px] md:border-[3.5px] md:border-[#2a2b33] md:shadow-[0_25px_70px_rgba(0,0,0,0.35),0_10px_25px_rgba(0,0,0,0.18)] md:ring-1 md:ring-white/15 flex flex-col justify-center">
        {/* Hardware Buttons on Device Chassis (Visible on desktop frame) */}
        <div className="hidden md:block absolute -left-[5.5px] top-28 w-[3.5px] h-12 bg-[#2c2d35] rounded-l-sm" />
        <div className="hidden md:block absolute -left-[5.5px] top-44 w-[3.5px] h-12 bg-[#2c2d35] rounded-l-sm" />
        <div className="hidden md:block absolute -right-[5.5px] top-32 w-[3.5px] h-16 bg-[#ff7759] rounded-r-sm" />

        {/* Top Earpiece Speaker Slit */}
        <div className="hidden md:block absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#232429] rounded-full z-40" />

        {/* Inner Phone Screen Display */}
        <div className="relative z-10 flex h-full w-full flex-col bg-[#ffffff] md:rounded-[38px] overflow-hidden border-x border-[#e5e7eb] md:border-0 shadow-inner">
          {/* Punch-hole Front Camera Lens */}
          <div className="hidden md:flex absolute top-2.5 left-1/2 -translate-x-1/2 z-40 h-3.5 w-3.5 rounded-full bg-[#050505] border border-[#232429] items-center justify-center pointer-events-none shadow-xs">
            <div className="h-1.5 w-1.5 rounded-full bg-[#0d1b2a]/90 ring-0.5 ring-blue-900/50" />
          </div>

          {/* Mobile Status Bar (Authentic Mobile System Status) */}
          <header className="relative flex shrink-0 items-center justify-between px-4 pt-3.5 pb-2 text-[12px] text-[#616161] select-none border-b border-[#f2f2f2]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] font-semibold text-[#17171c]">
                14:20
              </span>
              {/* Real-World Production Live System Badge */}
              <button
                onClick={() => {
                  playTone("tap")
                  setShowInspector(true)
                }}
                className="flex items-center gap-1.5 rounded-full bg-[#edfce9] text-[#00875a] border border-[#bbf7d0] px-2 py-0.5 text-[9.5px] font-mono font-bold cursor-pointer hover:bg-[#dcfce7] transition-all shadow-xs"
                title="Open Real-World Infrastructure Inspector"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00875a] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00875a]" />
                </span>
                <span>LIVE SYSTEM</span>
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
                        <span className="text-[11.5px] font-bold">
                          {s.label}
                        </span>
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
                    <LangToggle
                      lang={lang}
                      onChange={(l) => store.setLang(l)}
                    />
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
            </>
          )}
        </div>
      </div>
    </div>
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
