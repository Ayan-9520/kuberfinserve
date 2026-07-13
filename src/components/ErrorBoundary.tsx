import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) {
      // Dev-only diagnostics
      void error
      void info
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] items-center justify-center px-4 py-16">
          <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-red-600" aria-hidden />
            <h1 className="mt-4 font-heading text-xl font-bold text-navy-900">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-600">
              We encountered an unexpected error. Please refresh the page or return home.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Refresh page
              </button>
              <Link
                to="/"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-navy-900"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
