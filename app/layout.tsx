import "./globals.css";
// Self-hosted variable font — no runtime dependency on external font CDNs,
// so builds succeed offline and visitors' browsers make no third-party
// font requests.
import "@fontsource-variable/manrope/index.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AntGRP — IT Consulting & Technology Staffing",
  description:
    "AntGRP provides IT consulting and technology staffing across cloud, data, AI, and enterprise software. Scoped engagements, vetted specialists, and clear accountability.",
  metadataBase: new URL("https://antgrp.com"),
  openGraph: {
    title: "AntGRP — IT Consulting & Technology Staffing",
    description:
      "IT consulting and technology staffing across cloud, data, AI, and enterprise software. Scoped engagements, vetted specialists, and clear accountability.",
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
      <body className="min-h-screen flex flex-col bg-white text-ink antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
