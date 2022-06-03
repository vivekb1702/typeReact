import { render, screen } from "@testing-library/react";
import { Profile } from "../../../interfaces/interface";
import * as data from "../../../Api/Pokemon";
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
    const fakeProfile: Profile = {
      name: "Pikachu",
      weight: 7,
      height: 10,
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      },
    };
    const mock = jest
      .spyOn(data, "getPokemonProfile")
      .mockResolvedValue(fakeProfile);
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
    ).toHaveTextContent("Name: Pikachu");
    mock.mockRestore();
  });

  it("Check Pokemon Image Render", async () => {
    const fakeProfile: Profile = {
      name: "Pikachu",
      weight: 7,
      height: 10,
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      },
    };
    const mock = jest
      .spyOn(data, "getPokemonProfile")
      .mockResolvedValue(fakeProfile);
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
    mock.mockRestore();
  });

  it("Check Pokemon Image alt text", async () => {
    const fakeProfile: Profile = {
      name: "pikachu",
      weight: 7,
      height: 10,
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      },
    };
    const mock = jest
      .spyOn(data, "getPokemonProfile")
      .mockResolvedValue(fakeProfile);
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
    ).toHaveAccessibleName("pikachu");
    mock.mockRestore();
  });

  it("Check Error Message on Api Failure", async () => {
    const mock = jest.spyOn(data, "getPokemonProfile").mockRejectedValue(null);
    render(
      <PokemonProfile
        pokeData={{
          name: "Bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        }}
      />
    );

    expect(
      await screen.findByText(/Error/i, {}, { timeout: 4000 })
    ).toHaveTextContent("Error Loading Data...");
    mock.mockRestore();
  });

  it("Check Pokemon Profile all stats are displayed", async () => {
    const fakeProfile: Profile = {
      name: "pikachu",
      weight: 7,
      height: 10,
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      },
    };
    const mock = jest
      .spyOn(data, "getPokemonProfile")
      .mockResolvedValue(fakeProfile);
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
    mock.mockRestore();
  });
});
