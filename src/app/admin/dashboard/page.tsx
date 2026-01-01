

"use client";

import productsData from "@/data/products.json";
import AdminHeader from "../components/AdminHeader";
import AdminProductCard from "../components/AdminProductCard";

import { useState } from "react";

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState(productsData.products.slice(0, 4));
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    image: "",
    stock: ""
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.brand || !form.price || !form.image || !form.stock) {
      setError("All fields are required.");
      return;
    }
    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: form.name,
        brand: form.brand,
        price: Number(form.price),
        originalPrice: Number(form.price),
        discount: 0,
        image: form.image,
        images: [form.image],
        description: "",
        longDescription: "",
        category: "",
        subcategory: "",
        size: "",
        stock: Number(form.stock),
        rating: 0,
        reviews: 0,
        tags: [],
        notes: { top: [], middle: [], base: [] },
        featured: false,
        newArrival: false
      }
    ]);
    setForm({ name: "", brand: "", price: "", image: "", stock: "" });
    setError("");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader title="Dashboard" />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Products</h2>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            onClick={() => setShowModal(true)}
          >
            Add Product
          </button>
        </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <h3 className="text-lg font-bold mb-4">Add New Product</h3>
              <form onSubmit={handleAddProduct} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={form.brand}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={form.image}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition font-bold"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
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
