import "./globals.css";
import { Inter } from "next/font/google";
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

      <body className={`${inter.variable} bg-[#0d0d0d] text-white`}>
        <Navbar />

        {/* Shared wrapper for all pages */}
        <main className="px-20 py-4 max-w-[800px] mx-auto flex flex-col items-center gap-4">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}