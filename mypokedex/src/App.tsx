import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import AllPokemonsPage from "./Pages/AllPokemonsPage";
import PokemonPage from "./Pages/PokemonPage";
import About from "./Pages/About";
import Page404 from "./Pages/Page404";
import { SearchProvider } from "./components/SearchContext";
import "./App.css";

function App() {
  return (
    <SearchProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon" element={<AllPokemonsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/pokemon/*" element={<Page404 />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonPage />} />
        </Routes>
      </Layout>
    </SearchProvider>
  );
}

export default App;
