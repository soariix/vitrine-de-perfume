"use client";

import { useState } from "react";
import { Perfume } from "@/types/perfume";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function VitrineClient({ perfumes }: { perfumes: Perfume[] }) {
  
  const [busca, setBusca] = useState("");
  const [favoritos, setFavoritos] = useState<number[]>([]);

  const perfumesFiltrados = perfumes.filter((perfume) =>
    perfume.title.toLowerCase().includes(busca.toLowerCase())
  );

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {perfumesFiltrados.map((perfume) => (
          <div
            key={perfume.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 relative"
          >
            <IconButton
              onClick={() => alternarFavorito(perfume.id)}
              className="!absolute top-2 right-2"
            >
              {favoritos.includes(perfume.id) ? (
                <FavoriteIcon className="text-pink-600" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>

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
    </div>
  );
}