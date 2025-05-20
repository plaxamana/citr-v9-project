import { render, cleanup } from "@testing-library/react";
import { describe, expect, test, afterEach } from "vitest";
import Pizza from "../Pizza";

describe("Pizza", () => {
  afterEach(cleanup);

  test("alt text renders on Pizza", () => {
    const name = "My favourite Pizza";
    const src = "https://picsum.photos/200";
    const screen = render(
      <Pizza name={name} image={src} description="Super cool pizza" />,
    );

    const img = screen.getByRole("img");
    expect(img.alt).toBe(name);
    expect(img.src).toBe(src);
  });

  test("to have default image if none is provided", () => {
    const screen = render(<Pizza name="Another pizza" />);

    const img = screen.getByRole("img");
    expect(img.alt).toBe("Another pizza");
    expect(img.src).not.toBe("");
  });
});
