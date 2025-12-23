import Link from "next/link";
import productsData from "@/data/products.json";
import { notFound } from "next/navigation";

// This is a dynamic route - the [id] folder creates dynamic routing
// URL: /products/1, /products/2, etc.

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);
  
  // Find the product from our data
  const product = productsData.products.find((p) => p.id === productId);

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-600 hover:text-indigo-600">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-indigo-600 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <span className="text-indigo-600 font-medium mb-2">
                {product.brand}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-indigo-600">
                  ৳{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500 text-sm">Category</span>
                  <p className="font-bold text-gray-800">{product.category}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500 text-sm">Size</span>
                  <p className="font-bold text-gray-800">{product.size}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500 text-sm">Type</span>
                  <p className="font-bold text-gray-800">{product.subcategory}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500 text-sm">Stock</span>
                  <p className="font-bold text-gray-800">
                    {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                  </p>
                </div>
              </div>

              {/* Fragrance Notes */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Fragrance Notes</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">Top</span>
                    <p className="text-gray-600">{product.notes.top.join(", ")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Middle</span>
                    <p className="text-gray-600">{product.notes.middle.join(", ")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">Base</span>
                    <p className="text-gray-600">{product.notes.base.join(", ")}</p>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-4">
                <button className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition shadow-lg">
                  Add to Cart
                </button>
                <button className="bg-gray-100 text-gray-800 px-6 py-4 rounded-full font-bold hover:bg-gray-200 transition">
                  ♡
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Products */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <Link
            href="/products"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Back to All Products
          </Link>
        </div>
      </section>
    </div>
  );
}

// Generate static params for all products (optional - for static generation)
export async function generateStaticParams() {
  return productsData.products.map((product) => ({
    id: product.id.toString(),
  }));
}
