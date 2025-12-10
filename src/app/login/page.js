"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import CardContainer from "@/components/atoms/CardContainer/CardContainer";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Form from "@/components/molecules/Form/Form";

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
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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