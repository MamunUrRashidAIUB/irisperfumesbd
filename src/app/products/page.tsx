"use client";

import Link from "next/link";
import productsData from "@/data/products.json";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const products = productsData.products;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our Products
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Explore our exclusive collection of premium perfumes
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                description={product.description}
                rating={product.rating}
                reviews={product.reviews}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
