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
  console.log("here");
  const tokenData = await fetchUrl(postTokenValueUrl, "POST");
  if (!tokenData?.token) {
    return;
  }
  const dataWithToken = { token: tokenData.token, ...data };
  console.log(dataWithToken);
  return await fetchUrl(postDestinationDataUrl, "POST", dataWithToken);
};
