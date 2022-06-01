import { render, screen, waitFor } from "@testing-library/react";
import Pokedex from "./Pokedex";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  render(<Pokedex />);
});

afterEach(() => {
  document.body.removeChild(container);
  container.remove();
});

describe("Pokedex Component Test", () => {
  it("Check Left button render", async () => {
    await waitFor(() => expect(screen.getByText("Left")).toBeInTheDocument());
  });
  it("Check Right button render", async () => {
    await waitFor(() => expect(screen.getByText("Right")).toBeInTheDocument());
  });
  it("Check Pokemon Image render", async () => {
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());
  });
  it("Check Pokemon Height Stat render", async () => {
    await waitFor(() =>
      expect(screen.getByText(/Height/i)).toBeInTheDocument()
    );
  });
  it("Check Pokemon profile Change", async () => {
    await waitFor(() => expect(screen.getByText(/Name/i)).toBeInTheDocument());
    const button = screen.getByText("Right");
    const name = screen.getByText(/Name:/i).textContent;
    console.log(name);
    act(() => {
      userEvent.click(button);
    });
    await waitFor(() =>
      expect(screen.getByText(/Name/i)).not.toHaveTextContent("Name: Bulbasaur")
    );
  });
});
