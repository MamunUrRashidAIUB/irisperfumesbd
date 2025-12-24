"use client";

import Link from "next/link";
import productsData from "@/data/products.json";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Iris Perfumes - Admin</h1>
          <Link href="/admin" className="text-sm hover:underline">Logout</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500 text-sm">Products</p>
            <p className="text-2xl font-bold">{productsData.products.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500 text-sm">Orders</p>
            <p className="text-2xl font-bold">156</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500 text-sm">Revenue</p>
            <p className="text-2xl font-bold">৳245K</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500 text-sm">Customers</p>
            <p className="text-2xl font-bold">89</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow mb-6">
          <h2 className="text-lg font-bold p-4 border-b">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">ORD-001</td>
                  <td className="p-3">Rahim Ahmed</td>
                  <td className="p-3">৳2,500</td>
                  <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Delivered</span></td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">ORD-002</td>
                  <td className="p-3">Fatima Khan</td>
                  <td className="p-3">৳3,500</td>
                  <td className="p-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Processing</span></td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">ORD-003</td>
                  <td className="p-3">Karim Hossain</td>
                  <td className="p-3">৳2,200</td>
                  <td className="p-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Products Overview */}
        <div className="bg-white rounded-lg shadow">
          <h2 className="text-lg font-bold p-4 border-b">Products Overview</h2>
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {productsData.products.slice(0, 4).map((product) => (
              <div key={product.id} className="text-center">
                <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded mb-2" />
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-indigo-600 font-bold">৳{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
