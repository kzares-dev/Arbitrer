import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from "react-toastify";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from "next-client-cookies/server";
import AdSense from "@/components/AdSense";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <head>
        <Script
          id="Absence-banner"
          async
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9648691345908677"
          crossOrigin="anonymous"
        />
      </head>

      <body className={`bg-white-100 ${inter.className}`}>
        <NextTopLoader
          color="#4F4A45"
          height={4}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <CookiesProvider>
          {children}
          <AdSense pId="sacml" />
        </CookiesProvider>
      </body>
    </html>
  );
}
