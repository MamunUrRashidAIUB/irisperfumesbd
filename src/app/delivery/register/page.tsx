"use client";

import Link from "next/link";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    
   const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
const isValidDate = (date: string) => {
  return isoDateRegex.test(date) && !isNaN(Date.parse(date));
};

if (!form.dateOfBirth || !isValidDate(form.dateOfBirth)) {
  setError("Date must be valid (YYYY-MM-DD)");
  return;
}

    try {
      await api.post("/delivery", {
        name: form.name,
        email: form.email,
        password: form.password,
        dateOfBirth: form.dateOfBirth, 
        socialMediaLink: "https://facebook.com/delivery",
      });

      router.push("/delivery/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-8 shadow-lg rounded-xl border">
        <h2 className="text-2xl font-bold text-center mb-6">
          Delivery Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Date of Birth (YYYY-MM-DD)"
            className="w-full border p-3 rounded"
            value={form.dateOfBirth}
            onChange={(e) =>
              setForm({ ...form, dateOfBirth: e.target.value })
            }
            
            required
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded font-bold">
            Sign Up
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/delivery/login" className="text-indigo-600 font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}