"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/login", { email, password });
      
      router.push("/delivery/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 border rounded space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Delivery Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded font-bold"
        >
          <Link href="/delivery/dashboard">Login</Link>
        </button>

        <p className="text-center">
          Don’t have an account?{" "}
          <Link href="/delivery/register" className="text-indigo-600 font-bold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
