"use client";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import axios from "axios";
import AdminHeader from "../../../components/AdminHeader";

const API_URL = "http://localhost:3000";

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  image: string;
  stock: number;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const adminId = localStorage.getItem("admin_id");
        
        // Fetch all products and find the one with matching id
        const response = await axios.get(`${API_URL}/admins/${adminId}/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const products = response.data.products || response.data || [];
        const found = products.find((p: Product) => p.id === parseInt(id));
        
        if (found) {
          setProduct(found);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader title="Loading..." />
        <div className="max-w-7xl mx-auto p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader title="Product Not Found" />
        <div className="max-w-7xl mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
          <p className="text-gray-600 mt-2">Product with ID {id} does not exist.</p>
          <Link href="/admin/dashboard" className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader title={`Product: ${product.title}`} />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
              <p className="text-indigo-600 font-medium">{product.brand}</p>
              
              <div className="mt-4 space-y-2">
                <p><strong>Price:</strong> ৳{product.price}</p>
                <p><strong>Stock:</strong> {product.stock} units</p>
              </div>

              <div className="mt-6 flex gap-3">
                <Link href="/admin/dashboard" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
