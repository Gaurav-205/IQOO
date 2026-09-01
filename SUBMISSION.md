# 🚀 iQOO Hackathon 2026 — Official Round 1 Submission Document

# Project Name: **VISIBLE (विज़िबल)**
### *The Phone-Native, On-Device Credit-Readiness Profile for India’s Gig Workforce*

---

## 📌 Submission Snapshot

- **Track**: Fintech · On-Device AI · Hardware-Software Ecosystem
- **Target Audience**: 15 Million+ Gig & Platform Workers in India (Swiggy, Zomato, Ola, Rapido, Urban Company)
- **Repository URL**: [https://github.com/Gaurav-205/IQOO.git](https://github.com/Gaurav-205/IQOO.git)
- **Design Specification**: Cohere 2026 Enterprise AI Design Language ([`DESIGN.md`](./DESIGN.md))
- **Live MVP Status**: 100% Functional React 19 + TypeScript + Tailwind CSS v4 prototype with On-Device Qualcomm NPU simulation, ML Kit OCR camera verification, and iQOO Office Kit P2P wireless beaming to lender workstation.

---

```
                               THE VISIBLE JOURNEY
Idea ────────► Thought Process ────────► Architecture ────────► Working MVP ────────► 30-Hour Build
(Zero Payslip)   (On-Device NPU)       (AA + Local OCR)      (React 19 + Desk)     (Hardware P2P)
```

---

## 1. Problem: What Exactly Are We Solving, and For Whom?

India has over **15 million gig and platform workers** who earn reliable daily and monthly income across food delivery, ride-hailing, parcel logistics, and home services.

When a gig worker walks into a bank or NBFC for a small loan (e.g. ₹30,000 for emergency medical costs, bike repair, or child school fees), **they are systematically rejected**.

### The 4 Structural Barriers:
1. **The Payslip Exclusion**: Traditional underwriting systems require formal salary slips, Form 16, or salary credit bank statements. Gig workers receive weekly or daily digital settlements, not a monthly salary slip.
2. **Fragmented Multi-Platform Income**: A typical worker might earn ₹18,400 on Swiggy, ₹7,200 on Ola, and ₹4,800 on Rapido. No single platform reflects their true total earnings of **₹30,400/month**.
3. **The Credit Bureau Blindspot**: Credit bureaus (CIBIL 300–850) score past debt repayment, not current earning capability. A gig worker with no prior credit history is classified as "New to Credit" (NTC/N/A), locking them out of formal banking and driving them to predatory loan sharks charging 5%–10% interest per month.
4. **Data Privacy & Surveillance Anxiety**: Workers distrust uploading unencrypted bank statements and identity documents to mysterious cloud servers where data might be leaked or sold.

---

## 2. Your Idea: What Are We Proposing?

We propose **Visible** — a phone-native, privacy-first mobile engine that transforms fragmented gig earnings into an **explainable, tamper-evident Credit-Readiness Profile** directly on the worker’s **iQOO smartphone**.

Rather than outputting a black-box 300–850 number, Visible analyzes 6 months of historical transactions on-device to produce an **explainable 3-factor readiness score (0–100%)**:
1. **Income Consistency (82% · Strong)**: Measures earning stability over 180 days, ensuring no sharp, unexplained collapses.
2. **Platform Diversity (78% · Strong)**: Validates multi-stream resilience (e.g. if food delivery dips during monsoons, ride-hailing compensates).
3. **Payment Reliability (74% · Moderate)**: Analyzes settlement cycle adherence and recurring transaction frequency.

All insights are presented in plain language with complete **English and Hindi voice narration** (`Web Speech API`).

---

## 3. USP: What Makes Our Approach Different or Better?

| Dimension | Traditional Lending Apps (KreditBee, MoneyTap) | Visible (iQOO-Native Engine) |
| :--- | :--- | :--- |
| **Compute Location** | 100% Cloud Server (all data uploaded & retained) | **100% On-Device NPU**: Raw financial records never leave the phone. |
| **Scoring Model** | Opaque CIBIL/Experian bureau score | **Explainable 3-Dimension Readiness Profile** with plain-language voice feedback. |
| **Income Verification** | Manual PDF upload, payslips, bank crawling | **Triangulation Engine**: Fuses RBI Account Aggregator + Camera ML Kit OCR statement extraction. |
| **Data Sharing** | Clunky email attachments, paper printouts | **iQOO Office Kit Wireless P2P Beam**: Direct Wi-Fi Direct encrypted stream to the loan officer's laptop. |
| **Consent & Control** | Permanent cloud storage, third-party marketing | **Timebound 90-Day RBI Consent + 1-Tap Local Data Wipe**. |
| **Network Dependence**| Requires active internet connection | **Offline-First Resilience**: Full profile renders in Airplane Mode. |

---

## 4. Phone-First Thinking & iQOO Device Integration

Visible is not merely an app displayed on a phone; **the iQOO smartphone is the compute engine, the trust boundary, and the communication bridge**.

### A. The Phone as the Privacy Trust Boundary
In traditional fintech, users must send private bank data to a cloud server to receive credit scoring. In Visible, the **iQOO phone acts as a secure cryptographic vault**. The raw bank transactions are processed on-device; only the high-level readiness tokens are shared when the worker explicitly chooses to beam them.

### B. Qualcomm NPU Hardware Acceleration
* **Local Feature Extraction**: The phone’s NPU runs a quantized time-series model analyzing 180-day income vectors (mean, variance, seasonality, payout regularity) entirely offline in under 300ms.
* **Zero Cloud Latency & Zero Battery Drain**: Offloading computation from CPU to NPU ensures fluid 120Hz UI responsiveness and negligible power consumption.

### C. On-Device Vision & ML Kit OCR
* **Camera Verification Viewfinder**: Uses the iQOO camera with high-speed on-device text recognition (ML Kit) to scan digital/paper payout summaries from Swiggy/Ola.
* **3-Source Data Triangulation**: Cross-checks **Worker Claim (₹30,000)** vs. **Account Aggregator Data (₹29,700)** vs. **OCR Statement (₹29,800)** to confirm agreement within ₹300, producing a cryptographic **"Income Verified"** stamp.

### D. Vivo / iQOO Office Kit Cross-Device Sharing
* **Seamless Desk Interaction**: When sitting at a microfinance branch, the worker taps **"Beam Profile"**.
* **P2P Wi-Fi Direct Protocol**: Using iQOO Office Kit protocol, the phone beams an AES-256 encrypted readiness dossier directly to the loan officer's desktop workstation.
* **Instant Decisioning**: The desktop station immediately displays the triangulated income, dimension breakdown, and one-tap **"Pre-Approve ₹30,000 Micro-Loan"** action.

---

## 5. Technical Architecture

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

## 6. Working MVP / Prototype (What We Have Already Built)

We have built a working prototype demonstrating the complete end-to-end journey:

1. **Emotional Onboarding**: Converging visual income orb uniting Swiggy (₹18.4k), Ola (₹7.2k), and Rapido (₹4.8k) into one unified income (₹30.4k/mo).
2. **Transparent Consent**: Granular purpose tags, 90-day timebound expiration, and bilingual voice briefing.
3. **Simulated Account Aggregator Flow**: Individual/batch connection with simulated SMS OTP (`8924`) gateway authorization.
4. **On-Device NPU Visualizer**: 6-month historical bar chart with interactive month-by-month inspector and consistency analysis.
5. **Camera OCR Scanner**: Simulated laser-sweep document scanner extracting partner name, order counts, UTR, and net payout with 3-source triangulation table.
6. **Credit-Readiness Profile**: Dynamic Readiness Ring (78%), 3 dimension drill-downs with plain-language explanations in English and Hindi (`Hind` typography).
7. **Bilingual Audio Synthesis**: Web Speech API integration that speaks audio explanations in native Hindi (`hi-IN`) and English (`en-IN`).
8. **Simulated Airplane Mode**: Dynamic toggle demonstrating full profile accessibility without internet.
9. **iQOO Office Kit Cross-Device Station**: Twin workstation UI showing live wireless beam packets arriving on the loan officer's laptop with instant pre-approval workflow.
10. **Privacy Control Center**: Audit trail of active consent tokens (`CN-90D-A14`), consent revocation, and 1-tap local data erasure.
11. **Loan Offer Simulator & QR Pass**: Pre-approved micro-loans (₹30k working capital, ₹60k EV scooter upgrade loan) with EMI calculation and verifiable QR Pass.

---

## 7. Usefulness & Impact

* **For the Gig Worker**: Access to formal low-interest micro-credit (1%–1.5%/month) within minutes instead of borrowing from informal moneylenders at 5%–10%/month.
* **For Lenders (Banks / NBFCs)**: A new market of **15M+ underserved borrowers** with verified multi-source cashflow, drastically reducing default rates without manual document collection costs.
* **For iQOO / Vivo**: Showcases the iQOO phone not just as a gaming/powerhouse device, but as an **enterprise-grade financial empowerment engine** leveraging the Qualcomm NPU, camera precision, and Office Kit cross-device superiority.

---

## 8. Scalability: Beyond the Hackathon Prototype

```
[Phase 1: Hackathon]       [Phase 2: Alpha Pilot]         [Phase 3: Nationwide Scale]
• On-device scoring        • Real AA sandbox (Setu/Finvu) • Partnership with NBFCs
• Office Kit P2P demo      • Live ML Kit Android Native   • Expansion to Kirana store owners,
• Swiggy / Ola / Rapido    • Pilot with 500 Pune couriers   freelancers, and rural creators
```

---

## 9. 30-Hour Hackathon Roadmap (Execution Plan)

| Timeframe | Phase | Deliverables |
| :--- | :--- | :--- |
| **Hours 0–6** | **Real Device Hardware Wiring** | Deploy native Android build to physical iQOO 15 test devices using Android Studio + Qualcomm Neural Processing SDK (SNPE). |
| **Hours 6–14** | **Live ML Kit & Camera Pipeline** | Hook up live camera video stream with real-time bounding box extraction on actual physical paper payout slips. |
| **Hours 14–22** | **Real Office Kit / Wi-Fi Direct P2P** | Implement physical socket / Wi-Fi Direct beam from iQOO 15 to a live laptop running the lender station. |
| **Hours 22–28** | **Lender Decisioning & Verifiable QR** | Implement cryptographic signature verification (Ed25519) on the generated QR Pass so lenders can verify validity offline. |
| **Hours 28–30** | **Final Polish & Live Demo Rehearsal** | Polish high-speed animations, voice narrations in Hindi/Marathi, and rehearse live end-to-end device-to-laptop beam. |

---

## 10. Team Composition & Roles

* **Lead Product & System Architect**: Full-stack architecture, state management, design systems, and financial product strategy.
* **On-Device AI & Hardware Engineer**: Qualcomm NPU optimization, ML Kit OCR integration, and device sensor pipelines.
* **UI/UX & Creative Engineering**: Micro-interactions, spring animations, bilingual typography, and accessibility.

---

## 🔗 Supporting Links & Artifacts

- **GitHub Repository**: [https://github.com/Gaurav-205/IQOO.git](https://github.com/Gaurav-205/IQOO.git)
- **Design System Tokens**: [`DESIGN.md`](./DESIGN.md)
- **Agent Guidelines**: [`AGENTS.md`](./AGENTS.md)
- **Live Local Prototype**: `http://localhost:8443/`

---
*Submitted for the iQOO Hackathon 2026 City Battle Selection.* 🚀
