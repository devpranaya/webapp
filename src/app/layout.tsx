import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteShell from "@/components/site-shell";
import { PERSONAL_INFO } from "@/lib/personal-info";
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
  title: "Interactive Activity Builder",
  description:
    "Configure activity tabs and export inline HTML + JavaScript for the LMS.",
  authors: [{ name: PERSONAL_INFO.name }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
