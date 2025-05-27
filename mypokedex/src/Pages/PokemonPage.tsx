import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Loader from "../components/Loader/Loader";
import axiosInstance from "../lib/axios/axios";
import { motion } from "framer-motion";

const typeColors: Record<string, string> = {
  Normal: "#A8A77A",
  Feu: "#EE8130",
  Eau: "#6390F0",
  Électrik: "#F7D02C",
  Plante: "#7AC74C",
  Glace: "#96D9D6",
  Combat: "#C22E28",
  Poison: "#A33EA1",
  Sol: "#E2BF65",
  Vol: "#A98FF3",
  Psy: "#F95587",
  Insecte: "#A6B91A",
  Roche: "#B6A136",
  Spectre: "#735797",
  Dragon: "#6F35FC",
  Ténèbres: "#705746",
  Acier: "#B7B7CE",
  Fée: "#D685AD",
};

function getCardGradient(types: { name: string }[] = []) {
  const mainColor = typeColors[types[0]?.name] || "#999";
  const secondColor = types[1] ? typeColors[types[1].name] : mainColor;
  return `linear-gradient(135deg, ${mainColor} 0%, ${secondColor} 100%)`;
}

interface Pokemon {
  name: { fr: string; en: string; jp: string };
  sprites: { regular: string };
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
  types: Array<{ name: string; image: string }>;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3 } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2 + i * 0.1 },
  }),
};

function PokemonPage() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playSound = () => {
    const sound = new Audio("/sounds/blip.mp3");
    sound.volume = 0.3;
    sound.play();
  };

  async function getOnePokemon() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/pokemon/${pokemonId}`);
      setPokemon(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération :", err);
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

  if (!pokemon?.pokedex_id) {
    return <p className="text-center mt-20 text-lg">Aucun pokémon trouvé</p>;
  }

  if (isNaN(Number(pokemonId))) {
    return <p className="text-center mt-20 text-lg">ID invalide.</p>;
  }

  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const handleNextPokemon = () => {
    playSound();
    const nextId = Number(pokemonId) + 1;
    window.location.href = `/pokemon/${nextId}`;
  };

  const handlePreviousPokemon = () => {
    playSound();
    const prevId = Number(pokemonId) - 1;
    window.location.href = `/pokemon/${prevId}`;
  };

  const cardBackground = getCardGradient(pokemon.types);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4"
      style={{ background: "#f7f7f7" }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card
          sx={{
            width: 360,
            borderRadius: 4,
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
            border: "4px solid #FFCB05",
            background: cardBackground,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.3)",
              padding: "0.5rem 1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {pokemon.name.fr}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#D32F2F" }}
            >
              {pokemon.stats.hp} PV
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            <motion.img
              src={pokemon.sprites.regular}
              alt={pokemon.name.fr}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            />
          </Box>

          <CardContent sx={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
            <Box className="flex justify-center gap-2 mb-2">
              {pokemon.types.map((t, i) => (
                <motion.span
                  key={t.name}
                  className="px-2 py-1 text-sm font-bold rounded-full text-white"
                  style={{ backgroundColor: typeColors[t.name] || "#888" }}
                  custom={i}
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {t.name}
                </motion.span>
              ))}
            </Box>

            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center", fontStyle: "italic" }}
            >
              {pokemon.category} - Génération {pokemon.generation}
            </Typography>

            <Box
              sx={{
                marginTop: "1rem",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.5rem",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                ATK : {pokemon.stats.atk}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                DEF : {pokemon.stats.def}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                ATK SPÉ : {pokemon.stats.spe_atk}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                DEF SPÉ : {pokemon.stats.spe_def}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                VITESSE : {pokemon.stats.vit}
              </Typography>
            </Box>

            <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Nom anglais : {pokemon.name.en ?? "?"}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Nom japonais : {pokemon.name.jp ?? "?"}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex gap-8 mt-6">
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button
            onClick={handlePreviousPokemon}
            variant="contained"
            sx={{
              backgroundColor: "#C62828",
              color: "#FFEE99",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#b43d33" },
            }}
          >
            Précédent
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Button
            onClick={handleNextPokemon}
            variant="contained"
            sx={{
              backgroundColor: "#C62828",
              color: "#FFEE99",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#b43d33" },
            }}
          >
            Suivant
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default PokemonPage;
