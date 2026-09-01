import { useMemo, useState } from "react"
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
import { Lang, personas, playTone, stopSpeaking } from "./lib/data"
import type { Step, Store } from "./lib/store"

const MAIN: Step[] = [
  "welcome",
  "consent",
  "connect",
  "analysis",
  "verify",
  "profile",
]

export default function App() {
  const [activePersonaId, setActivePersonaId] = useState<string>("anjali")
  const [lang, setLangRaw] = useState<Lang>("en")
  const [step, setStep] = useState<Step>("welcome")
  const [connected, setConnected] = useState<string[]>([
    "swiggy",
    "ola",
    "rapido",
  ])
  const [analysed, setAnalysed] = useState(false)
  const [verified, setVerified] = useState(false)
  const [profileReady, setProfileReady] = useState(false)
  const [offline, setOffline] = useState(false)
  const [consentActive, setConsentActive] = useState(true)
  const [dataDeleted, setDataDeleted] = useState(false)
  const [narrate, setNarrate] = useState(false)
  const [beamedLender, setBeamedLender] = useState<string | null>(null)

  const handlePersonaSwitch = (pId: string) => {
    playTone("tap")
    setActivePersonaId(pId)
    const targetWorker = personas[pId]
    if (targetWorker) {
      setConnected(
        targetWorker.platforms.filter((p) => p.monthly > 0).map((p) => p.id),
      )
    }
  }

  const store: Store = useMemo(
    () => ({
      personaId: activePersonaId,
      setPersonaId: handlePersonaSwitch,
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
      connect: (id) => setConnected((c) => (c.includes(id) ? c : [...c, id])),
      disconnect: (id) => setConnected((c) => c.filter((x) => x !== id)),
      analysed,
      setAnalysed,
      verified,
      setVerified,
      profileReady,
      setProfileReady,
      offline,
      setOffline,
      consentActive,
      revokeConsent: () => {
        setConsentActive(false)
        setConnected([])
      },
      reactivateConsent: () => {
        setConsentActive(true)
        setConnected(["swiggy", "ola", "rapido"])
      },
      dataDeleted,
      deleteData: () => setDataDeleted(true),
      restoreData: () => {
        setDataDeleted(false)
        setConnected(["swiggy", "ola", "rapido"])
        setAnalysed(true)
        setVerified(true)
        setProfileReady(true)
      },
      narrate,
      setNarrate,
      beamedLender,
      setBeamedLender,
    }),
    [
      activePersonaId,
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
    <div className="relative flex min-h-dvh w-full justify-center bg-[#f7f6f3] text-[#212121] overflow-hidden">
      {/* Pure Mobile Viewport Container */}
      <div className="relative z-10 flex min-h-dvh h-dvh w-full max-w-md flex-col bg-[#ffffff] shadow-[0_4px_32px_rgba(0,0,0,0.06)] overflow-hidden border-x border-[#e5e7eb]">
        {/* Mobile Status Bar (Cohere 2026 Minimalist Precision) */}
        <header className="relative flex shrink-0 items-center justify-between px-5 pt-3.5 pb-2 text-[12px] text-[#616161] select-none border-b border-[#f2f2f2]">
          <span className="font-mono text-[12px] font-semibold text-[#17171c]">
            14:20
          </span>

          {/* Persona selector badge in status bar */}
          <div className="flex items-center gap-1.5 rounded-full bg-[#eeece7] border border-[#d9d9dd] px-2.5 py-0.5 shadow-xs">
            <span className="text-[10px] font-mono text-[#75758a] uppercase tracking-wider">
              Profile:
            </span>
            <select
              value={activePersonaId}
              onChange={(e) => handlePersonaSwitch(e.target.value)}
              className="bg-transparent text-[11px] font-semibold text-[#17171c] outline-none cursor-pointer"
              aria-label="Select Persona"
            >
              {Object.values(personas).map((p) => (
                <option
                  key={p.id}
                  value={p.id}
                  className="bg-[#ffffff] text-[#17171c]"
                >
                  {p.name.split(" ")[0]} ({p.city.split(",")[0]})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            {offline ? (
              <span className="flex items-center gap-1 text-[#e28a00] font-semibold">
                <Icon.wifiOff size={12} />
                OFFLINE
              </span>
            ) : (
              <span className="text-[#00875a] font-semibold">5G</span>
            )}
            <span className="text-[#75758a]">86%</span>
          </div>
        </header>

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
