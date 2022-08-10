import { render, screen } from "@testing-library/react";
import Loader from "./Loader";
jest.mock("lottie-react");

test("Should display subtitle", () => {
  render(<Loader headingText="Party time" />);
  const subtitleText = screen.getByText("Party time");
  expect(subtitleText).toBeInTheDocument();
});

test("Should not display subtitle if it is not provided in props", () => {
  const { container } = render(<Loader />);
  expect(container.getElementsByClassName("loader__heading")).toHaveLength(0);
});
