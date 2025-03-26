import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import SasOverlay from "../components/SasOverlay/SasOverlay";
import Loader from "../components/Loader/Loader";
import { useSearch } from "../components/SearchContext";
import axiosInstance from "../lib/axios/axios";

const HomePage: React.FC = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loader, setLoader] = useState(false);
  const [locked, setLocked] = useState(true);
  const { search } = useSearch();

  const handleUnlock = () => {
    setLocked(false);
  };

  async function getAllPokemons() {
    try {
      setLoader(true);
      const pokemons = await axiosInstance("/pokemon");
      setAllPokemons(pokemons.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des pokémons :", error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      {loader && <Loader />}
      {locked && <SasOverlay onUnlock={handleUnlock} />}
      <PokemonCard search={search} allPokemons={allPokemons} />
    </div>
  );
};

export default HomePage;
