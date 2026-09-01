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
    <div className="grain relative flex min-h-dvh w-full justify-center bg-ink text-fg overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 10%, rgba(255,154,60,0.14), transparent 70%), radial-gradient(50% 50% at 50% 90%, rgba(79,209,161,0.10), transparent 70%)",
        }}
      />

      {/* Pure Mobile App Viewport */}
      <div className="relative z-10 flex min-h-dvh h-dvh w-full max-w-md flex-col bg-ink-2 shadow-2xl overflow-hidden border-x border-hair/30">
        {/* Mobile Status Bar */}
        <header className="relative flex shrink-0 items-center justify-between px-5 pt-3 pb-1 text-[12px] text-fg-dim select-none">
          <span className="font-mono text-[12px] font-semibold text-fg">
            14:20
          </span>

          {/* Persona selector badge in status bar */}
          <div className="flex items-center gap-1 rounded-full bg-panel-2 border border-hair px-2 py-0.5 shadow-xs">
            <span className="text-[10px] font-mono text-fg-faint">
              PROFILE:
            </span>
            <select
              value={activePersonaId}
              onChange={(e) => handlePersonaSwitch(e.target.value)}
              className="bg-transparent text-[11px] font-bold text-saffron outline-none cursor-pointer"
              aria-label="Select Persona"
            >
              {Object.values(personas).map((p) => (
                <option key={p.id} value={p.id} className="bg-ink text-fg">
                  {p.name.split(" ")[0]} ({p.city.split(",")[0]})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            {offline ? (
              <span className="flex items-center gap-1 text-warn font-semibold">
                <Icon.wifiOff size={12} />
                OFFLINE
              </span>
            ) : (
              <span className="text-verify font-semibold">5G</span>
            )}
            <span>86%</span>
          </div>
        </header>

        {/* Navigation Chrome Bar */}
        {showChrome && (
          <div className="flex shrink-0 items-center justify-between px-4 py-2.5 border-b border-hair/40 bg-ink-2/90 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <button
                onClick={handleBack}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-hair text-fg-dim transition-colors hover:border-fg-dim hover:text-fg cursor-pointer"
                aria-label="Go back"
              >
                <Icon.arrowLeft size={16} />
              </button>
              <div className="flex items-center gap-1.5">
                <VisibleMark size={20} />
                <span className="font-display text-[15px] font-bold tracking-tight text-fg">
                  Visible
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {offline && (
                <span className="flex items-center gap-1 rounded-full bg-warn/15 px-2 py-0.5 font-mono text-[9px] font-bold text-warn">
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
                      ? "border-saffron bg-saffron/15 text-saffron"
                      : "border-hair text-fg-dim hover:border-saffron/50 hover:text-saffron"
                  }`}
                  aria-label="Privacy Settings"
                >
                  <Icon.lock size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Progress Rail */}
        {mainIdx >= 0 && step !== "welcome" && (
          <div className="flex shrink-0 gap-1.5 px-5 pt-2 pb-1 bg-ink-2">
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
                  className="h-1.5 flex-1 rounded-full transition-all duration-300 cursor-pointer disabled:cursor-default"
                  style={{
                    background: isCompleted
                      ? "var(--color-saffron)"
                      : isCurrent
                        ? "var(--color-saffron-soft)"
                        : "rgba(255,255,255,0.08)",
                  }}
                  title={`Step: ${st}`}
                />
              )
            })}
          </div>
        )}

        {/* Active Mobile Screen Container */}
        <main className="relative flex-1 overflow-hidden">{screen}</main>
      </div>
    </div>
  )
}

function LangToggle({ lang, onChange }: { lang: Lang onChange: (l) => void }) {
  return (
    <div className="flex overflow-hidden rounded-full border border-hair text-[11px] font-medium">
      {(["en", "hi"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => {
            playTone("tap")
            onChange(l)
          }}
          className={`px-2.5 py-1 transition-colors cursor-pointer ${
            lang === l
              ? "bg-saffron text-ink font-semibold"
              : "text-fg-dim hover:text-fg"
          } ${l === "hi" ? "font-hindi" : ""}`}
        >
          {l === "en" ? "EN" : "हिं"}
        </button>
      ))}
    </div>
  )
}

function VisibleMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className="shrink-0"
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="var(--color-hair-strong)"
        strokeWidth="1.5"
      />
      <path
        d="M4 16c3-6 21-6 24 0-3 6-21 6-24 0z"
        stroke="var(--color-saffron)"
        strokeWidth="1.6"
      />
      <circle cx="16" cy="16" r="3.4" fill="var(--color-verify)" />
    </svg>
  )
}
