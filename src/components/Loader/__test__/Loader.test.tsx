import { render, screen } from "@testing-library/react";
import Loader from "../Loader";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container.remove();
});

describe("Loader Component Test", () => {
  it("Check Loader render", async () => {
    render(<Loader>Loading ...</Loader>);
    expect(
      await screen.findByText("Loading ...", {}, { timeout: 1000 })
    ).toHaveTextContent("Loading ...");
  });

  it("Check Loader not displayed before delay", async () => {
    render(<Loader delayMs={1000}>Loading ...</Loader>);
    expect(screen.queryByText("Loading ...")).toBeNull();
  });

  it("Check Loader displayed after delay", async () => {
    render(<Loader delayMs={1000}>Loading ...</Loader>);
    expect(screen.queryByText("Loading ...")).toBeNull();
    expect(
      await screen.findByText("Loading ...", {}, { timeout: 1100 })
    ).toHaveTextContent("Loading ...");
  });
});
