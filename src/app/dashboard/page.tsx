"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          className="p-6 bg-white shadow rounded hover:bg-indigo-50"
          onClick={() => router.push("/dashboard/profile")}
        >
          <h2 className="text-xl font-semibold">My Profile</h2>
          <p className="text-gray-600">View seller profile</p>
        </button>

        <button
          className="p-6 bg-white shadow rounded hover:bg-indigo-50"
          onClick={() => router.push("/dashboard/perfumes")}
        >
          <h2 className="text-xl font-semibold">My Perfumes</h2>
          <p className="text-gray-600">View added perfumes</p>
        </button>

        <button
          className="p-6 bg-white shadow rounded hover:bg-indigo-50"
          onClick={() => router.push("/perfumes")}
        >
          <h2 className="text-xl font-semibold">All Perfumes (Public)</h2>
          <p className="text-gray-600">All perfumes by all seller</p>
        </button>
      </div>

      <button
        className="mt-10 bg-red-600 text-white px-6 py-2 rounded"
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
