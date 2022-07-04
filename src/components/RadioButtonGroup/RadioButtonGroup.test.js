import { render, screen } from "@testing-library/react";
import RadioButtonGroup from "./RadioButtonGroup";

const handleChangeMock = jest.fn();

test("Should not render anything if options are not present", () => {
  render(<RadioButtonGroup handleChange={handleChangeMock} id='test' />);

  expect(screen.queryByTestId("radio-button-group")).toBe(null);
});

test("Should display radio buttons if options is present", () => {
  const options = [
    {
      value: "1",
      disabled: false,
      name: "Test option 1",
    },
    {
      value: "2",
      disabled: false,
      name: "Test option 1",
    },
  ];

  render(
    <RadioButtonGroup
      options={options}
      handleChange={handleChangeMock}
      id='test'
    />
  );

  expect(screen.queryAllByRole("radio")).toHaveLength(2);
});

test("Should display disabled option if option is disabled", () => {
  const options = [
    {
      value: "1",
      disabled: false,
      name: "Test option 1",
    },
    {
      value: "2",
      disabled: true,
      name: "Test option 1",
    },
  ];

  render(
    <RadioButtonGroup
      options={options}
      handleChange={handleChangeMock}
      id='test'
    />
  );

  expect(screen.queryAllByRole("radio")[1]).toBeDisabled();
});

test("Radio buttons should have the appropriate name based off the id", () => {
  const options = [
    {
      value: "1",
      disabled: false,
      name: "Test option 1",
    },
    {
      value: "2",
      disabled: false,
      name: "Test option 1",
    },
  ];

  render(
    <RadioButtonGroup
      options={options}
      handleChange={handleChangeMock}
      id='test'
    />
  );

  screen
    .queryAllByRole("radio")
    .forEach((radioButton) =>
      expect(radioButton).toHaveAttribute("name", "radio-group-test")
    );
});
