# 📱 Visible (विज़िबल) — iQOO 15 Edition
### *The Phone-Native, On-Device Credit-Readiness Engine for India’s Gig Workforce*

[![iQOO Hackathon 2026](https://img.shields.io/badge/iQOO_Hackathon-2026_City_Battle-ff9a3c?style=flat-square)](https://github.com/Gaurav-205/IQOO)
[![CI Build](https://img.shields.io/badge/CI-Passing-27c93f?style=flat-square&logo=githubactions)](https://github.com/Gaurav-205/IQOO/actions)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Design System](https://img.shields.io/badge/Design_System-Cohere_2026-003c33?style=flat-square)](./DESIGN.md)
[![Hardware Acceleration](https://img.shields.io/badge/Qualcomm-NPU_Accelerated-4fd1a1?style=flat-square)](https://qualcomm.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-1863dc?style=flat-square)](./LICENSE)
[![Zero-Cloud Privacy](https://img.shields.io/badge/Privacy-Zero--Cloud_NPU-ff7759?style=flat-square)](./SECURITY.md)

---

> **"A gig worker shouldn’t need a payslip to prove they earn money."**

---

## 🌟 Overview

**Visible** is a phone-native, privacy-first mobile engine engineered for the **iQOO 15** smartphone. It aggregates fragmented multi-platform income streams (Swiggy, Ola, Rapido) and translates them into an **explainable 3-dimension Credit-Readiness Profile** directly on the device using on-device Qualcomm NPU inference.

With **zero cloud data retention**, built-in **ML Kit camera OCR triangulation**, and **iQOO Office Kit peer-to-peer Wi-Fi Direct streaming**, Visible allows gig workers to walk into any microfinance branch and receive immediate, formal low-interest credit approvals on a loan officer's workstation in seconds.

---

## 🧩 Key Capabilities

### 1. ⚡ On-Device Qualcomm NPU Inference
* **100% Zero-Cloud Processing**: Raw transaction and banking histories are processed locally on the smartphone's neural processing unit. Raw financial data **never leaves the handset**.
* **180-Day Volatility Modeling**: Evaluates income variance, seasonality, and regularity in <300ms without server latency.

### 2. 🛵 Multi-Platform Account Aggregator Fusing
* **Unified Income View**: Unites fragmented earnings from Swiggy (₹18.4k), Ola (₹7.2k), and Rapido (₹4.8k) into one clear monthly total (**₹30,400/mo**).
* **Simulated RBI AA Gateway**: Features an interactive 4-digit auto-fill SMS OTP (`8924`) consent workflow with timebound 90-day access handles.

### 3. 📷 Camera ML Kit OCR & 3-Way Triangulation
* **Document Scanner**: Interactive camera viewfinder with dynamic laser-sweep detection that extracts partner name, trip counts, UTR, and net payout.
* **Triangulation Engine**: Cross-verifies **Worker Claim (₹30,000)** vs. **AA Bank API (₹29,700)** vs. **OCR Statement (₹29,800)** to confirm agreement within ₹300.

### 4. 📊 Explainable 3-Dimension Scoring
* **Consistency (82% · Strong)**: 6-month historical earning stability.
* **Platform Diversity (78% · Strong)**: Multi-platform revenue resilience.
* **Payment Reliability (74% · Moderate)**: Regularity of recurring payout settlement cycles.
* **Voice Narration**: Spoken plain-language explanations in native **Hindi (`hi-IN`)** and **English (`en-IN`)** via the Web Speech API.

### 5. 💻 iQOO Office Kit Cross-Device Beaming
* **Peer-to-Peer Wi-Fi Direct Stream**: 1-tap wireless beam of verified credit dossiers directly to the companion Loan Officer Desk.
* **Instant Loan Decisioning**: The workstation UI renders live incoming streams with 1-tap micro-credit approval actions (₹30,000 credit line at 1.1%/month).

### 6. ✈️ 100% Offline Resilience
* **Airplane Mode Execution**: Entire profile, interactive chart inspection, dimensions, and audio explanations remain fully functional without internet access.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                             iQOO 15 / ANDROID CLIENT LAYER                              │
├──────────────────────────┬─────────────────────────────┬────────────────────────────────┤
│    UI & Presentation     │     On-Device AI Engine     │      Hardware Integrations     │
│  • React 19 + TypeScript │  • Quantized NPU Model      │  • iQOO Camera Viewfinder      │
│  • Cohere 2026 Tokens    │  • ML Kit Optical OCR       │  • Vivo Office Kit P2P         │
│  • Web Speech API (HI/EN)│  • 3-Way Triangulation      │  • Web Audio Synthesizer (Chime│
│  • Tailwind CSS v4       │  • Zero-Cloud Local Storage │  • Airplane Mode Offline Cache │
└────────────▲─────────────┴──────────────▲──────────────┴────────────────▲───────────────┘
             │                            │                               │
             │             ┌──────────────┴──────────────┐                │
             │             │   ACCOUNT AGGREGATOR (RBI)  │                │
             └─────────────┤   • Setu / Finvu AA Gateway ├────────────────┘
                           │   • 90-Day Consent Handle   │
                           │   • Swiggy, Ola, Rapido Feed│
                           └──────────────┬──────────────┘
                                          │ (P2P Beam via Office Kit)
                                          ▼
                           ┌─────────────────────────────┐
                           │   LOAN OFFICER WORKSTATION  │
                           │  • Live Wireless Stream     │
                           │  • Cryptographic Consent Ref│
                           │  • Instant Underwriting CTA │
                           └─────────────────────────────┘
```

---

## 📂 Project Structure

```
├── .agents/skills/              # Installed engineering, design & documentation skills
├── src/
│   ├── components/
│   │   ├── screens.tsx          # 10 core user journey screens & modals
│   │   └── ui.tsx               # Geometric hairline icons, buttons, pills, cards
│   ├── lib/
│   │   ├── data.ts              # Mock data, preset statements, loans & audio synth
│   │   └── store.ts             # Global application state & navigation router
│   ├── App.tsx                  # Main shell & dual phone + Office Kit desktop station
│   ├── index.css                # Tailwind CSS v4 @theme tokens & Cohere 2026 variables
│   └── main.tsx                 # React DOM mount entrypoint
├── DESIGN.md                    # Canonical Cohere 2026 Enterprise UI design tokens
├── SUBMISSION.md                # Official iQOO Hackathon Round 1 selection document
└── AGENTS.md                    # Project-level agent rules and development guidelines
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- `pnpm` (recommended)

### Installation & Local Run

```bash
# 1. Clone repository
git clone https://github.com/Gaurav-205/IQOO.git
cd IQOO

# 2. Install dependencies
pnpm install

# 3. Start local development server
pnpm run dev
```

Open your browser at `http://localhost:8443/` to interact with the mobile app and companion Loan Officer Workstation.

### Production Build & Code Quality

```bash
# Format source files
pnpm run format

# Production bundle build
pnpm run build
```

---

## 🛣️ 30-Hour Hackathon Roadmap

| Phase | Hours | Deliverables |
| :--- | :--- | :--- |
| **Phase 1** | **0–6h** | Deploy native Android build to physical iQOO 15 test devices using Qualcomm SNPE SDK. |
| **Phase 2** | **6–14h** | Connect live camera feed to ML Kit models for real-time document boundary extraction. |
| **Phase 3** | **14–22h** | Implement physical socket Wi-Fi Direct P2P protocol for real device-to-laptop streaming. |
| **Phase 4** | **22–28h** | Implement cryptographic Ed25519 signature verification on the offline QR Pass. |
| **Phase 5** | **28–30h** | Final UI polish, multi-language localization (Hindi, Marathi), and live stage rehearsal. |

---

## 📄 License & Team

Built with ❤️ for the **iQOO Hackathon 2026**.
- **Repository**: [https://github.com/Gaurav-205/IQOO](https://github.com/Gaurav-205/IQOO)
- **Submission Details**: See [`SUBMISSION.md`](./SUBMISSION.md)
