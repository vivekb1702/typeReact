import { PokeMonObj } from "../interfaces/interface";

export const getPokemonProfile = async (pokeData: PokeMonObj) => {
  const response = await fetch(pokeData.url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};
