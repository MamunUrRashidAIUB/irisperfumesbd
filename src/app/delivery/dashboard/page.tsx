"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function DeliveryDashboard() {
  const [delivery, setDelivery] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("deliveryId");

        if (!id) {
          alert("No delivery ID found. Please login again.");
          return;
        }

        const deliveryRes = await api.get(`/delivery/${id}`);
        setDelivery(deliveryRes.data);

        const ordersRes = await api.get(`/delivery/${id}/orders`);
        setOrders(ordersRes.data);
      } catch (err: any) {
        alert(err.response?.data?.message || "Unauthorized access");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Delivery Dashboard</h1>

      <div className="mb-6">
        <p><b>Name:</b> {delivery?.name}</p>
        <p><b>Email:</b> {delivery?.email}</p>
        <p><b>Social:</b> {delivery?.socialMediaLink}</p>
      </div>

      <h2 className="font-bold text-lg">Orders</h2>

      {orders.length === 0 && <p>No orders assigned</p>}

      <ul>
        {orders.map((o) => (
          <li key={o.id} className="border p-2 mt-2">
            Order #{o.id} – {o.address}
          </li>
        ))}
      </ul>
    </div>
  );
}
