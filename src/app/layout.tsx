import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsentWrapper from "@/components/consent/CookieConsentWrapper";
import AdsenseLoader from "@/components/ads/AdsenseLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://calculabs.com.br";

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
  icons: {
    icon: "/media/images/fivecon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WCJ4FLF7');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WCJ4FLF7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AdsenseLoader />
        <CookieConsentWrapper />
      </body>
    </html>
  );
}
