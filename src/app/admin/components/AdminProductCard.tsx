// Admin Product Card Component - Demonstrates PROPS
// Props are passed from parent to this child component

interface AdminProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  stock: number;
}

export default function AdminProductCard({ id, name, brand, price, image, stock }: AdminProductCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-32 object-cover rounded mb-3" 
      />
      <h3 className="font-medium text-gray-800 truncate">{name}</h3>
      <p className="text-sm text-gray-500">{brand}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-indigo-600">৳{price}</span>
        <span className={`text-xs px-2 py-1 rounded ${stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          Stock: {stock}
        </span>
      </div>
      <a 
        href={`/admin/dashboard/products/${id}`}
        className="mt-3 block text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition text-sm"
      >
        View Details
      </a>
    </div>
  );
}
