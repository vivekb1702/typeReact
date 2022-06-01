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
    //  await waitFor(() => expect(screen.getByText("Left")).toBeInTheDocument());
    expect(await screen.findByText("Left", {}, { timeout: 1000 }));
  });
  it("Check Right button render", async () => {
    //await waitFor(() => expect(screen.getByText("Right")).toBeInTheDocument());
    expect(await screen.findByText("Right", {}, { timeout: 1000 }));
  });
  it("Check Pokemon Image render", async () => {
    expect(await screen.findByRole("img", {}, { timeout: 1000 }));
  });
  it("Check Pokemon Height Stat render", async () => {
    // await waitFor(() =>
    //   expect(screen.getByText(/Height/i)).toBeInTheDocument()
    // );
    expect(await screen.findByText(/Height/i, {}, { timeout: 1000 }));
  });
  it("Check Pokemon profile Change", async () => {
    await screen.findByText(/Name/i, {}, { timeout: 1000 });
    const button: HTMLButtonElement = screen.getByText("Right");
    const name: string = screen.getByText(/Name:/i).textContent!;
    act(() => {
      userEvent.click(button);
    });
    await waitFor(() =>
      expect(screen.getByText(/Name/i)).not.toHaveTextContent(name)
    );
  });
});
