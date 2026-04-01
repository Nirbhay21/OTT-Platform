import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chitrapat | Premium OTT Platform",
  manifest: "/manifest.webmanifest",
  description:
    "Experience the latest trending movies and TV shows from around the world on Chitrapat OTT.",
  keywords: [
    "movies",
    "TV shows",
    "streaming",
    "Chitrapat",
    "OTT",
    "entertainment",
  ],
  authors: [{ name: "Chitrapat Team" }],
  icons: {
    icon: [
      { url: "/icon-192.svg", type: "image/svg+xml", sizes: "192x192" },
      { url: "/icon-512.svg", type: "image/svg+xml", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Chitrapat | Premium OTT Platform",
    description:
      "Experience the latest trending movies and TV shows on Chitrapat OTT.",
    type: "website",
    locale: "en_US",
    siteName: "Chitrapat OTT",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased selection:bg-brand-primary/30 selection:text-brand-primary`}
      >
        <div className="relative flex min-h-screen flex-col">
          <ServiceWorkerRegister />
          <Header />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <Footer />
          <MobileNavigation />
        </div>
      </body>
    </html>
  );
}
