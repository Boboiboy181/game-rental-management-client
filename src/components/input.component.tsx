const Input = ({
  inputType,
  inputPlaceholder,
  inputName,
  inputValue,
  onChangeHandler,
}: {
  inputType: string;
  inputPlaceholder: string;
  inputName: string;
  inputValue: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="input-field mb-3">
      <input
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={onChangeHandler}
        className="w-full border border-gray-300 rounded-md p-2 mt-2"
      />
      <label>{inputPlaceholder}</label>
    </div>
  );
};

export default Input;
