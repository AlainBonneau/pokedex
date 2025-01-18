import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import Loader from "./components/Loader/Loader";
import Footer from "./components/Footer/Footer";
import axiosInstance from "./lib/axios/axios";
import "./App.css";

const App: React.FC = () => {
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
      <header>
        <Navbar />
      </header>
      <main>
        {loader && <Loader />}
        <PokemonCard allPokemons={allPokemons} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
