"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Icon from "@/components/atoms/Icon/Icon";
import Button from "@/components/atoms/Button/Button";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import { getProfile, logout } from "@/services/auth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    getProfile().then(setUser).catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const close = (e) =>
      dropdownRef.current && !dropdownRef.current.contains(e.target) &&
      setDropdownOpen(false);

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className={`sticky top-0 z-50 text-white ${styles.nav}`}>
      <div className="flex items-center px-4 h-16">
        {/* LOGO */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="h-10 md:h-14 w-auto"
          />
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center flex-1 gap-6 justify-end">
          <div className="flex-1 max-w-md">
            <SearchBar />
          </div>

          <Link href="/" className={styles.navButton}>Beranda</Link>
          <Link href="/recommendations" className={styles.navButton}>Beli Paket</Link>

          <div ref={dropdownRef}>
            {!user ? (
              <Link href="/login"><Button>Login</Button></Link>
            ) : (
              <>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-purple-800 rounded-lg"
                >
                  <Icon className="w-8 h-8 rounded-full bg-[var(--neutral-color)]" />
                  <span className="font-semibold">{user.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-4 mt-2 bg-white text-red-500 rounded-lg shadow-md">
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 w-full text-left hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden ml-auto p-2"
        >
          <span className="material-symbols-outlined text-3xl">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="flex flex-col md:hidden bg-white text-[#5B5B5B] px-4 py-4 space-y-4">
          <SearchBar />

          <Link href="/" onClick={() => setOpen(false)}>Beranda</Link>
          <Link href="/recommendations" onClick={() => setOpen(false)}>Beli Paket</Link>

          {!user ? (
            <Link href="/login">
              <Button className="w-full">Login</Button>
            </Link>
          ) : (
            <Button onClick={handleLogout} className="w-full bg-[var(--primary-color)]">
              Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}