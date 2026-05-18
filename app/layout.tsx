import "./globals.css";
import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AntGRP — Engineering Teams. Delivered.",
  description:
    "AntGRP is an American-owned professional services organization delivering enterprise-grade solutions across diverse industry sectors with a focus on reliability, compliance, and scale.",
  metadataBase: new URL("https://antgrp.com"),
  openGraph: {
    title: "AntGRP — Engineering Teams. Delivered.",
    description:
      "AntGRP is an American-owned professional services organization delivering enterprise-grade solutions across diverse industry sectors.",
    url: "https://antgrp.com",
    siteName: "AntGRP",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-ink antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
