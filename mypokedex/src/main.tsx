import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import PokemonPage from "./Pages/PokemonPage.tsx";
import About from "./Pages/About.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:pokemonId" element={<PokemonPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </StrictMode>
);
