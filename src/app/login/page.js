"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await loginUser({ phoneNumber, pin });
      router.push("/"); // redirect to home after success
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="text-white max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="bg-[#222] p-3 rounded"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          className="bg-[#222] p-3 rounded"
          type="password"
          placeholder="6-digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        {error && <p className="text-red-400">{error}</p>}
        <button className="bg-blue-600 p-3 rounded">Login</button>
      </form>
    </div>
  );
}