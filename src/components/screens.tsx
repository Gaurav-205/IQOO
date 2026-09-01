import { useEffect, useRef, useState } from "react"
import { Button, Card, Icon, Pill } from "./ui"
import {
  inr,
  lenders,
  loanOffers,
  personas,
  playTone,
  speakText,
  statementPresets,
  stopSpeaking,
} from "../lib/data"
import type { Store } from "../lib/store"

const levelTone = (lvl: string) =>
  (lvl === "STRONG"
    ? "verify"
    : lvl === "MODERATE"
      ? "warn"
      : "coral") as "verify" | "warn" | "coral"

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28px] text-[#75758a]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff7759]" />
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 1 · WELCOME
// ─────────────────────────────────────────────────────────────
export function Welcome({ s }: { s: Store }) {
  const hi = s.lang === "hi"
  const activeWorker = s.user || personas[s.personaId] || personas.anjali
  const chips = activeWorker.platforms.filter((p) => p.monthly > 0)
  const totalIncome = chips.reduce((a, b) => a + b.monthly, 0)

  return (
    <ScreenScroll>
      {/* Top Brand & Trust Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f2f2f2]">
        <Eyebrow>Visible · {hi ? "क्रेडिट प्रोफ़ाइल" : "Credit Readiness"}</Eyebrow>
        <Pill tone="pale-green">
          <Icon.shield size={11} />{" "}
          {hi ? "सुरक्षित व निजी" : "Private & On-Device"}
        </Pill>
      </div>

      {/* Hero Visual: Clean Financial Dossier Card */}
      <div className="mt-4 overflow-hidden rounded-2xl bg-[#14171f] p-5 text-[#ffffff] shadow-lg animate-fade-up">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#ff9a3c]">
            {hi ? "एकीकृत मासिक आय" : "Unified Monthly Income"}
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] text-white/80">
            {activeWorker.idCode}
          </span>
        </div>

        {/* Primary Amount */}
        <div className="my-4">
          <div className="font-display text-4xl font-bold tracking-tight text-[#ffffff]">
            {inr(totalIncome || activeWorker.document)}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[12.5px] text-white/70">
            <span className="h-2 w-2 rounded-full bg-[#00875a]" />
            <span>
              {chips.length}{" "}
              {hi ? "प्लेटफ़ॉर्म से सत्यापित कमाई" : "Platforms Linked & Verified"}
            </span>
          </div>
        </div>

        {/* Platform Breakdown Tiles */}
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
          {chips.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="rounded-xl bg-white/5 p-2.5 border border-white/5"
            >
              <div className="flex items-center gap-1 text-[11px] text-white/80 font-medium">
                <span>{p.glyph}</span>
                <span className="truncate">{p.name}</span>
              </div>
              <div className="mt-1 font-mono text-[12px] font-bold text-[#ff9a3c]">
                {inr(p.monthly)}
              </div>
            </div>
          ))}
        </div>

        {/* Security Seal */}
        <div className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-2.5 text-[10.5px] font-mono text-white/60">
          <span className="flex items-center gap-1">
            <Icon.lock size={11} className="text-[#00875a]" />{" "}
            {hi ? "ज़ीरो-क्लाउड स्टोरेज" : "Zero-Cloud Storage"}
          </span>
          <span>{hi ? "RBI AA स्वीकृत" : "RBI AA Compliant"}</span>
        </div>
      </div>

      {/* Editorial Headline */}
      <div className="mt-6 space-y-2">
        <h1
          className={`text-[23px] font-bold leading-tight tracking-tight text-[#17171c] ${
            hi ? "font-hindi" : "font-display"
          }`}
        >
          {hi ? (
            <>
              आपकी कमाई पहले से मौजूद है।
              <br />
              <span className="text-[#ff7759]">बस अब तक बिखरी हुई थी।</span>
            </>
          ) : (
            <>
              Your income already exists.
              <br />
              <span className="text-[#ff7759]">It was just scattered.</span>
            </>
          )}
        </h1>
        <p
          className={`text-[13px] leading-relaxed text-[#616161] ${
            hi ? "font-hindi" : ""
          }`}
        >
          {hi
            ? "Visible आपकी अलग-अलग डिलीवरी और राइड ऐप्स की कमाई को एक प्रामाणिक क्रेडिट प्रोफ़ाइल में जोड़ता है ताकि आप बैंक लोन और क्रेडिट पा सकें।"
            : "Visible unifies your gig earnings across delivery and ride apps into a bank-ready credit profile for microfinance loans without paperwork."}
        </p>
      </div>

      {/* 3 Core Trust Pillars */}
      <div className="mt-5 space-y-2">
        {[
          {
            icon: Icon.database,
            title: hi
              ? "बिना किसी कागजी कार्रवाई के"
              : "100% Paperless Connection",
            desc: hi
              ? "Account Aggregator से सीधे बैंक स्टेटमेंट सत्यापन।"
              : "Direct automated verification via RBI Account Aggregator.",
          },
          {
            icon: Icon.shield,
            title: hi ? "निजी और गोपनीय" : "Strict On-Device Privacy",
            desc: hi
              ? "आपकी कमाई का डेटा कभी आपके फोन से बाहर नहीं जाता।"
              : "Your financial records stay encrypted on your device.",
          },
          {
            icon: Icon.send,
            title: hi
              ? "लोन अधिकारियों को तुरंत शेयर करें"
              : "Direct Wireless Sharing",
            desc: hi
              ? "सत्यापित क्रेडिट रिपोर्ट बैंक लोन अधिकारी को सीधे भेजें।"
              : "Beam tamper-proof credit dossier directly to branch desks.",
          },
        ].map((item, idx) => {
          const I = item.icon
          return (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-[#f7f6f3] p-3 text-left"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffffff] border border-[#d9d9dd] text-[#17171c]">
                <I size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold text-[#17171c]">
                  {item.title}
                </div>
                <div className="text-[11px] text-[#616161]">{item.desc}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-6 space-y-2.5 pb-6">
        <Button
          full
          onClick={() => {
            playTone("tap")
            s.next()
          }}
          variant="primary"
        >
          {hi ? "शुरू करें" : "Get started"} <Icon.chevron size={18} />
        </Button>
        <button
          onClick={() => {
            playTone("tap")
            s.setLang(hi ? "en" : "hi")
          }}
          className="w-full text-center text-[12.5px] text-[#75758a] transition-colors hover:text-[#17171c] underline underline-offset-4 cursor-pointer font-medium"
        >
          {hi ? "Switch to English" : "हिंदी में देखें (Hindi)"}
        </button>
      </div>
    </ScreenScroll>
  )
}

// ─────────────────────────────────────────────────────────────
// 2 · CONSENT
// ─────────────────────────────────────────────────────────────
export function Consent({ s }: { s: Store }) {
  const hi = s.lang === "hi"
  const [agreed, setAgreed] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    return () => {
      stopSpeaking()
    }
  }, [])

  const items = [
    {
      icon: Icon.database,
      en: [
        "Your gig-platform income",
        "Payout amounts and dates from connected apps — used to measure how steady your earnings are.",
      ],
      hi: [
        "आपकी gig-platform कमाई",
        "जुड़े हुए apps से payout की रकम और तारीख़ — यह देखने के लिए कि कमाई कितनी स्थिर है।",
      ],
      tag: "Read-Only",
    },
    {
      icon: Icon.cpu,
      en: [
        "On-device Qualcomm NPU",
        "Access expires automatically in 90 days. Raw financial data never leaves your phone.",
      ],
      hi: [
        "फ़ोन पर सुरक्षित NPU प्रोसेसिंग",
        "पहुँच 90 दिन में अपने-आप समाप्त हो जाती है। raw data कभी server पर नहीं जाता।",
      ],
      tag: "Private",
    },
    {
      icon: Icon.send,
      en: [
        "Shared only with chosen lender",
        "Your profile is beamed only when you explicitly tap share — never sold or distributed.",
      ],
      hi: [
        "सिर्फ़ आपके चुने lender के साथ",
        "आपकी profile lender तक तभी जाती है जब आप ख़ुद share करें — अपने-आप कभी नहीं।",
      ],
      tag: "Consented",
    },
    {
      icon: Icon.lock,
      en: [
        "Revoke & delete anytime",
        "Withdraw consent and wipe on-device cached financial data in 1 tap from Privacy settings.",
      ],
      hi: [
        "कभी भी वापस लें व मिटाएं",
        "Privacy सेटिंग्स से कभी भी consent वापस लें और स्थानीय data तुरंत मिटाएं।",
      ],
      tag: "Revocable",
    },
  ]

  const toggleNarration = () => {
    if (speaking) {
      stopSpeaking()
      setSpeaking(false)
      s.setNarrate(false)
    } else {
      const line = hi
        ? "आपकी सहमति ज़रूरी है। हम आपकी कमाई का data सिर्फ़ आपके फ़ोन पर, 90 दिन के लिए इस्तेमाल करते हैं। यह कभी server पर नहीं जाता।"
        : "Your consent is in your full control. We analyse your gig income privately on your device. Raw data never leaves your phone."
      s.setNarrate(true)
      setSpeaking(true)
      speakText(line, s.lang)
      setTimeout(() => setSpeaking(false), 6000)
    }
  }

  return (
    <ScreenScroll>
      <Header
        hi={hi}
        icon={<Icon.shield className="text-[#17171c]" />}
        en="Your consent, your control"
        hindi="आपकी सहमति, आपका नियंत्रण"
      />
      <p
        className={`mt-2 text-[13.5px] text-[#616161] ${
          hi ? "font-hindi" : ""
        }`}
      >
        {hi
          ? "share करने से पहले जानिए कि क्या access होगा और क्यों।"
          : "Transparent consent framework under RBI Account Aggregator guidelines."}
      </p>

      {/* Audio Explainer Banner */}
      <button
        onClick={toggleNarration}
        className={`mt-4 flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all cursor-pointer ${
          speaking
            ? "border-[#ff7759] bg-[#ff7759]/10 text-[#ff7759]"
            : "border-[#d9d9dd] bg-[#eeece7] text-[#17171c] hover:bg-[#e5e7eb]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffffff] border border-[#d9d9dd] text-[#ff7759]">
            <Icon.volume size={16} />
          </div>
          <span
            className={`text-[13.5px] font-semibold ${hi ? "font-hindi" : ""}`}
          >
            {speaking
              ? hi
                ? "आवाज़ चल रही है… (रोकने के लिए दबाएं)"
                : "Speaking audio… (tap to stop)"
              : hi
                ? "हिंदी में सुनें — सहमति क्या है"
                : "Listen to Voice Consent Briefing"}
          </span>
        </div>
        {speaking && (
          <span className="flex gap-1">
            <span className="h-3.5 w-1 animate-pulse rounded-full bg-[#ff7759]" />
            <span className="h-3.5 w-1 animate-pulse rounded-full bg-[#ff7759] delay-100" />
            <span className="h-3.5 w-1 animate-pulse rounded-full bg-[#ff7759] delay-200" />
          </span>
        )}
      </button>

      <div className="mt-4 space-y-2.5">
        {items.map((it, i) => {
          const [title, body] = hi ? it.hi : it.en
          const I = it.icon
          return (
            <Card
              key={i}
              className="animate-fade-up p-4 border border-[#e5e7eb] bg-[#ffffff] shadow-xs"
            >
              <div
                className="flex gap-3.5"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eeece7] border border-[#d9d9dd] text-[#17171c]">
                  <I size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div
                      className={`text-[14.5px] font-semibold text-[#17171c] ${
                        hi ? "font-hindi" : ""
                      }`}
                    >
                      {title}
                    </div>
                    <Pill tone="coral">{it.tag}</Pill>
                  </div>
                  <div
                    className={`mt-1 text-[13px] leading-relaxed text-[#616161] ${
                      hi ? "font-hindi" : ""
                    }`}
                  >
                    {body}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#d9d9dd] bg-[#eeece7] p-4 transition-colors hover:border-[#17171c]">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => {
            playTone("tap")
            setAgreed(e.target.checked)
          }}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#d9d9dd] accent-[#17171c] cursor-pointer"
        />
        <span
          className={`text-[12.5px] leading-relaxed text-[#212121] select-none ${
            hi ? "font-hindi" : ""
          }`}
        >
          {hi
            ? "मैं समझता/समझती हूँ और अपनी gig कमाई का data 90 दिन के लिए, इन शर्तों पर access करने की सहमति देता/देती हूँ।"
            : "I understand and consent to Visible aggregating my gig earnings for 90 days under these terms."}
        </span>
      </label>

      <FooterBar>
        <Button
          full
          disabled={!agreed}
          variant="primary"
          onClick={() => {
            playTone("success")
            s.next()
          }}
        >
          <Icon.check size={18} />{" "}
          {hi ? "सहमति दें और आगे बढ़ें" : "Give consent & continue"}
        </Button>
      </FooterBar>
    </ScreenScroll>
  )
}

// ─────────────────────────────────────────────────────────────
// 3 · CONNECT (Account Aggregator + OTP Gateway)
// ─────────────────────────────────────────────────────────────
export function Connect({ s }: { s: Store }) {
  const hi = s.lang === "hi"
  const activeWorker = s.user || personas[s.personaId] || personas.anjali
  const [activePlatformModal, setActivePlatformModal] =
    useState<typeof activeWorker.platforms[0] | null>(null)
  const [otpCode, setOtpCode] = useState("8924")
  const [otpVerifying, setOtpVerifying] = useState(false)
  const active = activeWorker.platforms.filter((p) => p.monthly > 0)
  const total = s.connected.reduce(
    (sum, id) =>
      sum + (activeWorker.platforms.find((p) => p.id === id)?.monthly ?? 0),
    0,
  )
  const allDone =
    active.length > 0 && active.every((p) => s.connected.includes(p.id))

  const handleOpenModal = (p: typeof activeWorker.platforms[0]) => {
    playTone("tap")
    setActivePlatformModal(p)
  }

  const handleVerifyOtp = () => {
    if (!activePlatformModal) return
    setOtpVerifying(true)
    playTone("scan")
    setTimeout(() => {
      s.connect(activePlatformModal.id)
      setOtpVerifying(false)
      setActivePlatformModal(null)
      playTone("success")
    }, 900)
  }

  const connectAll = async () => {
    playTone("scan")
    for (const p of active) {
      if (!s.connected.includes(p.id)) {
        await new Promise((r) => setTimeout(r, 250))
        s.connect(p.id)
      }
    }
    playTone("success")
  }

  return (
    <ScreenScroll>
      <Header
        hi={hi}
        icon={<Icon.link className="text-saffron" />}
        en="Connect your income"
        hindi="अपनी कमाई जोड़ें"
      />
      <p className={`mt-2 text-[14px] text-fg-dim ${hi ? "font-hindi" : ""}`}>
        {hi
          ? "Account Aggregator के ज़रिए सुरक्षित रूप से जुड़ें। हर जगह की कमाई एक हो जाएगी।"
          : "Securely link gig streams via Account Aggregator. Every platform combines into one picture."}
      </p>

      {/* Running Unified Total */}
      <div className="mt-5 overflow-hidden rounded-3xl border border-[#d9d9dd] bg-[#eeece7] p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <Eyebrow>
            {hi ? "इस महीने की एकीकृत कमाई" : "Unified income this month"}
          </Eyebrow>
          {!allDone && (
            <button
              onClick={connectAll}
              className="text-[12px] font-bold text-[#17171c] hover:text-[#ff7759] underline underline-offset-4 cursor-pointer transition-colors"
            >
              {hi ? "सब जोड़ें" : "Link all"}
            </button>
          )}
        </div>
        <div className="mt-2 flex items-end gap-2">
          <span className="font-display text-4xl font-extrabold tabular-nums text-[#17171c] tracking-tight">
            {inr(total)}
          </span>
          <span className="mb-1 font-mono text-[11px] text-[#75758a]">
            {s.connected.length}/{active.length} {hi ? "जुड़े" : "linked"}
          </span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {active.map((p) => {
            const isConn = s.connected.includes(p.id)
            return (
              <div
                key={p.id}
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  background: isConn ? p.color : "#d9d9dd",
                  flexGrow: isConn ? p.monthly : 1,
                }}
              />
            )
          })}
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {activeWorker.platforms.map((p) => {
          const done = s.connected.includes(p.id)
          const disabled = p.monthly === 0
          return (
            <div
              key={p.id}
              className={`flex items-center gap-3.5 rounded-2xl border p-3.5 transition-all ${
                done
                  ? "border-[#c2eec0] bg-[#edfce9]/60 shadow-xs"
                  : "border-[#e5e7eb] bg-[#ffffff] shadow-xs"
              }`}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl shadow-inner border border-black/5"
                style={{ background: `${p.color}20` }}
              >
                {p.glyph}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-[#17171c]">
                    {p.name}
                  </span>
                  {done && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00875a] animate-pulse" />
                  )}
                </div>
                <div className="text-[12px] text-[#616161]">
                  {disabled
                    ? hi
                      ? "कोई कमाई नहीं मिली"
                      : "No active stream found"
                    : `${p.kind} · ${inr(p.monthly)}`}
                </div>
              </div>
              {done ? (
                <Pill tone="pale-green">
                  <Icon.check size={13} /> {hi ? "जुड़ा" : "Linked"}
                </Pill>
              ) : disabled ? (
                <span className="font-mono text-[11px] text-[#75758a]">—</span>
              ) : (
                <button
                  onClick={() => handleOpenModal(p)}
                  className="rounded-full border border-[#d9d9dd] bg-[#ffffff] px-3.5 py-1.5 text-[12.5px] font-medium text-[#17171c] transition-colors hover:border-[#17171c] cursor-pointer"
                >
                  {hi ? "जोड़ें" : "Link"}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <FooterBar>
        <Button
          full
          disabled={!allDone}
          variant="primary"
          onClick={() => {
            playTone("tap")
            s.next()
          }}
        >
          {hi ? "कमाई का विश्लेषण करें" : "Analyse my income"}{" "}
          <Icon.chevron size={18} />
        </Button>
      </FooterBar>

      {/* Account Aggregator OTP Simulation Modal */}
      {activePlatformModal && (
        <div
          className="absolute inset-0 z-30 flex items-end bg-black/50 backdrop-blur-xs p-4 animate-fade"
          onClick={() => setActivePlatformModal(null)}
        >
          <Card className="w-full animate-fade-up p-5 border-[#e5e7eb] bg-[#ffffff] shadow-2xl">
            <div onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-[#f2f2f2] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activePlatformModal.glyph}</span>
                  <span className="font-bold text-[#17171c] text-[16px]">
                    {activePlatformModal.name} AA Gateway
                  </span>
                </div>
                <Pill tone="coral">RBI AA SECURE</Pill>
              </div>

              <div className="mt-4 space-y-3">
                <div className="text-[13px] text-[#616161]">
                  Authenticate Account Aggregator consent for{" "}
                  {activeWorker.phone} to link monthly earnings (
                  {inr(activePlatformModal.monthly)}/mo).
                </div>

                <div className="rounded-2xl border border-[#d9d9dd] bg-[#eeece7] p-3">
                  <label className="font-mono text-[10px] text-[#75758a] uppercase tracking-wider">
                    Enter 4-Digit SMS OTP
                  </label>
                  <div className="mt-1 flex items-center justify-between">
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      maxLength={4}
                      className="bg-transparent font-mono text-xl font-bold tracking-widest text-saffron focus:outline-none w-32"
                    />
                    <span className="text-[11px] text-verify font-mono">
                      OTP AUTO-FILLED
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <Button
                  variant="soft"
                  onClick={() => setActivePlatformModal(null)}
                >
                  Cancel
                </Button>
                <Button onClick={handleVerifyOtp} disabled={otpVerifying}>
                  {otpVerifying ? "Authorizing…" : "Authorize Link"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </ScreenScroll>
  )
}

// ─────────────────────────────────────────────────────────────
// 4 · ANALYSIS (on-device NPU)
// ─────────────────────────────────────────────────────────────
export function Analysis({ s }: { s: Store }) {
  const hi = s.lang === "hi"
  const activeWorker = s.user || personas[s.personaId] || personas.anjali
  const [progress, setProgress] = useState(0)
  const done = s.analysed
  const steps = hi
    ? [
        "आय history पढ़ रहे हैं",
        "स्थिरता माप रहे हैं",
        "platform विविधता देख रहे हैं",
        "प्रोफ़ाइल तैयार कर रहे हैं",
      ]
    : [
        "Reading income history",
        "Measuring stability",
        "Scoring platform diversity",
        "Composing profile",
      ]

  useEffect(() => {
    if (done) {
      setProgress(100)
      return
    }
    let p = 0
    const iv = setInterval(() => {
      p += 4 + Math.random() * 5
      if (p >= 100) {
        p = 100
        clearInterval(iv)
        setTimeout(() => {
          s.setAnalysed(true)
          playTone("success")
        }, 300)
      }
      setProgress(p)
    }, 70)
    return () => clearInterval(iv)
  }, [done])

  if (!done) {
    const stepIdx = Math.min(
      steps.length - 1,
      Math.floor((progress / 100) * steps.length),
    )
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center bg-[#003c33] text-[#ffffff] animate-fade">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border border-white/20"
            style={{ animation: "v-pulse-ring 2s ease-out infinite" }}
          />
          <div
            className="absolute inset-3 rounded-full border border-white/10"
            style={{ animation: "v-pulse-ring 2s ease-out infinite 0.6s" }}
          />
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 shadow-inner text-[#ffffff] border border-white/25 backdrop-blur-md">
            <Icon.cpu size={36} className="animate-pulse" />
          </div>
        </div>
        <div className="mt-6 font-mono text-3xl font-bold tabular-nums text-[#ffffff]">
          {Math.round(progress)}%
        </div>
        <div
          className={`mt-2 text-[15px] font-medium text-white/90 ${
            hi ? "font-hindi" : ""
          }`}
        >
          {steps[stepIdx]}…
        </div>
        <div className="mt-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/90">
          <Icon.lock size={14} className="text-[#edfce9]" />
          <span
            className={`text-[12px] font-mono tracking-wide ${
              hi ? "font-hindi" : ""
            }`}
          >
            {hi
              ? "आपका data फ़ोन पर ही रहता है (Qualcomm NPU)"
              : "On-Device Qualcomm NPU · Zero Cloud Storage"}
          </span>
        </div>
      </div>
    )
  }

  const bestPt = activeWorker.history.reduce(
    (max, cur) => (cur.amount > max.amount ? cur : max),
    activeWorker.history[0],
  )
  const worstPt = activeWorker.history.reduce(
    (min, cur) => (cur.amount < min.amount ? cur : min),
    activeWorker.history[0],
  )

  return (
    <ScreenScroll>
      <Header
        hi={hi}
        icon={<Icon.chart className="text-saffron" />}
        en="Six months, understood"
        hindi="छह महीने, समझे हुए"
      />
      <div className="mt-1 flex items-center gap-2">
        <Pill tone="pale-green">
          <Icon.lock size={12} /> {hi ? "फ़ोन पर विश्लेषित" : "Analysed on-device"}
        </Pill>
        <Pill tone="coral">
          <Icon.cpu size={12} /> Qualcomm Hexagon NPU
        </Pill>
      </div>

      {/* Live NPU Hardware Telemetry Widget */}
      <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-[#f7f6f3] p-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-2.5">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-[#17171c]">
            <span className="h-2 w-2 rounded-full bg-[#00875a] animate-pulse" />
            <span>QUALCOMM NPU TELEMETRY</span>
          </div>
          <Pill tone="pale-green">INT8 ACCELERATED</Pill>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11.5px] font-mono">
          <div className="rounded-xl border border-[#d9d9dd] bg-[#ffffff] p-2.5">
            <span className="text-[#75758a] block text-[9.5px]">
              MODEL SIZE
            </span>
            <span className="font-bold text-[#17171c]">4.2 MB (Quantized)</span>
          </div>
          <div className="rounded-xl border border-[#d9d9dd] bg-[#ffffff] p-2.5">
            <span className="text-[#75758a] block text-[9.5px]">
              INFERENCE TIME
            </span>
            <span className="font-bold text-[#00875a]">12.4 ms / epoch</span>
          </div>
          <div className="rounded-xl border border-[#d9d9dd] bg-[#ffffff] p-2.5">
            <span className="text-[#75758a] block text-[9.5px]">
              DSP POWER DRAW
            </span>
            <span className="font-bold text-[#17171c]">0.18 W (Low Temp)</span>
          </div>
          <div className="rounded-xl border border-[#d9d9dd] bg-[#ffffff] p-2.5">
            <span className="text-[#75758a] block text-[9.5px]">
              CLOUD RETENTION
            </span>
            <span className="font-bold text-[#00875a]">0 KB (Isolated)</span>
          </div>
        </div>
      </div>

      <BarChart hi={hi} historyData={activeWorker.history} />

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <Stat
          label={hi ? "औसत मासिक" : "Avg monthly"}
          value={inr(activeWorker.avgMonthly)}
        />
        <Stat label={hi ? "रुझान" : "6-Mo Trend"} value="+7.4%" tone="verify" />
        <Stat
          label={hi ? "सबसे अच्छा" : "Best month"}
          value={`${hi ? bestPt.labelHi : bestPt.label}`}
          sub={inr(bestPt.amount)}
        />
        <Stat
          label={hi ? "सबसे कम" : "Lowest month"}
          value={`${hi ? worstPt.labelHi : worstPt.label}`}
          sub={inr(worstPt.amount)}
        />
        <Stat
          label={hi ? "platforms" : "Platforms"}
          value={String(
            activeWorker.platforms.filter((p) => p.monthly > 0).length,
          )}
        />
        <Stat
          label={hi ? "विश्लेषित महीने" : "Months analysed"}
          value={String(activeWorker.history.length)}
        />
      </div>

      <FooterBar>
        <Button
          full
          onClick={() => {
            playTone("tap")
            s.next()
          }}
        >
          {hi ? "कमाई सत्यापित करें" : "Verify my income"}{" "}
          <Icon.camera size={18} />
        </Button>
      </FooterBar>
    </ScreenScroll>
  )
}

function BarChart({
  hi,
  historyData,
}: {
  hi: boolean
  historyData: typeof personas.anjali.history
}) {
  const [shown, setShown] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string | null>("Sep")

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60)
    return () => clearTimeout(t)
  }, [])

  const max = Math.max(...historyData.map((h) => h.amount))
  const best = Math.max(...historyData.map((h) => h.amount))
  const activePt =
    historyData.find((h) => h.label === selectedMonth) ??
    historyData[historyData.length - 1]

  return (
    <Card className="mt-5 p-5">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#f2f2f2]">
        <div className="text-[12.5px] text-[#616161]">
          <span className="font-semibold text-[#17171c]">
            {hi ? activePt.labelHi : activePt.label} 2026
          </span>
          :{" "}
          <span className="font-mono text-[#ff7759] font-bold">
            {inr(activePt.amount)}
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#75758a] uppercase tracking-wider">
          {hi ? "विवरण देखें" : "Tap bar to inspect"}
        </span>
      </div>

      <div
        className="mt-4 flex items-end justify-between gap-2"
        style={{ height: 130 }}
      >
        {historyData.map((h, i) => {
          const pct = (h.amount / max) * 100
          const isBest = h.amount === best
          const isSelected = h.label === selectedMonth
          return (
            <button
              key={h.label}
              onClick={() => {
                playTone("tap")
                setSelectedMonth(h.label)
              }}
              className="group flex flex-1 flex-col items-center justify-end gap-1.5 focus:outline-none cursor-pointer"
              style={{ height: "100%" }}
            >
              <div className="font-mono text-[9.5px] text-[#75758a] group-hover:text-[#17171c] font-medium">
                {(h.amount / 1000).toFixed(1)}k
              </div>
              <div
                className={`w-full rounded-t-md transition-all duration-500 ease-out ${
                  isSelected ? "ring-2 ring-[#17171c]" : ""
                }`}
                style={{
                  height: shown ? `${pct}%` : "0%",
                  transitionDelay: `${i * 50}ms`,
                  background: isSelected
                    ? "#17171c"
                    : isBest
                      ? "#ff7759"
                      : "#d9d9dd",
                }}
              />
            </button>
          )
        })}
      </div>
      <div className="mt-2.5 flex justify-between border-t border-[#f2f2f2] pt-2">
        {historyData.map((h) => (
          <button
            key={h.label}
            onClick={() => {
              playTone("tap")
              setSelectedMonth(h.label)
            }}
            className={`flex-1 text-center text-[11px] font-mono transition-colors cursor-pointer ${
              h.label === selectedMonth
                ? "font-bold text-[#17171c]"
                : "text-[#75758a] hover:text-[#17171c]"
            } ${hi ? "font-hindi" : ""}`}
          >
            {hi ? h.labelHi.slice(0, 3) : h.label}
          </button>
        ))}
      </div>
    </Card>
  )
}

function Stat({
  label,
  value,
  sub,
  tone,
}: {
  label: string
  value: string
  sub?: string
  tone?: "verify"
}) {
  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-3.5 shadow-xs">
      <div className="font-mono text-[10px] uppercase tracking-[0.28px] text-[#75758a]">
        {label}
      </div>
      <div
        className={`mt-1 font-display text-[18px] font-bold ${
          tone === "verify" ? "text-[#00875a]" : "text-[#17171c]"
        }`}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[11.5px] text-[#616161] font-mono">{sub}</div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 5 · VERIFY (camera + OCR statement selection)
// ─────────────────────────────────────────────────────────────
export function Verify({ s }: { s: Store }) {
  const hi = s.lang === "hi"
  const activeWorker = s.user || personas[s.personaId] || personas.anjali
  const [stage, setStage] = useState<"intro" | "camera" | "ocr" | "done">(
    s.verified ? "done" : "intro",
  )
  const [selectedStatement, setSelectedStatement] = useState<string>(
    activeWorker.statement.id,
  )
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [camLive, setCamLive] = useState(false)

  const activeStatement =
    statementPresets.find((st) => st.id === selectedStatement) ??
    activeWorker.statement

  useEffect(() => {
    if (stage !== "camera") return
    let stream: MediaStream | null = null
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment" } })
      .then((st) => {
        stream = st
        if (videoRef.current) {
          videoRef.current.srcObject = st
          setCamLive(true)
        }
      })
      .catch(() => setCamLive(false))
    return () => stream?.getTracks().forEach((t) => t.stop())
  }, [stage])

  const scan = () => {
    playTone("scan")
    setStage("ocr")
    setTimeout(() => {
      setStage("done")
      s.setVerified(true)
      playTone("success")
    }, 2400)
  }

  return (
    <ScreenScroll>
      <Header
        hi={hi}
        icon={<Icon.camera className="text-saffron" />}
        en="Verify with your camera"
        hindi="कैमरे से सत्यापित करें"
      />
      <p className={`mt-2 text-[14px] text-fg-dim ${hi ? "font-hindi" : ""}`}>
        {hi
          ? "अपनी gig payout पर्ची स्कैन करें। हम उसे आपकी जुड़ी कमाई से मिलाते हैं।"
          : "Scan a gig payout statement. We cross-check it against your linked income."}
      </p>

      {/* Preset Selector */}
      <div className="mt-3 flex gap-2">
        {statementPresets.map((st) => (
          <button
            key={st.id}
            onClick={() => {
              playTone("tap")
              setSelectedStatement(st.id)
            }}
            className={`flex-1 rounded-xl border p-2 text-center text-[11px] transition-all cursor-pointer ${
              selectedStatement === st.id
                ? "border-saffron bg-saffron/15 text-fg font-bold"
                : "border-hair bg-panel/50 text-fg-dim"
            }`}
          >
            <div>
              {st.glyph} {st.company.split(" ")[0]}
            </div>
          </button>
        ))}
      </div>

      {/* Viewport Frame */}
      <div className="relative mt-3 aspect-[3/4] overflow-hidden rounded-3xl border border-hair-strong bg-black shadow-2xl">
        {stage === "camera" && camLive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        ) : (
          <MockPayout statement={activeStatement} scanning={stage === "ocr"} />
        )}

        {/* Scan Frame & Laser Line */}
        {(stage === "camera" || stage === "ocr") && (
          <>
            <div className="pointer-events-none absolute inset-5 rounded-2xl border-2 border-dashed border-saffron/60" />
            {stage === "ocr" && (
              <div
                className="pointer-events-none absolute inset-x-5 h-1 rounded-full bg-saffron shadow-[0_0_20px_5px_rgba(255,154,60,0.85)]"
                style={{
                  animation: "v-scan-laser 1.4s ease-in-out infinite alternate",
                }}
              />
            )}
          </>
        )}

        {stage === "intro" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 bg-[#ffffff]/90 p-6 text-center backdrop-blur-xs">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eeece7] text-[#17171c] border border-[#d9d9dd] shadow-xs">
              <Icon.camera size={32} />
            </div>
            <div>
              <div
                className={`text-[16px] font-bold text-[#17171c] ${
                  hi ? "font-hindi" : ""
                }`}
              >
                {hi
                  ? "डिजिटल या कागज़ी पर्ची स्कैन करें"
                  : "Scan digital or paper statement"}
              </div>
              <p
                className={`mt-1 text-[13px] text-[#616161] ${
                  hi ? "font-hindi" : ""
                }`}
              >
                {hi
                  ? "Swiggy, Ola या Uber की हालिया स्टेटमेंट"
                  : "Recent statement from Swiggy, Ola, Uber"}
              </p>
            </div>
          </div>
        )}

        {stage === "done" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#ffffff]/95 backdrop-blur-sm animate-fade">
            <div className="flex h-16 w-16 animate-scale-in items-center justify-center rounded-full bg-[#edfce9] text-[#00875a] border border-[#c2eec0] shadow-sm">
              <Icon.check size={36} />
            </div>
            <div
              className={`text-xl font-extrabold text-[#17171c] ${
                hi ? "font-hindi" : "font-display"
              }`}
            >
              {hi ? "कमाई सत्यापित" : "Income Verified"}
            </div>
            <div className="text-[12px] font-mono text-[#00875a] bg-[#edfce9] border border-[#c2eec0] rounded-full px-3 py-0.5">
              Qualcomm NPU OCR · 99.4% match
            </div>
          </div>
        )}
      </div>

      {stage === "done" && <CompareTable hi={hi} activeWorker={activeWorker} />}

      <FooterBar>
        {stage === "intro" && (
          <Button
            full
            variant="primary"
            onClick={() => {
              playTone("tap")
              setStage("camera")
            }}
          >
            <Icon.camera size={18} /> {hi ? "कैमरा खोलें" : "Open camera"}
          </Button>
        )}
        {stage === "camera" && (
          <Button full variant="primary" onClick={scan}>
            <Icon.spark size={18} />{" "}
            {hi ? "स्कैन व OCR करें" : "Scan & Extract OCR"}
          </Button>
        )}
        {stage === "ocr" && (
          <Button full variant="primary" disabled>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#ffffff] border-t-transparent mr-1" />
            {hi ? "पढ़ रहे हैं…" : "Extracting OCR fields…"}
          </Button>
        )}
        {stage === "done" && (
          <Button
            full
            variant="primary"
            onClick={() => {
              playTone("tap")
              s.next()
            }}
          >
            {hi ? "मेरी प्रोफ़ाइल बनाएं" : "Build my profile"}{" "}
            <Icon.chevron size={18} />
          </Button>
        )}
      </FooterBar>
    </ScreenScroll>
  )
}

function MockPayout({
  statement,
  scanning,
}: {
  statement: typeof statementPresets[0]
  scanning: boolean
}) {
  const fields = [
    ["Partner", statement.partner],
    ["Platform", statement.company],
    ["Cycle", statement.cycle],
    ["Activity", statement.orders],
    ["Net payout", inr(statement.netPayout)],
  ]
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0d1017] p-6">
      <div className="w-full rounded-2xl bg-[#f0f4f9] p-5 text-[#141820] shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
          <div className="flex items-center gap-1.5 font-bold text-[14px]">
            <span>{statement.glyph}</span>
            <span>{statement.company.split(" ")[0]}</span>
          </div>
          <span className="rounded bg-black/5 px-2 py-0.5 font-mono text-[9px] font-bold text-black/60">
            PAYOUT STATEMENT
          </span>
        </div>
        <div className="mt-3.5 space-y-2">
          {fields.map(([k, v], i) => (
            <div key={k} className="flex justify-between text-[12px]">
              <span className="text-black/55">{k}</span>
              <span
                className={`font-semibold transition-all px-1.5 py-0.5 rounded ${
                  scanning
                    ? "bg-saffron/30 text-black ring-1 ring-saffron"
                    : "text-black"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3.5 border-t border-black/10 pt-2 flex items-center justify-between text-[10px] text-black/50 font-mono">
          <span>{statement.utr}</span>
          <span>{statement.date}</span>
        </div>
      </div>
    </div>
  )
}

function CompareTable({
  hi,
  activeWorker,
}: {
  hi: boolean
  activeWorker: typeof personas.anjali
}) {
  const rows = [
    {
      k: hi ? "दावा की गई" : "Claimed",
      v: activeWorker.claimed,
      tag: "Worker claim",
    },
    {
      k: hi ? "AA से" : "AA-derived",
      v: activeWorker.aa,
      tag: "Bank API",
    },
    {
      k: hi ? "दस्तावेज़ (OCR)" : "Document (OCR)",
      v: activeWorker.document,
      tag: "Statement",
    },
  ] as const
  const spread =
    Math.max(...rows.map((r) => r.v)) - Math.min(...rows.map((r) => r.v))
  return (
    <Card className="mt-4 animate-fade-up p-5">
      <Eyebrow>{hi ? "तीन स्रोत, एक जैसा" : "Three sources, one story"}</Eyebrow>
      <div className="mt-3 space-y-2.5">
        {rows.map((r) => (
          <div key={r.k} className="flex items-center justify-between">
            <div>
              <span
                className={`text-[13px] font-medium text-fg-dim ${
                  hi ? "font-hindi" : ""
                }`}
              >
                {r.k}
              </span>
              <span className="ml-2 font-mono text-[10px] text-fg-faint">
                ({r.tag})
              </span>
            </div>
            <span className="font-mono text-[15px] font-bold text-fg">
              {inr(r.v)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3.5 flex items-center gap-2 border-t border-hair pt-3">
        <Icon.check size={16} className="text-verify shrink-0" />
        <span
          className={`text-[12.5px] font-medium text-verify ${
            hi ? "font-hindi" : ""
          }`}
        >
          {hi
            ? `सभी स्रोत ₹${spread} के भीतर सटीक मेल खाते हैं`
            : `All sources agree within ₹${spread} (High Confidence)`}
        </span>
      </div>
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────
// 6 + 7 · PROFILE (hero) + EXPLAINABILITY + LOAN CALCULATOR
// ─────────────────────────────────────────────────────────────
export function Profile({ s }: { s: Store }) {
  const hi = s.lang === "hi"
  const activeWorker = s.user || personas[s.personaId] || personas.anjali
  const [building, setBuilding] = useState(!s.profileReady)
  const [open, setOpen] = useState<string | null>("consistency")
  const [speakingKey, setSpeakingKey] = useState<string | null>(null)
  const [showLoanModal, setShowLoanModal] = useState(false)
  const [showQrModal, setShowQrModal] = useState(false)

  useEffect(() => {
    if (!s.profileReady) {
      const t = setTimeout(() => {
        s.setProfileReady(true)
        setBuilding(false)
      }, 1200)
      return () => clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    return () => {
      stopSpeaking()
    }
  }, [])

  const readiness = activeWorker.readinessScore

  const handleSpeak = (key: string, text: string) => {
    if (speakingKey === key) {
      stopSpeaking()
      setSpeakingKey(null)
    } else {
      stopSpeaking()
      setSpeakingKey(key)
      speakText(text, s.lang)
      setTimeout(() => setSpeakingKey(null), 5000)
    }
  }

  if (building) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
        <ReadinessRing value={0} animateTo={readiness} />
        <div
          className={`text-[15px] font-medium text-fg-dim ${
            hi ? "font-hindi" : ""
          }`}
        >
          {hi
            ? "आपकी Credit-Readiness प्रोफ़ाइल तैयार हो रही है…"
            : "Composing your Credit-Readiness Profile…"}
        </div>
      </div>
    )
  }

  if (s.dataDeleted) {
    return (
      <ScreenScroll>
        <div className="flex flex-col items-center justify-center pt-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warn/12 text-warn">
            <Icon.trash size={30} />
          </div>
          <h2
            className={`mt-4 text-xl font-bold text-fg ${
              hi ? "font-hindi" : "font-display"
            }`}
          >
            {hi ? "स्थानीय data मिटा दिया गया है" : "Local Data Has Been Erased"}
          </h2>
          <p
            className={`mt-2 max-w-[280px] text-[13px] text-fg-dim ${
              hi ? "font-hindi" : ""
            }`}
          >
            {hi
              ? "आपकी गोपनीयता के अनुसार सभी वित्तीय रिकॉर्ड हटा दिए गए हैं।"
              : "In accordance with your privacy settings, cached financial records have been removed from this device."}
          </p>
          <div className="mt-6 flex flex-col gap-2.5 w-full max-w-[260px]">
            <Button
              onClick={() => {
                playTone("success")
                s.restoreData()
              }}
            >
              <Icon.refresh size={16} />{" "}
              {hi ? "data पुनर्स्थापित करें" : "Restore Demo Data"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                playTone("tap")
                s.go("privacy")
              }}
            >
              {hi ? "Privacy सेटिंग्स" : "Privacy Settings"}
            </Button>
          </div>
        </div>
      </ScreenScroll>
    )
  }

  return (
    <ScreenScroll>
      <div className="flex items-center justify-between">
        <div>
          <Eyebrow>
            {hi ? "क्रेडिट-रेडीनेस प्रोफ़ाइल" : "Credit-Readiness Profile"}
          </Eyebrow>
          <div
            className={`mt-1 text-xl font-bold text-[#17171c] ${
              hi ? "font-hindi" : "font-display"
            }`}
          >
            {hi ? activeWorker.nameHi : activeWorker.name}
          </div>
          <div className="text-[12px] text-[#75758a]">
            {hi ? activeWorker.cityHi : activeWorker.city} ·{" "}
            {activeWorker.idCode}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Pill tone="pale-green">
            <Icon.badge size={13} /> {hi ? "सत्यापित" : "Verified"}
          </Pill>
          {!s.consentActive && (
            <span className="font-mono text-[9px] text-[#e28a00] font-semibold">
              CONSENT REVOKED
            </span>
          )}
        </div>
      </div>

      {/* Hero Ring Card */}
      <div className="mt-5 flex flex-col items-center rounded-3xl border border-[#d9d9dd] bg-[#eeece7] p-6 shadow-xs">
        <ReadinessRing value={readiness} animateTo={readiness} />
        <div
          className={`mt-4 text-center text-[13px] leading-relaxed text-[#616161] ${
            hi ? "font-hindi" : ""
          }`}
        >
          {hi
            ? "यह कोई credit score नहीं — यह इस बात का प्रमाण है कि आपकी कमाई भरोसेमंद है।"
            : "Not a CIBIL score — a phone-native proof of how steady and ready your gig earnings are."}
        </div>

        {/* Action quick links */}
        <div className="mt-4 flex gap-2 w-full">
          <button
            onClick={() => {
              playTone("tap")
              setShowLoanModal(true)
            }}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-[#d9d9dd] bg-[#ffffff] py-2.5 text-[12px] font-semibold text-[#17171c] hover:border-[#17171c] cursor-pointer shadow-xs"
          >
            <Icon.spark size={14} className="text-[#ff7759]" />{" "}
            {hi ? "लोन ऑफर देखें" : "View Loan Offers"}
          </button>
          <button
            onClick={() => {
              playTone("tap")
              setShowQrModal(true)
            }}
            className="flex items-center justify-center gap-1.5 rounded-full border border-[#d9d9dd] bg-[#ffffff] px-3.5 py-2.5 text-[12px] font-semibold text-[#17171c] hover:border-[#17171c] cursor-pointer shadow-xs"
          >
            <Icon.badge size={14} /> QR Pass
          </button>
        </div>
      </div>

      {/* Key Facts */}
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        <Stat
          label={hi ? "सत्यापित आय" : "Verified"}
          value={inr(activeWorker.document)}
        />
        <Stat
          label={hi ? "platforms" : "Platforms"}
          value={String(
            activeWorker.platforms.filter((p) => p.monthly > 0).length,
          )}
        />
        <Stat
          label={hi ? "महीने" : "Months"}
          value={String(activeWorker.history.length)}
        />
      </div>

      {/* Three Dimensions with Explainability */}
      <div className="mt-5 space-y-2.5">
        <Eyebrow>
          {hi ? "आपकी प्रोफ़ाइल क्यों ऐसी है" : "Why your profile looks this way"}
        </Eyebrow>
        {activeWorker.ratings.map((r) => {
          const isOpen = open === r.key
          const isSpeaking = speakingKey === r.key
          return (
            <Card
              key={r.key}
              className="overflow-hidden transition-all border border-[#e5e7eb] bg-[#ffffff] shadow-xs"
            >
              <button
                onClick={() => {
                  playTone("tap")
                  setOpen(isOpen ? null : r.key)
                }}
                className="flex w-full items-center gap-3 p-4 text-left cursor-pointer"
              >
                <DimRing score={r.score} tone={levelTone(r.level)} />
                <div className="min-w-0 flex-1">
                  <div
                    className={`text-[15px] font-semibold text-[#17171c] ${
                      hi ? "font-hindi" : ""
                    }`}
                  >
                    {hi ? r.titleHi : r.title}
                  </div>
                  <Pill tone={levelTone(r.level)}>{r.level}</Pill>
                </div>
                <Icon.chevron
                  size={18}
                  className={`shrink-0 text-[#75758a] transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="animate-fade-up space-y-3 px-4 pb-4">
                  <p className="text-[13px] leading-relaxed text-[#616161]">
                    {r.reason}
                  </p>
                  <div className="flex items-start gap-2.5 rounded-xl border border-[#d9d9dd] bg-[#f7f6f3] p-3">
                    <button
                      onClick={() =>
                        handleSpeak(r.key, hi ? r.reasonHi : r.reason)
                      }
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                        isSpeaking
                          ? "bg-[#ff7759] text-[#ffffff] font-bold"
                          : "bg-[#ffffff] text-[#ff7759] border border-[#d9d9dd] hover:bg-[#eeece7]"
                      }`}
                      aria-label="Play Voice Explanation"
                    >
                      <Icon.volume size={15} />
                    </button>
                    <p className="font-hindi text-[13px] leading-relaxed text-[#17171c]">
                      {r.reasonHi}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#e5e7eb] bg-[#f7f6f3] px-4 py-3 text-[12px] text-[#75758a]">
        <span>{hi ? "बनाया गया" : "Generated"}</span>
        <span className="font-mono">01 Sep 2026 · 14:20 IST</span>
      </div>

      <FooterBar>
        <div className="grid w-full grid-cols-2 gap-2.5">
          <Button
            variant="outline"
            onClick={() => {
              playTone("tap")
              s.go("offline")
            }}
          >
            <Icon.wifiOff size={17} /> {hi ? "ऑफ़लाइन" : "Offline"}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              playTone("tap")
              s.go("share")
            }}
          >
            <Icon.send size={17} /> {hi ? "साझा करें" : "Share"}
          </Button>
        </div>
      </FooterBar>

      {/* Loan Offers Modal */}
      {showLoanModal && (
        <div
          className="absolute inset-0 z-30 flex items-end bg-black/50 backdrop-blur-xs p-4 animate-fade"
          onClick={() => setShowLoanModal(false)}
        >
          <Card className="w-full animate-fade-up p-5 max-h-[85%] overflow-y-auto border-[#e5e7eb] bg-[#ffffff] shadow-2xl">
            <div onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-[#f2f2f2] pb-3">
                <div>
                  <div className="text-[11px] font-mono text-[#75758a] uppercase">
                    Pre-Approved Credit
                  </div>
                  <div className="font-bold text-[#17171c] text-[16px]">
                    Instant Micro-Credit Offers
                  </div>
                </div>
                <Pill tone="pale-green">READINESS: {readiness}%</Pill>
              </div>

              <div className="mt-3.5 space-y-3">
                {loanOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="rounded-2xl border border-[#e5e7eb] bg-[#f7f6f3] p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#17171c] text-[14px]">
                        {offer.title}
                      </span>
                      <Pill tone="coral">{offer.tag}</Pill>
                    </div>
                    <div className="text-[12px] text-[#616161]">
                      {offer.purpose}
                    </div>
                    <div className="grid grid-cols-3 gap-2 rounded-xl bg-[#eeece7] p-2 text-center text-[11px] border border-[#d9d9dd]">
                      <div>
                        <div className="text-[#75758a] text-[9px]">Limit</div>
                        <div className="font-bold text-[#17171c] font-mono">
                          {inr(offer.amount)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#75758a] text-[9px]">EMI</div>
                        <div className="font-bold text-[#ff7759] font-mono">
                          {inr(offer.monthlyEmi)}/mo
                        </div>
                      </div>
                      <div>
                        <div className="text-[#75758a] text-[9px]">Tenure</div>
                        <div className="font-bold text-[#17171c] font-mono">
                          {offer.tenureMonths} Mo
                        </div>
                      </div>
                    </div>
                    <Button
                      full
                      variant="primary"
                      className="!py-2 text-[12.5px]"
                      onClick={() => {
                        playTone("beam")
                        setShowLoanModal(false)
                        s.go("share")
                      }}
                    >
                      Apply &amp; Share to {offer.lender.split(" ")[0]}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Button
                  full
                  variant="outline"
                  onClick={() => setShowLoanModal(false)}
                >
                  Close Offers
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* QR Pass Modal */}
      {showQrModal && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-xs p-6 animate-fade"
          onClick={() => setShowQrModal(false)}
        >
          <Card className="w-full max-w-[320px] animate-scale-in p-6 text-center border-[#e5e7eb] bg-[#ffffff] shadow-2xl">
            <div onClick={(e) => e.stopPropagation()}>
              <div className="font-mono text-[11px] text-[#75758a] uppercase">
                Verifiable Pass
              </div>
              <div className="font-display font-bold text-[#17171c] text-lg mt-0.5">
                {activeWorker.name}
              </div>
              <div className="text-[11px] text-[#75758a] font-mono">
                {activeWorker.idCode}
              </div>

              {/* QR Pattern visual */}
              <div className="my-5 mx-auto h-44 w-44 rounded-2xl bg-white p-3 shadow-md border border-[#e5e7eb] flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="30" height="30" fill="black" />
                  <rect x="15" y="15" width="20" height="20" fill="white" />
                  <rect x="20" y="20" width="10" height="10" fill="black" />
                  <rect x="60" y="10" width="30" height="30" fill="black" />
                  <rect x="65" y="15" width="20" height="20" fill="white" />
                  <rect x="70" y="20" width="10" height="10" fill="black" />
                  <rect x="10" y="60" width="30" height="30" fill="black" />
                  <rect x="15" y="65" width="20" height="20" fill="white" />
                  <rect x="20" y="70" width="10" height="10" fill="black" />
                  <rect x="45" y="15" width="8" height="8" fill="black" />
                  <rect x="45" y="30" width="8" height="12" fill="black" />
                  <rect x="60" y="45" width="12" height="8" fill="black" />
                  <rect x="75" y="60" width="15" height="15" fill="black" />
                  <rect x="45" y="60" width="8" height="25" fill="black" />
                  <rect x="60" y="75" width="10" height="10" fill="black" />
                </svg>
              </div>

              <div className="text-[11px] text-[#616161]">
                Scan with any RBI AA Lender Scanner to verify{" "}
                {inr(activeWorker.document)}/mo income.
              </div>

              <Button
                full
                variant="primary"
                className="mt-4"
                onClick={() => setShowQrModal(false)}
              >
                Done
              </Button>
            </div>
          </Card>
        </div>
      )}
    </ScreenScroll>
  )
}

function ReadinessRing({
  value,
  animateTo,
}: {
  value: number
  animateTo: number
}) {
  const [v, setV] = useState(value)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const from = v
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1100)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(Math.round(from + (animateTo - from) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [animateTo])

  const R = 62
  const C = 2 * Math.PI * R
  const label = v >= 78 ? "High Readiness" : v >= 60 ? "Moderate" : "Building"

  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={R}
          fill="none"
          stroke="#d9d9dd"
          strokeWidth="10"
        />
        <circle
          cx="80"
          cy="80"
          r={R}
          fill="none"
          stroke="url(#g)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C - (v / 100) * C}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff7759" />
            <stop offset="50%" stopColor="#ff9a3c" />
            <stop offset="100%" stopColor="#00875a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-4xl font-extrabold tabular-nums text-[#17171c]">
          {v}
        </div>
        <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#00875a] font-semibold">
          {label}
        </div>
      </div>
    </div>
  )
}

function DimRing({
  score,
  tone,
}: {
  score: number
  tone: "verify" | "warn" | "coral"
}) {
  const color =
    tone === "verify" ? "#00875a" : tone === "warn" ? "#e28a00" : "#ff7759"
  const R = 16
  const C = 2 * Math.PI * R
  return (
    <div className="relative h-11 w-11 shrink-0">
      <svg viewBox="0 0 40 40" className="-rotate-90">
        <circle
          cx="20"
          cy="20"
          r={R}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />
        <circle
          cx="20"
          cy="20"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C - (score / 100) * C}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold text-[#17171c]">
        {score}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 8 · OFFLINE
// ─────────────────────────────────────────────────────────────
export function Offline({ s }: { s: Store }) {
  const hi = s.lang === "hi"
  const activeWorker = personas[s.personaId] || personas.anjali
  return (
    <ScreenScroll>
      <button
        onClick={() => {
          playTone("tap")
          s.go("profile")
        }}
        className="mb-3 flex items-center gap-1 text-[13px] text-[#75758a] hover:text-[#17171c] transition-colors cursor-pointer"
      >
        <Icon.arrowLeft size={16} /> {hi ? "प्रोफ़ाइल" : "Profile"}
      </button>
      <Header
        hi={hi}
        icon={<Icon.wifiOff className="text-[#17171c]" />}
        en="Works without internet"
        hindi="इंटरनेट के बिना भी चलता है"
      />
      <p
        className={`mt-2 text-[13.5px] text-[#616161] ${
          hi ? "font-hindi" : ""
        }`}
      >
        {hi
          ? "एक बार data आ जाने के बाद आपकी प्रोफ़ाइल फ़ोन पर सुरक्षित रहती है। नेटवर्क बंद करके देखिए।"
          : "Once your data is fetched, your profile lives privately on your phone. Try toggling offline mode."}
      </p>

      <div className="mt-6 flex items-center justify-between rounded-3xl border border-[#e5e7eb] bg-[#ffffff] p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
              s.offline
                ? "bg-[#fef3c7] text-[#b45309]"
                : "bg-[#eeece7] text-[#17171c]"
            }`}
          >
            <Icon.wifiOff size={20} />
          </div>
          <div>
            <div className="text-[15px] font-semibold text-[#17171c]">
              {hi ? "एयरप्लेन मोड सिमुलेशन" : "Simulate Offline Mode"}
            </div>
            <div className="text-[12px] text-[#75758a]">
              {s.offline
                ? hi
                  ? "नेटवर्क बंद है"
                  : "Network disconnected"
                : hi
                  ? "5G नेटवर्क चालू है"
                  : "5G connected"}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            playTone("tap")
            s.setOffline(!s.offline)
          }}
          className={`relative h-7 w-12 rounded-full transition-colors cursor-pointer ${
            s.offline ? "bg-[#e28a00]" : "bg-[#d9d9dd]"
          }`}
          aria-label="Toggle offline mode"
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
              s.offline ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>

      <Card className="mt-4 p-5 border border-[#e5e7eb] bg-[#ffffff] shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon.badge size={18} className="text-[#00875a]" />
            <span
              className={`text-[14px] font-semibold text-[#17171c] ${
                hi ? "font-hindi" : ""
              }`}
            >
              {hi ? "प्रोफ़ाइल पूर्णतः उपलब्ध" : "Profile Available On-Device"}
            </span>
          </div>
          {s.offline ? (
            <Pill tone="warn">{hi ? "ऑफ़लाइन" : "Offline"}</Pill>
          ) : (
            <Pill tone="pale-green">{hi ? "ऑनलाइन" : "Online"}</Pill>
          )}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#75758a]">
              {hi ? "सत्यापित आय" : "Verified income"}
            </div>
            <div className="font-display text-2xl font-bold text-[#17171c]">
              {inr(activeWorker.document)}
            </div>
          </div>
          <div className="h-10 w-px bg-[#e5e7eb]" />
          <div
            className={`text-[12px] leading-snug text-[#616161] ${
              hi ? "font-hindi" : ""
            }`}
          >
            {s.offline
              ? hi
                ? "नेटवर्क बंद है — फिर भी आपकी पूरी प्रोफ़ाइल व स्कोर दिख रहे हैं।"
                : "Network is offline — yet your full readiness profile renders instantly without any server call."
              : hi
                ? "नेटवर्क बंद करके देखिए, कुछ नहीं बदलेगा।"
                : "Toggle offline mode above to test offline rendering."}
          </div>
        </div>
      </Card>

      <FooterBar>
        <Button
          full
          variant="outline"
          onClick={() => {
            playTone("tap")
            s.go("profile")
          }}
        >
          {hi ? "प्रोफ़ाइल पर वापस" : "Back to profile"}
        </Button>
      </FooterBar>
    </ScreenScroll>
  )
}

// ─────────────────────────────────────────────────────────────
// 9 · SHARE (cross-device Office Kit)
// ─────────────────────────────────────────────────────────────
export function Share({ s }: { s: Store }) {
  const hi = s.lang === "hi"
  const activeWorker = s.user || personas[s.personaId] || personas.anjali
  const [lender, setLender] = useState(lenders[0].id)
  const [phase, setPhase] = useState<"pick" | "beaming" | "landed">(
    s.beamedLender ? "landed" : "pick",
  )
  const chosen = lenders.find((l) => l.id === lender)!

  const beam = () => {
    playTone("beam")
    setPhase("beaming")
    s.setBeamedLender(chosen.id)
    try {
      const channel = new BroadcastChannel("visible_iqoo_p2p_channel")
      channel.postMessage({
        type: "OFFICE_KIT_BEAM",
        worker: activeWorker,
        lender: chosen,
        timestamp: Date.now(),
      })
      localStorage.setItem(
        "visible_last_beam",
        JSON.stringify({
          worker: activeWorker,
          lender: chosen,
          timestamp: Date.now(),
        }),
      )
    } catch (e) {
      console.warn("[P2P] BroadcastChannel not supported in this runtime", e)
    }
    setTimeout(() => {
      setPhase("landed")
      playTone("success")
    }, 2200)
  }

  return (
    <ScreenScroll>
      <button
        onClick={() => {
          playTone("tap")
          s.go("profile")
        }}
        className="mb-3 flex items-center gap-1 text-[13px] text-[#75758a] hover:text-[#17171c] transition-colors cursor-pointer"
      >
        <Icon.arrowLeft size={16} /> {hi ? "प्रोफ़ाइल" : "Profile"}
      </button>
      <Header
        hi={hi}
        icon={<Icon.send className="text-[#17171c]" />}
        en="Send to a loan officer"
        hindi="लोन अधिकारी को भेजें"
      />

      {phase === "pick" && (
        <>
          <p
            className={`mt-2 text-[13.5px] text-[#616161] ${
              hi ? "font-hindi" : ""
            }`}
          >
            {hi
              ? "iQOO Office Kit के ज़रिए अपनी प्रोफ़ाइल सीधे अधिकारी के डेस्क पर भेजें।"
              : "Beam your profile wirelessly to the loan officer's desktop workstation via iQOO Office Kit."}
          </p>
          <div className="mt-5 space-y-2.5">
            {lenders.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  playTone("tap")
                  setLender(l.id)
                }}
                className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                  lender === l.id
                    ? "border-[#17171c] bg-[#eeece7] shadow-xs"
                    : "border-[#e5e7eb] bg-[#ffffff] hover:border-[#d9d9dd]"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffffff] border border-[#d9d9dd] text-[#17171c]">
                  <Icon.device size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-[#17171c]">
                    {l.name}
                  </div>
                  <div className="text-[12px] text-[#75758a]">
                    {hi ? "अधिकारी" : "Branch Officer"} · {l.officer} (
                    {l.branch})
                  </div>
                </div>
                <div
                  className={`h-4 w-4 rounded-full border-2 transition-colors ${
                    lender === l.id
                      ? "border-[#17171c] bg-[#17171c]"
                      : "border-[#d9d9dd]"
                  }`}
                />
              </button>
            ))}
          </div>
          <FooterBar>
            <Button full variant="primary" onClick={beam}>
              <Icon.send size={17} />{" "}
              {hi ? "प्रोफ़ाइल भेजें (Office Kit)" : "Beam profile via Office Kit"}
            </Button>
          </FooterBar>
        </>
      )}

      {phase !== "pick" && (
        <BeamScene
          hi={hi}
          landed={phase === "landed"}
          officer={chosen}
          activeWorker={activeWorker}
        />
      )}

      {phase === "landed" && (
        <FooterBar>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                playTone("tap")
                setPhase("pick")
                s.setBeamedLender(null)
              }}
            >
              {hi ? "फिर से भेजें" : "Beam again"}
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                playTone("tap")
                s.go("profile")
              }}
            >
              {hi ? "पूर्ण" : "Done"}
            </Button>
          </div>
        </FooterBar>
      )}
    </ScreenScroll>
  )
}

function BeamScene({
  hi,
  landed,
  officer,
  activeWorker,
}: {
  hi: boolean
  landed: boolean
  officer: { name: string }
  activeWorker: typeof personas.anjali
}) {
  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="relative flex w-full items-center justify-between px-2">
        {/* Phone */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-10 items-center justify-center rounded-xl border border-[#d9d9dd] bg-[#ffffff] shadow-sm">
            <Icon.badge size={16} className="text-[#17171c]" />
          </div>
          <span className="font-mono text-[10px] text-[#75758a]">
            {hi ? "आपका फ़ोन" : "iQOO 15"}
          </span>
        </div>

        {/* Animated Beam Track */}
        <div className="relative mx-3 h-1 flex-1 rounded-full bg-[#e5e7eb] overflow-hidden">
          {!landed ? (
            <div
              className="h-full w-full bg-gradient-to-r from-transparent via-[#ff7759] to-[#00875a]"
              style={{ animation: "v-beam-flow 0.8s linear infinite" }}
            />
          ) : (
            <div className="h-full w-full bg-[#00875a]" />
          )}
        </div>

        {/* Laptop */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`flex h-12 w-16 items-center justify-center rounded-lg border transition-all ${
              landed
                ? "border-[#00875a] bg-[#edfce9] shadow-xs"
                : "border-[#d9d9dd] bg-[#ffffff]"
            }`}
          >
            <Icon.device
              size={20}
              className={landed ? "text-[#00875a]" : "text-[#75758a]"}
            />
          </div>
          <span className="font-mono text-[10px] text-[#75758a] truncate max-w-[80px]">
            {officer.name}
          </span>
        </div>
      </div>

      <div className="mt-8 text-center w-full">
        {landed ? (
          <div className="animate-fade-up">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edfce9] text-[#00875a] border border-[#c2eec0] shadow-sm">
              <Icon.check size={28} />
            </div>
            <div
              className={`mt-3 text-lg font-bold text-[#17171c] ${
                hi ? "font-hindi" : "font-display"
              }`}
            >
              {hi ? "अधिकारी की स्क्रीन पर खुला" : "Delivered to Officer's Screen"}
            </div>
            <p
              className={`mt-1 text-[13px] text-[#616161] ${
                hi ? "font-hindi" : ""
              }`}
            >
              {hi
                ? "नीचे डेस्कटॉप लोन अधिकारी व्यू का पूर्वावलोकन देखें।"
                : "Preview of the companion workstation below."}
            </p>
            <div className="mt-5 scale-[0.96] origin-top">
              <DesktopPreview activeWorker={activeWorker} />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#17171c] border-t-transparent" />
            <div
              className={`text-[15px] font-medium text-[#17171c] ${
                hi ? "font-hindi" : ""
              }`}
            >
              {hi
                ? "Office Kit से सुरक्षित रूप से भेजा जा रहा है…"
                : "Beaming encrypted profile via Office Kit…"}
            </div>
            <div className="font-mono text-[11px] text-[#75758a]">
              Peer-to-peer Wi-Fi Direct · AES-256
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Compact desktop lender surface preview (rendered inside phone)
export function DesktopPreview({
  activeWorker,
}: {
  activeWorker: typeof personas.anjali
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#071829] p-4 text-left text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 font-mono text-[10px] text-white/60">
            visible.lender · Office Kit Station
          </span>
        </div>
        <span className="rounded-full bg-[#edfce9]/15 px-2 py-0.5 font-mono text-[9px] font-bold text-[#7fe4c1]">
          SYNCED LIVE
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="font-display text-[14px] font-bold text-white">
            {activeWorker.name}
          </div>
          <div className="text-[11px] text-white/60">
            {activeWorker.city} · {activeWorker.idCode}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[12px] font-bold text-[#7fe4c1]">
            {inr(activeWorker.document)}/mo
          </div>
          <div className="text-[9px] text-white/60">
            {activeWorker.platforms.filter((p) => p.monthly > 0).length} Gig
            Platforms
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {activeWorker.ratings.map((r) => (
          <div
            key={r.key}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-center"
          >
            <div className="text-[8px] uppercase tracking-wide text-white/60">
              {r.title.split(" ")[0]}
            </div>
            <div className="font-mono text-[13px] font-bold text-white">
              {r.score}
            </div>
            <div
              className={`text-[8px] font-semibold ${
                r.level === "STRONG" ? "text-[#7fe4c1]" : "text-[#ff9a3c]"
              }`}
            >
              {r.level}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[10px]">
        <div className="rounded-lg bg-white/5 p-2 border border-white/5">
          <span className="text-white/60">Consent Ref: </span>
          <span className="font-mono text-white font-semibold">CN-90D-A14</span>
        </div>
        <div className="rounded-lg bg-white/5 p-2 border border-white/5">
          <span className="text-white/60">NPU Verification: </span>
          <span className="font-mono text-[#7fe4c1] font-semibold">
            PASSED (99.4%)
          </span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 10 · PRIVACY / CONSENT MANAGEMENT
// ─────────────────────────────────────────────────────────────
export function Privacy({ s }: { s: Store }) {
  const hi = s.lang === "hi"
  const [confirm, setConfirm] = useState<"revoke" | "delete" | null>(null)

  return (
    <ScreenScroll>
      <button
        onClick={() => {
          playTone("tap")
          s.go("profile")
        }}
        className="mb-3 flex items-center gap-1 text-[13px] text-[#75758a] hover:text-[#17171c] transition-colors cursor-pointer"
      >
        <Icon.arrowLeft size={16} /> {hi ? "प्रोफ़ाइल" : "Profile"}
      </button>
      <Header
        hi={hi}
        icon={<Icon.lock className="text-[#17171c]" />}
        en="Privacy & consent"
        hindi="गोपनीयता और सहमति"
      />

      {/* Active Consent */}
      <Card className="mt-5 p-5 border border-[#e5e7eb] bg-[#ffffff] shadow-xs">
        <div className="flex items-center justify-between">
          <Eyebrow>{hi ? "सक्रिय सहमति" : "Active consent"}</Eyebrow>
          {s.consentActive ? (
            <Pill tone="pale-green">{hi ? "सक्रिय" : "Active"}</Pill>
          ) : (
            <Pill tone="warn">{hi ? "वापस ली गई" : "Revoked"}</Pill>
          )}
        </div>
        <div className="mt-3 space-y-2 text-[13px]">
          <Row k={hi ? "संदर्भ" : "Reference"} v="CN-90D-A14" />
          <Row
            k={hi ? "स्रोत" : "Sources"}
            v={`${s.connected.length} ${hi ? "platforms" : "platforms"}`}
          />
          <Row k={hi ? "समाप्ति" : "Expires"} v="30 Nov 2026 (90 days)" />
          <Row
            k={hi ? "प्राप्तकर्ता" : "Recipient"}
            v={hi ? "सिर्फ़ आपके चुने lender" : "Chosen lenders only"}
          />
        </div>
        {s.consentActive ? (
          <button
            onClick={() => {
              playTone("tap")
              setConfirm("revoke")
            }}
            className="mt-4 w-full rounded-xl border border-warn/30 py-2.5 text-[13px] font-semibold text-warn transition-colors hover:bg-warn/8 cursor-pointer"
          >
            {hi ? "सहमति वापस लें" : "Revoke consent"}
          </button>
        ) : (
          <button
            onClick={() => {
              playTone("success")
              s.reactivateConsent()
            }}
            className="mt-4 w-full rounded-xl border border-verify/30 py-2.5 text-[13px] font-semibold text-verify transition-colors hover:bg-verify/8 cursor-pointer"
          >
            {hi ? "सहमति फिर से सक्रिय करें" : "Re-activate Consent"}
          </button>
        )}
      </Card>

      {/* History */}
      <div className="mt-4">
        <Eyebrow>{hi ? "पिछले रिकॉर्ड" : "Previous records"}</Eyebrow>
        <div className="mt-2 space-y-2">
          {[
            {
              ref: "CN-30D-9X2",
              date: "12 Jun 2026",
              status: hi ? "समाप्त" : "Expired",
            },
            {
              ref: "CN-TRIAL-01",
              date: "02 Apr 2026",
              status: hi ? "समाप्त" : "Expired",
            },
          ].map((r) => (
            <div
              key={r.ref}
              className="flex items-center justify-between rounded-xl border border-hair bg-panel/50 px-4 py-3"
            >
              <div>
                <div className="font-mono text-[12px] text-fg">{r.ref}</div>
                <div className="text-[11px] text-fg-faint">{r.date}</div>
              </div>
              <span className="font-mono text-[11px] text-fg-faint">
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Local Data */}
      <Card className="mt-4 border-warn/20 p-5">
        <div className="flex items-center gap-2">
          <Icon.trash size={17} className="text-warn" />
          <span
            className={`text-[14px] font-semibold text-fg ${
              hi ? "font-hindi" : ""
            }`}
          >
            {hi ? "स्थानीय data मिटाएँ" : "Erase local financial cache"}
          </span>
        </div>
        <p
          className={`mt-1.5 text-[12.5px] leading-relaxed text-fg-dim ${
            hi ? "font-hindi" : ""
          }`}
        >
          {hi
            ? "आपके फ़ोन पर रखा गया सारा वित्तीय data स्थायी रूप से मिटा दिया जाएगा।"
            : "Permanently erases all gig payouts, OCR extracts, and cached analysis from this device storage."}
        </p>
        {s.dataDeleted ? (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[13px] text-verify font-medium">
              <Icon.check size={15} />{" "}
              {hi ? "सारा local data मिटा दिया गया" : "Local data erased"}
            </div>
            <button
              onClick={() => {
                playTone("success")
                s.restoreData()
              }}
              className="text-[12px] text-saffron underline hover:text-saffron-soft cursor-pointer font-medium"
            >
              {hi ? "पुनर्स्थापित करें" : "Restore"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              playTone("tap")
              setConfirm("delete")
            }}
            className="mt-3 w-full rounded-xl border border-warn/40 py-2.5 text-[13px] font-semibold text-warn transition-colors hover:bg-warn/8 cursor-pointer"
          >
            {hi ? "data मिटाएँ" : "Erase device data"}
          </button>
        )}
      </Card>

      {confirm && (
        <div
          className="absolute inset-0 z-20 flex items-end bg-black/60 p-4 animate-fade"
          onClick={() => setConfirm(null)}
        >
          <Card className="w-full animate-fade-up p-5">
            <div onClick={(e) => e.stopPropagation()}>
              <div
                className={`text-[16px] font-bold text-fg ${
                  hi ? "font-hindi" : "font-display"
                }`}
              >
                {confirm === "revoke"
                  ? hi
                    ? "सहमति वापस लें?"
                    : "Revoke consent?"
                  : hi
                    ? "data मिटाएँ?"
                    : "Erase all data?"}
              </div>
              <p
                className={`mt-1.5 text-[13px] text-fg-dim ${
                  hi ? "font-hindi" : ""
                }`}
              >
                {confirm === "revoke"
                  ? hi
                    ? "जुड़ी platforms तक पहुँच तुरंत बंद हो जाएगी।"
                    : "Access to your linked gig platforms will stop immediately."
                  : hi
                    ? "यह वापस नहीं किया जा सकता।"
                    : "All on-device cached financial data will be permanently wiped."}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <Button
                  variant="soft"
                  onClick={() => {
                    playTone("tap")
                    setConfirm(null)
                  }}
                >
                  {hi ? "रहने दें" : "Cancel"}
                </Button>
                <Button
                  className="!bg-warn !text-ink font-bold"
                  onClick={() => {
                    playTone("success")
                    if (confirm === "revoke") s.revokeConsent()
                    else s.deleteData()
                    setConfirm(null)
                  }}
                >
                  {confirm === "revoke"
                    ? hi
                      ? "वापस लें"
                      : "Revoke"
                    : hi
                      ? "मिटाएँ"
                      : "Erase"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </ScreenScroll>
  )
}

function Row({ k, v }: { k: string v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-fg-faint">{k}</span>
      <span className="font-mono text-fg">{v}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Shared layout bits
// ─────────────────────────────────────────────────────────────
export function ScreenScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="scroll-area h-full overflow-y-auto px-6 pb-28 pt-6">
      {children}
    </div>
  )
}

function Header({
  hi,
  icon,
  en,
  hindi,
}: {
  hi: boolean
  icon: React.ReactNode
  en: string
  hindi: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d9d9dd] bg-[#eeece7] text-[#17171c]">
        {icon}
      </div>
      <h2
        className={`text-[20px] font-bold leading-tight text-[#17171c] ${
          hi ? "font-hindi" : "font-display"
        }`}
      >
        {hi ? hindi : en}
      </h2>
    </div>
  )
}

export function FooterBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-0 bottom-0 border-t border-[#e5e7eb] bg-[#ffffff]/95 p-4 backdrop-blur-md">
      {children}
    </div>
  )
}
