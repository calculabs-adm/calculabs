import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/consent/CookieConsent";
import GtmLoader from "@/components/consent/GtmLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.calculabs.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CalcuLabs | Calculadoras Online Gratuitas",
    template: "%s | CalcuLabs",
  },
  description:
    "CalcuLabs: mais de 5.000 calculadoras online gratuitas organizadas por categorias. Matemática, Finanças, Saúde, Engenharia e muito mais.",
  keywords: [
    "calculadoras online",
    "calculadora gratuita",
    "portal calculadoras",
    "calculadora financeira",
    "calculadora matemática",
    "calculadora saúde",
  ],
  authors: [{ name: "CalcuLabs" }],
  creator: "CalcuLabs",
  publisher: "CalcuLabs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "CalcuLabs",
    title: "CalcuLabs | Calculadoras Online Gratuitas",
    description:
      "Mais de 5.000 calculadoras online gratuitas. Matemática, Finanças, Saúde, Engenharia e muito mais.",
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "CalcuLabs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcuLabs | Calculadoras Online Gratuitas",
    description: "Mais de 5.000 calculadoras online gratuitas.",
    images: [`${siteUrl}/og-image.svg`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GtmLoader />
        <CookieConsent />
      </body>
    </html>
  );
}
