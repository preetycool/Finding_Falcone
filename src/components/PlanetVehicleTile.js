import { useState } from "react";

const PlanetVehicleTile = ({
  planets,
  vehicles,
  destinationNumber,
  onDropdownChange,
  value,
}) => {
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const handleChange = (e) => {
    onDropdownChange(e.target.value);
    if (e.target.value) {
      setIsOptionSelected(true);
    } else {
      setIsOptionSelected(false);
    }
  };

  return (
    <section>
      <h2>{`Destination ${destinationNumber}`}</h2>
      {!!planets.length && (
        <select
          value={value}
          onChange={handleChange}
          name="vehicles"
          id="vehicle-dropdown"
        >
          <option value="">Select...</option>
          {planets.map((planet) => (
            <option key={planet.name} value={planet.name}>
              {planet.name}
            </option>
          ))}
        </select>
      )}
      {isOptionSelected && !!vehicles.length && (
        <fieldset>
          {vehicles.map((vehicle) => (
            <div key={vehicle.name}>
              <input type="checkbox"></input>
              <label>{vehicle.name}</label>
            </div>
          ))}
        </fieldset>
      )}
    </section>
  );
};

export default PlanetVehicleTile;
