import { render, screen, waitFor } from "@testing-library/react";
import PokemonProfile from "./PokemonProfile";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container.remove();
});

describe("Pokedex Component Test", () => {
  it("Check PokeMon Name is Bulbasaur", async () => {
    render(
      <PokemonProfile
        pokeData={{
          name: "Bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        }}
      />
    );
    expect(await screen.findByText("Name: Bulbasaur", {}, { timeout: 1000 }));
  });
  it("Check Pokemon Image Render", async () => {
    render(
      <PokemonProfile
        pokeData={{
          name: "Bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        }}
      />
    );
    expect(await screen.findByRole("img", {}, { timeout: 1000 }));
  });

  it("Check Pokemon Image alt text", async () => {
    render(
      <PokemonProfile
        pokeData={{
          name: "Bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        }}
      />
    );
    expect(await screen.findByAltText("bulbasaur", {}, { timeout: 1000 }));
  });
  it("Check Error Message", async () => {
    render(
      <PokemonProfile
        pokeData={{
          name: "Bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/14526",
        }}
      />
    );
    expect(
      await screen.findAllByText("Error Loading Data...", {}, { timeout: 1000 })
    );
  });
});
