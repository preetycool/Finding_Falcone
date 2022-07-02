const Dropdown = ({ value, handleChange, options, id }) => (
  <select value={value} onChange={handleChange} name={`dropdown-${id}`}>
    <option value=''>Select...</option>
    {options.map((option) => (
      <option key={option.name} value={option.name}>
        {option.name}
      </option>
    ))}
  </select>
);

export default Dropdown;
