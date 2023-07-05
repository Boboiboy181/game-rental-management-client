const Input = ({
  inputType,
  inputPlaceholder,
  inputName,
}: {
  inputType: string;
  inputPlaceholder: string;
  inputName: string;
}) => {
  return (
    <div className="input-field mb-3">
      <input
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        className="w-full border border-gray-300 rounded-md p-2 mt-2"
      />
      <label>{inputPlaceholder}</label>
    </div>
  );
};

export default Input;
