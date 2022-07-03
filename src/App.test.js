import { render, screen } from "@testing-library/react";
import App from "./App";

test("Should load DestinationPage", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading.textContent).toBe("Getting ready to blast off");
});
