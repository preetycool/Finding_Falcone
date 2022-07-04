import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("it should render footer", () => {
  render(<Footer />);

  expect(screen.getByText("Author: Preet")).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveTextContent(
    "Bird icons created by Freepik - Flaticon"
  );
});

test("it should have a link with correct href", () => {
  render(<Footer />);

  expect(screen.getByText("Author: Preet")).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    "https://www.flaticon.com/free-icons/bird"
  );
});
