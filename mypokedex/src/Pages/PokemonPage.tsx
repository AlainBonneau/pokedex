import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import axiosInstance from "../lib/axios/axios";

function PokemonPage() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getOnePokemon() {
    try {
      const response = await axiosInstance.get(`/pokemon/${pokemonId}`);
      setPokemon(response.data);
    } catch (error) {
      console.error(error);
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
      {isLoading ? (
        <p>Chargement des informations du Pokémon...</p>
      ) : pokemon ? (
        <h1>Mon pokemon : {pokemon.name.fr}</h1>
      ) : (
        <p>Pokémon introuvable.</p>
      )}
    </div>
  );
}

export default PokemonPage;
