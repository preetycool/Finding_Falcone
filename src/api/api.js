import { getPlanetUrl, getVehiclesUrl } from "../common/urls";

export const getPlanets = async () => {
  try {
    const response = await fetch(getPlanetUrl);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getVehicles = async () => {
  try {
    const response = await fetch(getVehiclesUrl);
    const data = await response.json();
    const filteredVehicles = data.filter((data) => !data.id);
    return filteredVehicles;
  } catch (e) {
    console.log(e);
  }
};
