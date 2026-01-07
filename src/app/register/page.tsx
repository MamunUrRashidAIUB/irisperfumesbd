"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { API_BASE_URL } from "@/lib/axios"; // should be http://localhost:3000

// Zod schema for frontend validation
const registerSchema = z
  .object({
    email: z
      .string()
      .email("Enter a valid AIUB email")
      .regex(/@aiub\.edu$/, "Email must be from aiub.edu domain"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
    gender: z.enum(["male", "female"], "Gender must be male or female"),
    phone: z.string().min(10, "Enter a valid phone number"),
  });

type FormErrors = {
  email?: string;
  password?: string;
  gender?: string;
  phone?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    gender: "male",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/seller/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Registration failed. Try again.");
        setIsLoading(false);
        return;
      }

      alert("Registration successful!");
      router.push("/login"); // redirect to login page
    } catch (err) {
      alert("Network error. Backend not reachable.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Seller Registration</h1>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`w-full p-3 mb-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className={`w-full p-3 mb-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

        <select
          value={form.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className={`w-full p-3 mb-2 border rounded ${errors.gender ? "border-red-500" : "border-gray-300"}`}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm mb-2">{errors.gender}</p>}

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className={`w-full p-3 mb-2 border rounded ${errors.phone ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-3 rounded font-bold mt-4 hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-indigo-600 font-semibold">Login</a>
        </p>
      </form>
    </div>
  );
}
