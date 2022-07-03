import "./RadioButtonGroup.styles.scss";

const RadioButtonGroup = ({ value, options, handleChange, id }) => (
  <div onChange={handleChange} className="radio-button-group">
    {options.map((option) => (
      <label key={option.name}>
        <input
          disabled={option.disabled}
          type="radio"
          name={`radio-group-${id}`}
          value={option.name}
          selected={value === option.name}
        />
        {`${option.name} ${
          option.total_no >= 0 ? ` - ${option.total_no} remaining` : ""
        }`}
      </label>
    ))}
  </div>
);

export default RadioButtonGroup;
