"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CardContainer from "@/components/atoms/CardContainer/CardContainer";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Form from "@/components/molecules/Form/Form";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://telco-recommendation-backend-production.up.railway.app";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ phoneNumber, pin });
      router.push("/");
    } catch (err) {
      setError(err.message || "Login gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <Input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <Input
        type="password"
        placeholder="6-digit PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />

      {error && <p className="text-red-400">{error}</p>}

      <Button>Login</Button>
    </Form>
  );
}
