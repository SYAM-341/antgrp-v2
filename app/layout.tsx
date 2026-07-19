import "./globals.css";
// Self-hosted variable fonts — no external font CDNs at build or runtime.
import "@fontsource-variable/source-sans-3/index.css";
import "@fontsource-variable/source-serif-4/index.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "AntGRP — IT Consulting & Technology Staffing",
  description:
    "AntGRP provides IT consulting and technology staffing across cloud, data, AI, and enterprise software. Scoped engagements, screened specialists, and clear accountability.",
  metadataBase: new URL("https://antgrp.com"),
  openGraph: {
    title: "AntGRP — IT Consulting & Technology Staffing",
    description:
      "IT consulting and technology staffing across cloud, data, AI, and enterprise software. Scoped engagements, screened specialists, and clear accountability.",
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
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
