// frontend/src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-futuristic-bg">
            <div className="max-w-md w-full p-6 bg-futuristic-surface rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
              <p className="text-futuristic-light mb-4">
                An unexpected error occurred. Please refresh the page or contact support.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-futuristic-accent text-futuristic-bg px-4 py-2 rounded hover:bg-futuristic-accent/90 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
