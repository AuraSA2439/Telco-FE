"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/atoms/Button/Button";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import { getProfile, logout } from "@/services/auth";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Fetch profile to detect login
  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch {
        setUser(null);
      }
    }
    loadProfile();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setUser(null);
    router.push("/login");
  }

  return (
    <nav className={`w-full h-auto text-white sticky top-0 z-50 ${styles.nav}`}>
      <div className="mx-auto flex items-center gap-8 px-6">
        {/* Logo */}
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" className="w-full" />
        </Link>

        <div className="w-full flex items-center gap-10">

          {/* Desktop Search */}
          <SearchBar />

          {/* Desktop Menu */}
          <div className="w-fit h-12 hidden md:flex items-center">
            <Link href="/" className={styles.navButton}>Beranda</Link>
            <Link href="/recommendations" className={styles.navButton}>Beli Paket</Link>
          </div>

          {/* Desktop: Login or Profile */}
          <div className="hidden md:flex relative" ref={dropdownRef}>
            {!user ? (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-lg transition"
                >
                  {user.phoneNumber || "Profile"}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg py-2 animate-fadeIn">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
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
            <Link href="/recommendations" onClick={() => setOpen(false)}>Beli Paket</Link>

            {!user ? (
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button className="w-full mt-4">Login</Button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full mt-4 bg-purple-700 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}