"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Perfume } from "@/types/perfume";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function VitrineClient({ perfumes }: { perfumes: Perfume[] }) {

  const [busca, setBusca] = useState("");
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [carrinho, setCarrinho] = useState<Perfume[]>([]);
  const totalCarrinho = carrinho.reduce((soma, perfume) => soma + perfume.price, 0);

  const perfumesFiltrados = perfumes.filter((perfume) =>
    perfume.title.toLowerCase().includes(busca.toLowerCase())
  );

  function adicionarAoCarrinho(perfume: Perfume, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCarrinho([...carrinho, perfume]);
  }

  function alternarFavorito(id: number) {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  }

  return (
    <div>
      <TextField
        label="Buscar perfume..."
        variant="outlined"
        fullWidth
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="mb-6"
      />

      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6 flex justify-between items-center">
        <span className="font-semibold text-gray-700">
          🛒 Carrinho: {carrinho.length} {carrinho.length === 1 ? "item" : "itens"}
        </span>
        <span className="font-bold text-pink-600">
          Total: ${totalCarrinho.toFixed(2)}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {perfumesFiltrados.map((perfume) => (
          <Link href={`/produto/${perfume.id}`} key={perfume.id}>
            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 relative">
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={(e) => adicionarAoCarrinho(perfume, e)}
                  className="flex-1 bg-pink-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-pink-700 transition-colors"
                >
                  Adicionar ao carrinho
                </button>

                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    alternarFavorito(perfume.id);
                  }}
                >
                  {favoritos.includes(perfume.id) ? (
                    <FavoriteIcon className="text-pink-600" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </div>

              <Image
                src={perfume.thumbnail}
                alt={perfume.title}
                width={300}
                height={160}
                className="w-full h-40 object-cover rounded-lg mb-3 mt-3"
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
          </Link>
        ))}
      </div>
    </div>
  );
}