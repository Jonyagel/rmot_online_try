import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './bootstrap.rtl.min.css';
import Header from "./header/page";
import localFont from 'next/font/local'
import { Analytics } from "@vercel/analytics/react"
import Footer from "./footer/page";
import { SpeedInsights } from "@vercel/speed-insights/next"
import SessionWrapper from "@/components/SessionWrapper";
import { GoogleAnalytics } from '@next/third-parties/google'
import WeatherWidget from "./components/weatherWidget";
import { ContextProvider } from './context/appContext';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterNav from "./components/footerNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "קהילאפ",
  description: "הבית לקהילה שלי",
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
      <html lang="he" dir="rtl" className={assistantFont.className} >
        <body className={inter.className}>
          <ContextProvider>
            <Header />
            {children}
            <FooterNav />
            <WeatherWidget />
            <Footer />
            <Analytics />
            <SpeedInsights />
            {/* <script src="./nagishli_beta.js"></script> */}
            <script src="https://cdn.enable.co.il/licenses/enable-L29851bpdrqshwli-0824-62952/init.js"></script>
          </ContextProvider>
          {/* <ToastContainer position="top-right" autoClose={5000} /> */}
        </body>
        <GoogleAnalytics gaId="G-7P3W0FCXJ2" />
      </html>
    </SessionWrapper>
  );
}
