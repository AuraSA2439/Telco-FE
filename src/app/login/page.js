"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Form from "@/components/molecules/Form/Form";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [name, setName] = useState(""); // optional
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await loginUser({ phoneNumber, name });
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-[var(--primary-color)] border-b-2 border-[var(--neutral-color)] pt-1 pb-3">
        Login
      </h1>

      <Input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

       {/* <Input
        placeholder="Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> */}

      {error && <p className="text-red-400">{error}</p>}

      <Button>Login</Button>
    </Form>
  );
}