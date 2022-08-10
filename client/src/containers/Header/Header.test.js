import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import App from "../../App";
import ResultsPage from "../ResultsPage/ResultsPage";
import Header from "./Header";

beforeEach(() => {
  delete window.location;
  window.location = {
    reload: jest.fn(),
  };
});

test("Should render the header", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getByText("Finding Falcone")).toBeInTheDocument();
  const image = screen.getByAltText("bird");
  expect(image.src).toContain("bird.png");
});

test("Should reload page if clicking on the reset button", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  const resetButton = screen.getByRole("button");
  fireEvent.click(resetButton);
  expect(window.location.reload).toHaveBeenCalled();
});

test("Should redirect user to App when clicking home button", () => {
  render(
    <MemoryRouter initialEntries={["/results"]}>
      <Header />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/results' element={<ResultsPage />} />
      </Routes>
    </MemoryRouter>
  );

  const homeButton = screen.getByText("Home");
  fireEvent.click(homeButton);
  expect(screen.queryAllByText("Getting ready to blast off")).toHaveLength(1);
});

test("Should reload page if clicking on image in navbar", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  const image = screen.getByRole("img");
  fireEvent.click(image);
  expect(window.location.reload).toHaveBeenCalled();
});

test("Should reload page if clicking on title in navbar", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  const title = screen.getByRole("heading", { level: 1 });
  fireEvent.click(title);
  expect(window.location.reload).toHaveBeenCalled();
});
