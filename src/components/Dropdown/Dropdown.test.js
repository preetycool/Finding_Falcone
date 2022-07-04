import { render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown";

const handleChangeMock = jest.fn();
test("should render dropdown with default value", () => {
  render(<Dropdown />);

  expect(screen.getByRole("combobox")).toHaveDisplayValue("Select...");
});

test("should render dropdown with default value if there is no matching option", () => {
  render(<Dropdown handleChange={handleChangeMock} value={"Test"} />);

  expect(screen.getByRole("combobox")).toHaveDisplayValue("Select...");
});

test("should render dropdown with default value if there is a matching option", () => {
  render(
    <Dropdown
      handleChange={handleChangeMock}
      value={"Test"}
      options={["Test"]}
    />
  );

  expect(screen.getByRole("combobox")).toHaveDisplayValue("Test");
});
