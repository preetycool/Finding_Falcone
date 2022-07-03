import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ErrorPage from "./ErrorPage";

beforeEach(() => {
  delete window.location;
  window.location = {
    reload: jest.fn(),
  };
});

test("It show render error page", () => {
  render(<ErrorPage />);
  expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("Try again");
});

test("it should reload page when clicking on button", () => {
  render(<ErrorPage />);
  const button = screen.getByRole("button");

  fireEvent.click(button);
  expect(window.location.reload).toHaveBeenCalled();
});
