"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [sellerId, setSellerId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (!token) {
      router.push("/login");
    } else {
      setSellerId(token); // sellerId from login response
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Seller Dashboard</h1>
      {sellerId && <p className="text-lg">Your seller ID: {sellerId}</p>}

      <button
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={() => {
          localStorage.removeItem("sellerToken");
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
