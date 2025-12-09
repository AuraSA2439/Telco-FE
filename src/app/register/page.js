"use client";

import { useState } from "react";
import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await registerUser({ phoneNumber, pin, name });
      router.push("/"); // redirect after registration
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="text-white max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="bg-[#222] p-3 rounded"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          className="bg-[#222] p-3 rounded"
          placeholder="Full Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="bg-[#222] p-3 rounded"
          type="password"
          placeholder="6-digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        {error && <p className="text-red-400">{error}</p>}
        <button className="bg-green-600 p-3 rounded">Register</button>
      </form>
    </div>
  );
}