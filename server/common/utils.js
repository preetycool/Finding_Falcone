const data = require("./data");

const getRandomPlanet = () => {
  const randomIndex = Math.floor(Math.random() * data.planetData.length);
  return data.planetData[randomIndex];
};

module.exports = { getRandomPlanet };
