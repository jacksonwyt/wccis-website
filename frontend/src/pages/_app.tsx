// frontend/src/pages/_app.tsx
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ErrorBoundary>
      <div className="bg-futuristic-bg min-h-screen">
        <Component {...pageProps} />
      </div>
    </ErrorBoundary>
  );
}

export default MyApp;
