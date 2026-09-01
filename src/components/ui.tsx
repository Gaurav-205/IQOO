import { ReactNode } from "react"

// ── Icons (Inline hairline stroke with geometric precision) ─────
type IP = { className?: string size?: number }
const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
})

export const Icon = {
  shield: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  spark: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  ),
  cpu: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  database: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  link: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  chart: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M3 3v18h18" />
      <path d="M18 17V9M13 17V5M8 17v-3" />
    </svg>
  ),
  camera: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  badge: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      <path d="M9.5 8.5l1.8 1.8 3.5-3.5" />
    </svg>
  ),
  wifiOff: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M1 1l22 22" />
      <path d="M16.72 11.06A10.94 10.94 0 0119 12.55" />
      <path d="M5 12.55a10.94 10.94 0 015.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0122.58 9" />
      <path d="M1.42 9a15.91 15.91 0 014.7-2.88" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth={2.4} />
    </svg>
  ),
  send: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  lock: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <circle cx="12" cy="16" r="1.5" />
    </svg>
  ),
  check: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  chevron: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  volume: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
      <path d="M19.07 4.93a10 10 0 010 14.14" />
    </svg>
  ),
  device: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  trash: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  clock: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  arrowLeft: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  refresh: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
    </svg>
  ),
  info: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  zap: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  layers: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  globe: (p: IP) => (
    <svg {...base(p.size)} className={p.className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
}

// ── Buttons & Components (Cohere Inspired Precision) ────────────
export function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  full,
  className = "",
}: {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "coral" | "ghost" | "soft" | "emerald"
  disabled?: boolean
  full?: boolean
  className?: string
}) {
  const styles = {
    primary:
      "bg-saffron text-ink font-bold shadow-[0_8px_25px_-6px_rgba(255,154,60,0.5)] hover:brightness-105 active:scale-[0.98]",
    coral:
      "bg-coral text-white font-bold shadow-[0_8px_25px_-6px_rgba(255,119,89,0.5)] hover:brightness-105 active:scale-[0.98]",
    emerald:
      "bg-verify text-ink font-bold shadow-[0_8px_25px_-6px_rgba(79,209,161,0.5)] hover:brightness-105 active:scale-[0.98]",
    ghost:
      "border border-hair-strong text-fg hover:border-saffron/60 hover:text-saffron active:scale-[0.98]",
    soft: "bg-panel-2 text-fg border border-hair hover:border-hair-strong active:scale-[0.98]",
  }[variant]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14.5px] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none ${
        full ? "w-full" : ""
      } ${styles} ${className}`}
    >
      {children}
    </button>
  )
}

export function Pill({
  children,
  tone = "dim",
}: {
  children: ReactNode
  tone?: "dim" | "verify" | "saffron" | "coral" | "sky" | "warn" | "deep-green"
}) {
  const map = {
    dim: "bg-white/5 text-fg-dim border-hair",
    verify: "bg-verify/12 text-verify border-verify/30",
    saffron: "bg-saffron/12 text-saffron-soft border-saffron/30",
    coral: "bg-coral/15 text-coral-soft border-coral/35",
    sky: "bg-sky/15 text-sky border-sky/30",
    warn: "bg-warn/15 text-warn border-warn/30",
    "deep-green": "bg-emerald-deep/40 text-verify border-verify/30",
  }[tone]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-medium tracking-wide ${map}`}
    >
      {children}
    </span>
  )
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-3xl border border-hair bg-panel/85 backdrop-blur-md transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  )
}
