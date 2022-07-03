import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import DestinationSelectionPage from "./DestinationSelectionPage";
import userEvent from "@testing-library/user-event";

test("Should render DestinationSelectionPage with loader", () => {
  render(
    <BrowserRouter>
      <DestinationSelectionPage />
    </BrowserRouter>
  );

  expect(screen.getByText("Getting ready to blast off")).toBeInTheDocument();
});

test("Should render DestinationSelectionPage with loader", async () => {
  const planetsMock = [
    {
      name: "Planet1",
      distance: 100,
    },
    { name: "Planet2", distance: 200 },
  ];

  const vehiclesMock = [
    { name: "Space pod", total_no: 2, max_distance: 200, speed: 2 },
    { name: "Space rocket", total_no: 1, max_distance: 300, speed: 4 },
  ];

  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve(planetsMock) })
    )
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(vehiclesMock) })
    );

  await act(async () => {
    render(
      <BrowserRouter>
        <DestinationSelectionPage />
      </BrowserRouter>
    );
  });

  expect(screen.getByText("Search for Master Falcone")).toBeInTheDocument();
});

test("Should show errorMessage when clicking submit button", async () => {
  const planetsMock = [
    {
      name: "Planet1",
      distance: 100,
    },
    { name: "Planet2", distance: 200 },
  ];

  const vehiclesMock = [
    { name: "Space pod", total_no: 2, max_distance: 200, speed: 2 },
    { name: "Space rocket", total_no: 1, max_distance: 300, speed: 4 },
  ];

  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve(planetsMock) })
    )
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(vehiclesMock) })
    );

  await act(async () => {
    render(
      <BrowserRouter>
        <DestinationSelectionPage />
      </BrowserRouter>
    );
  });

  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(
    screen.queryAllByText("Please select a planet to travel to")
  ).toHaveLength(4);
});

test("Should show ErrorPage if there is an api error", async () => {
  const errorMock = { error: "ERROR_1" };

  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() => Promise.resolve({ errorMock }))
    .mockImplementation(() => Promise.resolve({ errorMock }));

  await act(async () => {
    render(
      <BrowserRouter>
        <DestinationSelectionPage />
      </BrowserRouter>
    );
  });
});

test("Should show errorMessage when clicking submit button and remove them after selecting value from dropdown", async () => {
  const planetsMock = [
    {
      name: "Planet1",
      distance: 100,
    },
    { name: "Planet2", distance: 200 },
  ];

  const vehiclesMock = [
    { name: "Space pod", total_no: 2, max_distance: 200, speed: 2 },
    { name: "Space rocket", total_no: 1, max_distance: 300, speed: 4 },
  ];

  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve(planetsMock) })
    )
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(vehiclesMock) })
    );

  await act(async () => {
    render(
      <BrowserRouter>
        <DestinationSelectionPage />
      </BrowserRouter>
    );
  });

  let button = screen.getByRole("button");
  fireEvent.click(button);

  expect(
    screen.queryAllByText("Please select a planet to travel to")
  ).toHaveLength(4);

  const dropdown = screen.queryAllByTestId("dropdown")[0];
  userEvent.selectOptions(dropdown, "Planet1");

  button = screen.getByRole("button");
  fireEvent.click(button);

  expect(
    screen.queryAllByText("Please select a planet to travel to")
  ).toHaveLength(3);
  expect(screen.queryAllByText("Please select a vehicle")).toHaveLength(1);
});

test("Should be able to see vehicle errors", async () => {
  const planetsMock = [
    {
      name: "Planet1",
      distance: 100,
    },
    { name: "Planet2", distance: 200 },
    { name: "Planet3", distance: 500 },
    { name: "Planet4", distance: 600 },
  ];

  const vehiclesMock = [
    { name: "Space rocket", total_no: 6, max_distance: 600, speed: 4 },
  ];

  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve(planetsMock) })
    )
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(vehiclesMock) })
    );

  await act(async () => {
    render(
      <BrowserRouter>
        <DestinationSelectionPage />
      </BrowserRouter>
    );
  });

  const allDropdownMenu = screen.queryAllByTestId("dropdown");
  allDropdownMenu.forEach((dropdown, index) =>
    userEvent.selectOptions(dropdown, planetsMock[index].name)
  );

  let button = screen.getByRole("button");
  fireEvent.click(button);
  expect(screen.queryAllByText("Please select a vehicle")).toHaveLength(4);
});

test("Should remove error message from vehicle tile", async () => {
  const planetsMock = [
    {
      name: "Planet1",
      distance: 100,
    },
    { name: "Planet2", distance: 200 },
    { name: "Planet3", distance: 500 },
    { name: "Planet4", distance: 600 },
  ];

  const vehiclesMock = [
    { name: "Space rocket", total_no: 6, max_distance: 600, speed: 4 },
  ];

  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve(planetsMock) })
    )
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(vehiclesMock) })
    );

  await act(async () => {
    render(
      <BrowserRouter>
        <DestinationSelectionPage />
      </BrowserRouter>
    );
  });

  const allDropdownMenu = screen.queryAllByTestId("dropdown");
  userEvent.selectOptions(allDropdownMenu[0], "Planet1");

  let button = screen.getByRole("button");
  fireEvent.click(button);
  expect(screen.queryAllByText("Please select a vehicle")).toHaveLength(1);

  const radioButton = screen.getByLabelText("Space rocket - 6 remaining");
  fireEvent.click(radioButton);
  expect(radioButton).toBeChecked();
  expect(screen.queryAllByText("Please select a vehicle")).toHaveLength(0);
});

test("value of radio button should go down by 1 if it is selected", async () => {
  const planetsMock = [
    {
      name: "Planet1",
      distance: 100,
    },
    { name: "Planet2", distance: 200 },
    { name: "Planet3", distance: 500 },
    { name: "Planet4", distance: 600 },
  ];

  const vehiclesMock = [
    { name: "Space rocket", total_no: 6, max_distance: 600, speed: 4 },
  ];

  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve(planetsMock) })
    )
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(vehiclesMock) })
    );

  await act(async () => {
    render(
      <BrowserRouter>
        <DestinationSelectionPage />
      </BrowserRouter>
    );
  });

  const allDropdownMenu = screen.queryAllByTestId("dropdown");
  userEvent.selectOptions(allDropdownMenu[0], "Planet1");
  let radioButton = screen.getByLabelText("Space rocket - 6 remaining");
  fireEvent.click(radioButton);
  expect(radioButton).toBeChecked();

  radioButton = screen.queryAllByText("Space rocket - 5 remaining");
  expect(radioButton).toHaveLength(1);
});
