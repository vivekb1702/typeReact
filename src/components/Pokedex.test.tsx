import { render, screen, waitFor } from "@testing-library/react";
import Pokedex from "./Pokedex";
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
  it("Check Left button render", async () => {
    render(<Pokedex />);
    //  await waitFor(() => expect(screen.getByText("Left")).toBeInTheDocument());
    expect(
      await screen.findByText("Left", {}, { timeout: 1000 })
    ).toHaveTextContent("Left");
  });

  it("Check Right button render", async () => {
    render(<Pokedex />);
    //await waitFor(() => expect(screen.getByText("Right")).toBeInTheDocument());
    expect(
      await screen.findByText("Right", {}, { timeout: 1000 })
    ).toHaveTextContent("Right");
  });

  it("Check Pokemon Image render", async () => {
    render(<Pokedex />);
    expect(
      await screen.findByRole("img", {}, { timeout: 1000 })
    ).toBeInTheDocument();
  });

  it("Check Pokemon Height Stat render", async () => {
    render(<Pokedex />);
    expect(
      await screen.findByText(/Height/i, {}, { timeout: 1000 })
    ).toHaveTextContent(/Height:/i);
  });

  it("Check Pokemon profile Change", async () => {
    render(<Pokedex />);
    await screen.findByText(/Name/i, {}, { timeout: 1000 });
    const button: HTMLButtonElement = screen.getByText("Right");
    const name: string = screen.getByText(/Name:/i).textContent!;
    userEvent.click(button);
    await waitFor(() =>
      expect(screen.getByText(/Name/i)).not.toHaveTextContent(name)
    );
  });
});
