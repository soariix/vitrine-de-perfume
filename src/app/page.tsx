import { Perfume } from "@/types/perfume";

async function getPerfumes(): Promise<Perfume[]> {
  const res = await fetch("https://dummyjson.com/products/category/fragrances");
  const data = await res.json();
  return data.products;
}

export default async function Home() {
  const perfumes = await getPerfumes();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🌸 Vitrine de Perfumes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {perfumes.map((perfume) => (
          <div
            key={perfume.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={perfume.thumbnail}
              alt={perfume.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">{perfume.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{perfume.brand}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-pink-600">
                ${perfume.price}
              </span>
              <span className="text-sm text-yellow-500">⭐ {perfume.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}