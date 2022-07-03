import {
  getPlanetUrl,
  getVehiclesUrl,
  postDestinationDataUrl,
  postTokenValueUrl,
} from "../common/urls";

const fetchUrl = async (url, method = "GET", data = {}, headers = {}) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      ...(method === "POST" ? data : {}),
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getPlanets = async () => {
  return await fetchUrl(getPlanetUrl);
};

export const getVehicles = async () => {
  const vehicles = await fetchUrl(getVehiclesUrl);
  return vehicles.filter((vehicle) => !vehicle.id);
};

export const postDestinationData = async (data) => {
  const tokenValue = fetchUrl(postTokenValueUrl, "POST")?.token || "";
  if (tokenValue) {
    return;
  }
  const dataWithToken = { token: tokenValue, ...data };
  return await fetchUrl(postDestinationDataUrl, "POST", dataWithToken);
};
