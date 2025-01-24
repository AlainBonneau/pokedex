import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

interface Pokemon {
  name: {
    fr: string;
  };
  sprites: {
    regular: string;
  };
  category: string;
  pokedex_id: number;
}

interface PokemonCardProps {
  allPokemons: Pokemon[];
  search: string;
}

export default function PokemonCard({ allPokemons, search }: PokemonCardProps) {
  const [limit, setLimit] = useState(30);

  const handleLoadMore = () => {
    setLimit(limit + 30);
  };

  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.fr.toLowerCase().includes(search.toLowerCase())
  );

  const showAllPokemons = filteredPokemons.slice(0, limit);

  return (
    <div className="flex flex-wrap justify-center items-center pt-8 pb-8 gap-4">
      <div className="search-result-container block w-full text-center pb-4">
        {search && (
          <p className="text-lg">
            {filteredPokemons.length} résultat(s) pour la recherche "{search}"
          </p>
        )}
      </div>
      {!allPokemons.length
        ? // Afficher des squelettes de chargement
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-48 h-64 bg-gray-300 animate-pulse rounded-lg"
            />
          ))
        : showAllPokemons.map((pokemon) => (
            <Card
              key={pokemon.pokedex_id}
              sx={{ maxWidth: 345 }}
              className={`hover:scale-105 transition duration-500 ease-in-out ${
                pokemon.pokedex_id === 0 ? "hidden" : "block"
              }`}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140" // Hauteur explicite
                  width="100%" // Largeur fixe
                  image={pokemon.sprites.regular}
                  alt={pokemon.name.fr}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {pokemon.name.fr}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {pokemon.category}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="bg-[#C62828] flex items-center justify-center">
                <Button
                  size="small"
                  sx={{ color: "#FFEE99", "&:hover": { color: "black" } }}
                  href={`/pokemon/${pokemon.pokedex_id}`}
                >
                  Voir plus
                </Button>
              </CardActions>
            </Card>
          ))}

      <div className="w-full flex justify-center mt-4">
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
      </div>
    </div>
  );
}
