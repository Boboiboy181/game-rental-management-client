type InputProps = {
  placeHolder: string;
  inputName: string;
  inputValue: string;
  type?: string
  required?: boolean;
  handleChange: any;
};

const Input = (props: InputProps) => {
  const { placeHolder, inputName, inputValue, handleChange, type, required } = props;

  return (
    <div className="input-field">
      <input
        className="px-4"
        type={type ? type : 'search'}
        placeholder={`${placeHolder}`}
        name={`${inputName}`}
        value={inputValue}
        onChange={handleChange}
        required={required}
      />
      <label htmlFor={`${inputName}`}>{placeHolder}</label>
    </div>
  );
};

export default Input;
