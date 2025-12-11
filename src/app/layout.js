import "./globals.css";
import { Inter } from "next/font/google";
import { LoadingProvider } from "@/services/LoadingPage";
import PageWrapper from "@/components/atoms/PageWrapper/PageWrapper";
import Loading from "@/components/atoms/Loading/Loading";
import Navbar from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Telco",
  description: "A Telcom Products Recommendation Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>

      <body className={`${inter.variable} min-h-screen flex flex-col`}>
        <Navbar />

        <LoadingProvider>
          {/* This wrapper holds page content AND loading overlay */}
          <div className="relative flex-1">
            <Loading />

            <PageWrapper>
              <main className="px-20 py-4 max-w-[800px] mx-auto flex flex-col items-center gap-4">
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