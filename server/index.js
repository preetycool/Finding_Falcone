const express = require("express");
const path = require("path");
const data = require("./common/data.js");
const utils = require("./common/utils");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/planets", (req, res) => {
  res.json(data.planetData);
});

app.get("/vehicles", (req, res) => {
  res.json(data.vehicleData);
});

app.post("/token", (req, res) => {
  res.json({ token: "1123123" });
});

app.post("/find", (req, res) => {
  const randomPlanetData = utils.getRandomPlanet();
  const { planets } = req.body;
  const matchingPlanet = planets.find(
    (planet) => planet.toLowerCase() === randomPlanetData.name.toLowerCase()
  );
  return res.json(
    matchingPlanet
      ? { planet_name: randomPlanetData.name, status: "success" }
      : { planet_name: randomPlanetData.name, status: "failure" }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
