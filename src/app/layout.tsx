import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './bootstrap.rtl.min.css';
import Header from "./header/page";
import localFont from 'next/font/local';
import { Analytics } from "@vercel/analytics/react";
import Footer from "./footer/page";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SessionWrapper from "@/components/SessionWrapper";
import { GoogleAnalytics } from '@next/third-parties/google';
import { ContextProvider } from './context/appContext';
import 'react-toastify/dist/ReactToastify.css';
import FooterNav from "./components/footerNav";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './context/AuthContext';
import ChatBot from './components/ChatBot/ChatBot';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "על המקום",
  description: "על המקום היא פלטפורמה לקידום והכרת המקום בו אתם חיים וגרים. כאן תוכלו למצוא מידע על השכונה שלכם, על המ�[...] 
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
});

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
            <AuthProvider>
              <Toaster position="top-center" />
              <Header />
              {children}
              <FooterNav />
              <Footer />
              {/* <ChatBot /> */}
            </AuthProvider>
            <Analytics />
            <SpeedInsights />
            <script src="https://cdn.enable.co.il/licenses/enable-L29851bpdrqshwli-0824-64368/init.js"></script>
            <script dangerouslySetInnerHTML={{ __html: `
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:5212525,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            ` }} />
          </ContextProvider>
        </body>
        <GoogleAnalytics gaId="G-7P3W0FCXJ2" />
      </html>
    </SessionWrapper>
  );
}
