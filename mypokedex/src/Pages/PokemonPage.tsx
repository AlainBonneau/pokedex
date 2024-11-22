import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Loader from "../components/Loader/Loader";
import axiosInstance from "../lib/axios/axios";

interface Pokemon {
  name: {
    fr: string;
  };
  sprites: {
    regular: string;
  };
  category: string;
  pokedex_id: number;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
}

function PokemonPage() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getOnePokemon() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/pokemon/${pokemonId}`);
      setPokemon(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du Pokémon :", error);
      setError("Impossible de charger les informations du Pokémon.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOnePokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonId]);

  return (
    <div className="pokemon-page-container">
      <Navbar />

      <div className="title-container">
        {isLoading && <Loader />}
        {!isLoading && error && <p className="text-red-500">{error}</p>}
        {!isLoading && pokemon && (
          <h1 className="text-center pt-6 pb-6 font-bold text-5xl text-[#CC4C41]">
            {pokemon.name?.fr || "Nom inconnu"}
          </h1>
        )}
      </div>

      {!isLoading && !error && pokemon && (
        <div className="pokemon-container border-4 rounded-2xl w-4/5 m-auto">
          <div className="pokemon-img flex justify-center items-center">
            <img
              className="w-96"
              src={pokemon.sprites.regular}
              alt={`Image de ${pokemon.name.fr}`}
            />
          </div>
          <div className="stats-container flex flex-col justify-center items-center">
            <p>{`Hp : ${pokemon.stats?.hp ?? "Non disponible"}`}</p>
            <p>{`Attaque : ${pokemon.stats?.atk ?? "Non disponible"}`}</p>
            <p>{`Défense : ${pokemon.stats?.def ?? "Non disponible"}`}</p>
            <p>{`Attaque spécial : ${
              pokemon.stats?.spe_atk ?? "Non disponible"
            }`}</p>
            <p>{`Défense spécial : ${
              pokemon.stats?.spe_def ?? "Non disponible"
            }`}</p>
            <p>{`Vitesse : ${pokemon.stats?.vit ?? "Non disponible"}`}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonPage;
