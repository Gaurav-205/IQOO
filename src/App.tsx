import { useMemo, useState } from "react"
import { Button, Icon, Pill } from "./components/ui"
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
import {
  Lang,
  inr,
  lenders,
  playTone,
  ratings,
  stopSpeaking,
  verification,
  worker,
} from "./lib/data"
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
  const [officerApproved, setOfficerApproved] = useState(false)
  const [showDesktopStation, setShowDesktopStation] = useState(true)
  const [showAnnouncement, setShowAnnouncement] = useState(true)

  const store: Store = useMemo(
    () => ({
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

  const currentLender = lenders.find((l) => l.id === beamedLender) ?? lenders[0]

  return (
    <div className="grain relative flex min-h-screen w-full flex-col items-center justify-between overflow-x-hidden bg-ink text-fg">
      {/* ── COHERE SPEC: ANNOUNCEMENT BAR (Height 36px, Black, Microcopy) ── */}
      {showAnnouncement && (
        <div className="relative z-30 flex h-9 w-full items-center justify-between border-b border-hair-strong bg-cohere-black px-4 font-mono text-[11px] text-fg-dim">
          <div className="mx-auto flex items-center gap-2 text-center">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-saffron animate-pulse" />
            <span>
              On-Device Qualcomm NPU Inference · Zero-Cloud Storage · RBI
              Account Aggregator Gateway
            </span>
            <button
              onClick={() => {
                playTone("tap")
                store.go("consent")
              }}
              className="ml-2 font-semibold text-saffron underline hover:text-saffron-soft cursor-pointer"
            >
              Learn more
            </button>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="text-fg-faint hover:text-fg text-xs px-2 cursor-pointer"
            aria-label="Close announcement bar"
          >
            ✕
          </button>
        </div>
      )}

      {/* Ambient background aura */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 30% 10%, rgba(255,154,60,0.12), transparent 70%), radial-gradient(50% 50% at 85% 90%, rgba(79,209,161,0.10), transparent 70%)",
        }}
      />

      {/* Main Workspace Layout (Phone + Optional Companion Desktop Station) */}
      <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center gap-8 p-0 sm:p-6 lg:flex-row lg:items-center lg:p-10">
        {/* ── PHONE CONTAINER ───────────────────────────── */}
        <div className="flex w-full flex-col items-center sm:w-auto">
          <div
            className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-ink-2 sm:h-[780px] sm:w-[390px] sm:max-h-[calc(100vh-4.5rem)] sm:rounded-[2.8rem] sm:border sm:border-hair-strong sm:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)]"
            style={{
              boxShadow:
                "0 0 0 10px #06090f, 0 40px 120px -30px rgba(0,0,0,0.9)",
            }}
          >
            {/* Status bar */}
            <div className="relative flex items-center justify-between px-6 pt-3 sm:pt-4 text-[12px] text-fg-dim select-none">
              <span className="font-mono text-[11px] font-medium">14:20</span>
              {/* Dynamic Island / Notch */}
              <div className="absolute left-1/2 top-2 sm:top-2.5 flex h-5 sm:h-6 w-24 -translate-x-1/2 items-center justify-center rounded-full bg-[#05070c] border border-hair/30">
                <span className="h-2 w-2 rounded-full bg-verify/40 animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
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
            </div>

            {/* Chrome Bar */}
            {showChrome && (
              <div className="flex items-center justify-between px-5 py-3 border-b border-hair/40">
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
                    <span className="font-display text-[14px] font-bold tracking-tight text-fg">
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

            {/* Progress rail */}
            {mainIdx >= 0 && step !== "welcome" && (
              <div className="flex gap-1.5 px-6 pt-2 pb-1">
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

            {/* Active Screen */}
            <main className="relative flex-1 overflow-hidden">{screen}</main>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[11px] text-fg-faint lg:hidden p-2">
            <button
              onClick={() => {
                playTone("tap")
                setShowDesktopStation(!showDesktopStation)
              }}
              className="text-saffron underline hover:text-saffron-soft cursor-pointer font-medium"
            >
              {showDesktopStation
                ? "Hide Loan Officer Desk"
                : "View Loan Officer Desk (Office Kit)"}
            </button>
          </div>
        </div>

        {/* ── DESKTOP COMPANION: LOAN OFFICER WORKSTATION (Office Kit) ─────────────── */}
        {showDesktopStation && (
          <aside className="w-full max-w-[500px] px-3 sm:px-0 lg:w-[460px] animate-fade-up">
            <div className="rounded-3xl border border-hair-strong bg-panel/90 backdrop-blur-md p-5 shadow-2xl">
              {/* Laptop Header */}
              <div className="flex items-center justify-between border-b border-hair pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] font-semibold text-fg-dim">
                    iQOO Office Kit · Lender Desk
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {beamedLender ? (
                    <Pill tone="verify">
                      <span className="h-1.5 w-1.5 rounded-full bg-verify animate-pulse" />{" "}
                      LIVE STREAM
                    </Pill>
                  ) : (
                    <Pill tone="dim">AWAITING BEAM</Pill>
                  )}
                </div>
              </div>

              {/* Station Body */}
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[12px] font-mono text-fg-faint">
                      BRANCH WORKSTATION
                    </div>
                    <div className="text-[15px] font-bold text-fg">
                      {currentLender.name}
                    </div>
                    <div className="text-[12px] text-fg-dim">
                      Officer: {currentLender.officer} ({currentLender.branch})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-fg-faint">
                      SECURE PROTOCOL
                    </div>
                    <div className="text-[11px] font-mono text-saffron">
                      Wi-Fi Direct P2P
                    </div>
                  </div>
                </div>

                {beamedLender ? (
                  <div className="space-y-3 rounded-2xl border border-verify/30 bg-verify/5 p-4 animate-fade-up">
                    <div className="flex items-center justify-between border-b border-hair/50 pb-2">
                      <div className="flex items-center gap-2">
                        <Icon.badge size={16} className="text-verify" />
                        <span className="text-[13px] font-bold text-fg">
                          {worker.name}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-fg-faint">
                        {worker.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="rounded-xl bg-panel-2 p-2.5">
                        <div className="text-fg-faint">
                          Verified Monthly Income
                        </div>
                        <div className="font-mono text-[14px] font-bold text-verify mt-0.5">
                          {inr(verification.document)}
                        </div>
                      </div>
                      <div className="rounded-xl bg-panel-2 p-2.5">
                        <div className="text-fg-faint">Data Sources</div>
                        <div className="font-mono text-[14px] font-bold text-fg mt-0.5">
                          3 Gig Apps (AA)
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-fg-faint">
                        Readiness Dimension Breakdown
                      </div>
                      {ratings.map((r) => (
                        <div
                          key={r.key}
                          className="flex items-center justify-between rounded-lg bg-panel-2/60 px-3 py-1.5 text-[11px]"
                        >
                          <span className="text-fg">{r.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-fg-dim">
                              {r.score}%
                            </span>
                            <span
                              className={`font-mono text-[10px] font-bold ${
                                r.level === "STRONG"
                                  ? "text-verify"
                                  : "text-warn"
                              }`}
                            >
                              {r.level}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-fg-faint pt-1">
                      <span>Consent Ref: CN-90D-A14</span>
                      <span className="text-verify font-mono">
                        NPU Verified (99.4%)
                      </span>
                    </div>

                    {officerApproved ? (
                      <div className="rounded-xl border border-verify bg-verify/15 p-3 text-center animate-scale-in">
                        <div className="flex items-center justify-center gap-1.5 text-verify font-bold text-[13px]">
                          <Icon.check size={16} /> Pre-Approved for ₹30,000
                          Micro-Credit
                        </div>
                        <div className="text-[10px] text-fg-dim mt-0.5">
                          Disbursement packet ready at 1.1%/month · Zero
                          Collateral
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          playTone("success")
                          setOfficerApproved(true)
                        }}
                        className="w-full rounded-xl bg-verify px-4 py-2.5 font-display text-[13px] font-bold text-ink transition-all hover:brightness-105 active:scale-[0.98] cursor-pointer"
                      >
                        Approve ₹30,000 Micro-Credit Loan
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-hair p-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-panel-2 text-fg-faint">
                      <Icon.device size={24} />
                    </div>
                    <div className="mt-3 text-[14px] font-semibold text-fg">
                      Waiting for Wireless Beam
                    </div>
                    <p className="mt-1 text-[12px] text-fg-dim max-w-[240px]">
                      Complete your profile on the phone and tap
                      &quot;Share&quot; to beam directly onto this desk.
                    </p>
                    <button
                      onClick={() => {
                        playTone("tap")
                        store.go("share")
                      }}
                      className="mt-4 text-[12px] font-medium text-saffron underline hover:text-saffron-soft cursor-pointer"
                    >
                      Jump to Share Screen
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* ── COHERE SPEC: TRUST LOGO STRIP (Monochrome Partner Marks) ── */}
      <footer className="relative z-10 hidden w-full max-w-5xl items-center justify-between border-t border-hair/50 px-6 py-4 font-mono text-[11px] text-fg-faint lg:flex">
        <div className="flex items-center gap-2">
          <VisibleMark size={16} />
          <span>Visible Fintech · On-Device Architecture</span>
        </div>
        <div className="flex items-center gap-6 opacity-70">
          <span>🛵 Swiggy</span>
          <span>🚗 Ola</span>
          <span>🏍️ Rapido</span>
          <span>⚡ Qualcomm NPU</span>
          <span>🖥️ Vivo Office Kit</span>
          <span>🔒 Setu AA</span>
        </div>
      </footer>
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
