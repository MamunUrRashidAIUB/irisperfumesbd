"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";


const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [role, setRole] = useState("customer");

  const router = useRouter();
  const [error, setError] = useState("");


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    
    router.push("/delivery/dashboard");
  } catch (err: any) {
    setError(
      err.response?.data?.message || "Invalid credentials"
    );
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-8 shadow-lg rounded-xl border">
        <h2 className="text-2xl font-bold text-center mb-6">Delivery Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border p-3 rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </button>
          </div>
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <button className="w-full bg-indigo-600 text-white py-3 rounded font-bold">
            <Link href="/delivery/dashboard">
            Login
          </Link>
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/delivery/register" className="text-indigo-600 font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
