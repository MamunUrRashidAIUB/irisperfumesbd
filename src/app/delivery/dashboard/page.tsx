"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (!token || role !== "delivery") {
      router.push("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-4">Delivery Dashboard 🚚</h1>
      <p>Manage assigned orders here.</p>
    </div>
  );
}
