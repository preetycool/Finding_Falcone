import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("Should load DestinationPage", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading.textContent).toBe("Getting ready to blast off");
});
