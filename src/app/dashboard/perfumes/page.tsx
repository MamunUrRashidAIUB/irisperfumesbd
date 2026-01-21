"use client"; 

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/axios";

type Perfume = {
  id: number;
  name: string;
  brand: string;
  price: number;
};

export default function PerfumesPage() {
  const router = useRouter();
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newPerfume, setNewPerfume] = useState({ name: "", brand: "", price: 0 });
  const [sellerId, setSellerId] = useState<string | null>(null);

  // Get sellerId from localStorage only in the browser
  useEffect(() => {
    const id = localStorage.getItem("sellerToken");
    if (!id) {
      router.push("/login");
    } else {
      setSellerId(id);
    }
  }, [router]);

  // Fetch perfumes once sellerId is available
  useEffect(() => {
    if (!sellerId) return;

    const fetchPerfumes = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/seller/${sellerId}/perfumes`);
        setPerfumes(res.data);
      } catch {
        alert("Failed to fetch perfumes");
      } finally {
        setLoading(false);
      }
    };

    fetchPerfumes();
  }, [sellerId]);

  const handleCreate = async () => {
    if (!sellerId) return;

    try {
      await axios.post(`${API_BASE_URL}/seller/${sellerId}/perfume`, newPerfume);
      alert("Perfume created!");
      setShowCreate(false);
      setNewPerfume({ name: "", brand: "", price: 0 });
      // Refresh list
      const res = await axios.get(`${API_BASE_URL}/seller/${sellerId}/perfumes`);
      setPerfumes(res.data);
    } catch {
      alert("Failed to create perfume.");
    }
  };

  const handleDelete = async (perfumeId: number) => {
    if (!sellerId) return;

    if (!confirm("Are you sure you want to delete this perfume?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/seller/${sellerId}/perfume/${perfumeId}`);
      // Refresh list
      const res = await axios.get(`${API_BASE_URL}/seller/${sellerId}/perfumes`);
      setPerfumes(res.data);
    } catch {
      alert("Failed to delete perfume.");
    }
  };

  if (loading) return <p className="p-4">Loading perfumes...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Perfumes</h1>

      <div className="mb-6">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? "Cancel" : "Create Perfume"}
        </button>
      </div>

      {showCreate && (
        <div className="bg-white p-6 rounded shadow mb-6 max-w-md">
          <input
            type="text"
            placeholder="Name"
            value={newPerfume.name}
            onChange={(e) => setNewPerfume({ ...newPerfume, name: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Brand"
            value={newPerfume.brand}
            onChange={(e) => setNewPerfume({ ...newPerfume, brand: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newPerfume.price}
            onChange={(e) => setNewPerfume({ ...newPerfume, price: Number(e.target.value) })}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}

      {perfumes.length === 0 ? (
        <p>No perfumes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {perfumes.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded shadow">
              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>Brand:</strong> {p.brand}</p>
              <p><strong>Price:</strong> ${p.price}</p>
              <button
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
