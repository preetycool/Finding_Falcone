import DestinationTile from "../../components/DestinationTile/DestinationTile";
import { useEffect, useState } from "react";
import { getPlanets, getVehicles, postDestinationData } from "../../api/api";
import { PLANET_SELECTED, VEHICLE_SELECTED } from "../../common/constants";
import Loader from "../../components/Loader/Loader";

const DestinationSelectionPage = () => {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [destinationSelections, setDestinationSelections] = useState([
    ...Array.apply(null, Array(4)).map((_, i) => ({
      destinationNumber: i + 1,
      [PLANET_SELECTED]: "",
      [VEHICLE_SELECTED]: "",
    })),
  ]);

  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const planetData = await getPlanets();
      const vehicleData = await getVehicles();

      setPlanets(planetData);
      setVehicles(vehicleData);
    };

    getData();
  }, []);

  useEffect(() => {}, [vehicles]);

  if (planets.length === 0 || vehicles.length === 0) {
    return <Loader headingText={"Getting ready to blast off"} />;
  }

  const onDropdownChange = (id) => (value) => {
    setDestinationSelections((prevState) => {
      const destinationSelectionCopy = [...prevState];
      destinationSelectionCopy[id - 1][PLANET_SELECTED] = value;

      return destinationSelectionCopy;
    });
  };

  const onRadioButtonChange = (id) => (value) => {
    const destinationSelectionCopy = [...destinationSelections];
    destinationSelectionCopy[id - 1][VEHICLE_SELECTED] = value;
    setDestinationSelections(destinationSelectionCopy);

    const { planetSelected, vehicleSelected } =
      destinationSelectionCopy[id - 1];

    const { distance } = planets.find(
      (planet) => planet.name === planetSelected
    );
    const { speed } = vehicles.find(
      (vehicle) => vehicle.name === vehicleSelected
    );

    const timeTakenToTravelToPlanet = Number(distance) / Number(speed);
    setTimeTaken((prevState) => prevState + timeTakenToTravelToPlanet);
  };

  const getMatchingValueFromDestinations = (id, itemToFind) =>
    destinationSelections[id - 1][itemToFind] || "";

  const getFilteredPlanets = (id) => {
    return planets.filter(
      (planet) =>
        !destinationSelections.find(
          (destination) =>
            destination[PLANET_SELECTED] === planet.name &&
            destination.destinationNumber !== id
        )
    );
  };

  const getFilteredVehicles = () =>
    vehicles.map(({ name, total_no, max_distance }) => {
      const planetsVehicleCanReach = planets
        .filter((planet) => planet?.distance <= max_distance)
        .map(({ name }) => name);

      const getTotalNumberOfVehiclesRemaining =
        total_no -
        destinationSelections.filter(
          (destination) => destination[VEHICLE_SELECTED] === name
        ).length;

      return {
        name,
        total_no: getTotalNumberOfVehiclesRemaining,
        planetsVehicleCanReach,
        disabled: getTotalNumberOfVehiclesRemaining === 0,
      };
    });

  const handleSubmit = () => {
    // need error handling here for state
    console.log("hi");
    const mappedDestinationData = destinationSelections.reduce(
      (accumulation, currentDestination) => {
        accumulation.planets.push(currentDestination.planetSelected);
        accumulation.vehicles.push(currentDestination.vehicleSelected);

        return accumulation;
      },
      { planets: [], vehicles: [] }
    );

    console.log(mappedDestinationData);
    postDestinationData(mappedDestinationData);
  };

  return (
    <div className='destination-selection'>
      <h2 className='destination-time-taken'>Time taken: {timeTaken}</h2>
      <DestinationTile
        id={1}
        planets={getFilteredPlanets(1)}
        vehicles={getFilteredVehicles()}
        onDropdownChange={onDropdownChange(1)}
        planetValue={getMatchingValueFromDestinations(1, PLANET_SELECTED)}
        vehicleValue={getMatchingValueFromDestinations(1, VEHICLE_SELECTED)}
        onCheckboxSelect={onRadioButtonChange(1)}
      />
      <DestinationTile
        id={2}
        planets={getFilteredPlanets(2)}
        vehicles={getFilteredVehicles()}
        onDropdownChange={onDropdownChange(2)}
        planetValue={getMatchingValueFromDestinations(2, PLANET_SELECTED)}
        vehicleValue={getMatchingValueFromDestinations(2, VEHICLE_SELECTED)}
        onCheckboxSelect={onRadioButtonChange(2)}
      />
      <DestinationTile
        id={3}
        planets={getFilteredPlanets(3)}
        vehicles={getFilteredVehicles()}
        onDropdownChange={onDropdownChange(3)}
        planetValue={getMatchingValueFromDestinations(3, PLANET_SELECTED)}
        vehicleValue={getMatchingValueFromDestinations(3, VEHICLE_SELECTED)}
        onCheckboxSelect={onRadioButtonChange(3)}
      />
      <DestinationTile
        id={4}
        planets={getFilteredPlanets(4)}
        vehicles={getFilteredVehicles()}
        onDropdownChange={onDropdownChange(4)}
        planetValue={getMatchingValueFromDestinations(4, PLANET_SELECTED)}
        vehicleValue={getMatchingValueFromDestinations(4, VEHICLE_SELECTED)}
        onCheckboxSelect={onRadioButtonChange(4)}
      />
      <button onClick={handleSubmit}>Submit Data</button>
    </div>
  );
};

export default DestinationSelectionPage;
