"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Perfume } from "@/types/perfume";

export default function Relacionados({
  brand,
  idAtual,
}: {
  brand: string;
  idAtual: number;
}) {
  const [relacionados, setRelacionados] = useState<Perfume[]>([]);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {

    async function buscarRelacionados() {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${brand}`
      );
      const data = await res.json();

      const filtrados = data.products.filter(
        (p: Perfume) => p.id !== idAtual
      );

      setRelacionados(filtrados);
      setCarregando(false);
    }

    buscarRelacionados();
  }, [brand, idAtual]);

  if (carregando) {
    return <p className="text-gray-400 mt-8">Carregando sugestões...</p>;
  }

  if (relacionados.length === 0) {
    return null; 
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Você também pode gostar
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {relacionados.slice(0, 4).map((perfume) => (
          <Link href={`/produto/${perfume.id}`} key={perfume.id}>
            <div className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition-shadow">
              <Image
                src={perfume.thumbnail}
                alt={perfume.title}
                width={150}
                height={100}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <p className="text-sm font-medium text-gray-700">
                {perfume.title}
              </p>
              <p className="text-sm font-bold text-pink-600">
                ${perfume.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}