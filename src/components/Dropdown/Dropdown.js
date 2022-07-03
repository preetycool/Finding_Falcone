import "./Dropdown.styles.scss";

const Dropdown = ({ value, handleChange, options = [], id }) => (
  <select
    className="dropdown"
    value={value}
    onChange={handleChange}
    name={`dropdown-${id}`}
  >
    <option value="">Select...</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Dropdown;
