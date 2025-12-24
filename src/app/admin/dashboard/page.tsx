// ADMIN DASHBOARD - HOME PAGE (Landing Page for Admin)
// This demonstrates: Folder Based Routing (/admin/dashboard)
// Also demonstrates: Components and Props

"use client";

import productsData from "@/data/products.json";
import AdminHeader from "../components/AdminHeader";
import AdminProductCard from "../components/AdminProductCard";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Component with Props */}
      <AdminHeader title="Dashboard" />

      <div className="max-w-7xl mx-auto p-6">
        {/* Products Section - Using Component with Props */}
        <div className="bg-white rounded-lg shadow p-6">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productsData.products.slice(0, 4).map((product) => (
              <AdminProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                image={product.image}
                stock={product.stock}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
