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
    } catch (err) {
      console.error("Erreur lors de la récupération du Pokémon :", err);
      setError("Impossible de charger les informations du Pokémon.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (pokemonId) {
      getOnePokemon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonId]);

  if (isLoading) {
    return (
      <div className="pokemon-page-container">
        <Navbar />
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-page-container">
        <Navbar />
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="pokemon-page-container">
        <Navbar />
        <p className="text-center">Pokémon introuvable.</p>
      </div>
    );
  }

  function handleNextPokemon() {
    const nextPokemonId = Number(pokemonId) + 1;
    window.location.href = `/${nextPokemonId}`;
  }

  function handlePreviousPokemon() {
    const previousPokemonId = Number(pokemonId) - 1;
    window.location.href = `/${previousPokemonId}`;
  }

  return (
    <div className="pokemon-page-container">
      <Navbar />
      <div className="title-container">
        <h1 className="text-center pt-6 pb-6 font-bold text-5xl text-[#CC4C41]">
          {pokemon.name?.fr || "Nom inconnu"}
        </h1>
      </div>
      <div className="pokemon-container border-4 rounded-2xl w-4/5 m-auto">
        <div className="pokemon-img flex justify-center items-center">
          <img
            className="w-96"
            src={pokemon.sprites?.regular || ""}
            alt={`Image de ${pokemon.name?.fr || "Aucun pokemon trouvée"}`}
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
      <div className="next-previous-container p-4 flex justify-between">
        <button
          onClick={handlePreviousPokemon}
          className="pt-2 pb-2 pl-4 pr-4 bg-[#CC4C41] text-white rounded-md font-medium shadow-md hover:bg-[#b43d33] hover:shadow-lg active:bg-[#9e342b] transition-all duration-200 ease-in-out"
        >
          Précédent
        </button>
        <button
          onClick={handleNextPokemon}
          className="pt-2 pb-2 pl-4 pr-4 bg-[#CC4C41] text-white rounded-md font-medium shadow-md hover:bg-[#b43d33] hover:shadow-lg active:bg-[#9e342b] transition-all duration-200 ease-in-out"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default PokemonPage;
