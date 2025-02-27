import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axiosInstance from "../lib/axios/axios";

interface Pokemon {
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
  };
  generation: number;
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

  if (isNaN(Number(pokemonId))) {
    return (
      <div className="pokemon-page-container">
        <p className="text-center mt-8 text-lg">
          Merci d’entrer un identifiant valide.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pokemon-page-container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-page-container">
        <p className="text-[#C62828] text-center mt-8">{error}</p>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="pokemon-page-container">
        <p className="text-center mt-8">Pokémon introuvable.</p>
      </div>
    );
  }

  function handleNextPokemon() {
    const nextPokemonId = Number(pokemonId) + 1;
    window.location.href = `/pokemon/${nextPokemonId}`;
  }

  function handlePreviousPokemon() {
    const previousPokemonId = Number(pokemonId) - 1;
    window.location.href = `/pokemon/${previousPokemonId}`;
  }

  return (
    <div className="pokemon-page-container">
      <div className="title-container text-center mt-8">
        <h1 className="font-bold text-4xl text-[#CC4C41]">
          {pokemon.name?.fr || "Nom inconnu"}
        </h1>
      </div>

      <div className="pokemon-container border-4 border-[#C62828] rounded-xl w-3/5 mx-auto my-8 bg-white shadow-lg">
        <div className="pokemon-img flex justify-center items-center p-8">
          <img
            className="w-56 h-56 object-contain"
            src={pokemon.sprites?.regular || ""}
            alt={`Image de ${pokemon.name?.fr || "Aucun pokemon trouvée"}`}
          />
        </div>
        <div className="stats-container text-center bg-[#C62828] p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#FFEE99]">
            Statistiques
          </h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <p className="font-medium text-[#FFEE99]">{`Hp : ${
              pokemon.stats?.hp ?? "Non disponible"
            }`}</p>
            <p className="font-medium text-[#FFEE99]">{`Attaque : ${
              pokemon.stats?.atk ?? "Non disponible"
            }`}</p>
            <p className="font-medium text-[#FFEE99]">{`Défense : ${
              pokemon.stats?.def ?? "Non disponible"
            }`}</p>
            <p className="font-medium text-[#FFEE99]">{`Attaque spécial : ${
              pokemon.stats?.spe_atk ?? "Non disponible"
            }`}</p>
            <p className="font-medium text-[#FFEE99]">{`Défense spécial : ${
              pokemon.stats?.spe_def ?? "Non disponible"
            }`}</p>
            <p className="font-medium text-[#FFEE99]">{`Vitesse : ${
              pokemon.stats?.vit ?? "Non disponible"
            }`}</p>
          </div>
          <div className="generation-container">
            <p className="text-[#FFEE99] text-lg mt-4">
              Génération : {pokemon.generation || "Non disponible"}
            </p>
          </div>
          <div className="other-name flex justify-center items-center flex-col mt-4">
            <h2 className="text-2xl font-semibold mb-4 text-[#FFEE99]">
              Autres noms
            </h2>
            <p className="text-[#FFEE99] text-lg mt-4">
              Nom anglais : {pokemon.name?.en || "Nom inconnu"}
            </p>
            <p className="text-[#FFEE99] text-lg">
              Nom japonais : {pokemon.name?.jp || "Nom inconnu"}
            </p>
          </div>
        </div>
      </div>

      <div className="next-previous-container p-4 flex justify-between max-w-xl mx-auto">
        <button
          onClick={handlePreviousPokemon}
          className="pt-2 pb-2 pl-6 pr-6 bg-[#C62828] text-[#FFEE99] rounded-md font-semibold shadow-md hover:bg-[#b43d33] hover:shadow-lg active:bg-[#9e342b] transition-all duration-200 ease-in-out"
        >
          Précédent
        </button>
        <button
          onClick={handleNextPokemon}
          className="pt-2 pb-2 pl-6 pr-6 bg-[#C62828] text-[#FFEE99] rounded-md font-semibold shadow-md hover:bg-[#b43d33] hover:shadow-lg active:bg-[#9e342b] transition-all duration-200 ease-in-out"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default PokemonPage;
