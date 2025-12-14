import "./globals.css";
import { Inter } from "next/font/google";
import { LoadingProvider } from "@/services/loading";
import PageWrapper from "@/components/atoms/PageWrapper/PageWrapper";
import Loading from "@/components/atoms/Loading/Loading";
import Navbar from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";
import PWARegister from "@/utils/pwa";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Telco",
  description: "A Telcom Products Recommendation Website",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#7200B5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />

        {/* Modern install meta */}
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Apple PWA support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />
      </head>

      <body className={`${inter.variable} min-h-screen flex flex-col`}>
        {/* Service Worker registration */}
        <PWARegister />

        <Navbar />

        <LoadingProvider>
          <div className="relative flex-1">
            <Loading />

            <PageWrapper>
              <main className="px-4 sm:px-6 md:px-12 lg:px-20 py-4 max-w-[800px] mx-auto flex flex-col items-center gap-4">
                {children}
              </main>
            </PageWrapper>
          </div>
        </LoadingProvider>

        <Footer />
      </body>
    </html>
  );
}