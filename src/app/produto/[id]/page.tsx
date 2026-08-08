import { Perfume } from "@/types/perfume";
import Image from "next/image";

async function getPerfume(id: string): Promise<Perfume> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data;
}

export default async function ProdutoDetalhe({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;
  const perfume = await getPerfume(id);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <Image
          src={perfume.thumbnail}
          alt={perfume.title}
          width={400}
          height={256}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800">{perfume.title}</h1>
        <p className="text-gray-500 mb-4">{perfume.brand}</p>
        <p className="text-3xl font-bold text-pink-600 mb-2">
          ${perfume.price}
        </p>
        <p className="text-yellow-500">⭐ {perfume.rating}</p>
      </div>
    </main>
  );
}