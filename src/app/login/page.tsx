"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { API_BASE_URL } from "@/lib/api";
import { useRouter } from "next/navigation";


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const router = useRouter();

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("delivery");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0] as keyof FormErrors] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
   const res = await fetch("http://localhost:3000/auth/register/delivery", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
 body: JSON.stringify({
  
  email: email.trim(),
  password: password,
}),
});

const data = await res.json();

if (!res.ok) {
  alert(data.message || "Registration failed");
  setIsLoading(false);
  return;
}

alert("Registration successful! Now login.");


      if (role === "delivery") {
        router.push("/delivery/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2"
        >
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
          <option value="delivery">Delivery</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center">
          No account? <Link href="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
