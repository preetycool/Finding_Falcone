import "./RadioButtonGroup.styles.scss";

const RadioButtonGroup = ({ options = [], handleChange, id }) =>
  !!options.length && (
    <div
      data-testid='radio-button-group'
      onChange={handleChange}
      className='radio-button-group'
    >
      {options.map((option) => (
        <label key={option.value}>
          <input
            disabled={option.disabled}
            type='radio'
            name={`radio-group-${id}`}
            value={option.value}
          />
          {option.name}
        </label>
      ))}
    </div>
  );

export default RadioButtonGroup;
