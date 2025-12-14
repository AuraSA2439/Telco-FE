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

  /* ---------------- FETCH USER (CLIENT ONLY) ---------------- */
  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  /* ---------------- CLOSE DESKTOP DROPDOWN ---------------- */
  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className={`sticky top-0 z-50 w-full text-white ${styles.nav}`}>
      {/* ================= TOP BAR ================= */}
      <div className="flex items-center h-16 px-4 max-w-[1200px] mx-auto">
        {/* LOGO */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="h-10 md:h-14 w-auto"
          />
        </Link>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center flex-1 gap-6 justify-end">
          <div className="flex-1 max-w-md">
            <SearchBar />
          </div>

          <Link href="/" className={styles.navButton}>
            Beranda
          </Link>
          <Link href="/recommendations" className={styles.navButton}>
            Beli Paket
          </Link>

          {/* DESKTOP AUTH */}
          <div className="relative" ref={dropdownRef}>
            {!user ? (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-800 transition"
                >
                  |
                  <Icon className="w-9 h-9 rounded-full bg-[var(--neutral-color)]" />
                  <div className="flex flex-col">
                    <span className="pr-2 font-semibold">
                      {user.name || "User"}
                    </span>
                    <span className="pr-2 text-sm font-semibold opacity-80 border-t-1 border-white">
                      {user.phoneNumber || "08xxxxxxxxxx"}
                    </span>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-13 w-40 bg-white text-[#5B5B5B] rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden ml-auto p-2 rounded-lg hover:bg-purple-800"
        >
          <span className="material-symbols-outlined text-3xl">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden bg-white text-[#5B5B5B] px-4 py-4 space-y-4 border-t">
          <SearchBar />

          {/* MOBILE PROFILE */}
          {user && (
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <Icon className="w-10 h-10 rounded-full bg-[var(--neutral-color)]" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {user.name || "User"}
                </span>
                <span className="text-sm text-gray-500">
                  {user.phoneNumber || ""}
                </span>
              </div>
            </div>
          )}

          {/* LINKS */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block py-2 border-b border-gray-500 text-[var(--primary-color)]"
          >
            Beranda
          </Link>

          <Link
            href="/recommendations"
            onClick={() => setOpen(false)}
            className="block py-2 border-b border-gray-500 text-[var(--primary-color)]"
          >
            Beli Paket
          </Link>

          {/* AUTH ACTION */}
          {!user ? (
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button className="w-full mt-2">Login</Button>
            </Link>
          ) : (
            <Button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="w-full bg-[var(--primary-color)] text-white"
            >
              Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}