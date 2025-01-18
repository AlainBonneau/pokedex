import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import Loader from "../components/Loader/Loader";
import axiosInstance from "../lib/axios/axios";

const HomePage: React.FC = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loader, setLoader] = useState(false);

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
      <PokemonCard allPokemons={allPokemons} />
    </div>
  );
};

export default HomePage;
