import DestinationTile from "../../components/DestinationTile/DestinationTile";
import { useEffect, useState } from "react";
import { getPlanets, getVehicles, postDestinationData } from "../../api/api";
import {
  PLANET_ERROR_MESSAGE,
  PLANET_SELECTED,
  VEHICLE_ERROR_MESSAGE,
  VEHICLE_SELECTED,
} from "../../common/constants";
import Loader from "../../components/Loader/Loader";
import "./DestinationSelectionPage.styles.scss";
import { useNavigate } from "react-router-dom";

const DestinationSelectionPage = () => {
  const navigate = useNavigate();
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [destinationSelections, setDestinationSelections] = useState([
    ...Array.apply(null, Array(4)).map((_, i) => ({
      destinationNumber: i + 1,
      [PLANET_SELECTED]: "",
      [VEHICLE_SELECTED]: "",
    })),
  ]);
  const [errorMessages, setErrorMessages] = useState([
    ...Array.apply(null, Array(4)).map((_, i) => ({
      destinationNumber: i + 1,
      errorMessage: "",
    })),
  ]);

  useEffect(() => {
    const getData = async () => {
      const planetData = await getPlanets();
      const vehicleData = await getVehicles();

      setPlanets(planetData);
      setVehicles(vehicleData);
    };

    getData();
  }, []);

  if (planets.length === 0 || vehicles.length === 0) {
    return <Loader headingText={"Getting ready to blast off"} />;
  }

  const onDropdownChange = (id) => (value) => {
    setDestinationSelections((prevState) => {
      const destinationSelectionCopy = [...prevState];
      destinationSelectionCopy[id - 1][PLANET_SELECTED] = value;

      return destinationSelectionCopy;
    });

    setErrorMessages((prevState) => {
      const errorMessageCopy = [...prevState];
      errorMessageCopy[id - 1].errorMessage = "";

      return errorMessageCopy;
    });
  };

  const onRadioButtonChange = (id) => (value) => {
    const destinationSelectionCopy = [...destinationSelections];
    destinationSelectionCopy[id - 1][VEHICLE_SELECTED] = value;
    setDestinationSelections(destinationSelectionCopy);

    setErrorMessages((prevState) => {
      const errorMessageCopy = [...prevState];
      errorMessageCopy[id - 1].errorMessage = "";

      return errorMessageCopy;
    });
  };

  const getTotalTimeTaken = () =>
    destinationSelections.reduce((totalTime, currentDestination) => {
      if (
        currentDestination.planetSelected &&
        currentDestination.vehicleSelected
      ) {
        const { distance } = planets.find(
          (planet) => planet.name === currentDestination.planetSelected
        );

        const { speed } = vehicles.find(
          (vehicle) => vehicle.name === currentDestination.vehicleSelected
        );

        return totalTime + Number(distance) / Number(speed);
      }

      return totalTime + 0;
    }, 0);

  const getMatchingValueFromDestinations = (id, itemToFind) =>
    destinationSelections[id - 1][itemToFind] || "";

  const getFilteredPlanets = (id) => {
    return planets
      .filter(
        (planet) =>
          !destinationSelections.find(
            (destination) =>
              destination[PLANET_SELECTED] === planet.name &&
              destination.destinationNumber !== id
          )
      )
      .map((p) => p.name);
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

  const checkDestionationErrors = () => {
    let hasDestionationError = false;
    const errorMessageCopy = [...errorMessages];
    destinationSelections.forEach((destination) => {
      if (!destination.planetSelected) {
        errorMessageCopy[destination.destinationNumber - 1].errorMessage =
          PLANET_ERROR_MESSAGE;
        hasDestionationError = true;
      } else if (!destination.vehicleSelected) {
        errorMessageCopy[destination.destinationNumber - 1].errorMessage =
          VEHICLE_ERROR_MESSAGE;
        hasDestionationError = true;
      }
    });

    if (hasDestionationError) {
      setErrorMessages(errorMessageCopy);
    }

    return hasDestionationError;
  };

  const handleSubmit = async () => {
    const hasError = checkDestionationErrors();

    if (!hasError) {
      const mappedDestinationData = destinationSelections.reduce(
        (accumulation, currentDestination) => {
          accumulation.planets.push(currentDestination.planetSelected);
          accumulation.vehicles.push(currentDestination.vehicleSelected);

          return accumulation;
        },
        { planets: [], vehicles: [] }
      );

      const result = await postDestinationData(mappedDestinationData);
      if (Object.values(result).length > 0) {
        navigate("/results", { state: { result, destinationSelections } });
      }
    }
  };

  const getErrorMessage = (id) =>
    errorMessages.find((errorMessage) => errorMessage.destinationNumber === id)
      ?.errorMessage;

  return (
    <section className='destination-page'>
      <h1 className='destination-page__heading'>Search for Master Falcone</h1>
      <h2 className='destination-page__subheading'>
        He's hiding somewhere at one of the planets. Select 4 destinations and
        the vehicle you wish to use to travel to each destination
      </h2>
      <h2 className='destination-page__time'>
        Total time taken: {getTotalTimeTaken()}
      </h2>
      <div className='destination-page__tiles'>
        <DestinationTile
          id={1}
          planets={getFilteredPlanets(1)}
          vehicles={getFilteredVehicles()}
          onDropdownChange={onDropdownChange(1)}
          planetValue={getMatchingValueFromDestinations(1, PLANET_SELECTED)}
          vehicleValue={getMatchingValueFromDestinations(1, VEHICLE_SELECTED)}
          onRadioButtonChange={onRadioButtonChange(1)}
          errorMessage={getErrorMessage(1)}
        />
        <DestinationTile
          id={2}
          planets={getFilteredPlanets(2)}
          vehicles={getFilteredVehicles()}
          onDropdownChange={onDropdownChange(2)}
          planetValue={getMatchingValueFromDestinations(2, PLANET_SELECTED)}
          vehicleValue={getMatchingValueFromDestinations(2, VEHICLE_SELECTED)}
          onRadioButtonChange={onRadioButtonChange(2)}
          errorMessage={getErrorMessage(2)}
        />
        <DestinationTile
          id={3}
          planets={getFilteredPlanets(3)}
          vehicles={getFilteredVehicles()}
          onDropdownChange={onDropdownChange(3)}
          planetValue={getMatchingValueFromDestinations(3, PLANET_SELECTED)}
          vehicleValue={getMatchingValueFromDestinations(3, VEHICLE_SELECTED)}
          onRadioButtonChange={onRadioButtonChange(3)}
          errorMessage={getErrorMessage(3)}
        />
        <DestinationTile
          id={4}
          planets={getFilteredPlanets(4)}
          vehicles={getFilteredVehicles()}
          onDropdownChange={onDropdownChange(4)}
          planetValue={getMatchingValueFromDestinations(4, PLANET_SELECTED)}
          vehicleValue={getMatchingValueFromDestinations(4, VEHICLE_SELECTED)}
          onRadioButtonChange={onRadioButtonChange(4)}
          errorMessage={getErrorMessage(4)}
        />
      </div>
      <div className='destination-page__submit'>
        <button className='destination-page__button' onClick={handleSubmit}>
          Submit Data
        </button>
      </div>
    </section>
  );
};

export default DestinationSelectionPage;
