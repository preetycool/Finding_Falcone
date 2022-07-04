import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import RadioButtonGroup from "../RadioButtonGroup/RadioButtonGroup";
import "./DestinationTile.styles.scss";

const DestinationTile = ({
  planets = [],
  vehicles = [],
  id,
  onDropdownChange,
  planetValue,
  vehicleValue,
  onRadioButtonChange,
  errorMessage,
}) => {
  const [isOptionSelected, setIsOptionSelected] = useState(
    !!planetValue || false
  );

  const vehiclesThatCanReachPlanetSelected = vehicles
    .filter((vehicle) => vehicle.planetsVehicleCanReach.includes(planetValue))
    .map((vehicle) => ({
      name: `${vehicle.name} ${
        vehicle.total_no >= 0 ? ` - ${vehicle.total_no} remaining` : ""
      }`,
      value: vehicle.name,
      disabled: vehicle.disabled,
    }));

  const handleDropdownChange = (e) => {
    onDropdownChange(e.target.value);
    if (e.target.value) {
      setIsOptionSelected(true);
    } else {
      setIsOptionSelected(false);
    }
  };

  const handleRadioButtonChange = (e) => {
    onRadioButtonChange(e.target.value);
  };

  return (
    <section className='destination-tile'>
      <h2 className='destination-tile__heading'>{`Destination ${id}`}</h2>
      {!!planets.length && (
        <Dropdown
          id={id}
          value={planetValue}
          options={planets}
          handleChange={handleDropdownChange}
        />
      )}
      {isOptionSelected && !!vehiclesThatCanReachPlanetSelected.length && (
        <RadioButtonGroup
          id={id}
          options={vehiclesThatCanReachPlanetSelected}
          handleChange={handleRadioButtonChange}
          value={vehicleValue}
        />
      )}
      {errorMessage && (
        <p className='destination-tile__error-message'>{errorMessage}</p>
      )}
    </section>
  );
};

export default DestinationTile;
