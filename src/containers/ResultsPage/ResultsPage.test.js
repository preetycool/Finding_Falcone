import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ResultsPage from "./ResultsPage";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("It should redirect the user if there is no data in location state", () => {
  render(
    <MemoryRouter initialEntries={[{ state: null }]}>
      <ResultsPage />
    </MemoryRouter>
  );

  expect(mockedUsedNavigate).toBeCalledWith("/");
});

test("It should display the correct congratulations text and planet name if status is success", () => {
  render(
    <MemoryRouter
      initialEntries={[
        { state: { result: { planet_name: "Test1", status: "success" } } },
      ]}
    >
      <ResultsPage />
    </MemoryRouter>
  );

  expect(
    screen.getByText("Congratulations Voyager! You found Falcone!")
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(
    "He was hiding in Test1"
  );
});

test("It should display the failure text and planet name if status is fail status", () => {
  render(
    <MemoryRouter
      initialEntries={[
        { state: { result: { planet_name: "Test1", status: "failure" } } },
      ]}
    >
      <ResultsPage />
    </MemoryRouter>
  );

  expect(
    screen.getByText("Bad luck Voyager! You did not find Falcone!")
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(
    "He was hiding in Test1"
  );
});

test("Clicking try again should invoke try again", () => {
  render(
    <MemoryRouter
      initialEntries={[
        { state: { result: { planet_name: "Test1", status: "failure" } } },
      ]}
    >
      <ResultsPage />
    </MemoryRouter>
  );

  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
});
