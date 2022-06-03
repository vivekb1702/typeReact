import { render, screen } from "@testing-library/react";
import PokemonProfile from "../PokemonProfile";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container.remove();
});

describe("Pokemon Profile Component Test", () => {
  it("Check PokeMon Name is Bulbasaur", async () => {
    render(
      <PokemonProfile
        pokeData={{
          name: "Bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        }}
      />
    );

    expect(
      await screen.findByText(/Name:/i, {}, { timeout: 1000 })
    ).toHaveTextContent("Name: Bulbasaur");
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

    expect(
      await screen.findByRole("img", {}, { timeout: 1000 })
    ).toBeInTheDocument();
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

    expect(
      await screen.findByRole("img", {}, { timeout: 2000 })
    ).toHaveAccessibleName("bulbasaur");
  });

  it("Check Error Message on Api Failure", async () => {
    render(
      <PokemonProfile
        pokeData={{
          name: "Bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/14526",
        }}
      />
    );

    expect(
      await screen.findByText(/Error/i, {}, { timeout: 4000 })
    ).toHaveTextContent("Error Loading Data...");
  });

  it("Check Pokemon Profile all stats are displayed", async () => {
    render(
      <PokemonProfile
        pokeData={{
          name: "Bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        }}
      />
    );

    expect(
      await screen.findAllByTestId(/profile-stat/i, {}, { timeout: 1000 })
    ).toHaveLength(3);
  });
});
