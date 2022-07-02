import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import RadioButtonGroup from "../RadioButtonGroup/RadioButtonGroup";

const DestinationTile = ({
  planets,
  vehicles,
  id,
  onDropdownChange,
  planetValue,
  vehicleValue,
  onCheckboxSelect,
}) => {
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const vehiclesThatCanReachPlanetSelected = vehicles.filter((vehicle) =>
    vehicle.planetsVehicleCanReach.includes(planetValue)
  );

  const handleChange = (e) => {
    console.log(e.target.value);
    onDropdownChange(e.target.value);
    if (e.target.value) {
      setIsOptionSelected(true);
    } else {
      setIsOptionSelected(false);
    }
  };

  const handleCheckboxChange = (e) => {
    onCheckboxSelect(e.target.value);
  };

  return (
    <section className='planet-vehicle-tile'>
      <h2>{`Destination ${id}`}</h2>
      {!!planets.length && (
        <Dropdown
          id={id}
          value={planetValue}
          options={planets}
          handleChange={handleChange}
        />
      )}
      {isOptionSelected && !!vehiclesThatCanReachPlanetSelected.length && (
        <RadioButtonGroup
          id={id}
          options={vehiclesThatCanReachPlanetSelected}
          handleChange={handleCheckboxChange}
          value={vehicleValue}
        />
      )}
    </section>
  );
};

export default DestinationTile;
