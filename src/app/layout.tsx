import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SubscribeProvider } from "@/components/SubscribeContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlobalOverlays } from "@/components/GlobalOverlays";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Kreya Branding — Global Industry Intelligence & Weekly Newsletter Platform",
    template: "%s | Kreya Branding",
  },
  description:
    "Every Monday, Kreya Branding distills the biggest breakthroughs in crop science, biologicals, AgTech, and global markets—and what they mean for agribusiness leaders.",
  keywords: [
    "Kreya Branding",
    "Agriculture Intelligence",
    "Crop Science Newsletter",
    "Biologicals",
    "AgTech",
    "B2B Agribusiness Briefing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F9F6F0] text-[#0D2B22] selection:bg-[#C85A32]/20 selection:text-[#0D2B22]">
        <SubscribeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <GlobalOverlays />
        </SubscribeProvider>
      </body>
    </html>
  );
}
