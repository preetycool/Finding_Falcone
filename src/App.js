import { useEffect, useState } from "react";
import { getPlanets, getVehicles } from "./api/api";
import "./App.css";
import { MAX_DESTINATIONS } from "./common/constants";
import PlanetVehicleTile from "./components/PlanetVehicleTile";

function App() {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  //  have selected object array

  useEffect(() => {
    const getData = async () => {
      const planetData = await getPlanets();
      const vehicleData = await getVehicles();

      setPlanets(planetData);
      setVehicles(vehicleData);
    };

    getData();
  }, []);

  if (planets.length == 0 || vehicles.length == 0) {
    return <h1>...Loading</h1>;
  }

  const onDropdownChange = (id) => (value) => {
    setPlanets((prevState) => {
      const planetCopy = [...prevState];

      if (!value) {
        const currentPlanetSelectedIndex = planetCopy.findIndex(
          (planet) => planet?.destinationNumber === id
        );

        if (currentPlanetSelectedIndex > -1) {
          planetCopy[currentPlanetSelectedIndex].destinationNumber = 0;
          planetCopy[currentPlanetSelectedIndex].isSelected = false;
        }
      }

      const newlySelectedPlanetIndex = planetCopy.findIndex(
        (planet) => planet.name === value
      );

      if (newlySelectedPlanetIndex > -1) {
        planetCopy[newlySelectedPlanetIndex].destinationNumber = id;
        planetCopy[newlySelectedPlanetIndex].isSelected = true;
      }
      return planetCopy;
    });
  };

  const getPlanetValue = (id) =>
    planets.find((planet) => planet.destinationNumber === id)?.name || "";

  console.log(planets);

  return (
    <div className="App">
      <PlanetVehicleTile
        destinationNumber={1}
        planets={planets}
        vehicles={vehicles}
        onDropdownChange={onDropdownChange(1)}
        value={getPlanetValue(1)}
      />
      <PlanetVehicleTile
        destinationNumber={2}
        planets={planets}
        vehicles={vehicles}
        onDropdownChange={onDropdownChange(2)}
        value={getPlanetValue(2)}
      />
      <PlanetVehicleTile
        destinationNumber={3}
        planets={planets}
        vehicles={vehicles}
        onDropdownChange={onDropdownChange(3)}
        value={getPlanetValue(3)}
      />
      <PlanetVehicleTile
        destinationNumber={4}
        planets={planets}
        vehicles={vehicles}
        onDropdownChange={onDropdownChange(4)}
        value={getPlanetValue(4)}
      />
    </div>
  );
}

export default App;
