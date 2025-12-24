// DYNAMIC ROUTING - This page demonstrates Dynamic Routing
// The [id] folder creates a dynamic route: /admin/dashboard/products/1, /admin/dashboard/products/2, etc.
// The 'id' parameter is extracted from the URL using params

import Link from "next/link";
import productsData from "@/data/products.json";
import AdminHeader from "../../../components/AdminHeader";

// This is how we get the dynamic parameter from the URL
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // Find the product by ID from the URL parameter
  const product = productsData.products.find(p => p.id === parseInt(id));

  if (!product) {
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
      <AdminHeader title={`Product: ${product.name}`} />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-indigo-600 font-medium">{product.brand}</p>
              
              <div className="mt-4 space-y-2">
                <p><strong>Price:</strong> ৳{product.price}</p>
                <p><strong>Original Price:</strong> ৳{product.originalPrice}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Stock:</strong> {product.stock} units</p>
                <p><strong>Rating:</strong> ⭐ {product.rating} ({product.reviews} reviews)</p>
              </div>

              <p className="mt-4 text-gray-600">{product.description}</p>

              <div className="mt-6 flex gap-3">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                  Edit Product
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link href="/admin/dashboard" className="text-indigo-600 hover:underline">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
