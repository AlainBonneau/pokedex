import { useState } from "react";
import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

interface Pokemon {
  name: { fr: string };
  types: Array<{ name: string; image: string }>;
  sprites: { regular: string };
  category: string;
  pokedex_id: number;
}

interface PokemonCardProps {
  allPokemons: Pokemon[];
  search: string;
}

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function getBackgroundGradient(types: { name: string }[]) {
  if (!types || types.length === 0) {
    return "linear-gradient(135deg, #999 0%, #ccc 100%)";
  }
  const mainColor = typeColors[types[0].name] || "#999";

  if (types.length > 1) {
    const secondColor = typeColors[types[1].name] || mainColor;
    return `linear-gradient(135deg, ${mainColor} 0%, ${secondColor} 100%)`;
  } else {
    return `linear-gradient(135deg, ${mainColor} 0%, ${mainColor} 100%)`;
  }
}

export default function PokemonCard({ allPokemons, search }: PokemonCardProps) {
  const [limit, setLimit] = useState(30);

  const handleLoadMore = () => {
    setLimit(limit + 30);
  };

  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon?.name?.fr?.toLowerCase().includes(search.toLowerCase())
  );

  const showAllPokemons = filteredPokemons.slice(0, limit);
  const validPokemons = showAllPokemons.filter((p) => p && p.types);

  return (
    <motion.div
      className="flex flex-wrap justify-center items-center pt-8 pb-8 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="search-result-container block w-full text-center pb-4">
        {search && (
          <p className="text-lg">
            {filteredPokemons.length} résultat(s) pour la recherche "{search}"
          </p>
        )}
      </div>

      {validPokemons.map((pokemon) => {
        const backgroundStyle = getBackgroundGradient(pokemon.types);

        return (
          <motion.div
            key={pokemon.pokedex_id}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card
              sx={{
                width: 320,
                borderRadius: 4,
                background: backgroundStyle,
                overflow: "hidden",
                pointerEvents: "auto",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="180"
                  image={pokemon.sprites.regular}
                  alt={pokemon.name.fr}
                  sx={{
                    objectFit: "contain",
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }}
                />

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="text-center font-bold"
                  >
                    {pokemon.name.fr}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-center"
                    sx={{ fontStyle: "italic" }}
                  >
                    {pokemon.category}
                  </Typography>

                  <div className="flex justify-center gap-2 mt-3">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.name}
                        className="px-2 py-1 text-xs font-bold rounded-full text-white"
                        style={{
                          backgroundColor: typeColors[type.name] || "#888",
                        }}
                      >
                        {type.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </CardActionArea>

              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.2)",
                }}
              >
                <Button
                  size="small"
                  sx={{
                    backgroundColor: "#333",
                    color: "#fff",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#000" },
                  }}
                  href={`/pokemon/${pokemon.pokedex_id}`}
                >
                  Voir plus
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        );
      })}

      <motion.div
        className="w-full flex justify-center mt-4"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {limit < filteredPokemons.length && (
          <Button
            sx={{
              backgroundColor: "#C62828",
              color: "white !important",
              "&:hover": { backgroundColor: "#b43d33" },
            }}
            variant="contained"
            onClick={handleLoadMore}
            className="load-more"
          >
            Voir plus
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}
