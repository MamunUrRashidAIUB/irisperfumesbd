"use client";

import { useEffect, useState } from "react";
import  api  from "@/lib/axios";

export default function SellerProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const sellerId = localStorage.getItem("sellerToken");

    api
      .get(`/seller/${sellerId}/profile`)
      .then((res) => setProfile(res.data))
      .catch(() => alert("Failed to load profile"));
  }, []);

  if (!profile) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seller Profile</h1>
      <p><b>Name:</b> {profile.fullName || "N/A"}</p>
      <p><b>Phone:</b> {profile.phone}</p>
    </div>
  );
}
