"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function SellerPerfumesPage() {
  const [perfumes, setPerfumes] = useState<any[]>([]);

  useEffect(() => {
    const sellerId = localStorage.getItem("sellerToken");

    api
      .get(`/seller/${sellerId}/perfumes`)
      .then((res) => setPerfumes(res.data))
      .catch(() => alert("Failed to load perfumes"));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Perfumes</h1>

      {perfumes.length === 0 && <p>No perfumes found</p>}

      <ul className="space-y-3">
        {perfumes.map((p) => (
          <li key={p.id} className="border p-4 rounded">
            <h2 className="font-semibold">{p.name}</h2>
            <p>Brand: {p.brand}</p>
            <p>Price: {p.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
