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
}

interface PokemonCardProps {
  allPokemons: Pokemon[];
}

export default function PokemonCard({ allPokemons }: PokemonCardProps) {
  const [limit, setLimit] = useState(30);

  const handleLoadMore = () => {
    setLimit(limit + 30);
  };

  const showAllPokemons = allPokemons.slice(0, limit);

  console.log(allPokemons);

  return (
    <div className="flex flex-wrap justify-center items-center pt-8 pb-8 gap-4">
      {showAllPokemons.map((pokemon, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
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
          <CardActions className="bg-[#CC4C41] flex items-center justify-center">
            <Button size="small" sx={{ color: "black" }}>
              Voir plus
            </Button>
          </CardActions>
        </Card>
      ))}
      <div className="w-full flex justify-center mt-4">
        <Button
        sx={{ backgroundColor: "#CC4C41", color: "white" }}
          variant="contained"
          onClick={handleLoadMore}
          className="load-more"
        >
          Voir plus
        </Button>
      </div>
    </div>
  );
}
