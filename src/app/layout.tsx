import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './bootstrap.min.css';
import Header from "./header/page";
import localFont from 'next/font/local'
import { Analytics } from "@vercel/analytics/react"
import Footer from "./footer/page";
import { SpeedInsights } from "@vercel/speed-insights/next"
import SessionWrapper from "@/components/SessionWrapper";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "רמות אונליין",
  description: "כל המידע על השכונה שלך!",
};



const assistantFont = localFont({
  src: [
    {
      path: '../../public/fonts/assistant/Assistant-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/assistant/Assistant-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/assistant/Assistant-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" className={assistantFont.className}>
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
          {/* <script src="./nagishli_beta.js"></script> */}
        </body>
        <GoogleAnalytics gaId="G-7P3W0FCXJ2" />
      </html>
    </SessionWrapper>
  );
}
