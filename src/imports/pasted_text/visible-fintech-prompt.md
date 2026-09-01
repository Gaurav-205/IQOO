Build a polished, highly creative frontend MVP for a fintech product called "Visible".

PRODUCT
Visible is a phone-native Credit-Readiness Profile for gig/platform workers in India.

Core idea:
"A gig worker shouldn't need a payslip to prove they earn money."

Visible takes consented financial data, combines income across gig platforms, analyses it privately on-device, verifies income using the camera, creates an explainable Credit-Readiness Profile, and lets the worker share that profile with a lender.

This is a frontend MVP for now. It should be fully interactive and functional using realistic mocked/simulated data. Do NOT build real backend integrations yet.

IMPORTANT:
Do not simply create a generic fintech dashboard.
Design this like a product that could genuinely win a major mobile hackathon.

You have creative freedom over:
- visual language
- layout
- navigation
- animations
- transitions
- information hierarchy
- component design
- how the workflow is presented
- how the phone-native experience feels

Use the product requirements below as constraints, but decide the best UX yourself.

CORE USER FLOW

1. Welcome / onboarding
Introduce Visible quickly and emotionally.
Make the user understand:
- their income already exists
- it is fragmented across platforms
- Visible turns it into something understandable to lenders

2. Consent
Create an interactive financial-data consent experience.

Show clearly:
- what data is being accessed
- why it is needed
- how long it is used
- who can receive the resulting profile
- ability to revoke consent

Support:
- Hindi
- English
- Hindi voice narration (simulate with browser/device speech if appropriate)

Make consent feel trustworthy and transparent rather than like a boring permissions screen.

3. Connect income sources
Simulate Account Aggregator connections.

Show multiple gig platforms such as:
- Swiggy
- Ola
- Urban Company
- Rapido

The important experience is that income from multiple platforms becomes one unified financial picture.

Use realistic mocked transaction/income data.

Example:
Swiggy → ₹18,400
Ola → ₹7,200
Rapido → ₹4,800

Show the aggregation happening visually.

4. Income analysis
Create a compelling analysis experience.

Show:
- 6-month income history
- monthly income
- income consistency
- platform diversity
- payment reliability
- best/worst month
- trend
- number of platforms
- months analysed

The analysis should feel intelligent and dynamic rather than like a spreadsheet.

Simulate on-device/NPU processing with a short but polished interaction.

Make it clear that raw financial data stays on the device.

5. Camera income verification
Create an interactive camera/document verification experience.

The user should be able to:
- open a simulated camera
- scan a payout statement/document
- see OCR extraction
- confirm the extracted income
- compare:
  claimed income
  AA-derived income
  document income

Example:
Claimed: ₹30,000
AA: ₹29,700
Document: ₹29,800

Then produce:
"Income Verified"

Do not use rent receipts, utility bills, or handwritten documents.
This feature is specifically for verifying gig income.

6. Credit-Readiness Profile
This is the hero result.

Create a beautiful profile showing:

Income Consistency
Platform Diversity
Payment Reliability

Each should have:
- rating
- visual representation
- plain-language explanation
- Hindi explanation where appropriate

Also show:
- verified income
- number of platforms
- months analysed
- verification status
- profile generation date

Do NOT use a CIBIL-style 300–850 score.

The product is a Credit-Readiness Profile, not a credit score.

If you include a central visual, make it communicate "financial readiness/trust" rather than pretending to be an official credit score.

7. Explainability
The user should be able to understand WHY their profile looks the way it does.

For example:

Income Consistency
STRONG

"Pichle 6 mahine mein aapki income relatively stable rahi."

Platform Diversity
STRONG

"Aapki income 3 platforms se aa rahi hai."

Payment Reliability
MODERATE

"Your successful recurring payments show generally consistent behaviour."

Make the explanations feel human and understandable.

8. Offline mode
Include an obvious interactive moment demonstrating that after financial data has been fetched, the profile can still be generated/viewed offline.

You can simulate airplane mode or an offline state creatively.

The experience should communicate:
"Your financial profile still works without internet."

9. Share with Loan Officer
This should be one of the strongest moments in the entire app.

Create a "Share to Loan Officer" interaction.

Simulate iQOO Office Kit / cross-device sharing.

Show the profile moving from the worker's phone to a connected laptop/desktop.

The desktop should display:
- worker profile
- three dimensions
- verified income
- platforms
- months analysed
- verification status
- timestamp
- consent reference

Make this feel like a futuristic but believable cross-device interaction.

10. Consent management
Include a settings/privacy area where the worker can:
- see active consent
- see previous consent records
- view expiry
- revoke consent
- delete local financial data

Make privacy feel like part of the product, not an afterthought.

VISUAL DIRECTION

Create a premium, modern fintech product with a strong mobile-first identity.

It should feel:
- trustworthy
- futuristic
- intelligent
- calm
- premium
- privacy-conscious
- distinctly Indian without relying on clichés

Avoid:
- generic banking dashboards
- excessive cards everywhere
- generic gradients
- cheesy AI visuals
- stock illustrations
- unnecessary charts
- overly corporate enterprise UI
- clutter

Use thoughtful motion and micro-interactions where they improve the experience.

The phone should feel like the PRODUCT, not merely a website displayed inside a phone frame.

DESIGN SYSTEM

Create a cohesive design system automatically:
- typography
- spacing
- colors
- borders
- shadows
- radii
- icons
- buttons
- cards
- charts
- status states
- loading states
- success/error states

Use high-quality icons and visual assets.

RESPONSIVENESS

The primary experience should be designed for the iQOO 15 / Android phone.

Also create a convincing desktop/laptop experience for the Office Kit lender view.

The desktop should feel like a separate but connected product surface.

FUNCTIONALITY

This is a frontend-only MVP.

Use mocked local data and state.

Every major interaction should actually work:
- onboarding
- consent
- platform connection
- aggregation
- analysis/loading
- camera simulation
- OCR result
- profile generation
- profile explanation
- Hindi/English switching
- voice narration where possible
- offline simulation
- share-to-laptop interaction
- consent revocation
- local data deletion

No fake buttons that do nothing.

Use clean component architecture and realistic application state.

TECHNICAL

Use React + TypeScript + Vite unless the existing project dictates otherwise.

Use modern frontend patterns and keep the code maintainable.

No backend is required yet.

Mock external services behind clean interfaces so real:
- Account Aggregator
- Qualcomm/NPU inference
- ML Kit
- Office Kit

can be connected later without redesigning the frontend.

MOST IMPORTANT

Do not treat this as a collection of screens.

Treat it as ONE STORY:

A gig worker has income.
That income is fragmented.
Visible understands it.
Visible verifies it.
Visible explains it.
The worker owns it.
The worker can take it to a lender.

Make that story obvious through the UX.

The final result should feel like:
"Someone built a real fintech product around one very specific problem."

Prioritize product quality and demo impact over implementing unnecessary features.