import { Perfume } from "@/types/perfume";
import VitrineClient from "./VitrineClient";

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
      <VitrineClient perfumes={perfumes} />
    </main>
  );
}