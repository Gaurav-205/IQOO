import React, { Component, type ErrorInfo, type ReactNode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[Visible Runtime Error]:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center p-6 text-center bg-[#ffffff] text-[#17171c]">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fef3c7] text-[#b45309] border border-[#fde68a] mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h1 className="text-xl font-bold font-display">
            Something went wrong
          </h1>
          <p className="mt-2 text-[13px] text-[#616161] max-w-sm">
            Visible encountered an unexpected error. Your on-device data remains
            securely cached.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-full bg-[#17171c] text-[#ffffff] px-6 py-2.5 text-[13px] font-semibold hover:bg-black transition-colors cursor-pointer"
          >
            Reload Application
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
