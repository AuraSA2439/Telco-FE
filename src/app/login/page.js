"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://telco-recommendation-backend-production.up.railway.app";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("request"); // request | verify
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // ============================
  // 1. REQUEST OTP
  // ============================
  async function handleRequestOtp(e) {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setMsg("OTP telah dikirim! Cek console backend.");
      setStep("verify");
    } catch (err) {
      setError(err.message || "Gagal request OTP.");
    } finally {
      setLoading(false);
    }
  }

  // ============================
  // 2. VERIFY OTP
  // ============================
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      // Save token to localStorage
      localStorage.setItem("token", json.data.token);

      setMsg("Login berhasil!");

      // Redirect
      router.push("/recommendations");
    } catch (err) {
      setError(err.message || "OTP salah atau expired.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 text-white">

      <h1 className="mb-6 text-3xl font-bold">Login</h1>

      {/* Step: REQUEST OTP */}
      {step === "request" && (
        <form className="flex flex-col gap-4" onSubmit={handleRequestOtp}>

          <input
            className="bg-[#222] p-3 rounded"
            placeholder="Masukkan Nomor HP"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          {error && <p className="text-red-400">{error}</p>}
          {msg && <p className="text-green-400">{msg}</p>}

          <button
            disabled={loading}
            className="p-3 bg-blue-600 rounded"
          >
            {loading ? "Mengirim OTP..." : "Kirim OTP"}
          </button>
        </form>
      )}

      {/* Step: VERIFY OTP */}
      {step === "verify" && (
        <form className="flex flex-col gap-4" onSubmit={handleVerifyOtp}>

          <input
            className="bg-[#222] p-3 rounded"
            placeholder="Masukkan 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          {error && <p className="text-red-400">{error}</p>}
          {msg && <p className="text-green-400">{msg}</p>}

          <button disabled={loading} className="p-3 bg-green-600 rounded">
            {loading ? "Memverifikasi..." : "Verifikasi OTP"}
          </button>
        </form>
      )}

      {/* Back button (optional) */}
      {step === "verify" && (
        <button
          className="mt-4 text-sm text-gray-300 underline"
          onClick={() => setStep("request")}
        >
          Ubah Nomor
        </button>
      )}
    </div>
  );
}
