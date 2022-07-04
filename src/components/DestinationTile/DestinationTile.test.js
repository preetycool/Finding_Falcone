import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DestinationTile from "./DestinationTile";

test("should load dropdown if planets are present", () => {
  render(<DestinationTile vehicles={[]} planets={["test1", "test2"]} />);

  expect(screen.getByRole("combobox")).toHaveLength(3);
});

test("should not load dropdown if planets are not present", () => {
  render(<DestinationTile vehicles={[]} planets={[]} />);

  expect(screen.queryByRole("combobox")).toBe(null);
});

test("should not display radio button if no vehicles are present", () => {
  const onDropdownChangeMock = jest.fn();
  render(
    <DestinationTile
      vehicles={[]}
      planets={["Test1", "Test2"]}
      onDropdownChange={onDropdownChangeMock}
    />
  );
  const dropdown = screen.queryByTestId("dropdown");
  userEvent.selectOptions(dropdown, "Test1");
  const radioButtons = screen.queryByTestId("radio-button-group");
  expect(radioButtons).toBe(null);
});

test("should show error message if error message is passed down via props", () => {
  render(<DestinationTile errorMessage='Error please alert' />);

  expect(screen.getByText("Error please alert")).toBeInTheDocument();
});

test("should not show the radio buttons if default Select... is selected", () => {
  const onDropdownChangeMock = jest.fn();
  const onRadioButtonChangeMock = jest.fn();

  render(
    <DestinationTile
      vehicles={[{ name: "Vehicle1", planetsVehicleCanReach: ["Test1"] }]}
      planets={["Test1", "Test2"]}
      onDropdownChange={onDropdownChangeMock}
      onRadioButtonChange={onRadioButtonChangeMock}
      planetValue='Test1'
    />
  );
  const dropdown = screen.queryByTestId("dropdown");
  expect(dropdown).toBeInTheDocument();
  let radioButtonGroup = screen.queryByTestId("radio-button-group");
  expect(radioButtonGroup).toBeInTheDocument();

  userEvent.selectOptions(dropdown, "Select...");
  radioButtonGroup = screen.queryByTestId("radio-button-group");
  expect(radioButtonGroup).toBe(null);
});

test("should have options available with total numbers if total_no is provided", () => {
  const onDropdownChangeMock = jest.fn();
  const onRadioButtonChangeMock = jest.fn();

  render(
    <DestinationTile
      vehicles={[
        { name: "Vehicle1", planetsVehicleCanReach: ["Test1"], total_no: 5 },
      ]}
      planets={["Test1", "Test2"]}
      onDropdownChange={onDropdownChangeMock}
      onRadioButtonChange={onRadioButtonChangeMock}
      planetValue='Test1'
    />
  );

  const radioButton = screen.getByLabelText("Vehicle1 - 5 remaining");
  expect(radioButton).toBeInTheDocument();

  fireEvent.click(radioButton);
  expect(radioButton).toBeChecked(true);
  expect(screen.getByLabelText("Vehicle1 - 5 remaining")).toBeInTheDocument();
});
