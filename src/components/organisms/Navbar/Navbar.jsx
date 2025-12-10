"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`w-full h-auto text-white sticky top-0 z-50 ${styles.nav}`}>
      <div className="mx-auto flex items-center gap-8 px-6">
        {/* Logo */}
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" className="w-full"/>
        </Link>

        <div className="w-full flex items-center gap-10">
          {/* Desktop Search Bar */}
          <SearchBar onSearch={(value) => console.log("Searching:", value)} />

          {/* Desktop Menu */}
          <div className="w-fit h-12 hidden md:flex items-center">
            <Link href="/" className={`${styles.navButton}`}>Beranda</Link>
            <Link href="/products" className={`${styles.navButton}`}>Beli Paket</Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex rounded-lg border-2 border-transparent hover:border-white hover:bg-[#7200B5] transition">
            <Button>Login</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-800 transition flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-6 py-2 border-t text-[#5B5B5B] bg-white animate-fadeIn">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={() => setOpen(false)}>Beranda</Link>
            <Link href="/products" onClick={() => setOpen(false)}>Beli Paket</Link>

            <Button className="w-full mt-4">Login</Button>
          </div>
        </div>
      )}
    </nav>
  );
}