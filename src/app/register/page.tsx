"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { API_BASE_URL } from "@/lib/api";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "delivery",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(form);
    if (!result.success) {
      alert("Validation error");
      return;
    }

    await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 space-y-3">
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full border p-2"
        >
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
          <option value="delivery">Delivery</option>
          <option value="admin">Admin</option>
        </select>

        <input placeholder="Name" className="w-full border p-2" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Email" className="w-full border p-2" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password" className="w-full border p-2" onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <input type="password" placeholder="Confirm Password" className="w-full border p-2" onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}/>

        <button className="w-full bg-indigo-600 text-white py-2">
          Register
        </button>

        <p className="text-center">
          Already have account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
