import express from "express"
import { apiHandlers } from "./api"

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())

// REST API Endpoints
app.get("/api/health", apiHandlers.getHealth)
app.get("/api/profile", apiHandlers.getProfile)
app.post("/api/consent/grant", apiHandlers.grantConsent)
app.post("/api/consent/revoke", apiHandlers.revokeConsent)
app.post("/api/connect/link", apiHandlers.linkPlatform)
app.post("/api/connect/verify-otp", apiHandlers.verifyOtp)
app.post("/api/npu/analyze", apiHandlers.analyzeIncome)
app.post("/api/ocr/verify", apiHandlers.verifyOcr)
app.post("/api/share/beam", apiHandlers.beamProfile)
app.post("/api/privacy/wipe", apiHandlers.wipeData)
app.post("/api/privacy/restore", apiHandlers.restoreData)

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`[Visible Backend] Server listening on http://localhost:${PORT}`)
  })
}

export default app
