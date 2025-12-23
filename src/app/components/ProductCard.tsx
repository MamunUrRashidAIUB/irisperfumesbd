import Link from "next/link";

// This component demonstrates PROPS in React/Next.js
// Props are passed from parent component (ProductsPage) to this child component

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
}

export default function ProductCard({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  description,
  rating,
  reviews,
}: ProductCardProps) {
  const discount = originalPrice > price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <Link href={`/products/${id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group cursor-pointer h-full">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
          
          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Brand */}
          <span className="text-indigo-500 text-sm font-medium">{brand}</span>
          
          {/* Name */}
          <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition">
            {name}
          </h3>
          
          {/* Description */}
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">
              {rating} ({reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-indigo-600">৳{price}</span>
              {originalPrice > price && (
                <span className="text-sm text-gray-400 line-through">৳{originalPrice}</span>
              )}
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
