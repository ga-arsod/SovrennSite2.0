"use client";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";
import Navbar from "@/components/Home/Navbar";
import NavbarStrip from "@/components/Home/NavbarStrip";
import { Providers } from "./Redux/provider";
import Footer from "../components/Home/Footer";
import Script from "next/script";
import { logPageView } from "../components/GoogleAnalytics/Google-analytics";
import { useSelector } from "react-redux";

const inter = Inter({
  weight: ["200"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  useEffect(() => {
    logPageView();
  }, []);

  
  useEffect(() => {
    let metaTag = document.querySelector("meta[name='viewport']");
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = "viewport";
      metaTag.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(metaTag);
    } else {
      metaTag.content = "width=device-width, initial-scale=1.0";
    }
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-XZ03T8GLC4`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XZ03T8GLC4');
      `}
      </Script>

      <Script
        id="analytics-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5822WLDD');`,
        }}
      />

      <ThemeProvider theme={theme}>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </ThemeProvider>
    </>
  );
}


function AppLayout({ children }) {
  const  isLoading  = useSelector((state) => state.loading);
  const  {loadingStarted} = useSelector((state) => state.loading);
 console.log(isLoading,"loading")
  return (
    <html lang="en">
      <body className={inter.className}>
      <div style={{
    height: "100vh",
    overflowY: "auto",
    overflowX: "hidden", 
    maxWidth: "100vw", 
  }}>
        <NavbarStrip />
        <Navbar />
        {children}
        {loadingStarted && !isLoading?.count === 0 && <Footer />}

        </div>
      </body>
    </html>
  );
}
