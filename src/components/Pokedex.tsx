import { useEffect, useState } from "react";
import { PokeMonObj } from "../interfaces/interface";
import PokemonProfile from "./PokemonProfile";
import "./Pokedex.css";

type buttonDirection = "Left" | "Right";

const Pokedex = (): JSX.Element => {
  const [pokeData, setPokeData] = useState<PokeMonObj[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<number>(0);

  const getPokemonData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setPokeData(data.results);
    } catch (error) {}
  };

  const handleChangePokemon = (direction: buttonDirection) => {
    try {
      if (direction === "Left") {
        if (currentPokemon !== 0) {
          setCurrentPokemon((current) => {
            localStorage.setItem("currentPoke", `${current - 1}`);

            return current - 1;
          });
        }
      } else {
        if (currentPokemon !== pokeData.length - 1) {
          setCurrentPokemon((current) => {
            localStorage.setItem("currentPoke", `${current + 1}`);

            return current + 1;
          });
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    getPokemonData();
    let current = localStorage.getItem("currentPoke");
    if (current) {
      setCurrentPokemon(parseInt(current, 10));
    }
  }, []);

  return (
    <>
      {pokeData.length > 1 ? (
        <div className="pokedex-container">
          <PokemonProfile pokeData={pokeData[currentPokemon]} />

          <div className="pokedex-nav">
            <button
              className="poke-button"
              onClick={() => {
                handleChangePokemon("Left");
              }}
            >
              Left
            </button>
            <button
              className="poke-button"
              onClick={() => {
                handleChangePokemon("Right");
              }}
            >
              Right
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Pokedex;
