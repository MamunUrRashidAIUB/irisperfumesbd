"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/axios"; // http://localhost:3000
import axios from "axios";
import { useRouter } from "next/navigation";

type SellerProfile = {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sellerId = localStorage.getItem("sellerToken");
    if (!sellerId) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/seller/${sellerId}/profile`);
        setProfile(res.data);
      } catch (err) {
        alert("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <p className="p-4">Loading profile...</p>;

  if (!profile) return <p className="p-4 text-red-500">Profile not found.</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="bg-white p-6 rounded shadow max-w-md">
        <p><strong>Full Name:</strong> {profile.fullName || "Not Provided"}</p>
        <p><strong>Phone:</strong> {profile.phone || "Not Provided"}</p>
        <p><strong>Address:</strong> {profile.address || "Not Provided"}</p>
        <p><strong>City:</strong> {profile.city || "Not Provided"}</p>
      </div>
    </div>
  );
}
