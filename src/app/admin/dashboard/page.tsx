"use client";
import axios from "axios";
import AdminHeader from "../components/AdminHeader";


import { useState, useEffect } from "react";
import AdminProductCard from "../components/AdminProductCard";

const API_URL = "http://localhost:3000";

// Define Product type for TypeScript (matches backend entity)
interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  image: string;
  stock: number;
  adminId?: number;
}

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    brand: "",
    price: "",
    image: "",
    stock: ""
  });
  const [error, setError] = useState("");

  // AXIOS CALL #3: GET all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const adminId = localStorage.getItem("admin_id");
        
        console.log("Admin ID from localStorage:", adminId); // Debug
        
        if (!adminId) {
          setError("Admin ID not found. Please login again.");
          setLoading(false);
          return;
        }
        
        console.log("Fetching from:", `${API_URL}/admins/${adminId}/products`); // Debug
        
        const response = await axios.get(`${API_URL}/admins/${adminId}/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log("API Response:", response.data); // Debug
        
        // Handle both {products: [...]} and [...] response formats
        const data = response.data.products || response.data || [];
        const productsArray = Array.isArray(data) ? data : [];
        console.log("Products to display:", productsArray); // Debug
        setProducts(productsArray);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products from server.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // AXIOS CALL #4: POST new product to backend
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title || !form.brand || !form.price || !form.image || !form.stock) {
      setError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("admin_token");
      const adminId = localStorage.getItem("admin_id");
      
      const productData = {
        title: form.title,
        brand: form.brand,
        price: Number(form.price),
        image: form.image,
        stock: Number(form.stock),
      };
      
      console.log("Sending product data:", productData); // Debug
      console.log("To URL:", `${API_URL}/admins/${adminId}/products`); // Debug
      
      const response = await axios.post(
        `${API_URL}/admins/${adminId}/products`,
        productData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      console.log("POST Response:", response.data); // Debug
      
      // Extract the product from response (handle different formats)
      const newProduct = response.data.product || response.data;
      
      // Only add if we have a valid product with an id
      if (newProduct && newProduct.id) {
        setProducts(prev => {
          const currentProducts = Array.isArray(prev) ? prev : [];
          return [...currentProducts, newProduct];
        });
      } else {
        // Refresh the product list from server if response format is unexpected
        const refreshResponse = await axios.get(`${API_URL}/admins/${adminId}/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = refreshResponse.data.products || refreshResponse.data || [];
        setProducts(Array.isArray(data) ? data : []);
      }
      
      setForm({ title: "", brand: "", price: "", image: "", stock: "" });
      setError("");
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add product:", error);
      setError("Failed to add product. Please try again.");
    }
  };

  // AXIOS CALL #5: DELETE product from backend
  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }
    
    try {
      const token = localStorage.getItem("admin_token");
      const adminId = localStorage.getItem("admin_id");
      await axios.delete(`${API_URL}/admins/${adminId}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete product. Please try again.");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader title="Dashboard" />
        <div className="max-w-7xl mx-auto p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader title="Dashboard" />
      <div className="max-w-7xl mx-auto p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Products ({products.length})</h2>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            onClick={() => setShowModal(true)}
          >
            Add Product
          </button>
        </div>
       
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
                  name="title"
                  placeholder="Product Title"
                  value={form.title}
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
        
        {/* Products List */}
        <div className="bg-white rounded-lg shadow p-6">
          {products.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No products found. Add your first product!</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <AdminProductCard
                  key={product.id}
                  id={product.id}
                  name={product.title}
                  brand={product.brand || "N/A"}
                  price={product.price}
                  image={product.image || "/placeholder.png"}
                  stock={product.stock || 0}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
