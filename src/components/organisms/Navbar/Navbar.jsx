"use client";

import Link from "next/link";
import Icon from "@/components/atoms/Icon/Icon";
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

  /* Load user profile on mount */
  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    logout();
    setUser(null);
    router.push("/login");
  }

  return (
    <nav className={`w-full sticky top-0 z-50 text-white ${styles.nav}`}>
      <div className="mx-auto flex items-center px-4">
        <Link href="/" className="w-70 flex-shrink-0 ml-4">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="h-12 w-auto md:h-14" 
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-8 w-full justify-end">

          <div className="hidden md:block flex-1">
            <SearchBar />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex h-10 gap-4">
            <Link href="/" className={styles.navButton}>Beranda</Link>
            <Link href="/recommendations" className={styles.navButton}>Beli Paket</Link>
          </div>

          {/* DESKTOP LOGIN / PROFILE */}
          <div className="hidden md:flex relative" ref={dropdownRef}>
            {!user ? (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex flex-col items-start px-4 py-2 mx-3 border-x-2 border-white hover:bg-purple-800 transition"
                >
                  <span className="font-bold">
                    {user.name || "User"}
                  </span>
                  <span className="text-sm opacity-80">
                    {user.phoneNumber || "Phone"}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-13 right-0 w-40 px-2 bg-white text-red-500 flex items-center rounded-lg shadow-lg overflow-hidden hover:bg-grey-700">
                    <Icon name="logout" size={24} />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg flex items-center hover:bg-purple-800 flex-shrink-0"
          >
            <span className="material-symbols-outlined text-3xl">
              {open ? "close" : "menu"}
            </span>
          </button>

        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 py-3 border-t bg-white text-[#5B5B5B] animate-fadeIn">
          <div className="flex flex-col gap-4">

            <Link href="/" onClick={() => setOpen(false)}
            className="px-2 border-[var(--secondary-color)] hover:border-l-3 hover:text-[18px] transition">
              Beranda
            </Link>
            <Link href="/recommendations" onClick={() => setOpen(false)}
            className="px-2 border-[var(--secondary-color)] hover:border-l-3 hover:text-[18px] transition">
              Beli Paket
            </Link>

            {!user ? (
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button className="w-full mt-2">Login</Button>
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