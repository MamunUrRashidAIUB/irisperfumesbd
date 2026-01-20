import api from "@/lib/axios";

export default async function PerfumesPage() {
  const res = await api.get("/seller/perfumes");
  const perfumes = res.data;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Perfumes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {perfumes.map((p: any) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{p.name}</h2>
            <p>Brand: {p.brand}</p>
            <p>Price: {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
