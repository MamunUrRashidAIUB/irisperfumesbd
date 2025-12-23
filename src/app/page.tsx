import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/products.json";

export default function Home() {
  // Get featured products from JSON
  const featuredPerfumes = productsData.products.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Discover Your <span className="text-indigo-400">Signature Scent</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Explore our exclusive collection of premium perfumes crafted with the finest ingredients from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-500 transition">
                  Shop Now
                </button>
              </Link>
              <Link href="/about">
                <button className="border-2 border-gray-400 text-gray-300 px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">100% authentic perfumes sourced from renowned brands worldwide</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and secure delivery across Bangladesh</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
               
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices with regular discounts and offers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Perfumes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked selections from our finest collection
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPerfumes.map((perfume) => (
              <div
                key={perfume.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{perfume.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{perfume.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-indigo-600">৳{perfume.price}</span>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
