import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#23483D",
};

export const metadata: Metadata = {
  title: {
    template: "%s | AKAR (Arsip Kisah dan Aksara Rakyat)",
    default: "AKAR (Arsip Kisah dan Aksara Rakyat): Merawat Cerita, Menghubungkan Generasi",
  },
  description:
    "AKAR adalah ruang dokumentasi cerita lokal yang mempertemukan bahasa Sunda dan bahasa Indonesia melalui teks, rekaman suara, dan konteks budaya di Purwakarta.",
  icons: {
    icon: "/illustrations/logo-akar.svg",
    apple: "/illustrations/logo-akar.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${lora.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-ink font-sans selection:bg-forest/15 selection:text-forest">
        <SkipLink />
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col focus:outline-none" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
