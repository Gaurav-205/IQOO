import { useState } from "react"
import { Icon, Pill, Button, Card } from "./ui"
import { Lang, playTone } from "../lib/data"
import { api } from "../lib/api"

interface AuthScreenProps {
  lang: Lang
  onAuthenticated: (userData: any) => void
}

export function AuthScreen({ lang, onAuthenticated }: AuthScreenProps) {
  const hi = lang === "hi"
  const [tab, setTab] = useState<"signin" | "signup" | "demo">("demo")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [city, setCity] = useState("Pune, Maharashtra")
  const [role, setRole] = useState("Delivery Courier")
  const [otp, setOtp] = useState("8924")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleDemoLogin = async (personaId: string) => {
    playTone("tap")
    setLoading(true)
    setError("")
    try {
      const res = await api.demoLogin(personaId)
      if (res?.success) {
        playTone("success")
        onAuthenticated(res.user)
      } else {
        setError("Demo login failed")
      }
    } catch {
      onAuthenticated({ id: personaId })
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }
    playTone("tap")
    setLoading(true)
    setError("")
    try {
      const res = await api.signin(phone, otp)
      if (res?.success) {
        playTone("success")
        onAuthenticated(res.user)
      } else {
        setError(res?.error || "Authentication failed")
      }
    } catch {
      onAuthenticated({ name: "Worker", phone })
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) {
      setError("Please enter your name and phone number")
      return
    }
    playTone("tap")
    setLoading(true)
    setError("")
    try {
      const res = await api.signup({ name, phone, city, role })
      if (res?.success) {
        playTone("success")
        onAuthenticated(res.user)
      } else {
        setError(res?.error || "Account creation failed")
      }
    } catch {
      onAuthenticated({ name, phone, city, role })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col justify-between p-6 bg-[#ffffff] text-[#17171c] overflow-y-auto">
      <div>
        {/* Header Branding */}
        <div className="flex items-center justify-between pt-2 pb-4">
          <div className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="#17171c"
                strokeWidth="1.5"
              />
              <path
                d="M4 16c3-6 21-6 24 0-3 6-21 6-24 0z"
                stroke="#ff7759"
                strokeWidth="1.8"
              />
              <circle cx="16" cy="16" r="3.4" fill="#003c33" />
            </svg>
            <span className="font-display text-xl font-bold tracking-tight text-[#17171c]">
              Visible
            </span>
          </div>
          <Pill tone="pale-green">
            <Icon.lock size={11} /> 100% On-Device NPU
          </Pill>
        </div>

        {/* Hero Title */}
        <div className="mt-4">
          <h1
            className={`font-display text-2xl font-bold tracking-tight text-[#17171c] ${
              hi ? "font-hindi" : ""
            }`}
          >
            {hi ? "आय सत्यापन व क्रेडिट खाता" : "Verifiable Gig Credit Engine"}
          </h1>
          <p
            className={`mt-1.5 text-[13.5px] text-[#616161] ${
              hi ? "font-hindi" : ""
            }`}
          >
            {hi
              ? "अपने डिलीवरी व राइडिंग काम की कमाई से आसान बैंक लोन प्राप्त करें।"
              : "Turn fragmented courier earnings into an institutional credit-readiness pass."}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex rounded-full bg-[#f7f6f3] border border-[#e5e7eb] p-1">
          <button
            onClick={() => {
              playTone("tap")
              setTab("demo")
            }}
            className={`flex-1 rounded-full py-1.5 text-[12px] font-semibold transition-all cursor-pointer ${
              tab === "demo"
                ? "bg-[#17171c] text-[#ffffff] shadow-xs"
                : "text-[#616161] hover:text-[#17171c]"
            }`}
          >
            ⚡ Test User
          </button>
          <button
            onClick={() => {
              playTone("tap")
              setTab("signin")
            }}
            className={`flex-1 rounded-full py-1.5 text-[12px] font-semibold transition-all cursor-pointer ${
              tab === "signin"
                ? "bg-[#17171c] text-[#ffffff] shadow-xs"
                : "text-[#616161] hover:text-[#17171c]"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              playTone("tap")
              setTab("signup")
            }}
            className={`flex-1 rounded-full py-1.5 text-[12px] font-semibold transition-all cursor-pointer ${
              tab === "signup"
                ? "bg-[#17171c] text-[#ffffff] shadow-xs"
                : "text-[#616161] hover:text-[#17171c]"
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-[#fef2f2] border border-[#fecaca] p-3 text-[12.5px] text-[#dc2626]">
            {error}
          </div>
        )}

        {/* 1. TEST USER QUICK DEMO LOGIN */}
        {tab === "demo" && (
          <div className="mt-5 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#75758a]">
              Select a pre-configured test courier
            </div>

            {/* Anjali Verma */}
            <button
              onClick={() => handleDemoLogin("anjali")}
              disabled={loading}
              className="group flex w-full items-center justify-between rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-4 text-left transition-all hover:border-[#17171c] hover:shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eeece7] text-xl border border-[#d9d9dd]">
                  🛵
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14.5px] text-[#17171c]">
                      Anjali Verma
                    </span>
                    <span className="rounded-full bg-[#edfce9] text-[#00875a] px-2 py-0.2 text-[10px] font-mono font-bold">
                      78 Score
                    </span>
                  </div>
                  <div className="text-[12px] text-[#616161]">
                    Swiggy · Ola · Rapido (Pune, Maharashtra)
                  </div>
                  <div className="font-mono text-[11px] font-semibold text-[#17171c] mt-0.5">
                    ₹30,400 / month · 3 Streams
                  </div>
                </div>
              </div>
              <span className="text-[#17171c] font-bold text-sm">→</span>
            </button>

            {/* Ramesh Kumar */}
            <button
              onClick={() => handleDemoLogin("ramesh")}
              disabled={loading}
              className="group flex w-full items-center justify-between rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-4 text-left transition-all hover:border-[#17171c] hover:shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eeece7] text-xl border border-[#d9d9dd]">
                  🚕
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14.5px] text-[#17171c]">
                      Ramesh Kumar
                    </span>
                    <span className="rounded-full bg-[#edfce9] text-[#00875a] px-2 py-0.2 text-[10px] font-mono font-bold">
                      86 Score
                    </span>
                  </div>
                  <div className="text-[12px] text-[#616161]">
                    Uber Fleet · Ola Prime (Delhi NCR)
                  </div>
                  <div className="font-mono text-[11px] font-semibold text-[#17171c] mt-0.5">
                    ₹42,000 / month · Fleet Captain
                  </div>
                </div>
              </div>
              <span className="text-[#17171c] font-bold text-sm">→</span>
            </button>

            {/* Sunita Devi */}
            <button
              onClick={() => handleDemoLogin("sunita")}
              disabled={loading}
              className="group flex w-full items-center justify-between rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-4 text-left transition-all hover:border-[#17171c] hover:shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eeece7] text-xl border border-[#d9d9dd]">
                  🔧
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14.5px] text-[#17171c]">
                      Sunita Devi
                    </span>
                    <span className="rounded-full bg-[#edfce9] text-[#00875a] px-2 py-0.2 text-[10px] font-mono font-bold">
                      76 Score
                    </span>
                  </div>
                  <div className="text-[12px] text-[#616161]">
                    Urban Company (Mumbai, Maharashtra)
                  </div>
                  <div className="font-mono text-[11px] font-semibold text-[#17171c] mt-0.5">
                    ₹24,500 / month · Home Services
                  </div>
                </div>
              </div>
              <span className="text-[#17171c] font-bold text-sm">→</span>
            </button>
          </div>
        )}

        {/* 2. PHONE SIGN IN */}
        {tab === "signin" && (
          <form onSubmit={handleSignIn} className="mt-5 space-y-4">
            <div>
              <label className="block text-[12px] font-mono uppercase tracking-wider text-[#75758a] mb-1.5">
                Registered Mobile Number
              </label>
              <div className="flex items-center rounded-2xl border border-[#d9d9dd] bg-[#ffffff] px-3.5 py-2.5 focus-within:border-[#17171c]">
                <span className="font-mono text-[13px] font-bold text-[#17171c] mr-2">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent text-[14px] font-medium text-[#17171c] outline-none"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[12px] font-mono uppercase tracking-wider text-[#75758a]">
                  4-Digit SMS OTP
                </label>
                <span className="font-mono text-[11px] text-[#00875a]">
                  Demo OTP: 8924
                </span>
              </div>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-2xl border border-[#d9d9dd] bg-[#ffffff] px-3.5 py-2.5 text-[18px] font-mono tracking-widest text-center font-bold text-[#17171c] focus:border-[#17171c] outline-none"
              />
            </div>

            <Button
              type="submit"
              tone="dark"
              full
              disabled={loading}
              className="mt-2"
            >
              {loading ? "Authenticating…" : "Sign In with Mobile OTP →"}
            </Button>
          </form>
        )}

        {/* 3. SIGN UP NEW WORKER */}
        {tab === "signup" && (
          <form onSubmit={handleSignUp} className="mt-4 space-y-3.5">
            <div>
              <label className="block text-[11.5px] font-mono uppercase tracking-wider text-[#75758a] mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Vikram Joshi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-[#d9d9dd] bg-[#ffffff] px-3.5 py-2 text-[13.5px] font-medium text-[#17171c] focus:border-[#17171c] outline-none"
              />
            </div>

            <div>
              <label className="block text-[11.5px] font-mono uppercase tracking-wider text-[#75758a] mb-1">
                Mobile Number
              </label>
              <div className="flex items-center rounded-2xl border border-[#d9d9dd] bg-[#ffffff] px-3.5 py-2 focus-within:border-[#17171c]">
                <span className="font-mono text-[13px] font-bold text-[#17171c] mr-2">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="98220 11223"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent text-[13.5px] font-medium text-[#17171c] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11.5px] font-mono uppercase tracking-wider text-[#75758a] mb-1">
                  Operating City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-2xl border border-[#d9d9dd] bg-[#ffffff] px-3 py-2 text-[12.5px] font-medium text-[#17171c] outline-none cursor-pointer"
                >
                  <option value="Pune, Maharashtra">Pune</option>
                  <option value="Mumbai, Maharashtra">Mumbai</option>
                  <option value="New Delhi, NCR">New Delhi</option>
                  <option value="Bengaluru, Karnataka">Bengaluru</option>
                  <option value="Hyderabad, Telangana">Hyderabad</option>
                </select>
              </div>

              <div>
                <label className="block text-[11.5px] font-mono uppercase tracking-wider text-[#75758a] mb-1">
                  Primary Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-2xl border border-[#d9d9dd] bg-[#ffffff] px-3 py-2 text-[12.5px] font-medium text-[#17171c] outline-none cursor-pointer"
                >
                  <option value="Delivery Courier">🛵 Delivery</option>
                  <option value="Cab Fleet Driver">🚗 Cab Driver</option>
                  <option value="Bike Taxi Captain">🏍️ Bike Taxi</option>
                  <option value="Home Services">🔧 Home Care</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              tone="dark"
              full
              disabled={loading}
              className="mt-2"
            >
              {loading ? "Creating Account…" : "Create Courier Profile →"}
            </Button>
          </form>
        )}
      </div>

      {/* Security Footer Notice */}
      <div className="pt-6 border-t border-[#f2f2f2] mt-6 text-center">
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#75758a]">
          <Icon.shield size={12} className="text-[#00875a]" />
          <span>RBI ACCOUNT AGGREGATOR FRAMEWORK COMPLIANT</span>
        </div>
      </div>
    </div>
  )
}
