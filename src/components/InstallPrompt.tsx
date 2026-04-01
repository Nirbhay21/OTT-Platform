"use client";

import { useEffect, useMemo, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isIosDevice(userAgent: string) {
  return /iphone|ipad|ipod/i.test(userAgent);
}

function isInStandaloneMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  );
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === "undefined") return false;
    return isInStandaloneMode();
  });
  const [isIos] = useState(() => {
    if (typeof window === "undefined") return false;
    return isIosDevice(window.navigator.userAgent);
  });
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const canShowAndroidPrompt = useMemo(
    () => !isInstalled && !isIos && !dismissed && Boolean(deferredPrompt),
    [deferredPrompt, dismissed, isInstalled, isIos],
  );

  const canShowIosHint = useMemo(
    () => !isInstalled && isIos && !dismissed,
    [dismissed, isInstalled, isIos],
  );

  if (!canShowAndroidPrompt && !canShowIosHint) {
    return null;
  }

  const installApp = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setDismissed(true);
  };

  return (
    <div className="fixed inset-x-3 bottom-20 z-50 rounded-xl border border-white/15 bg-black/85 p-3 text-white shadow-2xl backdrop-blur md:bottom-4 md:left-auto md:right-4 md:w-80">
      {canShowAndroidPrompt ? (
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs leading-5 text-zinc-200">
            Install Chitrapat for faster access and app-like experience.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDismissed(true)}
              className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-300 transition hover:bg-white/10"
            >
              Later
            </button>
            <button
              onClick={installApp}
              className="rounded-md bg-brand-primary px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-black transition hover:brightness-110"
            >
              Install
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs leading-5 text-zinc-200">
            To install on iPhone: tap Share, then Add to Home Screen.
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-300 transition hover:bg-white/10"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
