import { getPlanets } from "./api";

test("Invokes getPlanets call", async () => {
  const fakeData = {
    planetName: "testPlanet",
  };

  jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(fakeData) })
    );

  expect(await getPlanets("mockUrl")).toBe(fakeData);
});

test("Should return error object if error is present", async () => {
  const expectedData = {
    error: "ERROR_1",
  };

  jest.spyOn(global, "fetch").mockImplementation(() => {
    throw new Error();
  });

  expect(await getPlanets("mockUrl")).toStrictEqual(expectedData);
});
